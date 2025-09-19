# NannyProvider.PH — Full Test Bundle (Tracking + GTM Events)

- **GA4**: G-2Y3XFZ1LN7 (head), **GTM**: GTM-T3H6DRN4 (head + noscript in body) on every page.
- **Events pushed via script.js**:
  - `cta_click` — for any primary buttons/links
  - `form_submit_attempt` — on any form submission (before navigation)
  - `thank_you_view` — when the thank-you page loads
- Forms submit to email via **FormSubmit** (`nanny.provider1@gmail.com`) and redirect to `thank-you.html` then `index.html` in 30s.
