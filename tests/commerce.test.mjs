import test from "node:test";
import assert from "node:assert/strict";
import {
  getFreightQuote,
  getInstallationAmount,
  getServerProduct,
  validateQuantity,
} from "../api/_lib/catalog.js";

test("server catalog rejects unknown product IDs and owns product prices", () => {
  assert.equal(getServerProduct("made-up-product"), null);
  assert.equal(getServerProduct("base-plate-2post").unitAmount, 234900);
  assert.equal(getServerProduct("triple-stacker").unitAmount, 1594900);
});

test("quantity is restricted to whole numbers from one through four", () => {
  assert.equal(validateQuantity(1), 1);
  assert.equal(validateQuantity("4"), 4);
  assert.equal(validateQuantity(0), null);
  assert.equal(validateQuantity(1.5), null);
  assert.equal(validateQuantity(5), null);
});

test("freight is included when no custom rate table exists", () => {
  const previous = process.env.FREIGHT_RATES_JSON;
  delete process.env.FREIGHT_RATES_JSON;
  assert.deepEqual(getFreightQuote({ zip: "91708" }), { status: "known", amount: 0, zone: "Free freight" });
  process.env.FREIGHT_RATES_JSON = previous;
});

test("freight uses the configured zone and server-side surcharges", () => {
  const previous = process.env.FREIGHT_RATES_JSON;
  process.env.FREIGHT_RATES_JSON = JSON.stringify([
    {
      name: "Southern California",
      zipPrefixes: ["91"],
      amount: 45000,
      residentialSurcharge: 9500,
      liftgateSurcharge: 8500,
    },
  ]);

  assert.deepEqual(
    getFreightQuote({ zip: "91708", addressType: "residential", hasDock: false }),
    { status: "known", amount: 63000, zone: "Southern California" },
  );
  assert.deepEqual(
    getFreightQuote({ zip: "91708", addressType: "commercial", hasDock: true }),
    { status: "known", amount: 45000, zone: "Southern California" },
  );
  process.env.FREIGHT_RATES_JSON = previous;
});

test("installation prices must be approved integer cent amounts", () => {
  const previous = process.env.INSTALLATION_PRICES_JSON;
  process.env.INSTALLATION_PRICES_JSON = JSON.stringify({ "base-plate-2post": 129900 });
  assert.equal(getInstallationAmount("base-plate-2post"), 129900);
  assert.equal(getInstallationAmount("xl-4post"), null);
  process.env.INSTALLATION_PRICES_JSON = previous;
});
