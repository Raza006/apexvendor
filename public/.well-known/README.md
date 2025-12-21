# Apple Pay Domain Verification

To enable Apple Pay, you need to add the domain verification file here.

## Steps:

1. Go to your Stripe Dashboard: https://dashboard.stripe.com/settings/payment_methods
2. Click on "Payment method domains"
3. Click "Add new domain" and enter your domain (e.g., apexsupplierlinks.com)
4. Download the verification file named `apple-developer-merchantid-domain-association`
5. Place it in this directory (`public/.well-known/`)
6. Make sure the file is accessible at: `https://yourdomain.com/.well-known/apple-developer-merchantid-domain-association`
7. Go back to Stripe Dashboard and click "Verify"

## Next.js Configuration

The file will be automatically served by Next.js from the `public` folder.

Access it at: `https://yourdomain.com/.well-known/apple-developer-merchantid-domain-association`

## Current Status

✅ Apple Pay is already configured in the checkout form (`components/checkout-form.tsx`)
✅ Wallet options enabled: Apple Pay (auto) and Google Pay (auto)
✅ Domain verification directory created

⚠️ You need to add the actual verification file from Stripe Dashboard

