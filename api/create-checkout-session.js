import { randomBytes } from "node:crypto";
import Stripe from "stripe";
import { getFreightQuote, getServerProduct, validateQuantity } from "./_lib/catalog.js";
import { saveOrder } from "./_lib/redis.js";

const stripe = process.env.STRIPE_RESTRICTED_KEY
  ? new Stripe(process.env.STRIPE_RESTRICTED_KEY, { apiVersion: "2026-07-29.dahlia" })
  : null;

function clean(value, max = 200) {
  return String(value ?? "").trim().slice(0, max);
}

function makeOrderNumber() {
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  return `OCL-${date}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

function getSiteUrl(request) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const protocol = request.headers["x-forwarded-proto"] || "https";
  const host = request.headers["x-forwarded-host"] || request.headers.host;
  return `${protocol}://${host}`;
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  if (!stripe) return response.status(500).json({ error: "Stripe is not configured" });

  const body = request.body ?? {};
  const product = getServerProduct(body.productId);
  const quantity = validateQuantity(body.quantity);
  const fulfillment = body.fulfillment === "pickup" ? "pickup" : "shipping";
  const installationRequested = body.installation === true;
  const addressType = body.addressType === "commercial" ? "commercial" : "residential";
  const hasDock = body.hasDock === true;
  const zip = clean(body.zip, 5);

  if (!product || !quantity) return response.status(400).json({ error: "Invalid product or quantity" });
  if (quantity > 1) return response.status(409).json({ error: "Multiple units require a delivered-price quote" });

  const freight = fulfillment === "pickup"
    ? { status: "known", amount: 0, zone: "Local pickup" }
    : getFreightQuote({ zip, addressType, hasDock });
  if (freight.status !== "known") {
    return response.status(409).json({ error: "Freight requires a delivered-price quote", requiresQuote: true });
  }

  // Installation varies by site and is arranged separately after purchase.
  const installationAmount = 0;

  const orderNumber = makeOrderNumber();
  const siteUrl = getSiteUrl(request);
  const lineItems = [
    {
      price_data: {
        currency: "usd",
        product_data: { name: product.name, metadata: { oasis_product_id: product.id } },
        unit_amount: product.unitAmount,
      },
      quantity,
    },
  ];

  if (freight.amount > 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: `Freight - ${freight.zone}` },
        unit_amount: freight.amount,
      },
      quantity: 1,
    });
  }

  if (installationAmount > 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: `Installation - ${product.name}` },
        unit_amount: installationAmount,
      },
      quantity: 1,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      integration_identifier: `oasisweb_${randomBytes(4).toString("hex")}`,
      line_items: lineItems,
      phone_number_collection: { enabled: true },
      ...(fulfillment === "shipping"
        ? { shipping_address_collection: { allowed_countries: ["US"] } }
        : {}),
      ...(process.env.STRIPE_AUTOMATIC_TAX === "true"
        ? { automatic_tax: { enabled: true } }
        : {}),
      metadata: {
        order_number: orderNumber,
        product_id: product.id,
        product_name: product.name,
        quantity: String(quantity),
        fulfillment,
        freight_amount: String(freight.amount),
        freight_zone: freight.zone,
        installation_requested: String(installationRequested),
        installation_amount: String(installationAmount),
        address_type: addressType,
        has_dock: String(hasDock),
        supplied_zip: zip,
      },
      success_url: `${siteUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/products/${product.handle}?checkout=cancelled`,
    });

    await saveOrder({
      orderNumber,
      customerName: "",
      email: "",
      phone: "",
      product: product.name,
      productId: product.id,
      quantity,
      productSubtotal: product.unitAmount * quantity,
      freight: freight.amount,
      installation: installationAmount,
      tax: 0,
      total: product.unitAmount * quantity + freight.amount + installationAmount,
      shippingAddress: null,
      fulfillmentMethod: fulfillment,
      stripeCheckoutSessionId: session.id,
      checkoutSessionId: session.id,
      stripePaymentIntentId: null,
      paymentStatus: "Pending",
      fulfillmentStatus: "New",
      createdDate: new Date().toISOString(),
    });

    return response.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout creation failed", error?.message);
    return response.status(500).json({ error: "Unable to start secure checkout" });
  }
}
