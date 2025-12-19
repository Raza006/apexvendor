# 🔍 Debug Email Issue - Step by Step

## ✅ What We Know
- ✅ Resend is working (test email went through)
- ✅ Stripe webhooks are being received (200 OK responses)
- ❌ Real purchases don't trigger emails

## 🎯 Most Likely Issue

**The RESEND_API_KEY is probably not set in Vercel!**

Even though you set up environment variables before, double-check this specific one.

---

## 📋 Step 1: Verify Vercel Environment Variables

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project: **apexvendor**
3. Go to **Settings** → **Environment Variables**
4. **CHECK if these exist:**
   - ✅ `RESEND_API_KEY` = `re_MX2DHbSt_5tEQfoHYZs2X2tjdJSusGA1X`
   - ✅ `NEXT_PUBLIC_URL` = `https://apexvendor.vercel.app` (or your domain)
   - ✅ `STRIPE_SECRET_KEY` = (your key)
   - ✅ `STRIPE_WEBHOOK_SECRET` = (your key)

5. **If RESEND_API_KEY is missing, ADD IT:**
   - Key: `RESEND_API_KEY`
   - Value: `re_MX2DHbSt_5tEQfoHYZs2X2tjdJSusGA1X`
   - Check all three boxes (Production, Preview, Development)
   - Click Save

6. **After adding, you MUST redeploy:**
   - Go to **Deployments** tab
   - Click **three dots (...)** on latest deployment
   - Click **Redeploy**

---

## 📋 Step 2: Make a Test Purchase & Check Logs

After Vercel redeploys (wait 1-2 minutes):

1. Go to your live site: `https://apexvendor.vercel.app`
2. Make a test purchase (use test card: `4242 4242 4242 4242`)
3. **Immediately go to Vercel Logs:**
   - In Vercel dashboard → **Logs** tab
   - Filter by "All Functions" or search for `/api/webhook`

### What to Look For in Logs:

#### ✅ GOOD (Email should work):
```
🔔 WEBHOOK CALLED!
📨 Webhook Event Type: payment_intent.succeeded
🎉 Payment Intent Succeeded!
📦 Product ID: labu
📦 Product found: Labu Supplier
🧪 TEST MODE: Forcing email to raza.ad2006@gmail.com
✅ Product found, sending test email...
📤 Preparing email for: raza.ad2006@gmail.com
✅ Email sent to raza.ad2006@gmail.com
📧 Test email sent successfully to: raza.ad2006@gmail.com
```

#### ❌ BAD (RESEND_API_KEY missing):
```
🔔 WEBHOOK CALLED!
📨 Webhook Event Type: payment_intent.succeeded
🎉 Payment Intent Succeeded!
⚠️ RESEND_API_KEY missing. logging email to console instead.
```

#### ❌ BAD (Product not found):
```
🔔 WEBHOOK CALLED!
📨 Webhook Event Type: payment_intent.succeeded
🎉 Payment Intent Succeeded!
📦 Product ID: undefined
❌ Product not found!
```

---

## 📋 Step 3: Check Your Email

If logs show "✅ Email sent successfully", check `raza.ad2006@gmail.com`:
- Check inbox
- **Check SPAM folder!** (Resend emails sometimes go to spam first time)
- Check Promotions tab (if using Gmail)

---

## 🔧 Quick Fixes Based on Logs

### If you see: "⚠️ RESEND_API_KEY missing"
**Fix:** Add `RESEND_API_KEY` to Vercel environment variables and redeploy

### If you see: "❌ Product not found"
**Fix:** The product metadata isn't being set properly. Check Stripe logs.

### If you see: "❌ Email sending failed"
**Fix:** Look at the error message. Usually it's:
- Domain not verified (already fixed - using onboarding@resend.dev)
- Rate limit hit (wait 1 minute)
- Invalid email format

### If you DON'T see "🔔 WEBHOOK CALLED!" at all
**Fix:** Webhook isn't configured in Stripe. Check Stripe Dashboard → Webhooks

---

## 🚨 Most Important Step

**Go to Vercel → Settings → Environment Variables RIGHT NOW** and verify `RESEND_API_KEY` exists!

If it doesn't exist, the email function returns early without sending anything, which would explain why Resend doesn't show the email but the webhook succeeds.

---

## 📞 What to Send Me

After you make another test purchase, send me:
1. Screenshot of Vercel function logs for the webhook
2. Confirmation if `RESEND_API_KEY` was in Vercel settings
3. Whether email arrived (check spam!)

