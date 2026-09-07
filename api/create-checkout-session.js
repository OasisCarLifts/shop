import { randomBytes } from "node:crypto";
import Stripe from "stripe";
import { getFreightQuote, normalizeCheckoutItems } from "./_lib/catalog.js";
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
  const requestedItems = Array.isArray(body.items)
    ? body.items
    : [{ productId: body.productId, quantity: body.quantity }];
  const items = normalizeCheckoutItems(requestedItems);
  const fulfillment = body.fulfillment === "pickup" ? "pickup" : "shipping";
  const installationRequested = body.installation === true;
  const addressType = body.addressType === "commercial" ? "commercial" : "residential";
  const hasDock = body.hasDock === true;
  const zip = clean(body.zip, 5);

  if (!items) return response.status(400).json({ error: "Invalid cart items" });

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
  const lineItems = items.map(({ product, quantity }) => ({
      price_data: {
        currency: "usd",
        product_data: { name: product.name, metadata: { oasis_product_id: product.id } },
        unit_amount: product.unitAmount,
      },
      quantity,
    }));

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

  try {
    const productSubtotal = items.reduce(
      (sum, { product, quantity }) => sum + product.unitAmount * quantity,
      0,
    );
    const itemSummary = items.map(({ product, quantity }) => `${product.name} x ${quantity}`).join(", ");
    const productIds = items.map(({ product }) => product.id).join(",");
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
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
        product_id: items.length === 1 ? items[0].product.id : "multi-item-cart",
        product_ids: productIds,
        product_name: items.length === 1 ? items[0].product.name : "Multiple Oasis products",
        quantity: String(totalQuantity),
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
      cancel_url: items.length === 1
        ? `${siteUrl}/products/${items[0].product.handle}?checkout=cancelled`
        : `${siteUrl}/#lifts`,
    });

    await saveOrder({
      orderNumber,
      customerName: "",
      email: "",
      phone: "",
      product: itemSummary,
      productId: items.length === 1 ? items[0].product.id : "multi-item-cart",
      items: items.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        quantity,
        unitAmount: product.unitAmount,
      })),
      quantity: totalQuantity,
      productSubtotal,
      freight: freight.amount,
      installation: installationAmount,
      tax: 0,
      total: productSubtotal + freight.amount + installationAmount,
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
