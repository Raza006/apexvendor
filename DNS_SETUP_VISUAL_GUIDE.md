# 🌐 DNS SETUP VISUAL GUIDE - Cloudflare + Resend

This is a visual guide showing you **exactly** what to do in Cloudflare to verify your domain with Resend.

---

## 📍 WHERE TO GO

### Step 1: Get DNS Records from Resend
1. Go to: **https://resend.com/login**
2. Click **"Domains"** (left sidebar)
3. Click **"Add Domain"**
4. Enter: `apexsupplierlinks.com`
5. Click **"Add"**

You'll see a screen showing 3 DNS records. **Keep this page open!**

---

## 📝 WHAT THE RECORDS LOOK LIKE

Resend will show you something like this:

### Record 1: SPF
```
Type: TXT
Name: @ (or apexsupplierlinks.com)
Value: v=spf1 include:_spf.resend.com ~all
```

### Record 2: DKIM
```
Type: TXT
Name: resend._domainkey.apexsupplierlinks.com
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC... (long string)
```

### Record 3: DMARC
```
Type: TXT
Name: _dmarc.apexsupplierlinks.com
Value: v=DMARC1; p=none; rua=mailto:dmarc@resend.com
```

**Note**: Your actual values will be different! Copy them exactly from Resend.

---

## 🔧 HOW TO ADD THEM IN CLOUDFLARE

### Step 2: Go to Cloudflare
1. Go to: **https://dash.cloudflare.com**
2. Click on your domain: **apexsupplierlinks.com**
3. Click **"DNS"** in the left sidebar
4. You'll see a list of existing DNS records

---

### Step 3: Add Record 1 (SPF)

Click **"Add record"** button and fill in:

```
┌─────────────────────────────────────────┐
│ Type: TXT                               │
├─────────────────────────────────────────┤
│ Name: @                                 │
│       (or just leave it as your domain) │
├─────────────────────────────────────────┤
│ Content: v=spf1 include:_spf.resend.com │
│          ~all                           │
│          (copy from Resend)             │
├─────────────────────────────────────────┤
│ TTL: Auto                               │
├─────────────────────────────────────────┤
│ Proxy status: DNS only (gray cloud)     │
└─────────────────────────────────────────┘
```

Click **"Save"**

---

### Step 4: Add Record 2 (DKIM)

Click **"Add record"** again:

```
┌─────────────────────────────────────────┐
│ Type: TXT                               │
├─────────────────────────────────────────┤
│ Name: resend._domainkey                 │
│       (copy exactly from Resend)        │
│       (might be different format)       │
├─────────────────────────────────────────┤
│ Content: p=MIGfMA0GCSqGSIb3DQEBAQUAA... │
│          (long string - copy all of it) │
├─────────────────────────────────────────┤
│ TTL: Auto                               │
├─────────────────────────────────────────┤
│ Proxy status: DNS only (gray cloud)     │
└─────────────────────────────────────────┘
```

Click **"Save"**

---

### Step 5: Add Record 3 (DMARC)

Click **"Add record"** one more time:

```
┌─────────────────────────────────────────┐
│ Type: TXT                               │
├─────────────────────────────────────────┤
│ Name: _dmarc                            │
├─────────────────────────────────────────┤
│ Content: v=DMARC1; p=none;              │
│          rua=mailto:dmarc@resend.com    │
│          (copy from Resend)             │
├─────────────────────────────────────────┤
│ TTL: Auto                               │
├─────────────────────────────────────────┤
│ Proxy status: DNS only (gray cloud)     │
└─────────────────────────────────────────┘
```

Click **"Save"**

---

## ✅ VERIFY IN RESEND

### Step 6: Check Verification
1. Go back to Resend dashboard
2. Find your domain: `apexsupplierlinks.com`
3. Click **"Verify Records"** or refresh the page
4. Wait 5-15 minutes (sometimes up to 48 hours)
5. You should see **green checkmarks ✅** next to each record when verified

---

## 🎯 WHAT SUCCESS LOOKS LIKE

In Resend, you should see:

```
Domain: apexsupplierlinks.com
Status: ✅ Verified

Records:
✅ SPF     - Verified
✅ DKIM    - Verified  
✅ DMARC   - Verified
```

---

## ⚠️ COMMON MISTAKES

### Mistake 1: Extra Spaces
❌ `v=spf1 include:_spf.resend.com ~all ` (extra space at end)
✅ `v=spf1 include:_spf.resend.com ~all`

### Mistake 2: Wrong Name Field
❌ Name: `resend._domainkey.apexsupplierlinks.com` (full domain)
✅ Name: `resend._domainkey` (Cloudflare adds domain automatically)

### Mistake 3: Proxy Enabled
❌ Proxy status: Proxied (orange cloud)
✅ Proxy status: DNS only (gray cloud)

### Mistake 4: Incomplete DKIM Value
❌ Content: `p=MIGfMA0GCSqGSIb3...` (truncated)
✅ Content: Copy the **entire** long string from Resend

---

## 🔍 HOW TO CHECK IF IT'S WORKING

### Option 1: Wait for Resend
- Just wait and check Resend dashboard
- Green checkmarks = success!

### Option 2: Use DNS Checker Tool
1. Go to: https://dnschecker.org
2. Enter your domain: `apexsupplierlinks.com`
3. Select "TXT" record type
4. Click "Search"
5. You should see your SPF record propagated globally

### Option 3: Use Command Line (Advanced)
```bash
# Check SPF
nslookup -type=txt apexsupplierlinks.com

# Check DKIM
nslookup -type=txt resend._domainkey.apexsupplierlinks.com

# Check DMARC
nslookup -type=txt _dmarc.apexsupplierlinks.com
```

---

## ⏱️ HOW LONG DOES IT TAKE?

| Timeframe | What to Expect |
|-----------|----------------|
| 5-15 minutes | Most common - records verify quickly |
| 1-2 hours | Sometimes DNS takes a bit longer |
| 24-48 hours | Rare, but can happen for full global propagation |

**Tip**: If it's been over 48 hours and still not verified, double-check your DNS records in Cloudflare for typos.

---

## 🆘 TROUBLESHOOTING

### "SPF record not found"
- Check that Name is `@` or your domain name
- Check that Content starts with `v=spf1`
- Make sure there are no extra spaces

### "DKIM record not found"
- Check that Name is exactly what Resend shows
- Cloudflare might auto-add the domain, so use just `resend._domainkey`
- Make sure you copied the entire long string

### "DMARC record not found"
- Check that Name is `_dmarc`
- Check that Content starts with `v=DMARC1`

### Still not working?
1. Delete the records in Cloudflare
2. Wait 5 minutes
3. Add them again (carefully!)
4. Wait another 15 minutes
5. Check Resend again

---

## 📞 NEED HELP?

- **Resend Support**: https://resend.com/support
- **Cloudflare Support**: https://support.cloudflare.com
- **DNS Checker**: https://dnschecker.org

---

## ✅ CHECKLIST

Before moving on:
- [ ] Logged into Resend
- [ ] Added domain `apexsupplierlinks.com` to Resend
- [ ] Copied all 3 DNS records from Resend
- [ ] Logged into Cloudflare
- [ ] Selected domain `apexsupplierlinks.com`
- [ ] Added SPF record (TXT, Name: @)
- [ ] Added DKIM record (TXT, Name: resend._domainkey)
- [ ] Added DMARC record (TXT, Name: _dmarc)
- [ ] Clicked "Verify Records" in Resend
- [ ] Waiting for green checkmarks ✅

---

**Once you see green checkmarks in Resend, you're ready to move to the next step!** 🎉

See **NEXT_STEPS.md** for what to do after domain verification.

