import { Redis } from "@upstash/redis";

let redis;

export function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error("Order storage is not configured");
  }

  redis ??= new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  return redis;
}

export async function saveOrder(order) {
  const client = getRedis();
  await Promise.all([
    client.set(`order:${order.orderNumber}`, order),
    client.set(`checkout:${order.checkoutSessionId}`, order.orderNumber),
  ]);
}

export async function getOrderBySession(sessionId) {
  const client = getRedis();
  const orderNumber = await client.get(`checkout:${sessionId}`);
  if (!orderNumber) return null;
  return client.get(`order:${orderNumber}`);
}
