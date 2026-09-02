export const serverCatalog = {
  "xl-4post": {
    id: "xl-4post",
    name: "Extra large 4-post lift",
    handle: "oasis-extra-large-4-post-car-lift-9000lb",
    unitAmount: 379900,
  },
  "clear-floor-2post": {
    id: "clear-floor-2post",
    name: "Clear-floor 2-post lift",
    handle: "oasis-lifts-clear-floor-2-post-car-lift-12-000-lbs-capacity",
    unitAmount: 369900,
  },
  "base-plate-2post": {
    id: "base-plate-2post",
    name: "Base-plate 2-post lift",
    handle: "oasis-lift-base-plate-2-post-car-lift-10-000-lb-capacity",
    unitAmount: 234900,
  },
  "triple-stacker": {
    id: "triple-stacker",
    name: "Triple stacker 3-car lift",
    handle: "4-post-tripple-stacker-3-car-lift",
    unitAmount: 1594900,
  },
};

export function getServerProduct(productId) {
  return serverCatalog[String(productId ?? "")] ?? null;
}

export function getInstallationAmount(productId) {
  if (!process.env.INSTALLATION_PRICES_JSON) return null;

  try {
    const prices = JSON.parse(process.env.INSTALLATION_PRICES_JSON);
    const amount = Number(prices[productId]);
    return Number.isInteger(amount) && amount >= 0 ? amount : null;
  } catch {
    return null;
  }
}

export function getFreightQuote({ zip, addressType, hasDock }) {
  // Freight is included unless Oasis explicitly configures a regional rate table.
  if (!process.env.FREIGHT_RATES_JSON) {
    return { status: "known", amount: 0, zone: "Free freight" };
  }

  const normalizedZip = String(zip ?? "").replace(/\D/g, "").slice(0, 5);
  if (normalizedZip.length !== 5) return { status: "manual", amount: null };

  try {
    const zones = JSON.parse(process.env.FREIGHT_RATES_JSON);
    const zone = zones.find((candidate) =>
      Array.isArray(candidate.zipPrefixes)
        ? candidate.zipPrefixes.some((prefix) => normalizedZip.startsWith(String(prefix)))
        : false,
    );
    if (!zone) return { status: "manual", amount: null };

    const baseAmount = Number(zone.amount);
    const residentialSurcharge = addressType === "residential" ? Number(zone.residentialSurcharge ?? 0) : 0;
    const liftgateSurcharge = hasDock === false ? Number(zone.liftgateSurcharge ?? 0) : 0;
    const amount = baseAmount + residentialSurcharge + liftgateSurcharge;

    if (!Number.isInteger(amount) || amount < 0) return { status: "manual", amount: null };
    return { status: "known", amount, zone: String(zone.name ?? "Configured freight") };
  } catch {
    return { status: "manual", amount: null };
  }
}

export function validateQuantity(value) {
  const quantity = Number(value);
  return Number.isInteger(quantity) && quantity >= 1 && quantity <= 4 ? quantity : null;
}
