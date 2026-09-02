import { Resend } from "resend";
import { randomBytes } from "node:crypto";
import { getRedis } from "./_lib/redis.js";

const quoteRecipients = ["contact@oasiscarlifts.com", "24alkabbansammy@gmail.com"];
const fallbackFromEmail = "Oasis Car Lifts <quotes@oasiscarlifts.com>";

function clean(value) {
  return String(value ?? "").trim();
}

function escapeHtml(value) {
  return clean(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildPlainText(payload) {
  const { name, phone, zip, notes, productInterest, sourceUrl } = payload;
  return [
    "New Oasis Car Lifts quote request",
    "",
    "Customer",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `ZIP code: ${zip}`,
    payload.email ? `Email: ${payload.email}` : null,
    payload.address1 ? `Address: ${[payload.address1, payload.address2, payload.city, payload.state, zip].filter(Boolean).join(", ")}` : null,
    payload.draftType ? `Request type: ${payload.draftType}` : null,
    payload.quantity ? `Quantity: ${payload.quantity}` : null,
    payload.addressType ? `Address type: ${payload.addressType}` : null,
    payload.addressType ? `Forklift/loading dock: ${payload.hasDock ? "Yes" : "No"}` : null,
    payload.installation !== undefined ? `Installation requested: ${payload.installation ? "Yes" : "No"}` : null,
    "",
    "Product interest",
    productInterest?.name || "General quote request",
    "",
    "Notes",
    notes || "None",
    "",
    "Source",
    sourceUrl || "Website quote form",
  ].filter((line) => line !== null).join("\n");
}

function buildHtml(payload) {
  const { name, phone, zip, notes, productInterest, sourceUrl } = payload;
  const rows = [
    ["Name", name],
    ["Phone", phone],
    ["ZIP code", zip],
    ...(payload.email ? [["Email", payload.email]] : []),
    ...(payload.address1 ? [["Delivery address", [payload.address1, payload.address2, payload.city, payload.state, zip].filter(Boolean).join(", ")]] : []),
    ...(payload.draftType ? [["Request type", "Delivered-price request"]] : []),
    ...(payload.quantity ? [["Quantity", payload.quantity]] : []),
    ...(payload.addressType ? [["Address type", payload.addressType], ["Forklift/loading dock", payload.hasDock ? "Yes" : "No"]] : []),
    ...(payload.installation !== undefined ? [["Installation", payload.installation ? "Requested" : "Not requested"]] : []),
    ["Product interest", productInterest?.name || "General quote request"],
    ["Notes", notes || "None"],
    ["Source", sourceUrl || "Website quote form"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.5">
      <h1 style="margin:0 0 16px;font-size:24px">New Oasis Car Lifts quote request</h1>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border:1px solid #ddd;background:#f7f7f7;font-weight:700;padding:10px;width:170px">${escapeHtml(label)}</td>
                <td style="border:1px solid #ddd;padding:10px">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
    </div>
  `;
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return response.status(500).json({ error: "Resend is not configured" });
  }

  let body = request.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return response.status(400).json({ error: "Invalid request data" });
    }
  }

  const name = clean(body?.name);
  const phone = clean(body?.phone);
  const zip = clean(body?.zip);
  const notes = clean(body?.notes);
  const productInterest = body?.productInterest;
  const sourceUrl = clean(body?.sourceUrl);
  const email = clean(body?.email);
  const address1 = clean(body?.address1);
  const address2 = clean(body?.address2);
  const city = clean(body?.city);
  const state = clean(body?.state);
  const draftType = body?.draftType === "delivered_price" ? "delivered_price" : "";
  const quantity = Number(body?.quantity || 1);
  const addressType = body?.addressType === "commercial" ? "commercial" : body?.addressType === "residential" ? "residential" : "";
  const hasDock = body?.hasDock === true;
  const installation = body?.installation === true;

  if (!name || !phone || !zip) {
    return response.status(400).json({ error: "Name, phone, and ZIP code are required" });
  }
  if (draftType && (!email || !address1 || !city || !state)) {
    return response.status(400).json({ error: "Email and complete delivery address are required" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM || fallbackFromEmail;
  const subject = `Quote request from ${name}`;
  const reference = draftType ? `OCL-Q-${randomBytes(3).toString("hex").toUpperCase()}` : null;
  const payload = { name, phone, zip, notes, productInterest, sourceUrl, email, address1, address2, city, state, draftType, quantity, addressType, hasDock, installation, reference };

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: quoteRecipients,
      subject,
      text: buildPlainText(payload),
      html: buildHtml(payload),
    });

    if (error) {
      return response.status(502).json({ error: error.message || "Unable to send quote request" });
    }

    if (draftType) {
      try {
        await getRedis().set(`quote-draft:${reference}`, { ...payload, status: "New", createdDate: new Date().toISOString() }, { ex: 60 * 60 * 24 * 180 });
      } catch (storageError) {
        console.error("Quote draft storage failed", storageError?.message);
      }

      await resend.emails.send({
        from,
        to: email,
        subject: `Oasis delivered-price request ${reference}`,
        text: `We received your delivered-price request for ${productInterest?.name || "an Oasis lift"}. Reference: ${reference}. Oasis will contact you after reviewing freight, access, and installation details.`,
      });
    }

    return response.status(200).json({
      ok: true,
      id: data?.id,
      reference,
      message: "Quote request sent",
    });
  } catch (error) {
    console.error("Quote email failed", error);
    return response.status(500).json({ error: "Unable to send quote request" });
  }
}
