# Stripe Integration Guide for Apex Vendors

This guide explains how to connect your Stripe account to accept real payments and how to configure email sending.

## 1. Get Stripe Keys

1.  Go to [dashboard.stripe.com](https://dashboard.stripe.com/) and sign up/login.
2.  Ensure you are in **Test Mode** (toggle in top right) for development.
3.  Go to **Developers > API keys**.
4.  Copy the `Publishable key` and `Secret key`.

## 2. Configure Environment Variables

Create a file named `.env.local` in the root of your project folder (`Loids-Stan`) and add the keys:

```env
NEXT_PUBLIC_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...  <-- Paste Secret Key Here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... <-- Paste Publishable Key Here
```

## 3. Set Up Webhook (For Email Delivery)

To test that emails send after payment locally, you need the Stripe CLI or a tunnel.

1.  Go to **Developers > Webhooks** in Stripe Dashboard.
2.  Click **Add endpoint**.
3.  Endpoint URL: `http://localhost:3000/api/webhook` (Note: for local dev, you need the CLI, see below).
4.  Select events to listen to: `checkout.session.completed`.
5.  Reveal the **Signing Secret** (`whsec_...`).
6.  Add it to `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Testing Webhooks Locally (Recommended)
1.  Download Stripe CLI.
2.  Run: `stripe listen --forward-to localhost:3000/api/webhook`
3.  It will give you a webhook secret. Use THAT one in your `.env.local`.

## 4. Email Setup (Resend)

To actually send emails, we use **Resend**.

1.  Go to [resend.com](https://resend.com) and sign up.
2.  Get your API Key.
3.  Add to `.env.local`:

```env
RESEND_API_KEY=re_123...
```

4.  **Important**: You must verify a domain to send to anyone. In test mode, you can only send to your own email address unless you verify a domain.

## 5. Editing Email Content

Open `lib/email-templates.ts`. You can edit the HTML and Subject line there easily.

## 6. Connecting Products

Currently, the code automatically creates a Stripe checkout session based on the price in `lib/products.ts`.
You **do not** need to create products in Stripe manually for this code to work. The `api/checkout/route.ts` sends the product name and price directly to Stripe.

Just ensure the IDs in `lib/products.ts` are unique.

## Summary of .env.local

Your `.env.local` file should look like this:

```env
NEXT_PUBLIC_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
```

