# NannyProvider.PH — Site Bundle (GA4 + GTM)

**Live domain (CNAME)**: `www.nannyprovider.com.ph`

## Contents
- `welcome.html` (Home — reordered; agency image 500px desktop / 300px mobile)
- `index.html` (Form landing — client + jobseeker)
- `custom-form.html` (Full form — client + jobseeker)
- `thank-you.html` (redirects to Home after 30s; includes 'Return to Home' CTA)
- `mission.html` (Mission and Vision)
- `contact.html` (Contact + Map)
- `styles.css`
- `tracking/gtm_nannyproviderph_cta_clicks_ga4.json`
- `CNAME` (www.nannyprovider.com.ph)

> **Note:** Team page has been intentionally **removed** per request.

## Tracking
- **GA4**: G-2Y3XFZ1LN7
- **GTM**: GTM-T3H6DRN4
- CTA click tracking included on all pages via a small dataLayer script.
- All forms use `method="POST"` to FormSubmit and redirect to `thank-you.html` (absolute URL enforced client-side).

## Social Banners
- Footer “Follow us” banner is included on **Home**, **Mission and Vision**, and **Contact**.
- It is intentionally **excluded** from **forms** (index, custom-form) and **thank-you**.

## Deployment
### Cloudflare Pages
1. Create a new Pages project and upload repository or these files.
2. Build settings: **No build** (static site).
3. Add custom domain: `www.nannyprovider.com.ph` and follow DNS instructions (CNAME to `pages.dev`).
4. Keep `CNAME` file at repo root with the same hostname.

### GitHub Pages (optional)
1. Push all files to a repo; keep `CNAME` with `www.nannyprovider.com.ph` at root.
2. Settings → Pages → Deploy from branch (root).
3. Add DNS records at your DNS provider (CNAME `www` → `<user>.github.io` or use Cloudflare).

## Verify
- Use GA4 DebugView or Tag Assistant to confirm pageviews and `cta_click` events.
- Test a form submission; you should land on `thank-you.html` then auto-redirect to Home in 30s.
