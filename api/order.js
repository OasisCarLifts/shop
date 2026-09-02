import { getOrderBySession } from "./_lib/redis.js";

function publicOrder(order) {
  return {
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    email: order.email,
    phone: order.phone,
    product: order.product,
    quantity: order.quantity,
    total: order.total,
    fulfillmentMethod: order.fulfillmentMethod,
    paymentStatus: order.paymentStatus,
  };
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "GET") return response.status(405).json({ error: "Method not allowed" });
  const sessionId = String(request.query?.session_id ?? "");
  if (!sessionId.startsWith("cs_")) return response.status(400).json({ error: "Invalid checkout session" });

  try {
    const order = await getOrderBySession(sessionId);
    if (!order || order.paymentStatus !== "Payment Confirmed") {
      return response.status(404).json({ error: "Order confirmation is still processing" });
    }
    return response.status(200).json(publicOrder(order));
  } catch {
    return response.status(500).json({ error: "Unable to load order" });
  }
}
