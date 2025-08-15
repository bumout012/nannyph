# NannyProvider.PH — Full Backup (Welcome-first)

This package makes **Welcome** the landing page (via `index.html` redirect), includes a **quick form** in the hero, and links to the **full two-section form** at `custom-form.html`.

**Apps Script endpoint:**  
```
https://script.google.com/macros/s/AKfycbwXbPKhXxRa5K2MwlHw-3qnklwTIzTT82_S973h3cm3CveG5hYKBY1J498_Uq2j90SX/exec
```

## Files
- `index.html` — Redirects to `welcome.html` so Welcome shows first.
- `welcome.html` — Home with quick inquiry form (submits to Apps Script) + CTAs to Contact and Full Form.
- `custom-form.html` — Full form (two separate sections, each submits independently).
- `thank-you.html` — Thank you screen, auto-redirects to Welcome after 30 seconds.
- `about.html`, `mission.html`, `contact.html` — Static pages with unified header/nav.
- `styles.css`, `script.js` — Shared styling and minimal JS.
- *(CNAME not included — keep separate for domain routing as needed.)*

## Tracking
- **GTM:** `GTM-T3H6DRN4`
- **GA4:** `G-2Y3XFZ1LN7`

Events used:
- `welcome_cta_click`, `nav_click`, `custom_form_submit_attempt`, `custom_form_submit_success`, `custom_form_submit_error`, `custom_form_invalid`

## Notes
- If you redeploy the Apps Script and the URL changes, update the constant in `welcome.html` (NP_ENDPOINT) and in `custom-form.html` (ENDPOINT).
- After uploading to GitHub Pages, hard refresh (Cmd/Ctrl+Shift+R) to bust cache.
