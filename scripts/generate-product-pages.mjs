import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://www.oasiscarlifts.com";

const products = [
  {
    name: "Extra large 4-post lift",
    handle: "oasis-extra-large-4-post-car-lift-9000lb",
    price: "3799",
    image: "/assets/product-extra-large-4post.jpg",
    description:
      "Extra large 4-post garage car lift for full-size trucks, wide garage bays, storage, and collector vehicles.",
  },
  {
    name: "Narrow 4-post lift",
    handle: "oasis-narrow-4-post-car-lift-9000-lbs",
    price: "3250",
    image: "/assets/product-narrow-4post.png",
    description:
      "Narrow 4-post car lift for tighter home garages, storage bays, and space-saving vehicle parking.",
  },
  {
    name: "Clear-floor 2-post lift",
    handle: "oasis-lifts-clear-floor-2-post-car-lift-12-000-lbs-capacity",
    price: "2450",
    image: "/assets/product-clear-floor-2post.png",
    description:
      "Clear-floor 2-post car lift for service work, heavier vehicles, open-floor access, and home garage maintenance.",
  },
  {
    name: "Base-plate 2-post lift",
    handle: "oasis-lift-base-plate-2-post-car-lift-10-000-lb-capacity",
    price: "2250",
    image: "/assets/product-base-plate-2post.png",
    description:
      "Base-plate 2-post car lift for lower ceilings, repair bays, home garages, and practical vehicle service.",
  },
  {
    name: "Triple stacker 3-car lift",
    handle: "4-post-tripple-stacker-3-car-lift",
    price: "15650",
    image: "/assets/product-triple-stacker.png",
    description:
      "Triple stacker 3-car lift for collectors, vertical vehicle parking, and high-capacity garage storage.",
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function replaceMeta(html, selector, content) {
  const escaped = escapeHtml(content);
  const pattern = new RegExp(`(<meta ${selector} content=")[^"]*(" \\/>)`);
  return html.replace(pattern, `$1${escaped}$2`);
}

function buildProductSchema(product, url, imageUrl) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: imageUrl,
      brand: { "@type": "Brand", name: "Oasis Car Lifts" },
      description: product.description,
      offers: {
        "@type": "Offer",
        url,
        priceCurrency: "USD",
        price: product.price,
        availability: "https://schema.org/InStock",
      },
    },
    null,
    6,
  );
}

function withProductMeta(template, product) {
  const url = `${baseUrl}/products/${product.handle}`;
  const imageUrl = `${baseUrl}${product.image}`;
  const title = `${product.name} | Oasis Car Lifts`;
  const productSchema = `    <script type="application/ld+json">\n      ${buildProductSchema(
    product,
    url,
    imageUrl,
  )}\n    </script>\n`;

  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);

  html = replaceMeta(html, 'name="description"', product.description);
  html = replaceMeta(html, 'property="og:type"', "product");
  html = replaceMeta(html, 'property="og:url"', url);
  html = replaceMeta(html, 'property="og:title"', title);
  html = replaceMeta(html, 'property="og:description"', product.description);
  html = replaceMeta(html, 'property="og:image"', imageUrl);
  html = replaceMeta(html, 'property="og:image:alt"', product.name);
  html = replaceMeta(html, 'name="twitter:title"', title);
  html = replaceMeta(html, 'name="twitter:description"', product.description);
  html = replaceMeta(html, 'name="twitter:image"', imageUrl);

  return html.replace("</head>", `${productSchema}  </head>`);
}

const distDir = path.resolve("dist");
const template = await readFile(path.join(distDir, "index.html"), "utf8");

await Promise.all(
  products.map(async (product) => {
    const outputDir = path.join(distDir, "products", product.handle);
    await mkdir(outputDir, { recursive: true });
    await writeFile(path.join(outputDir, "index.html"), withProductMeta(template, product));
  }),
);

console.log(`Generated ${products.length} static product pages.`);
