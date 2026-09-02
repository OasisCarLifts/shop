import React, { useEffect, useMemo, useState } from "react";

const phone = "1 (888) 822-2976";
const phoneHref = "tel:+18888222976";
const contactEmail = "contact@oasiscarlifts.com";
const shopUrl = "/#lifts";
const campaignPath = "/google-car-lift-quote";
const businessAddress = {
  street: "1333 N Manzanita St #1385L",
  cityStateZip: "Orange, CA 92867",
};
const footerShopLinks = [
  ["All lifts", "/#lifts", "footer_all_lifts"],
  ["Lift finder", "/#finder", "footer_lift_finder"],
  ["Get quote", "/#quote", "footer_quote_shop"],
  ["FAQs", "/#faq", "footer_faqs_shop"],
];
const footerResourceLinks = [
  ["Home", "/#top", "footer_home"],
  ["Shop", shopUrl, "footer_shop"],
  ["Garage fit check", "/#finder", "footer_garage_fit_check"],
  ["Install help", "/#install", "footer_install_help"],
  ["Buyer questions", "/#faq", "footer_buyer_questions"],
];
const footerSupportLinks = [
  ["Call Oasis", phoneHref, "footer_call_support"],
  ["Email Oasis", `mailto:${contactEmail}`, "footer_email_support"],
  ["Quote request", "/#quote", "footer_quote_support"],
  ["FAQs", "/#faq", "footer_faqs_support"],
];
const policyPages = {
  "/privacy-policy": {
    eyebrow: "Your information",
    title: "Privacy policy",
    description: "How Oasis Car Lifts collects, uses, and protects information submitted through this website.",
    sections: [
      {
        title: "Information we collect",
        paragraphs: [
          "When you request a quote or contact Oasis Car Lifts, we collect the information you choose to provide, such as your full name, phone number, delivery ZIP code, notes, product interest, and the page where you submitted the request.",
          "We also use Vercel Web Analytics to understand aggregate website activity. Vercel Web Analytics does not use cookies and reports anonymized information such as page views, referrers, general location, browser, operating system, and device type.",
        ],
      },
      {
        title: "How we use information",
        bullets: [
          "Respond to quote requests and customer questions.",
          "Help confirm lift fit, freight, delivery, installation, and financing needs.",
          "Operate, secure, troubleshoot, and improve the website.",
          "Comply with legal obligations and prevent misuse or fraud.",
        ],
      },
      {
        title: "How information is shared",
        paragraphs: [
          "We share information only as reasonably necessary to operate the site and respond to you. Current service providers include Vercel for website hosting and anonymized analytics, and Resend for delivering quote-request emails. We may also share information when required by law, to protect rights or safety, or as part of a business transaction.",
          "Oasis Car Lifts does not sell personal information and does not use quote-request information for cross-context behavioral advertising. Financing providers have their own privacy practices if you choose to apply through them.",
        ],
      },
      {
        title: "Retention and security",
        paragraphs: [
          "We retain personal information only as long as reasonably necessary for customer service, business records, dispute resolution, security, and legal obligations. We use reasonable administrative and technical safeguards, but no internet transmission or storage system can be guaranteed completely secure.",
        ],
      },
      {
        title: "Your privacy choices",
        paragraphs: [
          "California residents may have rights to request access to, correction of, or deletion of personal information, and to receive information about how it is used or disclosed. Where applicable, you may also have rights concerning sale or sharing and the use of sensitive personal information. Oasis Car Lifts does not discriminate against anyone for exercising an applicable privacy right.",
          "To submit a request, email contact@oasiscarlifts.com or call 1 (888) 822-2976. We may need to verify your identity before completing a request. An authorized agent may submit a request where permitted by law.",
        ],
      },
      {
        title: "Children's privacy",
        paragraphs: [
          "This website is intended for adults shopping for automotive equipment and is not directed to children under 13. We do not knowingly collect personal information from children under 13. Contact us if you believe a child has submitted information so we can review and delete it as appropriate.",
        ],
      },
      {
        title: "Policy changes",
        paragraphs: [
          "We may update this policy when our website, vendors, or legal obligations change. The current version and its effective date will always appear on this page.",
        ],
      },
    ],
  },
  "/terms-of-use": {
    eyebrow: "Website terms",
    title: "Terms of use",
    description: "The rules that apply when you use the Oasis Car Lifts website or request product information.",
    sections: [
      {
        title: "Using this website",
        paragraphs: [
          "By using this website, you agree to these terms. If you do not agree, do not use the site. You must use the site lawfully and may not interfere with its operation, attempt unauthorized access, introduce malicious code, or misuse its content or forms.",
        ],
      },
      {
        title: "Quotes are not orders",
        paragraphs: [
          "Submitting a quote request does not create an order, reserve inventory, guarantee a price, or obligate either party to complete a transaction. A purchase is created only after Oasis Car Lifts confirms the product, price, payment, freight, delivery, and applicable order terms in writing.",
        ],
      },
      {
        title: "Product information and pricing",
        paragraphs: [
          "We work to keep product descriptions, images, specifications, pricing, promotions, and availability accurate. They may change without notice, and errors may occur. Written quotes and order confirmations control over website content. Monthly payment examples are estimates only; financing availability, rates, and terms are determined by third-party providers and are subject to approval.",
        ],
      },
      {
        title: "Fit, installation, and safe use",
        paragraphs: [
          "Website fit tools and recommendations are starting points, not engineering or installation approvals. Before ordering, the buyer must verify vehicle weight, ceiling and bay clearance, concrete and anchoring requirements, electrical requirements, permits, door travel, and delivery access.",
          "Products must be installed, inspected, maintained, and operated according to the manufacturer's current instructions and applicable law. Use qualified professionals where required. Never exceed a lift's rated capacity or use equipment that is damaged or improperly installed.",
        ],
      },
      {
        title: "Warranties",
        paragraphs: [
          "Warranty coverage varies by product and manufacturer. Only the written warranty supplied with the product or confirmed in the order documents applies. Website summaries do not expand or replace those written terms.",
        ],
      },
      {
        title: "Intellectual property",
        paragraphs: [
          "The Oasis Car Lifts name, logos, website design, text, graphics, and original media are protected by applicable intellectual-property laws. You may view the site for personal or internal business purchasing purposes, but may not copy, republish, sell, or exploit site content without written permission.",
        ],
      },
      {
        title: "Disclaimers and limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, the website is provided as available without warranties concerning uninterrupted operation or error-free content. Oasis Car Lifts is not liable for indirect, incidental, special, or consequential losses arising from website use. Nothing in these terms limits rights or remedies that cannot legally be waived.",
        ],
      },
      {
        title: "Governing law and changes",
        paragraphs: [
          "These terms are governed by California law, without regard to conflict-of-law rules. We may update them as the website and business change. Continued use after an update means the revised terms apply from their effective date.",
        ],
      },
    ],
  },
  "/shipping-delivery": {
    eyebrow: "Freight planning",
    title: "Shipping and delivery",
    description: "What buyers should expect when arranging freight delivery for automotive lift equipment.",
    sections: [
      {
        title: "Shipping quotes",
        paragraphs: [
          "Automotive lifts are heavy freight. Shipping cost, carrier service, delivery method, and estimated timing depend on the product, destination, access, and current carrier availability. Any free-freight offer applies only to qualifying products and locations and must be confirmed in the written quote or order confirmation.",
        ],
      },
      {
        title: "Delivery access",
        bullets: [
          "Provide a complete, accurate delivery address and working contact number.",
          "Tell Oasis before ordering about residential access, narrow roads, gates, restricted hours, or other site limitations.",
          "Confirm whether a forklift, loading dock, liftgate, terminal pickup, or other unloading equipment is required.",
          "The customer is responsible for safe unloading and moving the equipment after delivery unless the written order says otherwise.",
        ],
      },
      {
        title: "Timing and appointments",
        paragraphs: [
          "Shipping and delivery dates are estimates, not guarantees. Weather, carrier capacity, inspection holds, remote locations, and other events outside our control may cause delays. Do not schedule installers or contractors until the equipment has arrived and has been inspected.",
        ],
      },
      {
        title: "Inspect before signing",
        paragraphs: [
          "Inspect the shipment and packaging before signing the carrier receipt. Note visible damage, shortages, or opened packaging on the delivery receipt and take clear photographs. Contact Oasis Car Lifts promptly so we can help document a freight claim. Signing without noting visible damage may limit available carrier remedies.",
        ],
      },
      {
        title: "Address changes and failed delivery",
        paragraphs: [
          "Contact Oasis immediately if delivery details change. Carrier reconsignment, redelivery, storage, limited-access, liftgate, or appointment fees may apply when they are caused by incorrect information, missed delivery, or services not included in the original quote.",
        ],
      },
    ],
  },
  "/returns-cancellations": {
    eyebrow: "Order changes",
    title: "Returns and cancellations",
    description: "How to request an order change, cancellation, or return before sending equipment back.",
    sections: [
      {
        title: "Written order terms control",
        paragraphs: [
          "Lift models, freight arrangements, and manufacturer requirements vary. The return and cancellation terms shown on your written quote, invoice, or order confirmation control for that purchase. Review them before payment and ask Oasis Car Lifts about anything that is unclear.",
        ],
      },
      {
        title: "Cancellations",
        paragraphs: [
          "Request a cancellation as soon as possible by calling 1 (888) 822-2976 and emailing contact@oasiscarlifts.com. An order is not cancelled until Oasis confirms it in writing. Orders that have entered processing, shipped, or incurred manufacturer or carrier charges may not be cancellable or may be subject to costs disclosed in the order terms.",
        ],
      },
      {
        title: "Return authorization required",
        paragraphs: [
          "Do not ship equipment back without written return authorization and instructions from Oasis Car Lifts. Unauthorized returns may be refused. Return eligibility depends on the product, condition, packaging, order type, manufacturer rules, and written order terms.",
        ],
      },
      {
        title: "Items that may not be returnable",
        bullets: [
          "Installed, assembled, used, modified, damaged, or incomplete equipment.",
          "Custom, special-order, clearance, final-sale, or discontinued items when identified in the order terms.",
          "Items missing original packaging, parts, manuals, labels, or accessories.",
          "Products returned after an applicable written return period or without authorization.",
        ],
      },
      {
        title: "Return freight and refunds",
        paragraphs: [
          "Return freight, original freight, restocking charges, inspection costs, and other deductions apply only as stated in the written order terms or return authorization. Approved refunds are issued after the returned product is received and inspected, using the original payment method where practical. Carrier damage and warranty claims follow separate procedures.",
        ],
      },
      {
        title: "Damaged or incorrect shipments",
        paragraphs: [
          "If equipment arrives visibly damaged, incomplete, or different from the written order, document it immediately and contact Oasis before installation or use. Keep all packaging and parts until the issue is resolved.",
        ],
      },
    ],
  },
  "/accessibility": {
    eyebrow: "Inclusive access",
    title: "Accessibility statement",
    description: "Oasis Car Lifts is working to make its website useful for visitors with different abilities and technologies.",
    sections: [
      {
        title: "Our commitment",
        paragraphs: [
          "We aim to provide a website that supports keyboard navigation, readable contrast, meaningful page structure, descriptive image text, and responsive layouts. Accessibility is an ongoing effort as products, content, and technology change.",
        ],
      },
      {
        title: "Need help using the site?",
        paragraphs: [
          "If a page, form, document, or feature is difficult to use, call 1 (888) 822-2976 or email contact@oasiscarlifts.com. Please describe the page and the assistance you need. We will work to provide the information or service through an accessible alternative.",
        ],
      },
      {
        title: "Feedback",
        paragraphs: [
          "We welcome specific accessibility feedback. Include the web address, the assistive technology or browser you were using if relevant, and a brief description of the problem so we can investigate it.",
        ],
      },
    ],
  },
};
const footerPolicyLinks = [
  ["Privacy", "/privacy-policy"],
  ["Terms", "/terms-of-use"],
  ["Shipping", "/shipping-delivery"],
  ["Returns", "/returns-cancellations"],
  ["Accessibility", "/accessibility"],
];

const products = [
  {
    id: "xl-4post",
    name: "Extra large 4-post lift",
    shortName: "XL 4-post",
    price: 3799,
    monthly: 105,
    capacity: "9,000 lb",
    bestFor: "Full-size trucks and wide garage bays",
    detail: '78" drive-under clearance with a longer, wider platform.',
    image: "/assets/product-extra-large-4post.jpg",
    handle: "oasis-extra-large-4-post-car-lift-9000lb",
    minHeight: 9,
    maxWeight: 9000,
    minWidth: 11,
    type: "4-post",
  },
  {
    id: "clear-floor-2post",
    name: "Clear-floor 2-post lift",
    shortName: "Clear-floor 2-post",
    price: 3699,
    monthly: 103,
    capacity: "12,000 lb",
    bestFor: "Service work and heavy vehicles",
    detail: "Open floor access for serious maintenance work.",
    image: "/assets/product-clear-floor-2post.png",
    handle: "oasis-lifts-clear-floor-2-post-car-lift-12-000-lbs-capacity",
    minHeight: 11.5,
    maxWeight: 12000,
    minWidth: 10.5,
    type: "2-post",
  },
  {
    id: "base-plate-2post",
    name: "Base-plate 2-post lift",
    shortName: "Base-plate 2-post",
    price: 2349,
    monthly: 65,
    capacity: "10,000 lb",
    bestFor: "Lower ceilings and repair bays",
    detail: "A practical 2-post option for garages that need lower overhead clearance.",
    image: "/assets/product-base-plate-2post.png",
    handle: "oasis-lift-base-plate-2-post-car-lift-10-000-lb-capacity",
    minHeight: 9.5,
    maxWeight: 10000,
    minWidth: 10,
    type: "2-post",
  },
  {
    id: "triple-stacker",
    name: "Triple stacker 3-car lift",
    shortName: "Triple stacker",
    price: 15949,
    monthly: 443,
    capacity: "8,000-9,000 lb",
    bestFor: "Vertical parking for collections",
    detail: "A space-saving system for stacking three vehicles in one bay.",
    image: "/assets/product-triple-stacker.png",
    handle: "4-post-tripple-stacker-3-car-lift",
    minHeight: 15,
    maxWeight: 9000,
    minWidth: 11,
    type: "4-post",
  },
];

const useCaseOptions = [
  ["parking", "Parking and storage"],
  ["service", "Service work"],
  ["service-heavy", "Heavy service"],
  ["collection", "Stack cars"],
];

const stats = [
  ["Free freight", "Included on qualifying lift orders"],
  ["36-month warranty", "Long-term coverage for peace of mind"],
  ["Financing", "Options from about $69/mo"],
  ["Expert help", "Call Oasis before you order"],
];

const finderConfidence = [
  ["truck", "Free freight options", "Available on qualifying lift orders"],
  ["finance", "Financing available", "Ask about monthly payment options"],
  ["call", "Expert fit help", "Talk through height, width, and install"],
  ["warranty", "Home garage friendly", "Practical choices for real garages"],
];

const shopBenefits = [
  ["finance", "Financing shown", "Monthly estimates on each lift"],
  ["truck", "Freight guidance", "Know delivery details before checkout"],
  ["warranty", "Secure checkout", "Buy online or request expert help"],
];

const process = [
  {
    title: "Measure the bay",
    text: "Confirm ceiling height, concrete, door clearance, vehicle height, and usable width.",
  },
  {
    title: "Match the lift",
    text: "Choose 2-post for service access, 4-post for storage, or a stacker for collections.",
  },
  {
    title: "Plan freight delivery",
    text: "Know what arrives, how it unloads, and what equipment is needed on delivery day.",
  },
  {
    title: "Install with confidence",
    text: "Review anchors, power, ramps, accessories, and final fit before the lift goes up.",
  },
];

const faqs = [
  {
    q: "Should I choose a 2-post or 4-post lift?",
    a: "Choose a 2-post lift when service access matters most. Choose a 4-post lift when parking, storage, and easier drive-on use matter most.",
  },
  {
    q: "What should I measure before ordering?",
    a: "Measure ceiling height, slab thickness, garage door travel, bay width, vehicle wheelbase, vehicle height, and vehicle weight.",
  },
  {
    q: "Can I talk to someone before checkout?",
    a: `Yes. Call ${phone} and confirm the right starting point before placing an equipment order.`,
  },
  {
    q: "Where is Oasis Car Lifts located?",
    a: `Oasis Car Lifts is located at ${businessAddress.street}, ${businessAddress.cityStateZip}.`,
  },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getProductUrl(handle) {
  return `/products/${handle}`;
}

function getMonthlyPayment(product) {
  return product.monthly ?? Math.floor(product.price / 36);
}

const cartStorageKey = "oasis-cart-v1";

function readCart() {
  if (typeof window === "undefined") return [];
  try {
    const stored = JSON.parse(window.localStorage.getItem(cartStorageKey) || "[]");
    return Array.isArray(stored)
      ? stored
          .filter((item) => getServerCartProduct(item.id) && Number.isInteger(item.quantity) && item.quantity > 0)
          .map((item) => ({ product: getServerCartProduct(item.id), quantity: Math.min(4, item.quantity) }))
      : [];
  } catch {
    return [];
  }
}

function getServerCartProduct(productId) {
  return products.find((product) => product.id === productId) ?? null;
}

function isProductRoute() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.location.pathname.startsWith("/products/");
}

function isCampaignRoute() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.location.pathname === campaignPath || window.location.pathname === `${campaignPath}/`;
}

function isOrderSuccessRoute() {
  if (typeof window === "undefined") return false;
  return window.location.pathname === "/order-success" || window.location.pathname === "/order-success/";
}

function getCurrentPolicy() {
  if (typeof window === "undefined") {
    return null;
  }

  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return policyPages[path] ? { ...policyPages[path], path } : null;
}

function isPolicyRoute() {
  return Boolean(getCurrentPolicy());
}

function getSectionHref(sectionId) {
  return isProductRoute() || isCampaignRoute() || isPolicyRoute() ? `/#${sectionId}` : `#${sectionId}`;
}

function getCurrentProduct() {
  if (typeof window === "undefined") {
    return null;
  }

  const match = window.location.pathname.match(/^\/products\/([^/]+)/);
  if (!match) {
    return null;
  }

  const handle = decodeURIComponent(match[1]);
  return products.find((product) => product.handle === handle) ?? null;
}

function setMeta(name, content, attribute = "name") {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", url);
}

function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const eventPayload = { event: eventName, ...params };
  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(eventPayload);
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }

    if (import.meta.env.DEV) {
      document.documentElement.setAttribute("data-last-oasis-event", eventName);
    }

    window.dispatchEvent(new CustomEvent("oasis:analytics", { detail: eventPayload }));
  } catch {
    // Analytics must never block calls, quote requests, or navigation.
  }
}

function trackGoogleAdsQuoteConversion() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  try {
    window.gtag("event", "conversion", {
      send_to: "AW-18357027696/oZsSCKvbveccEPCGqLFE",
      value: 1,
      currency: "USD",
    });
  } catch {
    // Conversion tracking must never interfere with a successful quote request.
  }
}

function getRecommendation({ useCase, ceiling, weight, width }) {
  const scoredProducts = products.map((product) => {
    let score = 0;
    const fitsHeight = ceiling >= product.minHeight;
    const fitsWidth = width >= product.minWidth;
    const fitsWeight = weight <= product.maxWeight;

    score += fitsHeight ? 32 : -95;
    score += fitsWidth ? 32 : -95;
    score += fitsWeight ? 36 : -105;

    if (useCase === "parking") {
      score += product.type === "4-post" ? 52 : -20;
      score += product.id === "xl-4post" && width >= 11 ? 24 : 0;
    }

    if (useCase === "service") {
      score += product.type === "2-post" ? 58 : -24;
      score += product.id === "base-plate-2post" && ceiling < 10.5 ? 28 : 0;
      score += product.id === "clear-floor-2post" && ceiling >= 11.5 ? 28 : 0;
    }

    if (useCase === "service-heavy") {
      score += product.id === "clear-floor-2post" ? 90 : -30;
      score += product.type === "2-post" ? 26 : 0;
    }

    if (useCase === "collection") {
      score += product.id === "triple-stacker" && ceiling >= 15 && width >= 11 ? 120 : 0;
      score += product.id === "triple-stacker" && (ceiling < 15 || width < 11) ? -45 : 0;
      score += product.type === "4-post" ? 54 : -20;
    }

    score -= product.price / 50000;

    return { product, score };
  });

  return scoredProducts.sort((a, b) => b.score - a.score)[0].product;
}

function buildQuoteMessage(form, productInterest = null) {
  const lines = [
    "New Oasis Car Lifts quote request",
    "",
    "Customer",
    `Name: ${form.name || "Not provided"}`,
    `Phone: ${form.phone || "Not provided"}`,
    `ZIP code: ${form.zip || "Not provided"}`,
  ];

  if (productInterest) {
    lines.push("", "Product interest", productInterest.name);
  }

  return [
    ...lines,
    "",
    "Notes",
    form.notes || "None",
  ].join("\n");
}

function Icon({ name }) {
  const paths = {
    truck: (
      <>
        <path d="M3 7h10v8H3z" />
        <path d="M13 10h4l3 3v2h-7z" />
        <path d="M6 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M17 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </>
    ),
    warranty: (
      <>
        <path d="M12 3 5 6v5c0 4.5 3 7.5 7 10 4-2.5 7-5.5 7-10V6z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    finance: (
      <>
        <path d="M4 7h16v10H4z" />
        <path d="M4 10h16" />
        <path d="M8 14h3" />
      </>
    ),
    wrench: (
      <>
        <path d="m14 7 3-3 3 3-3 3" />
        <path d="M16 8 7 17" />
        <path d="m5 15 4 4" />
      </>
    ),
    tag: (
      <>
        <path d="M20 13 13 20 4 11V4h7l9 9Z" />
        <path d="M7.5 7.5h.01" />
      </>
    ),
    fire: (
      <>
        <path d="M12 21c3.5 0 6-2.3 6-5.7 0-2.4-1.2-4.1-3.4-6.2-.2 1.7-.9 2.8-2 3.7.2-3-1.2-5.3-4.1-8.1.4 3.6-2.5 5.9-2.5 9.9C6 18.4 8.5 21 12 21Z" />
        <path d="M10.5 18.8c-1.1-1.2-.8-2.9.8-4.8.1 1.2.7 2.1 1.8 2.9.5-.7.8-1.5.7-2.5 1.2 1 1.9 2.2 1.9 3.5 0 1.9-1.5 3.1-3.4 3.1-.7 0-1.3-.1-1.8-.2Z" />
      </>
    ),
    building: (
      <>
        <path d="M4 21V8l8-5 8 5v13" />
        <path d="M9 21v-6h6v6" />
        <path d="M8 10h.01" />
        <path d="M12 10h.01" />
        <path d="M16 10h.01" />
        <path d="M8 14h.01" />
        <path d="M16 14h.01" />
      </>
    ),
    gauge: (
      <>
        <path d="M4 14a8 8 0 1 1 16 0" />
        <path d="M12 14l4-5" />
        <path d="M7 14h.01" />
        <path d="M17 14h.01" />
      </>
    ),
    users: (
      <>
        <path d="M16 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <path d="M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M21 20v-2a4 4 0 0 0-3-3.9" />
        <path d="M16 4.2a3 3 0 0 1 0 5.6" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 16v-4" />
        <path d="M12 16V8" />
        <path d="M16 16v-6" />
      </>
    ),
    arrowLeft: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    arrowRight: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    call: (
      <>
        <path d="M7 4h4l1 5-3 1c1.2 2.5 2.8 4.1 5 5l1-3 5 1v4c0 1-1 2-2 2C10.5 19 5 13.5 5 6c0-1 1-2 2-2Z" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2.1 9.1a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 1.9-1.4L21 7H6" />
        <circle cx="9" cy="19" r="1.5" />
        <circle cx="18" cy="19" r="1.5" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
}

function Header({ cartCount, onCartOpen }) {
  return (
    <>
      <div className="top-bar">
        <span>Free freight</span>
        <a href={phoneHref} onClick={() => trackEvent("phone_click", { location: "top_bar" })}>
          {phone}
        </a>
      </div>
      <header className="site-header">
      <a className="brand" href={getSectionHref("top")} aria-label="Oasis Car Lifts home">
        <img src="/assets/oasis-logo-white.png" alt="Oasis Car Lifts" />
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href={getSectionHref("top")}>Home</a>
        <a href={getSectionHref("lifts")}>Shop</a>
        <a href={getSectionHref("finder")}>Lift finder</a>
        <a href={getSectionHref("install")}>Install</a>
      </nav>
      <div className="header-actions">
        <a
          className="phone-link"
          href={phoneHref}
          onClick={() => trackEvent("phone_click", { location: "header" })}
        >
          {phone}
        </a>
        <button className="header-cart" type="button" onClick={onCartOpen} aria-label={`Open cart with ${cartCount} items`} title="Shopping cart">
          <Icon name="cart" />
          <span>{cartCount}</span>
        </button>
      </div>
      </header>
    </>
  );
}

function LegacyHero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="live-marker">
          <span></span>
          Live
        </div>
        <h1>
          Built Heavy.
          <span>Backed for Life.</span>
        </h1>
        <p>
          2-post and 4-post lifts engineered for home garage enthusiasts.
          36-month warranty. Free freight. From $69/mo.
        </p>
        <div className="hero-actions">
          <a className="button" href="#finder">
            Find my lift
          </a>
          <a className="button button-secondary" href={phoneHref}>
            Talk to expert
          </a>
        </div>
        <div className="hero-proof" aria-label="Oasis proof points">
          <span>★★★★★ 4.8 verified buyers</span>
          <span>All certified</span>
          <span>Free freight</span>
        </div>
      </div>
      <div className="hero-visual" aria-label="4-post car lift in a garage">
        <img src="/assets/hero-lift-premium.webp" alt="Cars on an Oasis 4-post lift" />
        <div className="sale-badge">
          <span>Save up to</span>
          <strong>$400</strong>
          <span>This week</span>
        </div>
        <div className="spec-panel">
          <span>Popular setup</span>
          <strong>9,000 lb 4-post lift</strong>
          <dl>
            <div>
              <dt>Clearance</dt>
              <dd>78 in</dd>
            </div>
            <div>
              <dt>Warranty</dt>
              <dd>36 mo</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function TypewriterHeroTitle() {
  const fullText = "Lift your space.\nElevate your cars.";
  const [typedText, setTypedText] = useState("");
  const [isDoneTyping, setIsDoneTyping] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setTypedText(fullText);
      setIsDoneTyping(true);
      return undefined;
    }

    setTypedText("");
    setIsDoneTyping(false);
    let index = 0;
    let intervalId;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setTypedText(fullText.slice(0, index));

        if (index >= fullText.length) {
          window.clearInterval(intervalId);
          setIsDoneTyping(true);
        }
      }, 46);
    }, 220);

    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, []);

  const [firstLine = "", secondLine = ""] = typedText.split("\n");
  const cursorOnFirstLine = !typedText.includes("\n");

  return (
    <h1 className="hero-title hero-title-typing" aria-label={fullText.replace("\n", " ")}>
      <span className="hero-title-measure" aria-hidden="true">
        <span>Lift your space.</span>
        <span>Elevate your cars.</span>
      </span>
      <span className="hero-type-lines" aria-hidden="true">
        <span className="hero-type-line">
          <span className="hero-type-text">{firstLine}</span>
          {cursorOnFirstLine && !isDoneTyping && <span className="hero-type-cursor"></span>}
        </span>
        <span className="hero-type-line">
          <span className="hero-type-text">{secondLine}</span>
          {!cursorOnFirstLine && !isDoneTyping && <span className="hero-type-cursor"></span>}
        </span>
      </span>
    </h1>
  );
}

function Hero() {
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-light-sweep" aria-hidden="true"></div>
        <div className="hero-red-beam" aria-hidden="true"></div>
        <div className="hero-shell">
          <div className="hero-copy">
            <div className="hero-kicker" aria-label="Oasis design principles">
              <span>Design</span>
              <b aria-hidden="true"></b>
              <span>Protect</span>
              <b aria-hidden="true"></b>
              <span>Elevate</span>
            </div>
            <TypewriterHeroTitle />
            <div className="hero-rule" aria-hidden="true"></div>
            <p>
              Premium car lift solutions that combine elegant design, superior
              protection, and lasting quality.
            </p>
            <div className="hero-actions">
              <a
                className="button"
                href={shopUrl}
                onClick={() => trackEvent("shop_click", { location: "hero" })}
              >
                Explore lifts
              </a>
              <a
                className="button button-secondary"
                href="#quote"
                onClick={() => trackEvent("quote_start", { location: "hero" })}
              >
                Get a quote
              </a>
            </div>
            <div className="hero-benefits" aria-label="Oasis purchase benefits">
              <article>
                <Icon name="warranty" />
                <strong>Premium protection</strong>
              </article>
              <article>
                <Icon name="finance" />
                <strong>Space-saving design</strong>
              </article>
              <article>
                <Icon name="wrench" />
                <strong>Built to last</strong>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TrustBar() {
  const iconNames = ["truck", "warranty", "finance", "call"];

  return (
    <section className="trust-bar" aria-label="Oasis purchase benefits">
      {stats.map(([title, text], index) => (
        <article key={title} className="trust-item">
          <Icon name={iconNames[index]} />
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function HeroTrustSlider() {
  const sliderItems = [
    "Premium lift support",
    "Free freight options",
    "48-state delivery",
    "Install guidance",
    "Affirm Klarna Shop Pay",
    "Garage fit check",
  ];
  const repeatedItems = [...sliderItems, ...sliderItems];

  return (
    <section className="hero-trust-slider" aria-label="Oasis buyer benefits">
      <p>As trusted by enthusiasts, shops, and collectors nationwide</p>
      <div className="hero-trust-marquee" aria-hidden="true">
        <div className="hero-trust-track">
          {repeatedItems.map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <b></b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampaignQuoteCard() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    zip: "",
    notes: "",
  });
  const [quoteStatus, setQuoteStatus] = useState("");
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);

  const campaignQuoteInterest = useMemo(
    () => ({
      id: "google-campaign",
      name: "Google campaign quote request",
    }),
    [],
  );
  const quoteMessage = useMemo(
    () => buildQuoteMessage(form, campaignQuoteInterest),
    [campaignQuoteInterest, form],
  );

  function updateForm(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleQuoteSubmit(event) {
    event.preventDefault();

    if (isSubmittingQuote) {
      return;
    }

    trackEvent("quote_request_submit", {
      has_notes: Boolean(form.notes.trim()),
      product_id: "google_campaign",
      zip_provided: Boolean(form.zip.trim()),
    });

    setIsSubmittingQuote(true);
    setQuoteStatus("Sending your quote request...");

    try {
      const response = await fetch("/api/quote", {
        body: JSON.stringify({
          ...form,
          productInterest: campaignQuoteInterest,
          sourceUrl: window.location.href,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to send quote request");
      }

      trackEvent("quote_request_sent", {
        product_id: "google_campaign",
      });
      trackGoogleAdsQuoteConversion();
      setQuoteStatus(
        result.id
          ? `Quote request sent. Reference ${result.id.slice(0, 8)}. Oasis will call back soon.`
          : "Quote request sent. Oasis will call back soon.",
      );
    } catch (error) {
      trackEvent("quote_request_error", {
        product_id: "google_campaign",
      });
      setQuoteStatus("The quote request did not send. Please call Oasis or copy the details.");
    } finally {
      setIsSubmittingQuote(false);
    }
  }

  async function handleCopyQuote() {
    if (!navigator.clipboard) {
      setQuoteStatus("Copy is not available in this browser. Use the call button.");
      return;
    }

    await navigator.clipboard.writeText(quoteMessage);
    trackEvent("quote_details_copy", { location: "google_campaign_quote" });
    setQuoteStatus("Quote details copied.");
  }

  return (
    <form className="campaign-quote-card" id="quote" onSubmit={handleQuoteSubmit}>
      <div className="campaign-quote-top">
        <span>Start here</span>
        <strong>Fast quote request</strong>
      </div>
      <div className="campaign-field-grid">
        <label>
          <span>Full name</span>
          <input
            autoComplete="name"
            name="name"
            onChange={updateForm}
            placeholder="Full name"
            required
            type="text"
            value={form.name}
          />
        </label>
        <label>
          <span>Phone number</span>
          <input
            autoComplete="tel"
            name="phone"
            onChange={updateForm}
            placeholder="Best phone number"
            required
            type="tel"
            value={form.phone}
          />
        </label>
        <label>
          <span>ZIP code</span>
          <input
            autoComplete="postal-code"
            inputMode="numeric"
            name="zip"
            onChange={updateForm}
            placeholder="Delivery ZIP"
            required
            type="text"
            value={form.zip}
          />
        </label>
      </div>
      <label className="campaign-notes">
        <span>Notes</span>
        <textarea
          name="notes"
          onChange={updateForm}
          placeholder="What are you lifting? Home garage or shop? Need financing, freight, or install help?"
          rows={4}
          value={form.notes}
        />
      </label>
      <div className="campaign-quote-actions">
        <button className="button" disabled={isSubmittingQuote} type="submit">
          {isSubmittingQuote ? "Sending..." : "Get my quote"}
        </button>
        <button className="button button-secondary" onClick={handleCopyQuote} type="button">
          Copy details
        </button>
      </div>
      <a
        className="campaign-phone-link"
        href={phoneHref}
        onClick={() => trackEvent("phone_click", { location: "google_campaign_quote" })}
      >
        Prefer to talk? Call {phone}
      </a>
      <p className="form-privacy-note">
        By submitting, you agree that Oasis may contact you about this request. See our{" "}
        <a href="/privacy-policy">privacy policy</a>.
      </p>
      {quoteStatus ? <p className="campaign-quote-status">{quoteStatus}</p> : null}
    </form>
  );
}

function CampaignLandingPage() {
  const campaignProducts = products.filter((product) =>
    ["base-plate-2post", "clear-floor-2post", "xl-4post"].includes(product.id),
  );

  return (
    <div className="campaign-page" id="top">
      <section className="campaign-hero" aria-labelledby="campaign-title">
        <div className="campaign-hero-media" aria-hidden="true">
          <img src="/assets/quote-to-process-banner.png" alt="" />
        </div>
        <div className="campaign-hero-copy">
          <div className="campaign-hero-kicker">
            <span className="campaign-eyebrow">Oasis lift concierge</span>
            <span className="campaign-availability">Real expert guidance</span>
          </div>
          <h1 id="campaign-title">
            <span>Your garage.</span>
            <span>The right lift.</span>
            <span>One clear quote.</span>
          </h1>
          <p>
            Tell us what you are lifting and where it is going. An Oasis specialist
            will help confirm fit, freight, financing, and installation before you buy.
          </p>
          <div className="campaign-hero-actions">
            <a
              className="button"
              href="#quote"
              onClick={() => trackEvent("quote_start", { location: "google_campaign_hero" })}
            >
              Start quote
            </a>
            <a
              className="button button-secondary"
              href={phoneHref}
              onClick={() => trackEvent("phone_click", { location: "google_campaign_hero" })}
            >
              Call Oasis
            </a>
          </div>
          <p className="campaign-response-note">
            <span aria-hidden="true" /> No pressure. No guesswork. Just a practical starting point.
          </p>
          <div className="campaign-proof-grid" aria-label="Why buyers request a quote">
            <article>
              <Icon name="finance" />
              <div>
                <strong>Flexible financing</strong>
                <span>Explore monthly payment options.</span>
              </div>
            </article>
            <article>
              <Icon name="truck" />
              <div>
                <strong>Freight planned</strong>
                <span>Know the delivery details early.</span>
              </div>
            </article>
            <article>
              <Icon name="warranty" />
              <div>
                <strong>Garage fit check</strong>
                <span>Confirm space and vehicle needs.</span>
              </div>
            </article>
          </div>
        </div>
        <CampaignQuoteCard />
      </section>

      <section className="campaign-strip" aria-label="Oasis quote advantages">
        <article>
          <Icon name="call" />
          <span>Real phone support</span>
        </article>
        <article>
          <Icon name="finance" />
          <span>Affirm, Klarna, and Shop Pay options</span>
        </article>
        <article>
          <Icon name="wrench" />
          <span>Install planning before checkout</span>
        </article>
        <article>
          <Icon name="truck" />
          <span>Freight options available</span>
        </article>
      </section>

      <section className="campaign-testimonial" aria-labelledby="campaign-testimonial-title">
        <div className="campaign-testimonial-copy">
          <span className="campaign-eyebrow">Customer testimonial</span>
          <h2 id="campaign-testimonial-title">A real garage. A real lift decision.</h2>
          <p>
            Hear directly from an Oasis customer, then send us your garage details.
            We will help you compare fit, freight, financing, and installation before
            you commit.
          </p>
          <div className="campaign-testimonial-points" aria-label="Oasis customer support">
            <span><Icon name="warranty" /> Fit guidance before ordering</span>
            <span><Icon name="call" /> A real person to call</span>
            <span><Icon name="truck" /> Freight and install planning</span>
          </div>
          <a
            className="campaign-text-link"
            href="#quote"
            onClick={() => trackEvent("quote_start", { location: "google_campaign_testimonial" })}
          >
            Start my quote <span aria-hidden="true">&#8594;</span>
          </a>
        </div>
        <div className="campaign-testimonial-video">
          <div className="campaign-video-label">
            <span>Customer story</span>
            <strong>00:22</strong>
          </div>
          <video
            aria-label="Oasis Car Lifts customer testimonial"
            controls
            onPlay={() => trackEvent("testimonial_play", { location: "google_campaign" })}
            playsInline
            poster="/assets/customer-testimonial-poster.jpg"
            preload="metadata"
          >
            <source src="/assets/customer-testimonial.mp4" type="video/mp4" />
            Your browser does not support this testimonial video.
          </video>
        </div>
      </section>

      <section className="campaign-product-section" aria-labelledby="campaign-products-title">
        <div>
          <span className="campaign-eyebrow">Popular starting points</span>
          <h2 id="campaign-products-title">Quote the lift that fits your garage.</h2>
        </div>
        <div className="campaign-product-grid">
          {campaignProducts.map((product) => (
            <a
              className="campaign-product-card"
              href={getProductUrl(product.handle)}
              key={product.id}
              onClick={() => trackEvent("product_click", { location: "google_campaign_products", product_id: product.id })}
            >
              <img src={product.image} alt={product.name} />
              <div>
                <span>{product.capacity} capacity</span>
                <h3>{product.name}</h3>
                <p>{product.bestFor}</p>
                <strong>{formatCurrency(product.price)}</strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="campaign-bottom-cta">
        <div>
          <span className="campaign-eyebrow">Ready for the next step?</span>
          <h2>Send the quote request and Oasis will call back.</h2>
        </div>
        <a
          className="button"
          href="#quote"
          onClick={() => trackEvent("quote_start", { location: "google_campaign_bottom" })}
        >
          Get my quote
        </a>
      </section>
    </div>
  );
}

function LiftFinder() {
  const [useCase, setUseCase] = useState("parking");
  const [ceiling, setCeiling] = useState(10);
  const [weight, setWeight] = useState(4500);
  const [width, setWidth] = useState(10.5);

  const recommended = useMemo(
    () => getRecommendation({ useCase, ceiling, weight, width }),
    [useCase, ceiling, weight, width],
  );

  const clearanceIssues = [
    ceiling < recommended.minHeight
      ? `Plan for at least ${recommended.minHeight} ft of ceiling height.`
      : null,
    width < recommended.minWidth
      ? `Plan for about ${recommended.minWidth} ft of usable bay width.`
      : null,
    weight > recommended.maxWeight
      ? `Your vehicle weight is above this lift's listed starting capacity.`
      : null,
  ].filter(Boolean);

  return (
    <section className="section finder" id="finder">
      <div className="finder-decor" aria-hidden="true">
        <span className="finder-decor-icon decor-finance">
          <Icon name="finance" />
        </span>
        <span className="finder-decor-icon decor-wrench">
          <Icon name="wrench" />
        </span>
        <span className="finder-decor-icon decor-truck">
          <Icon name="truck" />
        </span>
        <span className="finder-decor-icon decor-shield">
          <Icon name="warranty" />
        </span>
      </div>
      <div className="section-heading finder-heading">
        <div className="finder-intro-copy">
          <span className="finder-eyebrow">Garage fit check</span>
          <h2>Build your garage profile</h2>
          <p>Set your use, ceiling height, vehicle weight, and bay width. Oasis will show a practical starting lift before you shop.</p>
        </div>
        <div className="finder-step-panel" aria-label="Garage fit check steps">
          <span>
            <b>01</b>
            Use
          </span>
          <span>
            <b>02</b>
            Measure
          </span>
          <span>
            <b>03</b>
            Match
          </span>
        </div>
        <div className="finder-live-panel">
          <span>Current match</span>
          <strong>{recommended.shortName}</strong>
          <p>{recommended.capacity} capacity · from ${recommended.monthly}/mo</p>
        </div>
      </div>
      <div className="finder-grid">
        <form className="finder-controls">
          <div className="finder-control-header">
            <span>Garage profile</span>
            <strong>Live fit check</strong>
          </div>
          <fieldset>
            <legend>Primary use</legend>
            <div className="segmented">
              {useCaseOptions.map(([value, label]) => (
                <label key={value}>
                  <input
                    checked={useCase === value}
                    name="use-case"
                    onChange={() => setUseCase(value)}
                    type="radio"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <RangeControl
            label="Ceiling height"
            max={16}
            min={8}
            step={0.5}
            suffix="ft"
            value={ceiling}
            onChange={setCeiling}
          />
          <RangeControl
            label="Vehicle weight"
            max={12000}
            min={2500}
            step={500}
            suffix="lb"
            value={weight}
            onChange={setWeight}
          />
          <RangeControl
            label="Usable bay width"
            max={14}
            min={8}
            step={0.5}
            suffix="ft"
            value={width}
            onChange={setWidth}
          />
          <div className="finder-readout" aria-label="Current fit inputs">
            <span>
              <strong>{ceiling.toLocaleString()} ft</strong>
              Ceiling
            </span>
            <span>
              <strong>{weight.toLocaleString()} lb</strong>
              Vehicle weight
            </span>
            <span>
              <strong>{width.toLocaleString()} ft</strong>
              Bay width
            </span>
          </div>
          <article className="measurement-checklist" aria-label="Measurements to confirm before calling">
            <div className="measurement-checklist-header">
              <span>Measure before you call</span>
              <strong>4 quick checks</strong>
            </div>
            <div className="measurement-items">
              <span>
                <Icon name="gauge" />
                Floor to lowest obstruction
              </span>
              <span>
                <Icon name="wrench" />
                Clear bay width
              </span>
              <span>
                <Icon name="truck" />
                Vehicle weight
              </span>
              <span>
                <Icon name="warranty" />
                Slab and door clearance
              </span>
            </div>
          </article>
          <article className="finder-options-panel" aria-label="Freight and financing options">
            <div className="finder-options-copy">
              <span>Next step</span>
              <strong>Get freight and financing options.</strong>
              <p>Oasis can confirm delivery access, freight details, and monthly payment choices before you order.</p>
            </div>
            <div className="finder-options-list">
              <span>
                <Icon name="truck" />
                Freight guidance
              </span>
              <span>
                <Icon name="finance" />
                Payment options
              </span>
            </div>
          </article>
        </form>
        <article className="recommendation">
          <div className="recommendation-badge">
            <span>Best match</span>
            <strong>{recommended.type}</strong>
          </div>
          <div>
            <span className="label">Recommended starting point</span>
            <h3>{recommended.name}</h3>
            <p>{recommended.bestFor}</p>
          </div>
          <img src={recommended.image} alt={recommended.name} />
          <div className="recommendation-meta">
            <span>{recommended.capacity}</span>
            <span>{formatCurrency(recommended.price)}</span>
            <span>From ${getMonthlyPayment(recommended)}/mo</span>
          </div>
          {clearanceIssues.length > 0 ? (
            <div className="fit-note warning">
              <strong>Confirm before checkout</strong>
              <ul>
                {clearanceIssues.map((issue) => (
                  <li key={issue}>{issue}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="fit-note">
              <strong>Good starting fit</strong>
              <p>Still confirm final dimensions, slab requirements, and delivery access with Oasis.</p>
            </div>
          )}
          <div className="card-actions">
            <a
              className="button"
              href={getProductUrl(recommended.handle)}
              onClick={() =>
                trackEvent("product_click", {
                  location: "finder_recommendation",
                  product_id: recommended.id,
                })
              }
            >
              View product
            </a>
            <a
              className="text-link"
              href={phoneHref}
              onClick={() => trackEvent("phone_click", { location: "finder_recommendation" })}
            >
              Call {phone}
            </a>
          </div>
        </article>
      </div>
      <div className="finder-support" aria-label="Oasis fit confirmation support">
        <div className="finder-support-copy">
          <span>Before checkout</span>
          <strong>Oasis helps confirm the details that matter.</strong>
        </div>
        <div className="finder-support-items">
          <span>
            <Icon name="gauge" />
            Ceiling and bay clearance
          </span>
          <span>
            <Icon name="truck" />
            Freight and delivery access
          </span>
          <span>
            <Icon name="finance" />
            Financing options if needed
          </span>
        </div>
      </div>
      <div className="finder-confidence" aria-label="Garage fit checker benefits">
        {finderConfidence.map(([icon, title, text]) => (
          <article key={title}>
            <Icon name={icon} />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function JobFinder() {
  const [openRecommendation, setOpenRecommendation] = useState(null);
  const liftJobs = [
    { icon: "warranty", title: "Store Two Cars", description: "Create a second parking space without expanding your garage.", category: "Parking & storage", product: "triple-stacker" },
    { icon: "wrench", title: "Work Under My Car", description: "Get clear access for maintenance, repairs, and detailing.", category: "2-post service", product: "base-plate-2post" },
    { icon: "truck", title: "Store & Service Vehicles", description: "Balance everyday parking with flexible service access.", category: "4-post versatility", product: "xl-4post" },
    { icon: "building", title: "Equip My Auto Shop", description: "Build a dependable bay for frequent professional use.", category: "Commercial shop", product: "clear-floor-2post" },
  ];

  return (
    <section className="section job-finder" id="finder" aria-labelledby="job-finder-title">
      <header className="job-finder-heading">
        <span>Start with your goal</span>
        <h2 id="job-finder-title">What are you trying to do?</h2>
        <p>Choose the job first. We will point you toward the lift category that fits it best.</p>
      </header>
      <div className="job-card-grid">
        {liftJobs.map((job) => {
          const recommendedLift = products.find((product) => product.id === job.product);
          const isOpen = openRecommendation === job.product;

          return (
            <article className={`job-card${isOpen ? " is-revealed" : ""}`} key={job.title}>
              {isOpen && recommendedLift ? (
                <div className="job-product-view">
                  <div className="job-product-label">
                    <div>
                      <span>Recommended match</span>
                      <strong>{job.title}</strong>
                    </div>
                    <button className="job-card-back" type="button" onClick={() => setOpenRecommendation(null)}>
                      <Icon name="arrowLeft" />
                      <span>Back</span>
                    </button>
                  </div>
                  <a
                    className="job-recommendation-image"
                    href={getProductUrl(recommendedLift.handle)}
                    aria-label={`View ${recommendedLift.name} product page`}
                    onClick={() => trackEvent("product_click", { location: "job_recommendation", product_id: recommendedLift.id })}
                  >
                    <img src={recommendedLift.image} alt={recommendedLift.name} />
                  </a>
                  <div className="job-product-details">
                    <h3>{recommendedLift.name}</h3>
                    <div className="job-product-meta">
                      <span>
                        <small>Capacity</small>
                        <strong>{recommendedLift.capacity}</strong>
                      </span>
                      <span>
                        <small>Starting at</small>
                        <strong>{formatCurrency(recommendedLift.price)}</strong>
                      </span>
                    </div>
                  </div>
                  <a className="job-product-link" href={getProductUrl(recommendedLift.handle)}>
                    View Product
                    <Icon name="arrowRight" />
                  </a>
                </div>
              ) : (
                <>
                  <div className="job-card-topline">
                    <span>{job.category}</span>
                    <span>Recommended by need</span>
                  </div>
                  <div className="job-card-visual" aria-hidden="true">
                    <span className="job-card-icon"><Icon name={job.icon} /></span>
                    <span className="job-card-visual-label">Find my fit</span>
                  </div>
                  <div className="job-card-copy">
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                  </div>
                  <button
                    className="job-card-link"
                    type="button"
                    aria-expanded="false"
                    onClick={() => {
                      setOpenRecommendation(job.product);
                      trackEvent("lift_job_click", { job: job.title, product_id: job.product });
                    }}
                  >
                    See Recommended Lift
                    <Icon name="arrowRight" />
                  </button>
                </>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RangeControl({ label, min, max, step, value, suffix, onChange }) {
  const formatRangeEndpoint = (number) => `${number.toLocaleString()} ${suffix}`;
  const progress = `${Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))}%`;

  return (
    <label className="range-control" style={{ "--range-progress": progress }}>
      <span>
        {label}
        <strong>
          {value.toLocaleString()} {suffix}
        </strong>
      </span>
      <input
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
      <div className="range-endpoints" aria-hidden="true">
        <span>{formatRangeEndpoint(min)}</span>
        <span>{formatRangeEndpoint(max)}</span>
      </div>
    </label>
  );
}

function ProductSection({ onAddToCart }) {
  return (
    <section className="section products-section" id="lifts">
      <div className="section-heading split">
        <div>
          <h2>Shop by the job the lift needs to do</h2>
          <p>
            Compare garage-ready lifts by capacity, use case, starting price,
            and monthly payment, then add the right lift to your cart.
          </p>
        </div>
        <a
          className="button button-secondary"
          href={shopUrl}
          onClick={() => trackEvent("shop_click", { location: "products_header" })}
        >
          View all lifts
        </a>
      </div>
      <div className="shop-benefits" aria-label="Shop support benefits">
        {shopBenefits.map(([icon, title, text]) => (
          <article key={title}>
            <Icon name={icon} />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" data-product={product.id} id={product.id} key={product.id}>
            <a
              className="product-image"
              href={getProductUrl(product.handle)}
              onClick={() =>
                trackEvent("product_click", {
                  location: "product_image",
                  product_id: product.id,
                })
              }
            >
              <span className="product-type-badge">{product.type}</span>
              <img src={product.image} alt={product.name} />
            </a>
            <div className="product-body">
              <span className="product-capacity">{product.capacity} capacity</span>
              <h3>{product.name}</h3>
              <p>{product.bestFor}</p>
              <div className="product-specs" aria-label={`${product.name} quick specs`}>
                <span>
                  <strong>{product.minHeight} ft</strong>
                  Min ceiling
                </span>
                <span>
                  <strong>{product.minWidth} ft</strong>
                  Bay width
                </span>
              </div>
              <div className="product-financing">
                Financing from <strong>${getMonthlyPayment(product)}/mo</strong>
              </div>
              <div className="product-bottom">
                <strong>{formatCurrency(product.price)}</strong>
                <div className="product-links">
                  <button className="product-add-button" type="button" onClick={() => onAddToCart(product)}>
                    Add to cart
                  </button>
                  <a
                    className="text-link"
                    href={getProductUrl(product.handle)}
                    onClick={() =>
                      trackEvent("product_click", {
                        location: "product_details_link",
                        product_id: product.id,
                      })
                    }
                  >
                    Details
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ShopBanner() {
  return (
    <section className="shop-banner-section" aria-label="Oasis premium garage lift installations">
      <img src="/assets/shop-lifts-garage-banner.png" alt="Luxury garage with a two-car Oasis parking lift" />
      <div className="shop-banner-copy">
        <span>Premium garage lift solutions</span>
        <h2>Built for serious garages</h2>
        <p>Space-saving 2-post and 4-post lift setups for home and commercial garages.</p>
        <a
          className="button"
          href={shopUrl}
          onClick={() => trackEvent("shop_click", { location: "shop_banner" })}
        >
          Shop lifts
        </a>
      </div>
    </section>
  );
}

function getProductHighlights(product) {
  const baseHighlights = [
    "Confirm garage fit before ordering",
    "Financing options available",
    "Freight and delivery help available",
  ];

  if (product.type === "4-post") {
    return [
      "Drive-on setup for storage and parking",
      "Great for home garages and collectors",
      ...baseHighlights,
    ];
  }

  return [
    "Open access for service work",
    "Built for maintenance-focused bays",
    ...baseHighlights,
  ];
}

function ProductPage({ product, onAddToCart }) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const relatedProducts = products.filter((item) => item.id !== product.id).slice(0, 3);
  const productHighlights = getProductHighlights(product);

  return (
    <article className="product-page" id="top">
      <section className="product-page-hero" aria-labelledby="product-title">
        <div className="product-page-copy">
          <nav className="product-breadcrumb" aria-label="Product breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/#lifts">Lifts</a>
            <span>/</span>
            <strong>{product.shortName}</strong>
          </nav>
          <span className="product-page-type">{product.type} Oasis lift</span>
          <h1 id="product-title">{product.name}</h1>
          <p>{product.bestFor}. {product.detail}</p>
          <div className="product-page-price">
            <span>Starting at</span>
            <strong>{formatCurrency(product.price)}</strong>
            <em>Financing from about ${getMonthlyPayment(product)}/mo</em>
          </div>
          <div className="product-page-actions">
            <button
              className="button"
              type="button"
              onClick={() => onAddToCart(product)}
            >
              Add to cart
            </button>
            <a
              className="button button-secondary"
              href={phoneHref}
              onClick={() => trackEvent("phone_click", { location: "product_page_hero" })}
            >
              Call Oasis
            </a>
          </div>
        </div>
        <div className="product-page-visual">
          <span>{product.capacity} capacity</span>
          <button
            className="product-zoom-trigger"
            onClick={() => setIsZoomOpen(true)}
            type="button"
            aria-label={`Zoom image of ${product.name}`}
          >
            <img src={product.image} alt={product.name} />
            <em>Click to zoom</em>
          </button>
        </div>
      </section>

      {isZoomOpen ? (
        <div
          className="product-zoom-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} enlarged image`}
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="product-zoom-frame" onClick={(event) => event.stopPropagation()}>
            <button
              className="product-zoom-close"
              onClick={() => setIsZoomOpen(false)}
              type="button"
            >
              Close
            </button>
            <img src={product.image} alt={product.name} />
            <span>{product.name}</span>
          </div>
        </div>
      ) : null}

      <section className="product-page-details" aria-label={`${product.name} details`}>
        <div className="product-spec-strip">
          <article>
            <span>Capacity</span>
            <strong>{product.capacity}</strong>
          </article>
          <article>
            <span>Minimum ceiling</span>
            <strong>{product.minHeight} ft</strong>
          </article>
          <article>
            <span>Usable bay width</span>
            <strong>{product.minWidth} ft</strong>
          </article>
          <article>
            <span>Lift style</span>
            <strong>{product.type}</strong>
          </article>
        </div>

        <div className="product-info-grid">
          <section className="product-info-panel">
            <span className="product-panel-kicker">Why buyers choose it</span>
            <h2>Built for the garage job that matters most.</h2>
            <p>
              This page gives shoppers the fast details they need before calling,
              requesting a quote, or confirming delivery and install requirements.
            </p>
            <ul className="product-check-list">
              {productHighlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>

          <aside className="product-fit-panel">
            <div className="product-fit-top">
              <span>Confirm before checkout</span>
              <strong>{product.shortName}</strong>
            </div>
            <dl>
              <div>
                <dt>Best use</dt>
                <dd>{product.bestFor}</dd>
              </div>
              <div>
                <dt>Vehicle weight</dt>
                <dd>Up to {product.capacity}</dd>
              </div>
              <div>
                <dt>Fit check</dt>
                <dd>Measure ceiling, bay width, slab, door travel, and delivery access.</dd>
              </div>
              <div>
                <dt>Financing</dt>
                <dd>Monthly options available. Final terms subject to approval.</dd>
              </div>
            </dl>
          </aside>
        </div>

        <section className="related-products" aria-label="Related Oasis lifts">
          <div>
            <span className="product-panel-kicker">Compare more lifts</span>
            <h2>Other options to consider</h2>
          </div>
          <div className="related-product-grid">
            {relatedProducts.map((relatedProduct) => (
              <a
                className="related-product-card"
                href={getProductUrl(relatedProduct.handle)}
                key={relatedProduct.id}
                onClick={() =>
                  trackEvent("product_click", {
                    location: "related_products",
                    product_id: relatedProduct.id,
                  })
                }
              >
                <img src={relatedProduct.image} alt={relatedProduct.name} />
                <span>{relatedProduct.capacity}</span>
                <strong>{relatedProduct.name}</strong>
                <em>{formatCurrency(relatedProduct.price)}</em>
              </a>
            ))}
          </div>
        </section>
      </section>
    </article>
  );
}

function PurchasePanel({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [fulfillment, setFulfillment] = useState("shipping");
  const [zip, setZip] = useState("");
  const [addressType, setAddressType] = useState("residential");
  const [hasDock, setHasDock] = useState(false);
  const [installation, setInstallation] = useState(false);
  const [freight, setFreight] = useState(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [showDeliveredForm, setShowDeliveredForm] = useState(false);
  const [deliveredForm, setDeliveredForm] = useState({
    name: "", phone: "", email: "", address1: "", address2: "", city: "", state: "", notes: "",
  });

  const needsManualQuote = quantity > 1 || freight?.status === "manual";
  const freightAmount = fulfillment === "pickup" ? 0 : freight?.status === "known" ? freight.amount / 100 : null;
  const installationAmount = installation && freight?.installationAmount != null ? freight.installationAmount / 100 : 0;
  const estimatedTotal = freightAmount == null ? null : product.price * quantity + freightAmount + installationAmount;

  useEffect(() => {
    setFreight(fulfillment === "pickup" ? { status: "known", amount: 0, installationAmount: null } : null);
    setStatus("");
  }, [fulfillment, zip, addressType, hasDock]);

  async function calculateFreight() {
    setBusy(true);
    setStatus("Checking delivery options...");
    try {
      const response = await fetch("/api/freight-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, fulfillment, zip, addressType, hasDock }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to check freight");
      setFreight(result);
      setStatus(result.status === "known" ? "Delivered price is ready." : "This delivery needs a custom freight quote.");
      return result;
    } catch (error) {
      setStatus(error.message);
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function beginCheckout() {
    if (!freight) {
      await calculateFreight();
      return;
    }
    if (needsManualQuote) {
      setShowDeliveredForm(true);
      return;
    }
    setBusy(true);
    setStatus("Opening secure checkout...");
    trackEvent("begin_checkout", { product_id: product.id, value: estimatedTotal, currency: "USD" });
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity, fulfillment, zip, addressType, hasDock, installation }),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.requiresQuote) setShowDeliveredForm(true);
        throw new Error(result.error || "Unable to start checkout");
      }
      window.location.assign(result.url);
    } catch (error) {
      setStatus(error.message);
      setBusy(false);
    }
  }

  async function submitDeliveredPrice(event) {
    event.preventDefault();
    setBusy(true);
    setStatus("Sending your delivered-price request...");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...deliveredForm, zip, addressType, hasDock, quantity, installation,
          draftType: "delivered_price",
          productInterest: { id: product.id, name: product.name },
          sourceUrl: window.location.href,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send request");
      trackEvent("delivered_price_request_sent", { product_id: product.id, quantity });
      trackGoogleAdsQuoteConversion();
      setStatus("Request sent. Oasis will confirm freight, installation, and final pricing with you.");
      setShowDeliveredForm(false);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="purchase-panel" id="purchase" aria-labelledby="purchase-title">
      <div className="purchase-heading">
        <div><span className="product-panel-kicker">Secure online purchase</span><h2 id="purchase-title">Build your order</h2></div>
        <div className="purchase-price"><span>Lift price</span><strong>{formatCurrency(product.price)}</strong></div>
      </div>
      <div className="purchase-grid">
        <div className="purchase-options">
          <label><span>Quantity</span><select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>{[1, 2, 3, 4].map((number) => <option value={number} key={number}>{number}</option>)}</select></label>
          <fieldset><legend>Delivery method</legend><label><input checked={fulfillment === "shipping"} name="fulfillment" onChange={() => setFulfillment("shipping")} type="radio" /> Freight shipping</label><label><input checked={fulfillment === "pickup"} name="fulfillment" onChange={() => setFulfillment("pickup")} type="radio" /> Local pickup</label></fieldset>
          {fulfillment === "shipping" ? <>
            <label><span>Delivery ZIP</span><input inputMode="numeric" maxLength="5" onChange={(event) => setZip(event.target.value.replace(/\D/g, ""))} placeholder="5-digit ZIP" value={zip} /></label>
            <fieldset><legend>Delivery location</legend><label><input checked={addressType === "residential"} name="addressType" onChange={() => setAddressType("residential")} type="radio" /> Residential</label><label><input checked={addressType === "commercial"} name="addressType" onChange={() => setAddressType("commercial")} type="radio" /> Commercial</label></fieldset>
            <label className="purchase-check"><input checked={hasDock} onChange={(event) => setHasDock(event.target.checked)} type="checkbox" /> Forklift or loading dock available</label>
          </> : null}
          <label className="purchase-check"><input checked={installation} onChange={(event) => setInstallation(event.target.checked)} type="checkbox" /> Include professional installation</label>
          <button className="button button-secondary purchase-calculate" disabled={busy} onClick={calculateFreight} type="button">Check delivered price</button>
        </div>
        <aside className="order-summary">
          <span className="product-panel-kicker">Order summary</span>
          <dl><div><dt>{product.name} x {quantity}</dt><dd>{formatCurrency(product.price * quantity)}</dd></div><div><dt>Freight</dt><dd>{freightAmount == null ? "To be confirmed" : freightAmount === 0 ? "Included" : formatCurrency(freightAmount)}</dd></div><div><dt>Installation</dt><dd>{!installation ? "Not selected" : freight?.installationAmount == null ? "To be confirmed" : formatCurrency(installationAmount)}</dd></div><div className="order-total"><dt>Estimated total</dt><dd>{estimatedTotal == null ? "Get delivered price" : formatCurrency(estimatedTotal)}</dd></div></dl>
          <p>Taxes are shown in secure checkout when applicable. Final freight and installation must be confirmed before payment.</p>
          <button className="button purchase-button" disabled={busy} onClick={beginCheckout} type="button">{!freight ? "Check delivered price" : needsManualQuote ? "Get delivered price" : "Buy now securely"}</button>
          <a className="button button-secondary purchase-quote" href="#quote" onClick={() => trackEvent("quote_start", { location: "purchase_panel", product_id: product.id })}>Get a quote</a>
          <a className="purchase-call" href={phoneHref}>Prefer to talk? {phone}</a>
          {status ? <div className="purchase-status" role="status">{status}</div> : null}
        </aside>
      </div>
      {showDeliveredForm ? <form className="delivered-price-form" onSubmit={submitDeliveredPrice}>
        <div><span className="product-panel-kicker">Custom freight request</span><h3>Get your exact delivered price</h3><p>For multiple units, special access, or installation, Oasis confirms the exact total before you pay.</p></div>
        {[["name", "Full name", "text"], ["phone", "Phone number", "tel"], ["email", "Email", "email"], ["address1", "Delivery address", "text"], ["address2", "Suite / unit (optional)", "text"], ["city", "City", "text"], ["state", "State", "text"]].map(([name, label, type]) => <label key={name}><span>{label}</span><input required={name !== "address2"} type={type} value={deliveredForm[name]} onChange={(event) => setDeliveredForm((current) => ({ ...current, [name]: event.target.value }))} /></label>)}
        <label className="delivered-notes"><span>Notes</span><textarea value={deliveredForm.notes} onChange={(event) => setDeliveredForm((current) => ({ ...current, notes: event.target.value }))} /></label>
        <button className="button" disabled={busy} type="submit">Send delivered-price request</button>
      </form> : null}
    </section>
  );
}

function CartDrawer({ cart, isOpen, onClose, onQuantityChange, onRemove }) {
  const [fulfillment, setFulfillment] = useState("shipping");
  const [zip, setZip] = useState("");
  const [addressType, setAddressType] = useState("residential");
  const [hasDock, setHasDock] = useState(false);
  const [installation, setInstallation] = useState(false);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const canCheckoutDirectly = cart.length === 1 && itemCount === 1;

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    document.body.classList.add("cart-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("cart-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  async function checkout() {
    if (!canCheckoutDirectly) {
      trackEvent("quote_start", { location: "cart", item_count: itemCount });
      onClose();
      window.location.href = "/#quote";
      return;
    }

    setIsLoading(true);
    setStatus("");
    try {
      const item = cart[0];
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.product.id,
          quantity: item.quantity,
          fulfillment,
          zip,
          addressType,
          hasDock,
          installation,
        }),
      });
      const result = await response.json();
      if (response.status === 409 || result.requiresQuote) {
        setStatus("This order needs a delivered-price quote before payment.");
        return;
      }
      if (!response.ok || !result.url) throw new Error(result.error || "Checkout is unavailable.");
      trackEvent("begin_checkout", { currency: "USD", value: subtotal, items: [{ item_id: item.product.id, quantity: 1 }] });
      window.location.assign(result.url);
    } catch (error) {
      setStatus(error.message || "Checkout is unavailable. Please call Oasis.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`cart-shell ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
      <button className="cart-backdrop" type="button" onClick={onClose} aria-label="Close cart" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header>
          <div><span>Your cart</span><h2 id="cart-title">{itemCount ? `${itemCount} item${itemCount === 1 ? "" : "s"}` : "Cart is empty"}</h2></div>
          <button type="button" onClick={onClose} aria-label="Close cart">×</button>
        </header>

        {cart.length ? (
          <>
            <div className="cart-lines">
              {cart.map(({ product, quantity }) => (
                <article className="cart-line" key={product.id}>
                  <a href={getProductUrl(product.handle)}><img src={product.image} alt="" /></a>
                  <div>
                    <a href={getProductUrl(product.handle)}>{product.name}</a>
                    <span>{product.capacity} capacity</span>
                    <strong>{formatCurrency(product.price * quantity)}</strong>
                    <div className="cart-line-actions">
                      <label><span className="sr-only">Quantity for {product.name}</span><select value={quantity} onChange={(event) => onQuantityChange(product.id, Number(event.target.value))}>{[1, 2, 3, 4].map((value) => <option value={value} key={value}>{value}</option>)}</select></label>
                      <button type="button" onClick={() => onRemove(product.id)}>Remove</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-checkout-options">
              <div className="cart-choice">
                <button className={fulfillment === "shipping" ? "active" : ""} type="button" onClick={() => setFulfillment("shipping")}>Freight shipping</button>
                <button className={fulfillment === "pickup" ? "active" : ""} type="button" onClick={() => setFulfillment("pickup")}>Local pickup</button>
              </div>
              {fulfillment === "shipping" ? <>
                <label><span>Delivery ZIP</span><input value={zip} onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))} inputMode="numeric" placeholder="5-digit ZIP" /></label>
                <div className="cart-choice">
                  <button className={addressType === "residential" ? "active" : ""} type="button" onClick={() => setAddressType("residential")}>Residential</button>
                  <button className={addressType === "commercial" ? "active" : ""} type="button" onClick={() => setAddressType("commercial")}>Commercial</button>
                </div>
                <label className="cart-checkbox"><input type="checkbox" checked={hasDock} onChange={(event) => setHasDock(event.target.checked)} /> Forklift or dock available</label>
              </> : null}
              <label className="cart-checkbox"><input type="checkbox" checked={installation} onChange={(event) => setInstallation(event.target.checked)} /> Add professional installation</label>
            </div>

            <footer>
              <div><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
              <p>Freight, installation, and tax are confirmed before payment.</p>
              {status ? <p className="cart-status" role="status">{status}</p> : null}
              <button className="button cart-checkout-button" type="button" disabled={isLoading} onClick={checkout}>
                {isLoading ? "Opening secure checkout..." : canCheckoutDirectly ? "Continue to checkout" : "Get delivered quote"}
              </button>
            </footer>
          </>
        ) : <div className="cart-empty"><p>Your selected lifts will appear here.</p><a className="button" href="/#lifts" onClick={onClose}>Shop lifts</a></div>}
      </aside>
    </div>
  );
}

function OrderSuccessPage() {
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("Confirming your payment...");
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) { setMessage("The checkout session is missing. Please contact Oasis for help."); return undefined; }
    let stopped = false;
    async function load(attempt = 0) {
      try {
        const response = await fetch(`/api/order?session_id=${encodeURIComponent(sessionId)}`);
        if (!response.ok) throw new Error("processing");
        const result = await response.json();
        if (stopped) return;
        setOrder(result);
        setMessage("");
        const claim = await fetch("/api/claim-purchase-conversion", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId }) });
        const conversion = await claim.json();
        if (conversion.claimed) trackEvent("purchase", { transaction_id: conversion.transactionId, value: conversion.value, currency: conversion.currency });
      } catch {
        if (attempt < 8 && !stopped) setTimeout(() => load(attempt + 1), 1500);
        else if (!stopped) setMessage("Payment received. Your confirmation is still processing; Oasis can verify it by phone.");
      }
    }
    load();
    return () => { stopped = true; };
  }, []);
  return <section className="order-success" id="top"><div><span className="product-panel-kicker">Order confirmation</span><h1>{order ? "Your lift is ordered." : "Finalizing your order."}</h1>{message ? <p>{message}</p> : <><p>Thank you{order.customerName ? `, ${order.customerName}` : ""}. Oasis will contact you about {order.fulfillmentMethod === "pickup" ? "pickup" : "delivery"}.</p><dl><div><dt>Order</dt><dd>{order.orderNumber}</dd></div><div><dt>Product</dt><dd>{order.product}</dd></div><div><dt>Quantity</dt><dd>{order.quantity}</dd></div><div><dt>Total paid</dt><dd>{formatCurrency(order.total / 100)}</dd></div><div><dt>Email</dt><dd>{order.email || "Provided at checkout"}</dd></div><div><dt>Phone</dt><dd>{order.phone || "Provided at checkout"}</dd></div></dl></>}<div className="product-page-actions"><a className="button" href="/#lifts">Continue shopping</a><a className="button button-secondary" href={phoneHref}>Call Oasis</a></div></div></section>;
}

function ProductNotFound() {
  return (
    <section className="product-not-found" id="top">
      <div>
        <span className="product-page-type">Oasis product page</span>
        <h1>That lift page is not available yet.</h1>
        <p>Go back to the lift lineup or call Oasis and confirm the right product with a real person.</p>
        <div className="product-page-actions">
          <a className="button" href="/#lifts">
            View lifts
          </a>
          <a className="button button-secondary" href={phoneHref}>
            Call Oasis
          </a>
        </div>
      </div>
    </section>
  );
}

function QuoteSystem({ productInterest = null }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    zip: "",
    notes: "",
  });
  const [quoteStatus, setQuoteStatus] = useState("");
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);

  const quoteMessage = useMemo(
    () => buildQuoteMessage(form, productInterest),
    [form, productInterest],
  );

  function updateForm(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleQuoteSubmit(event) {
    event.preventDefault();

    if (isSubmittingQuote) {
      return;
    }

    trackEvent("quote_request_submit", {
      has_notes: Boolean(form.notes.trim()),
      product_id: productInterest?.id ?? "general",
      zip_provided: Boolean(form.zip.trim()),
    });

    setIsSubmittingQuote(true);
    setQuoteStatus("Sending your quote request...");

    try {
      const response = await fetch("/api/quote", {
        body: JSON.stringify({
          ...form,
          productInterest: productInterest
            ? {
                id: productInterest.id,
                name: productInterest.name,
              }
            : null,
          sourceUrl: window.location.href,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to send quote request");
      }

      trackEvent("quote_request_sent", {
        product_id: productInterest?.id ?? "general",
      });
      trackGoogleAdsQuoteConversion();
      setQuoteStatus(
        result.id
          ? `Quote request sent. Reference ${result.id.slice(0, 8)}. Oasis will call back soon.`
          : "Quote request sent. Oasis will call back soon.",
      );
    } catch (error) {
      trackEvent("quote_request_error", {
        product_id: productInterest?.id ?? "general",
      });
      setQuoteStatus(
        "The quote request did not send. Please call Oasis or copy the details and email support.",
      );
    } finally {
      setIsSubmittingQuote(false);
    }
  }

  async function handleCopyQuote() {
    if (!navigator.clipboard) {
      setQuoteStatus("Copy is not available in this browser. Use the email or call button.");
      return;
    }

    await navigator.clipboard.writeText(quoteMessage);
    trackEvent("quote_details_copy", { location: "quote_form" });
    setQuoteStatus("Quote details copied.");
  }

  return (
    <section className="section quote-section" id="quote">
      <div className="quote-layout">
        <div className="quote-copy">
          <span className="quote-eyebrow">Real quote request</span>
          <h2>Get a quick lift quote</h2>
          <p>
            Leave the basics and Oasis can call back with the right lift,
            financing options, freight details, and next steps.
          </p>
          <div className="quote-human-card">
            <Icon name="call" />
            <div>
              <strong>Talk to an expert before ordering</strong>
              <span>Call {phone} for fit, freight, and install questions.</span>
            </div>
          </div>
        </div>

        <form className="quote-form" onSubmit={handleQuoteSubmit}>
            <div className="quote-form-grid">
              <label>
                <span>Full name</span>
                <input
                  name="name"
                  onChange={updateForm}
                  placeholder="Full name"
                  required
                  type="text"
                  value={form.name}
                />
              </label>
              <label>
                <span>Phone number</span>
                <input
                  name="phone"
                  onChange={updateForm}
                  placeholder="Best phone number"
                  required
                  type="tel"
                  value={form.phone}
                />
              </label>
              <label>
                <span>ZIP code</span>
                <input
                  inputMode="numeric"
                  name="zip"
                  onChange={updateForm}
                  placeholder="Delivery ZIP"
                  required
                  type="text"
                  value={form.zip}
                />
              </label>
            </div>

            <label className="quote-wide">
              <span>Notes</span>
              <textarea
                name="notes"
                onChange={updateForm}
                placeholder="Tell Oasis what you are lifting, your garage size, timing, financing interest, or any questions."
                rows={4}
                value={form.notes}
              />
            </label>

            <div className="quote-actions">
              <button className="button" disabled={isSubmittingQuote} type="submit">
                {isSubmittingQuote ? "Sending..." : "Send quote request"}
              </button>
              <button className="button button-secondary" onClick={handleCopyQuote} type="button">
                Copy details
              </button>
              <a
                className="text-link"
                href={phoneHref}
                onClick={() => trackEvent("phone_click", { location: "quote_form" })}
              >
                Call {phone}
              </a>
            </div>
            <p className="form-privacy-note">
              By submitting, you agree that Oasis may contact you about this request. See our{" "}
              <a href="/privacy-policy">privacy policy</a>.
            </p>
            {quoteStatus ? <p className="quote-status">{quoteStatus}</p> : null}
          </form>

          <aside className="quote-summary" aria-live="polite">
            <div className="quote-summary-top">
              <span>What happens next</span>
              <strong>Expert call</strong>
            </div>
            <div className="quote-summary-main">
              <div className="quote-summary-copy">
                <h3>Oasis reviews the details and calls back.</h3>
                <p>
                  A short request is better for customers. Oasis can confirm fit,
                  freight, install details, and financing directly over the phone.
                </p>
              </div>
              <dl className="quote-steps">
                <div>
                  <dt>1</dt>
                  <dd>Confirm the right lift style</dd>
                </div>
                <div>
                  <dt>2</dt>
                  <dd>Review freight and installation needs</dd>
                </div>
                <div>
                  <dt>3</dt>
                  <dd>Share financing options if needed</dd>
                </div>
              </dl>
            </div>
            <div className="quote-financing-note">
              <Icon name="finance" />
              <span>
                Financing available with Affirm, Klarna, and Shop Pay Installments.
                Final terms are subject to approval.
              </span>
            </div>
          </aside>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section process-section" id="install">
      <div className="section-heading split">
        <div>
          <h2>From garage measurements to installation day</h2>
          <p>
            A useful site removes uncertainty before the customer reaches
            checkout.
          </p>
        </div>
        <a
          className="button"
          href={phoneHref}
          onClick={() => trackEvent("phone_click", { location: "install_process" })}
        >
          Check my garage
        </a>
      </div>
      <div className="process-grid">
        {process.map((step, index) => (
          <article key={step.title} className="process-step">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function QuoteProcessBanner() {
  return (
    <section className="quote-process-banner" aria-label="Premium garage lift installation">
      <img
        src="/assets/quote-to-process-banner.png"
        alt="Luxury garage with premium car lifts and sports cars"
      />
    </section>
  );
}

function Questions() {
  return (
    <section className="section questions" id="faq">
      <div className="question-layout">
        <div className="question-copy">
          <span className="question-kicker">Buyer answers</span>
          <h2>Questions before the lift ships</h2>
          <p>
            Clear answers help buyers confirm fit, choose the right lift style,
            and reach a real person before they order.
          </p>
          <div className="question-callout">
            <span>Need a fit check?</span>
            <a href={phoneHref} onClick={() => trackEvent("phone_click", { location: "faq" })}>
              {phone}
            </a>
          </div>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details className="faq-item" key={item.q} open={index === 0}>
              <summary>
                <span className="faq-number">{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.q}</strong>
                <span className="faq-toggle" aria-hidden="true"></span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta">
      <div>
        <h2>Ready to choose the right lift?</h2>
        <p>
          Start with a quote request, review financing options, then call Oasis
          before ordering equipment for your garage or shop.
        </p>
      </div>
      <div className="cta-actions">
        <a
          className="button"
          href="#quote"
          onClick={() => trackEvent("quote_start", { location: "final_cta" })}
        >
          Get my quote
        </a>
        <a
          className="button button-dark"
          href={phoneHref}
          onClick={() => trackEvent("phone_click", { location: "final_cta" })}
        >
          {phone}
        </a>
      </div>
    </section>
  );
}

function PolicyPage({ policy }) {
  return (
    <article className="policy-page" id="top">
      <header className="policy-hero">
        <div>
          <span>{policy.eyebrow}</span>
          <h1>{policy.title}</h1>
          <p>{policy.description}</p>
        </div>
        <div className="policy-effective">
          <span>Effective</span>
          <strong>August 10, 2026</strong>
          <a href={`mailto:${contactEmail}`}>Questions about this policy</a>
        </div>
      </header>
      <div className="policy-layout">
        <aside className="policy-nav" aria-label={`${policy.title} sections`}>
          <span>On this page</span>
          {policy.sections.map((section, index) => (
            <a href={`#policy-${index + 1}`} key={section.title}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              {section.title}
            </a>
          ))}
        </aside>
        <div className="policy-content">
          {policy.sections.map((section, index) => (
            <section id={`policy-${index + 1}`} key={section.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              ) : null}
            </section>
          ))}
          <section className="policy-contact" aria-label="Oasis Car Lifts policy contact">
            <span>Contact</span>
            <h2>Questions or requests</h2>
            <p>
              Oasis Car Lifts<br />
              {businessAddress.street}<br />
              {businessAddress.cityStateZip}
            </p>
            <div>
              <a href={phoneHref}>{phone}</a>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand-block">
        <a className="footer-logo" href={getSectionHref("top")} aria-label="Oasis Car Lifts home">
          <img src="/assets/oasis-logo-white.png" alt="Oasis Car Lifts" />
        </a>
        <div className="footer-contact">
          <div>
            <span>Address</span>
            <strong>{businessAddress.street}</strong>
            <strong>{businessAddress.cityStateZip}</strong>
          </div>
          <div>
            <span>Phone</span>
            <a href={phoneHref} onClick={() => trackEvent("phone_click", { location: "footer_contact" })}>
              {phone}
            </a>
          </div>
          <div>
            <span>Email</span>
            <a
              href={`mailto:${contactEmail}`}
              onClick={() => trackEvent("footer_link_click", { location: "footer_email" })}
            >
              {contactEmail}
            </a>
          </div>
        </div>
      </div>
      <div className="footer-links">
        <nav aria-label="Shop footer navigation">
          <h2>Shop</h2>
          {footerShopLinks.map(([label, href, eventLocation]) => (
            <a
              href={href}
              key={label}
              onClick={() => trackEvent("footer_link_click", { location: eventLocation })}
            >
              {label}
            </a>
          ))}
        </nav>
        <nav aria-label="Resources footer navigation">
          <h2>Resources</h2>
          {footerResourceLinks.map(([label, href, eventLocation]) => (
            <a
              href={href}
              key={label}
              onClick={() => trackEvent("footer_link_click", { location: eventLocation })}
            >
              {label}
            </a>
          ))}
        </nav>
        <nav aria-label="Support footer navigation">
          <h2>Support</h2>
          {footerSupportLinks.map(([label, href, eventLocation]) => (
            <a
              href={href}
              key={label}
              onClick={() => trackEvent("footer_link_click", { location: eventLocation })}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
      <div className="footer-legal">
        <p>© {new Date().getFullYear()} Oasis Car Lifts. All rights reserved.</p>
        <nav aria-label="Legal footer navigation">
          {footerPolicyLinks.map(([label, href]) => (
            <a href={href} key={label}>{label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

function MobileActionBar({ cartCount, onCartOpen }) {
  return (
    <nav className="mobile-action-bar" aria-label="Mobile quick actions">
      <a href={getSectionHref("lifts")} onClick={() => trackEvent("shop_click", { location: "mobile_action_bar" })}>
        <Icon name="tag" />
        <span>Shop</span>
      </a>
      <button type="button" onClick={onCartOpen} aria-label={`Open cart with ${cartCount} items`}>
        <Icon name="cart" />
        <span>Cart {cartCount ? `(${cartCount})` : ""}</span>
      </button>
      <a href={phoneHref} onClick={() => trackEvent("phone_click", { location: "mobile_action_bar" })}>
        <Icon name="call" />
        <span>Call</span>
      </a>
    </nav>
  );
}

export default function App() {
  const [cart, setCart] = useState(readCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const currentProduct = getCurrentProduct();
  const currentPolicy = getCurrentPolicy();
  const isProductPath = isProductRoute();
  const isCampaignPath = isCampaignRoute();
  const isOrderSuccessPath = isOrderSuccessRoute();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    window.localStorage.setItem(
      cartStorageKey,
      JSON.stringify(cart.map(({ product, quantity }) => ({ id: product.id, quantity }))),
    );
  }, [cart]);

  useEffect(() => {
    if (!isOrderSuccessPath) return;
    setCart([]);
    window.localStorage.removeItem(cartStorageKey);
  }, [isOrderSuccessPath]);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) return current.map((item) => item.product.id === product.id ? { ...item, quantity: Math.min(4, item.quantity + 1) } : item);
      return [...current, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
    trackEvent("add_to_cart", { currency: "USD", value: product.price, items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: 1 }] });
  }

  function changeCartQuantity(productId, quantity) {
    setCart((current) => current.map((item) => item.product.id === productId ? { ...item, quantity } : item));
  }

  function removeFromCart(productId) {
    setCart((current) => current.filter((item) => item.product.id !== productId));
  }

  useEffect(() => {
    const baseUrl = "https://www.oasiscarlifts.com";
    let title = "Oasis Car Lifts | Garage car lifts, financing, and fit help";
    let description =
      "Shop Oasis Car Lifts for 2-post and 4-post garage car lifts with fit guidance, freight help, warranty coverage, financing options, and expert phone support.";
    let canonical = `${baseUrl}/`;
    let image = `${baseUrl}/assets/oasis-hero-background-wide.jpg`;

    if (isOrderSuccessPath) {
      title = "Order confirmation | Oasis Car Lifts";
      description = "Secure Oasis Car Lifts order confirmation.";
      canonical = `${baseUrl}/order-success`;
    } else if (isCampaignPath) {
      title = "Get a Garage Car Lift Quote | Oasis Car Lifts";
      description =
        "Request a fast Oasis Car Lifts quote for 2-post and 4-post garage lifts. Confirm fit, freight, financing, and install details with real phone support.";
      canonical = `${baseUrl}${campaignPath}`;
      image = `${baseUrl}/assets/quote-to-process-banner.png`;
    }

    if (currentProduct) {
      title = `${currentProduct.name} | Oasis Car Lifts`;
      description = `${currentProduct.name} for ${currentProduct.bestFor.toLowerCase()}. Confirm garage fit, freight, financing, and quote details with Oasis Car Lifts.`;
      canonical = `${baseUrl}${getProductUrl(currentProduct.handle)}`;
      image = `${baseUrl}${currentProduct.image}`;
    }

    if (currentPolicy) {
      title = `${currentPolicy.title} | Oasis Car Lifts`;
      description = currentPolicy.description;
      canonical = `${baseUrl}${currentPolicy.path}`;
      image = `${baseUrl}/assets/oasis-hero-background-wide.jpg`;
    }

    document.title = title;
    setCanonical(canonical);
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonical, "property");
    setMeta("og:image", image, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
  }, [currentPolicy, currentProduct, isCampaignPath, isOrderSuccessPath]);

  useEffect(() => {
    const scrollToCurrentHash = () => {
      const targetId = window.location.hash.slice(1);
      if (!targetId) return;

      window.requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(targetId));
        target?.scrollIntoView({ block: "start" });
      });
    };

    scrollToCurrentHash();
    window.addEventListener("hashchange", scrollToCurrentHash);

    return () => window.removeEventListener("hashchange", scrollToCurrentHash);
  }, [currentPolicy?.path, currentProduct?.id, isCampaignPath, isProductPath]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header cartCount={cartCount} onCartOpen={() => setIsCartOpen(true)} />
      <main id="main">
        {isOrderSuccessPath ? (
          <OrderSuccessPage />
        ) : currentPolicy ? (
          <PolicyPage policy={currentPolicy} />
        ) : isCampaignPath ? (
          <CampaignLandingPage />
        ) : isProductPath ? (
          currentProduct ? (
            <>
              <ProductPage product={currentProduct} onAddToCart={addToCart} />
              <QuoteSystem productInterest={currentProduct} />
              <Questions />
              <FinalCta />
            </>
          ) : (
            <ProductNotFound />
          )
        ) : (
          <>
            <Hero />
            <HeroTrustSlider />
            <JobFinder />
            <ShopBanner />
            <ProductSection onAddToCart={addToCart} />
            <QuoteSystem />
            <QuoteProcessBanner />
            <Process />
            <Questions />
            <FinalCta />
          </>
        )}
      </main>
      <Footer />
      {!isOrderSuccessPath ? <CartDrawer cart={cart} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onQuantityChange={changeCartQuantity} onRemove={removeFromCart} /> : null}
      {!isOrderSuccessPath ? <MobileActionBar cartCount={cartCount} onCartOpen={() => setIsCartOpen(true)} /> : null}
    </>
  );
}
