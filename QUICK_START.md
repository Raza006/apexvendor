# ⚡ QUICK START - 3 Simple Steps

## What's Already Done ✅
- Your Resend API key is configured
- Your domain (apexsupplierlinks.com) is set in the code
- All Vendor Bundle PDF is ready to send
- Code is configured to send PDFs only for 2 products

---

## 🎯 DO THESE 3 THINGS:

### 1️⃣ Add Your Second PDF (2 minutes)
Put your **Clothing Bundle instructions PDF** in the `public/pdfs/` folder and name it:
```
clothing-instructions.pdf
```

### 2️⃣ Verify Domain in Resend + Cloudflare (20 minutes)
1. Go to https://resend.com → Add domain: `apexsupplierlinks.com`
2. Copy the 3 DNS records (SPF, DKIM, DMARC)
3. Go to https://dash.cloudflare.com → Add those 3 records
4. Wait for verification (green checkmark in Resend)

### 3️⃣ Update Vercel & Deploy (5 minutes)
1. Go to https://vercel.com → Your project → Settings → Environment Variables
2. Add/Update: `RESEND_API_KEY` = `re_MX2DHbSt_5tEQfoHYZs2X2tjdJSusGA1X`
3. Go to Deployments → Redeploy

---

## 🧪 Test It
Buy the **All Vendor Bundle** → Check email → Should have PDF attached!

---

**Need detailed instructions?** Open `NEXT_STEPS.md` for the complete step-by-step guide.

