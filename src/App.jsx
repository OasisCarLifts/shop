import React, { useEffect, useMemo, useState } from "react";

const phone = "1 (888) 822-2976";
const phoneHref = "tel:+18888222976";
const contactEmail = "support@oasiscarlifts.com";
const shopUrl = "/#lifts";
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
    id: "narrow-4post",
    name: "Narrow 4-post lift",
    shortName: "Narrow 4-post",
    price: 3250,
    monthly: 90,
    capacity: "9,000 lb",
    bestFor: "Tighter garages and storage",
    detail: "110V setup with casters and ramps included.",
    image: "/assets/product-narrow-4post.png",
    handle: "oasis-narrow-4-post-car-lift-9000-lbs",
    minHeight: 8.5,
    maxWeight: 9000,
    minWidth: 9.5,
    type: "4-post",
  },
  {
    id: "clear-floor-2post",
    name: "Clear-floor 2-post lift",
    shortName: "Clear-floor 2-post",
    price: 2450,
    monthly: 68,
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
    price: 2250,
    monthly: 62,
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
    price: 15650,
    monthly: 434,
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
  ["call", "Quote-first support", "Confirm fit with a real person"],
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

function isProductRoute() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.location.pathname.startsWith("/products/");
}

function getSectionHref(sectionId) {
  return isProductRoute() ? `/#${sectionId}` : `#${sectionId}`;
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
      score += product.id === "narrow-4post" && width < 11 ? 26 : 0;
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
  };

  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
}

function Header() {
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
        <a
          className="button button-small"
          href={shopUrl}
          onClick={() => trackEvent("shop_click", { location: "header" })}
        >
          Shop lifts
        </a>
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

function ProductSection() {
  return (
    <section className="section products-section" id="lifts">
      <div className="section-heading split">
        <div>
          <h2>Shop by the job the lift needs to do</h2>
          <p>
            Compare garage-ready lifts by capacity, use case, starting price,
            and monthly payment before you ask Oasis for final fit help.
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
          <article className="product-card" data-product={product.id} key={product.id}>
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
                  <a
                    className="product-quote-link"
                    href="#quote"
                    onClick={() =>
                      trackEvent("quote_start", {
                        location: "product_card",
                        product_id: product.id,
                      })
                    }
                  >
                    Get quote
                  </a>
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
      <img src="/assets/shop-lifts-garage-banner.png" alt="Luxury garage with Oasis car lifts installed" />
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

function ProductPage({ product }) {
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
            <a
              className="button"
              href="#quote"
              onClick={() =>
                trackEvent("quote_start", {
                  location: "product_page_hero",
                  product_id: product.id,
                })
              }
            >
              Get quote
            </a>
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
      setQuoteStatus("Quote request sent. Oasis will call back soon.");
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
    </footer>
  );
}

function MobileActionBar() {
  return (
    <nav className="mobile-action-bar" aria-label="Mobile quick actions">
      <a href={getSectionHref("lifts")} onClick={() => trackEvent("shop_click", { location: "mobile_action_bar" })}>
        <Icon name="tag" />
        <span>Shop</span>
      </a>
      <a href="#quote" onClick={() => trackEvent("quote_start", { location: "mobile_action_bar" })}>
        <Icon name="finance" />
        <span>Quote</span>
      </a>
      <a href={phoneHref} onClick={() => trackEvent("phone_click", { location: "mobile_action_bar" })}>
        <Icon name="call" />
        <span>Call</span>
      </a>
    </nav>
  );
}

export default function App() {
  const currentProduct = getCurrentProduct();
  const isProductPath = isProductRoute();

  useEffect(() => {
    const baseUrl = "https://www.oasiscarlifts.com";
    const title = currentProduct
      ? `${currentProduct.name} | Oasis Car Lifts`
      : "Oasis Car Lifts | Garage car lifts, financing, and fit help";
    const description = currentProduct
      ? `${currentProduct.name} for ${currentProduct.bestFor.toLowerCase()}. Confirm garage fit, freight, financing, and quote details with Oasis Car Lifts.`
      : "Shop Oasis Car Lifts for 2-post and 4-post garage car lifts with fit guidance, freight help, warranty coverage, financing options, and expert phone support.";
    const canonical = currentProduct
      ? `${baseUrl}${getProductUrl(currentProduct.handle)}`
      : `${baseUrl}/`;
    const image = currentProduct
      ? `${baseUrl}${currentProduct.image}`
      : `${baseUrl}/assets/oasis-hero-background-wide.jpg`;

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
  }, [currentProduct]);

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
  }, [currentProduct?.id, isProductPath]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        {isProductPath ? (
          currentProduct ? (
            <>
              <ProductPage product={currentProduct} />
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
            <LiftFinder />
            <ShopBanner />
            <ProductSection />
            <QuoteSystem />
            <QuoteProcessBanner />
            <Process />
            <Questions />
            <FinalCta />
          </>
        )}
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
