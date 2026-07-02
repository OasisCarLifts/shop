import { Resend } from "resend";

const fallbackToEmail = "info@oasiscarlifts.com";
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

function buildPlainText({ name, phone, zip, notes, productInterest, sourceUrl }) {
  return [
    "New Oasis Car Lifts quote request",
    "",
    "Customer",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `ZIP code: ${zip}`,
    "",
    "Product interest",
    productInterest?.name || "General quote request",
    "",
    "Notes",
    notes || "None",
    "",
    "Source",
    sourceUrl || "Website quote form",
  ].join("\n");
}

function buildHtml({ name, phone, zip, notes, productInterest, sourceUrl }) {
  const rows = [
    ["Name", name],
    ["Phone", phone],
    ["ZIP code", zip],
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
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return response.status(500).json({ error: "Resend is not configured" });
  }

  const name = clean(request.body?.name);
  const phone = clean(request.body?.phone);
  const zip = clean(request.body?.zip);
  const notes = clean(request.body?.notes);
  const productInterest = request.body?.productInterest;
  const sourceUrl = clean(request.body?.sourceUrl);

  if (!name || !phone || !zip) {
    return response.status(400).json({ error: "Name, phone, and ZIP code are required" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.QUOTE_TO_EMAIL || fallbackToEmail;
  const from = process.env.RESEND_FROM || fallbackFromEmail;
  const subject = `Quote request from ${name}`;
  const payload = { name, phone, zip, notes, productInterest, sourceUrl };

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      text: buildPlainText(payload),
      html: buildHtml(payload),
    });

    if (error) {
      return response.status(502).json({ error: error.message || "Unable to send quote request" });
    }

    return response.status(200).json({ ok: true, id: data?.id });
  } catch (error) {
    return response.status(500).json({ error: "Unable to send quote request" });
  }
}
