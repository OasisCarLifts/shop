import { getOrderBySession, getRedis } from "./_lib/redis.js";

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  const sessionId = String(request.body?.sessionId ?? "");
  if (!sessionId.startsWith("cs_")) return response.status(400).json({ error: "Invalid checkout session" });

  try {
    const order = await getOrderBySession(sessionId);
    if (!order || order.paymentStatus !== "Payment Confirmed") {
      return response.status(409).json({ claimed: false });
    }
    const claimed = await getRedis().set(`purchase-conversion:${order.orderNumber}`, "claimed", {
      nx: true,
      ex: 60 * 60 * 24 * 365,
    });
    return response.status(200).json({
      claimed: Boolean(claimed),
      transactionId: order.orderNumber,
      value: order.total / 100,
      currency: "USD",
    });
  } catch {
    return response.status(500).json({ error: "Unable to claim conversion" });
  }
}
