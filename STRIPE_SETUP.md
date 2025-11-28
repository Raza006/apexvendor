# 🛒 COMPLETE STRIPE INTEGRATION GUIDE (STEP-BY-STEP)

This guide assumes you have a **brand new, empty Stripe account** and need to connect it to your Apex Vendors store.

---

## 🛑 YOUR LIVE CREDENTIALS (BACKUP)

Store these securely. These are the keys you provided for the LIVE store.

- **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**: `pk_live_...` (Provided previously)
- **STRIPE_SECRET_KEY**: `sk_live_...` (Provided previously)
- **STRIPE_WEBHOOK_SECRET**: `whsec_...` (Configured for `apexvendor.com`)
- **RESEND_API_KEY**: `re_...`

---

## 1️⃣ DEPLOY TO VERCEL (FIRST DEPLOY)

Before we can set up the live webhook, your site needs to be on the internet.

1.  Go to [vercel.com](https://vercel.com) and log in.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository: `apexvendor`.
4.  **Environment Variables**: You can skip this for the *very first* deploy, or add your **TEST** keys just to check if the build works.
5.  Click **"Deploy"**.
6.  Wait for it to finish. You will get a domain (e.g., `apexvendor.vercel.app`). **Copy this URL.**

---

## 2️⃣ GET LIVE STRIPE KEYS

*(Done - See Credentials Above)*

1.  Go to [dashboard.stripe.com](https://dashboard.stripe.com/).
2.  **Toggle "Test Mode" OFF** (Top right corner). You are now in Live Mode.
3.  Go to **Developers** -> **API Keys**.
4.  **Copy** the `Publishable key` (starts with `pk_live_...`).
5.  **Copy** the `Secret key` (starts with `sk_live_...`).

---

## 3️⃣ SET UP LIVE WEBHOOK (CRITICAL FOR EMAILS)

This ensures customers get their email automatically after paying.

1.  In Stripe Dashboard (Live Mode), go to **Developers** -> **Webhooks**.
2.  Click **"Add Endpoint"**.
3.  **Endpoint URL**: Paste your Vercel URL + `/api/webhook`.
    *   Example: `https://apexvendor.vercel.app/api/webhook`
4.  **Select events**:
    *   Click "Select events".
    *   Search for and check: `checkout.session.completed`.
    *   Click "Add events".
5.  Click **"Add endpoint"**.
6.  **Copy Signing Secret**:
    *   On the new webhook page, look for "Signing secret" (top right).
    *   Click "Reveal".
    *   **Copy** the secret (starts with `whsec_...`).

---

## 4️⃣ CONFIGURE VERCEL ENVIRONMENT VARIABLES

Now we tell your live site to use the REAL keys.

1.  Go to your project settings on **Vercel**.
2.  Click **"Settings"** -> **"Environment Variables"**.
3.  Add the following variables (Copy/Paste your **LIVE** keys):

| Key | Value |
| :--- | :--- |
| `NEXT_PUBLIC_URL` | `https://apexvendor.vercel.app` (Your actual Vercel domain) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` (From Step 2) |
| `STRIPE_SECRET_KEY` | `sk_live_...` (From Step 2) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (From Step 3) |
| `RESEND_API_KEY` | `re_...` (Your Resend API Key) |

4.  **IMPORTANT**: After adding these, go to the **"Deployments"** tab in Vercel.
5.  Click the three dots `...` next to your latest deployment -> **"Redeploy"**.
6.  This forces the site to rebuild with the new Live keys.

---

## 5️⃣ VERIFY DOMAIN (RESEND) - OPTIONAL BUT RECOMMENDED

For emails to land in "Primary" instead of "Spam":

1.  Go to [resend.com](https://resend.com) -> **Domains**.
2.  Add your custom domain (if you have one, e.g., `apexvendors.com`).
3.  Follow the instructions to add DNS records (CNAME/TXT) to your domain provider (GoDaddy, Namecheap, etc.).
4.  Once verified, update `lib/email-templates.ts` line 42:
    *   Change `'Apex Vendors <noreply@yourdomain.com>'` to your verified email.

---

## 6️⃣ TEST A REAL PURCHASE (FINAL STEP)

1.  Open your Vercel URL.
2.  Buy a cheap product (or create a $1 test product in code temporarily).
3.  Use a **REAL credit card**.
4.  Check if:
    *   Payment goes through on Stripe.
    *   You get redirected to the Success page.
    *   You receive the email with the link.

🚀 **YOU ARE NOW LIVE AND READY TO SELL.**
