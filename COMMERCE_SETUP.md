# Oasis Stripe Commerce Setup

The site uses Stripe-hosted Checkout, signed Stripe webhooks, Upstash Redis order storage, and the existing Resend email service. Product, freight, and installation prices are always recalculated on the server.

## Vercel environment variables

Add these to Preview first, then Production after test-mode checkout is approved:

- `SITE_URL`: `https://www.oasiscarlifts.com`
- `STRIPE_RESTRICTED_KEY`: a Stripe test restricted key allowed to create Checkout Sessions and read the resulting Checkout data
- `STRIPE_WEBHOOK_SECRET`: signing secret for the webhook endpoint
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST token
- `RESEND_API_KEY`: existing Resend key
- `RESEND_FROM`: a sender on the verified `oasiscarlifts.com` domain
- `FREIGHT_RATES_JSON`: approved freight zones and amounts in cents
- `INSTALLATION_PRICES_JSON`: approved installation amounts in cents, keyed by product ID
- `STRIPE_AUTOMATIC_TAX`: keep `false` until Stripe Tax registrations are active and reviewed

Use `.env.example` as the format reference. Never commit real keys.

## Stripe webhook

Create a webhook destination in Stripe for:

`https://www.oasiscarlifts.com/api/stripe-webhook`

Subscribe to:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`

Copy its signing secret to `STRIPE_WEBHOOK_SECRET` in Vercel. The webhook is the payment source of truth; `/order-success` only reads a confirmed order created by that webhook.

## Freight behavior

- Pickup is always `$0` freight and can proceed to Checkout.
- A ZIP matching `FREIGHT_RATES_JSON` receives the configured freight amount.
- Unmatched ZIPs, multiple units, or an installation without a configured price use the delivered-price request instead of accepting payment.

Example freight configuration:

```json
[{"name":"Southern California","zipPrefixes":["90","91","92","93"],"amount":45000,"residentialSurcharge":9500,"liftgateSurcharge":8500}]
```

## Test-mode acceptance checks

1. Complete a pickup checkout with Stripe test card `4242 4242 4242 4242`.
2. Verify a declined payment with `4000 0000 0000 0002`.
3. Start Checkout and abandon it; no paid order email should be sent.
4. Confirm quantity `2+` opens the delivered-price flow.
5. Confirm a configured shipping ZIP shows freight and an unknown ZIP requests a quote.
6. Confirm installation is charged only when its product ID has an approved configured amount.
7. Replay the same webhook and verify one order email and one stored order.
8. Refresh `/order-success` and verify no duplicate `purchase` analytics event is claimed.
9. Modify browser-visible totals and verify Checkout still uses the server catalog.
10. Test every product on a narrow mobile viewport.

After all checks pass, replace the test restricted key and webhook secret with live-mode equivalents and repeat one controlled live purchase.
