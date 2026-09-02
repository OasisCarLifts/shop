import Stripe from "stripe";
import { Resend } from "resend";
import { getOrderBySession, getRedis, saveOrder } from "./_lib/redis.js";

export const config = { api: { bodyParser: false } };

const stripe = process.env.STRIPE_RESTRICTED_KEY
  ? new Stripe(process.env.STRIPE_RESTRICTED_KEY, { apiVersion: "2026-07-29.dahlia" })
  : null;

async function readRawBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
}

function money(cents) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format((cents || 0) / 100);
}

function addressText(address) {
  if (!address) return "Local pickup";
  return [address.line1, address.line2, address.city, address.state, address.postal_code, address.country]
    .filter(Boolean)
    .join(", ");
}

async function sendOrderEmails(order) {
  if (!process.env.RESEND_API_KEY) return;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM || "Oasis Car Lifts <orders@oasiscarlifts.com>";
  const summary = [
    `Order: ${order.orderNumber}`,
    `Customer: ${order.customerName}`,
    `Phone: ${order.phone}`,
    `Email: ${order.email}`,
    `Product: ${order.product}`,
    `Quantity: ${order.quantity}`,
    `Product subtotal: ${money(order.productSubtotal)}`,
    `Freight: ${money(order.freight)}`,
    `Installation: ${money(order.installation)}`,
    `Tax: ${money(order.tax)}`,
    `Total: ${money(order.total)}`,
    `Fulfillment: ${order.fulfillmentMethod}`,
    `Address: ${addressText(order.shippingAddress)}`,
    `Payment: ${order.paymentStatus}`,
  ].join("\n");

  const messages = [
    resend.emails.send({
      from,
      to: "contact@oasiscarlifts.com",
      subject: `Paid Oasis order ${order.orderNumber}`,
      text: `A Stripe payment has been confirmed.\n\n${summary}`,
    }),
  ];
  if (order.email) {
    messages.push(
      resend.emails.send({
        from,
        to: order.email,
        subject: `Oasis Car Lifts order ${order.orderNumber}`,
        text: `Thank you for your order. Oasis will contact you with delivery or pickup details.\n\n${summary}`,
      }),
    );
  }
  await Promise.all(messages);
}

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).send("Method not allowed");
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) return response.status(500).send("Stripe webhook is not configured");

  let event;
  try {
    const rawBody = await readRawBody(request);
    event = stripe.webhooks.constructEvent(
      rawBody,
      request.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    return response.status(400).send(`Invalid webhook signature: ${error.message}`);
  }

  if (!["checkout.session.completed", "checkout.session.async_payment_succeeded"].includes(event.type)) {
    return response.status(200).json({ received: true });
  }

  const redis = getRedis();
  const firstDelivery = await redis.set(`stripe-event:${event.id}`, "processing", { nx: true, ex: 60 * 60 * 24 * 30 });
  if (!firstDelivery) return response.status(200).json({ received: true, duplicate: true });

  try {
    const session = event.data.object;
    if (session.payment_status !== "paid") {
      await redis.del(`stripe-event:${event.id}`);
      return response.status(200).json({ received: true, paid: false });
    }

    const draft = await getOrderBySession(session.id);
    if (!draft) throw new Error("Checkout draft not found");
    const details = session.customer_details || {};
    const shipping = session.collected_information?.shipping_details || session.shipping_details || null;
    const order = {
      ...draft,
      customerName: details.name || shipping?.name || "",
      email: details.email || session.customer_email || "",
      phone: details.phone || "",
      tax: session.total_details?.amount_tax || 0,
      total: session.amount_total || draft.total,
      shippingAddress: shipping?.address || details.address || null,
      stripePaymentIntentId:
        typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id || null,
      paymentStatus: "Payment Confirmed",
      fulfillmentStatus: "New",
      paidDate: new Date().toISOString(),
    };
    await saveOrder(order);

    const emailKey = `order-email:${order.orderNumber}`;
    const shouldEmail = await redis.set(emailKey, "processing", { nx: true, ex: 60 * 10 });
    if (shouldEmail) {
      try {
        await sendOrderEmails(order);
        await redis.set(emailKey, "sent", { ex: 60 * 60 * 24 * 365 });
      } catch (error) {
        await redis.del(emailKey);
        throw error;
      }
    }
    return response.status(200).json({ received: true });
  } catch (error) {
    await redis.del(`stripe-event:${event.id}`);
    console.error("Stripe webhook processing failed", error?.message);
    return response.status(500).send("Webhook processing failed");
  }
}
