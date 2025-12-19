# 📧 EMAIL SETUP GUIDE - Send PDFs with Resend + Cloudflare

This guide will help you set up email delivery with PDF attachments for your Apex Vendors store using your Cloudflare domain.

---

## ✅ WHAT'S ALREADY DONE

Your codebase is now configured to:
- ✅ Attach PDF instruction files to order confirmation emails
- ✅ Send emails automatically when customers purchase
- ✅ Support all your products with individual PDF files

---

## 🔧 STEP 1: VERIFY YOUR DOMAIN WITH RESEND

### 1.1 Log in to Resend
1. Go to [resend.com/login](https://resend.com/login)
2. Sign in with your account (you already have an API key: `re_b1rLwWBq_...`)

### 1.2 Add Your Domain
1. Click **"Domains"** in the left sidebar
2. Click **"Add Domain"**
3. Enter your domain name (e.g., `apexvendor.com` - whatever domain you have with Cloudflare)
4. Click **"Add"**

### 1.3 Get DNS Records
After adding your domain, Resend will show you 3 DNS records that need to be added:
- **SPF Record** (TXT)
- **DKIM Record** (TXT)  
- **DMARC Record** (TXT)

**Keep this page open** - you'll need these values in the next step.

---

## 🌐 STEP 2: ADD DNS RECORDS IN CLOUDFLARE

### 2.1 Log in to Cloudflare
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Select your domain (e.g., `apexvendor.com`)

### 2.2 Add DNS Records
1. Click **"DNS"** in the left sidebar
2. Click **"Add record"**

For each of the 3 records from Resend, add them like this:

#### Record 1: SPF (TXT Record)
- **Type**: `TXT`
- **Name**: `@` (or your domain name)
- **Content**: Copy the SPF value from Resend (looks like `v=spf1 include:...`)
- **TTL**: Auto
- Click **"Save"**

#### Record 2: DKIM (TXT Record)
- **Type**: `TXT`
- **Name**: Copy from Resend (looks like `resend._domainkey`)
- **Content**: Copy the DKIM value from Resend
- **TTL**: Auto
- Click **"Save"**

#### Record 3: DMARC (TXT Record)
- **Type**: `TXT`
- **Name**: `_dmarc`
- **Content**: Copy the DMARC value from Resend (looks like `v=DMARC1; p=none;...`)
- **TTL**: Auto
- Click **"Save"**

### 2.3 Verify Domain in Resend
1. Go back to Resend dashboard
2. Click **"Verify Records"** or refresh the page
3. Wait for verification (can take 5-15 minutes, sometimes up to 48 hours)
4. Once verified, you'll see a green checkmark ✅

---

## 📝 STEP 3: UPDATE YOUR FROM EMAIL ADDRESS

Once your domain is verified, update the "from" email address in your code:

1. Open `lib/email-templates.ts`
2. Find line 47: `from: 'Apex Vendors <orders@apexvendor.com>',`
3. Replace `apexvendor.com` with **YOUR verified domain**
   - Example: `from: 'Apex Vendors <orders@yourdomain.com>',`
   - Or use: `noreply@yourdomain.com`, `hello@yourdomain.com`, etc.

**Important**: The domain MUST match what you verified in Resend!

---

## 📄 STEP 4: CREATE AND UPLOAD YOUR PDF INSTRUCTION FILES

### 4.1 Create PDF Files
Create PDF instruction files for each product. The files should be named exactly as listed below:

| Product Name | PDF Filename |
|-------------|--------------|
| Every Single Vendor | `elite-bundle-instructions.pdf` |
| Hair Dryer Supplier | `hair-dryer-instructions.pdf` |
| Labu Supplier | `labu-instructions.pdf` |
| Max Supplier | `max-supplier-instructions.pdf` |
| Moissanite Supplier | `moissanite-instructions.pdf` |
| Shoe Supplier | `shoes-instructions.pdf` |
| Clothing Bundle Pack | `clothing-instructions.pdf` |
| Pod Supplier | `pods-instructions.pdf` |
| Cologne Supplier Pack | `cologne-instructions.pdf` |
| Lulu Supplier | `lulu-instructions.pdf` |

### 4.2 Upload PDFs
1. Place all PDF files in the `public/pdfs/` folder in your project
2. The folder structure should look like:
   ```
   Apex-Stan/
   └── public/
       └── pdfs/
           ├── elite-bundle-instructions.pdf
           ├── hair-dryer-instructions.pdf
           ├── labu-instructions.pdf
           ├── max-supplier-instructions.pdf
           ├── moissanite-instructions.pdf
           ├── shoes-instructions.pdf
           ├── clothing-instructions.pdf
           ├── pods-instructions.pdf
           ├── cologne-instructions.pdf
           └── lulu-instructions.pdf
   ```

### 4.3 Tips for Creating PDFs
- Include clear instructions on how to access the vendor
- Add contact information for support
- Include your branding (logo, colors)
- Keep file size under 10MB for fast email delivery
- Test that the PDF opens correctly on mobile and desktop

---

## 🚀 STEP 5: DEPLOY TO VERCEL (UPDATE ENVIRONMENT VARIABLE)

### 5.1 Update Vercel Environment Variables
1. Go to [vercel.com](https://vercel.com) and open your project
2. Go to **Settings** → **Environment Variables**
3. Make sure these variables are set:
   - ✅ `NEXT_PUBLIC_URL` = `https://apexvendor.vercel.app` (or your custom domain)
   - ✅ `RESEND_API_KEY` = `re_b1rLwWBq_9XfXvLp9vU2HeX1PQXPNnogF`
   - ✅ `STRIPE_WEBHOOK_SECRET` = Your webhook secret
   - ✅ `STRIPE_SECRET_KEY` = Your Stripe secret key
   - ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = Your Stripe publishable key

### 5.2 Redeploy
1. Go to the **Deployments** tab
2. Click the **three dots (...)** next to the latest deployment
3. Click **"Redeploy"**
4. Wait for the deployment to finish

---

## 🧪 STEP 6: TEST YOUR EMAIL SETUP

### 6.1 Test Purchase
1. Go to your live site
2. Make a test purchase (you can use Stripe test mode first)
3. Use a real email address you can check

### 6.2 Check Results
After purchase, verify:
- ✅ You receive the email within 1-2 minutes
- ✅ The email has a PDF attachment
- ✅ The PDF opens correctly
- ✅ The email lands in inbox (not spam)
- ✅ The "From" address shows your domain

### 6.3 Troubleshooting

**Email not arriving?**
- Check Vercel logs: Go to your project → Deployments → View Function Logs
- Check Resend logs: Go to Resend dashboard → Emails
- Make sure webhook is set up in Stripe

**Email going to spam?**
- Verify your domain is fully verified in Resend (green checkmark)
- Wait 24-48 hours for DNS records to fully propagate
- Check DMARC/SPF/DKIM records in Cloudflare

**PDF not attaching?**
- Make sure PDF files are in `public/pdfs/` folder
- Check that filenames match exactly (case-sensitive)
- Check Vercel deployment includes the PDF files
- Check file size is under 10MB

**Webhook not firing?**
- Check webhook is set up in Stripe dashboard
- Verify webhook secret is correct in Vercel environment variables
- Test webhook with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhook`

---

## 📋 QUICK REFERENCE

### Your Resend API Key
```
re_b1rLwWBq_9XfXvLp9vU2HeX1PQXPNnogF
```

### Webhook Events to Listen For (Stripe)
- `payment_intent.succeeded`
- `checkout.session.completed`

### File Locations
- Email templates: `lib/email-templates.ts`
- Products config: `lib/products.ts`
- Webhook handler: `app/api/webhook/route.ts`
- PDF files: `public/pdfs/`

### Support
If you need help:
1. Check Resend logs: [resend.com/emails](https://resend.com/emails)
2. Check Vercel logs: Your project → Deployments → Function Logs
3. Check Stripe webhooks: [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)

---

## ✅ CHECKLIST

Before going live, make sure:
- [ ] Domain verified in Resend (green checkmark)
- [ ] DNS records added to Cloudflare
- [ ] From email updated in `lib/email-templates.ts`
- [ ] All 10 PDF files created and uploaded to `public/pdfs/`
- [ ] Environment variables set in Vercel
- [ ] Redeployed to Vercel
- [ ] Test purchase completed successfully
- [ ] Email received with PDF attachment
- [ ] Email lands in inbox (not spam)

---

🎉 **YOU'RE ALL SET!** Your customers will now receive PDF instructions automatically when they purchase.

