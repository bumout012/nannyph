NannyProvider.PH — Production Bundle (GA4 + GTM + TikTok + Chat)

GA4: G-2Y3XFZ1LN7
GTM: GTM-T3H6DRN4
Forms → FormSubmit: nanny.provider1@gmail.com
Address: 206 Casa Susana Building, 1121 Pedro Gil St., Paco Manila

Pages
- index.html — Custom Form (two sections, method="POST")
- welcome.html — Home (two-column hero with TikTok on the left and Quick Inquiry form on the right; plus Services, How it works, Testimonials, CTA)
- mission.html — Mission and Vision
- contact.html — Contact + Map + Get Directions + TikTok + Follow us
- team.html — Team (4 placeholders) + TikTok + Follow us
- thank-you.html — 30s countdown + "Return to Home" CTA

Tracking
- GA4 + GTM on every page
- dataLayer events for all CTAs (attribute data-cta) including social, TikTok watch, Return to Home

Extras
- Support chat widget (emails to nanny.provider1@gmail.com, tracked: chat_open, chat_send)
- CNAME: nannyprovider.ph (edit as needed for your host)

---

## Deployment

### Option A — GitHub Pages (recommended for quick tests)
1. Create a new repo (e.g., `nannyproviderph-site`) and push all files from this ZIP.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch (e.g., `main`) and folder **/ (root)**. Save.
5. If you have a custom domain, set **Custom domain** to `nannyprovider.ph` and add the **CNAME** record at your DNS provider to point to `<yourusername>.github.io`.
6. In your repo, keep the `CNAME` file at the repo root with exactly: `nannyprovider.ph`.
7. Wait a few minutes; site becomes available at your domain. (HTTPS/SSL auto-provisions.)

### Option B — Cloudflare Pages (great for custom domains)
1. Go to **Cloudflare Pages → Create a project → Upload**.
2. Drag the contents of this ZIP (the files themselves, not the folder) into the upload area.
3. For **Build settings**, choose **No build** (static site).
4. After deploy, go to the project **Custom domains** and add `nannyprovider.ph`.
5. Cloudflare will guide you to add the proper DNS records (CNAME to `pages.dev`). Enable **Always Use HTTPS**.

### GTM Import (sample)
- If you want to import the sample GTM container JSON, open **Google Tag Manager → Admin → Import Container** and select:
  - **Container file**: `tracking/gtm_nannyproviderph_cta_clicks_ga4.json`
  - **Workspace**: Default (or create a new one)
  - **Import option**: *Merge*
- If import fails due to format, create manually:
  1. **Variables → New → Event Parameter** for each: `cta_id`, `cta_href`, `cta_text`, `page_title`, `page_location`.
  2. **Triggers → New → Custom Event** with Event name `cta_click`.
  3. **Tags → New → GA4 Event**: Measurement ID `G-2Y3XFZ1LN7`, Event name `cta_click`, add parameters mapping to those variables. Trigger: the **CTA Click** event.
  4. **Submit** and **Publish** in GTM.
- Verify events in GA4 **DebugView** while clicking any element with `data-cta` attributes.

### Notes
- All pages already include **GA4** (`G-2Y3XFZ1LN7`) and **GTM** (`GTM-T3H6DRN4`).
- `CNAME` file is included at the root; adjust contents if your live domain is different.
- Forms post to FormSubmit and then redirect to `thank-you.html` (which auto-redirects to Home after 30s).
- Support Chat widget emails to `nanny.provider1@gmail.com` and tracks opens/sends via GTM.
