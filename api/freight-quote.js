import { getFreightQuote, getInstallationAmount, getServerProduct } from "./_lib/catalog.js";

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });

  const { productId, fulfillment, zip, addressType, hasDock } = request.body ?? {};
  const product = getServerProduct(productId);
  if (!product) return response.status(400).json({ error: "Invalid product" });
  const installationAmount = getInstallationAmount(product.id);
  if (fulfillment === "pickup") {
    return response.status(200).json({ status: "known", amount: 0, zone: "Local pickup", installationAmount });
  }

  if (process.env.FREIGHT_RATES_JSON && !/^[0-9]{5}$/.test(String(zip ?? ""))) {
    return response.status(400).json({ error: "Enter a valid 5-digit ZIP code" });
  }

  return response.status(200).json({
    ...getFreightQuote({ zip, addressType, hasDock: hasDock === true }),
    installationAmount,
  });
}
