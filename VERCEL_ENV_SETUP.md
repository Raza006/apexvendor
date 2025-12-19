# 🚀 Vercel Environment Variables Setup

## Why Emails Aren't Sending

Your payments are working perfectly (you can see the 200 OK responses in the webhook logs), but emails aren't being sent because **environment variables are missing in Vercel**.

The `env.local` file only works on your local machine. Vercel needs its own environment variables.

---

## ✅ Step-by-Step: Add Environment Variables to Vercel

### 1. Go to Your Vercel Project
1. Open [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project: **apexvendor** (or whatever it's called)

### 2. Open Settings
1. Click **"Settings"** in the top navigation
2. Click **"Environment Variables"** in the left sidebar

### 3. Add These 4 Variables

Add each of these one by one:

#### Variable 1: RESEND_API_KEY
- **Key**: `RESEND_API_KEY`
- **Value**: Copy from your `env.local` file (starts with `re_`)
- **Environment**: Check all three boxes (Production, Preview, Development)
- Click **"Save"**

#### Variable 2: NEXT_PUBLIC_URL
- **Key**: `NEXT_PUBLIC_URL`
- **Value**: `https://apexvendor.vercel.app` (or your custom domain if you have one)
- **Environment**: Check all three boxes
- Click **"Save"**

#### Variable 3: STRIPE_SECRET_KEY
- **Key**: `STRIPE_SECRET_KEY`
- **Value**: Copy from your `env.local` file (starts with `sk_test_`)
- **Environment**: Check all three boxes
- Click **"Save"**

#### Variable 4: STRIPE_WEBHOOK_SECRET
- **Key**: `STRIPE_WEBHOOK_SECRET`
- **Value**: Copy from your `env.local` file (starts with `whsec_`)
- **Environment**: Check all three boxes
- Click **"Save"**

### 4. Redeploy Your Site
After adding all variables:
1. Go to the **"Deployments"** tab
2. Click the **three dots (...)** on the latest deployment
3. Click **"Redeploy"**
4. Wait for the deployment to complete (usually 1-2 minutes)

---

## 🔍 Testing After Deployment

### Test a Purchase
1. Go to your live site: `https://apexvendor.vercel.app`
2. Make a test purchase (use Stripe test card: `4242 4242 4242 4242`)
3. Check the Vercel logs for email debugging info

### Check Vercel Logs
1. In your Vercel dashboard, go to **"Logs"**
2. Look for these messages:
   - ✅ `📤 Preparing email for: [email]`
   - ✅ `✅ Email sent to [email]`
   - ❌ If you see errors, they'll show the exact problem

---

## ⚠️ Important: Domain Verification

**Your emails might still fail** if your domain isn't verified with Resend!

### Current Email Address
Your app is trying to send from: `orders@apexsupplierlinks.com`

### You Need To:
1. **Verify this domain with Resend** (see `EMAIL_SETUP_GUIDE.md`)
2. OR **Use Resend's test domain** temporarily:
   - Change the "from" email in `lib/email-templates.ts` line 89
   - From: `'Apex Vendors <orders@apexsupplierlinks.com>'`
   - To: `'Apex Vendors <onboarding@resend.dev>'`

The test domain `onboarding@resend.dev` works immediately without verification!

---

## 🎯 Quick Fix: Use Test Domain Now

If you want emails working RIGHT NOW, do this:

1. Open `lib/email-templates.ts`
2. Change line 89 from:
   ```typescript
   from: 'Apex Vendors <orders@apexsupplierlinks.com>',
   ```
   To:
   ```typescript
   from: 'Apex Vendors <onboarding@resend.dev>',
   ```
3. Commit and push
4. Vercel will auto-deploy
5. Test again - emails should work!

Later, you can verify your custom domain and switch back.

---

## 📊 What You'll See in Logs

### Success:
```
🎉 Payment Intent Succeeded!
📧 Email from receipt_email: customer@email.com
📦 Product ID: labu
✅ All data present, sending email...
📤 Preparing email for: customer@email.com
📎 Attaching PDF: labu-instructions.pdf
✅ Email sent to customer@email.com with PDF attachment
✅ Resend result: { id: 'xxx-xxx-xxx' }
```

### Failure (Domain Not Verified):
```
❌ Failed to send email: Error
❌ Error message: Domain not verified
```

---

## Need Help?

If emails still don't work after adding environment variables:
1. Check the Vercel logs for the exact error
2. Make sure you redeployed after adding variables
3. Try using `onboarding@resend.dev` as a quick test
4. Verify your domain with Resend (see `EMAIL_SETUP_GUIDE.md`)

