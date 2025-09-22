# NannyProvider.PH — Deployment Bundle (Single TikTok link)

## Pages
- `welcome.html` (Home — with TikTok embed + Quick Inquiry)
- `mission.html` (Mission and Vision — *fit-to-screen* image, no cropping)
- `contact.html`
- `index.html` and `custom-form.html` (forms POST to FormSubmit → `thank-you.html`)
- `thank-you.html` (overlay background, 30s redirect + "Return to Home" CTA)
- `styles.css`
- `tracking/gtm_nannyproviderph_cta_clicks_ga4.json`
- `CNAME` (www.nannyprovider.com.ph)

## Tracking
- GA4: G-2Y3XFZ1LN7 (in `<head>`)
- GTM: GTM-T3H6DRN4 (in `<head>` + `<body>` noscript)
- CTA clicks via `data-cta` attributes site-wide

## Social banner
- Footer banner now uses **single TikTok** link only:
  - `https://www.tiktok.com/@nannyprovider.ph`
- Banner included on **Home**, **Mission**, **Contact** (forms and thank-you excluded).

