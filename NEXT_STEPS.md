# 🚀 NEXT STEPS - Get Your Email System Working

## ✅ What I've Already Done For You

1. ✅ Updated your Resend API key to: `re_MX2DHbSt_5tEQfoHYZs2X2tjdJSusGA1X`
2. ✅ Set your domain to: `apexsupplierlinks.com`
3. ✅ Configured the system so **ONLY** these 2 products get PDF attachments:
   - **All Vendor Bundle** (elite-bundle) → `elite-bundle-instructions.pdf` ✅ (Already uploaded!)
   - **Clothing Bundle** (clothing) → `clothing-instructions.pdf` ⚠️ (You need to add this)
4. ✅ All other products will still get emails, just without PDF attachments
5. ✅ Renamed your existing PDF to the correct filename

---

## 📋 WHAT YOU NEED TO DO NOW

### STEP 1: Add Your Clothing Bundle PDF (5 minutes)

1. Create or locate your **Clothing Bundle instructions PDF**
2. Rename it to exactly: `clothing-instructions.pdf`
3. Place it in the folder: `public/pdfs/`
4. Your folder should now have:
   ```
   public/pdfs/
   ├── elite-bundle-instructions.pdf  ✅ (Already there!)
   ├── clothing-instructions.pdf      ⬅️ Add this one
   └── README.md
   ```

---

### STEP 2: Verify Your Domain with Resend (15-20 minutes)

This is **CRITICAL** - without this, emails won't send!

#### 2.1 Log in to Resend
1. Go to: https://resend.com/login
2. Sign in with your account

#### 2.2 Add Your Domain
1. Click **"Domains"** in the left sidebar
2. Click **"Add Domain"**
3. Type: `apexsupplierlinks.com`
4. Click **"Add"**

#### 2.3 Get the 3 DNS Records
Resend will show you 3 records to add. They look like this:

**Record 1: SPF (TXT)**
- Name: `@` or `apexsupplierlinks.com`
- Value: `v=spf1 include:_spf.resend.com ~all` (or similar)

**Record 2: DKIM (TXT)**
- Name: `resend._domainkey` (or similar)
- Value: A long string starting with `p=...`

**Record 3: DMARC (TXT)**
- Name: `_dmarc`
- Value: `v=DMARC1; p=none;...` (or similar)

**📝 Write these down or keep the Resend tab open!**

---

### STEP 3: Add DNS Records to Cloudflare (10 minutes)

#### 3.1 Log in to Cloudflare
1. Go to: https://dash.cloudflare.com
2. Click on your domain: `apexsupplierlinks.com`

#### 3.2 Add Each Record
1. Click **"DNS"** in the left sidebar
2. Click **"Add record"**

**For Record 1 (SPF):**
- Type: `TXT`
- Name: `@`
- Content: (Paste the SPF value from Resend)
- TTL: Auto
- Click **"Save"**

**For Record 2 (DKIM):**
- Type: `TXT`
- Name: (Paste the name from Resend, like `resend._domainkey`)
- Content: (Paste the DKIM value from Resend)
- TTL: Auto
- Click **"Save"**

**For Record 3 (DMARC):**
- Type: `TXT`
- Name: `_dmarc`
- Content: (Paste the DMARC value from Resend)
- TTL: Auto
- Click **"Save"**

#### 3.3 Verify in Resend
1. Go back to Resend dashboard
2. Click **"Verify Records"** or refresh the page
3. Wait 5-15 minutes (sometimes up to 48 hours)
4. You should see green checkmarks ✅ when verified

---

### STEP 4: Update Vercel Environment Variables (5 minutes)

#### 4.1 Log in to Vercel
1. Go to: https://vercel.com
2. Open your Apex project

#### 4.2 Add/Update Environment Variables
1. Click **"Settings"** → **"Environment Variables"**
2. Make sure these are set (add if missing, update if different):

| Variable Name | Value |
|--------------|-------|
| `RESEND_API_KEY` | `re_MX2DHbSt_5tEQfoHYZs2X2tjdJSusGA1X` |
| `NEXT_PUBLIC_URL` | Your live site URL (e.g., `https://apexsupplierlinks.com`) |
| `STRIPE_WEBHOOK_SECRET` | Your Stripe webhook secret |
| `STRIPE_SECRET_KEY` | Your Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key |

#### 4.3 Redeploy
1. Go to **"Deployments"** tab
2. Click the **three dots (...)** next to the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to finish (2-5 minutes)

---

### STEP 5: Test Everything! (5 minutes)

#### 5.1 Make a Test Purchase
1. Go to your live site
2. Buy the **All Vendor Bundle** (or use Stripe test mode)
3. Use a real email address you can check

#### 5.2 Check Your Email
Within 1-2 minutes, you should receive an email with:
- ✅ Subject: "Your Order: Every Single Vendor - Download Link"
- ✅ From: "Apex Vendors <orders@apexsupplierlinks.com>"
- ✅ PDF attachment: `elite-bundle-instructions.pdf`
- ✅ Link to access the vendor

#### 5.3 Test the Clothing Bundle Too
1. Buy the **Clothing Bundle Pack**
2. Check that the email includes `clothing-instructions.pdf`

#### 5.4 Test Other Products (Optional)
1. Buy any other product (like Hair Dryer Supplier)
2. Verify you still get an email, but **without** a PDF attachment

---

## 🆘 TROUBLESHOOTING

### Email Not Arriving?
1. **Check Resend Dashboard**: Go to https://resend.com/emails
   - See if the email was sent
   - Check for any error messages
2. **Check Spam Folder**: Sometimes emails land there initially
3. **Check Vercel Logs**: Go to Vercel → Deployments → Function Logs
   - Look for "✅ Email sent" messages
4. **Check Stripe Webhook**: Make sure webhook is firing in Stripe dashboard

### Email Goes to Spam?
- Wait 24-48 hours after adding DNS records for full propagation
- Make sure all 3 DNS records show green checkmarks in Resend
- Send a few test emails - deliverability improves over time

### PDF Not Attaching?
- Make sure the PDF filename is **exactly** correct (case-sensitive)
- Check that the PDF is in `public/pdfs/` folder
- Verify the file size is under 10MB
- Check Vercel logs for "📎 Attaching PDF" messages

### Domain Not Verifying in Resend?
- Double-check you copied the DNS records exactly (no extra spaces)
- Wait up to 48 hours for DNS propagation
- Use a DNS checker tool: https://dnschecker.org
- Contact Resend support if still not working after 48 hours

---

## 📞 NEED HELP?

If you get stuck:
1. **Resend Support**: Check https://resend.com/emails for email logs
2. **Vercel Logs**: Check Function Logs for error messages
3. **Stripe Webhooks**: Check https://dashboard.stripe.com/webhooks for webhook status

---

## ✅ FINAL CHECKLIST

Before considering this complete:
- [ ] Added `clothing-instructions.pdf` to `public/pdfs/` folder
- [ ] Added domain `apexsupplierlinks.com` to Resend
- [ ] Added 3 DNS records (SPF, DKIM, DMARC) to Cloudflare
- [ ] Domain shows as verified in Resend (green checkmark)
- [ ] Updated `RESEND_API_KEY` in Vercel environment variables
- [ ] Redeployed on Vercel
- [ ] Made test purchase of All Vendor Bundle
- [ ] Received email with PDF attachment
- [ ] Made test purchase of Clothing Bundle
- [ ] Received email with PDF attachment
- [ ] Made test purchase of another product (no PDF expected)
- [ ] Email landed in inbox (not spam)

---

## 🎉 SUMMARY

**Current Status:**
- ✅ Code is configured correctly
- ✅ Resend API key is set
- ✅ Domain is configured (`apexsupplierlinks.com`)
- ✅ All Vendor Bundle PDF is ready
- ⚠️ Need to add Clothing Bundle PDF
- ⚠️ Need to verify domain in Resend
- ⚠️ Need to add DNS records to Cloudflare
- ⚠️ Need to update Vercel and redeploy

**Time Estimate:** 30-45 minutes total (plus waiting for DNS verification)

**Once complete:** Customers will automatically receive PDF instructions when they purchase the All Vendor Bundle or Clothing Bundle!

