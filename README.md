NannyProvider.PH — Full Test Bundle (GA4 + GTM included)

Default landing: index.html (Welcome + Quick Inquiry). Skip to Home without submitting. 
All forms send to email via FormSubmit → nanny.provider1@gmail.com and then redirect to thank-you.html.

Files:
- index.html (welcome + quick form)
- custom-form.html (two independent sections, both email → thank-you)
- thank-you.html (generic helper background, auto-redirect to Home in 30s)
- welcome.html, about.html, mission.html, contact.html, team.html
- styles.css

Tracking:
- Google Tag Manager: GTM-T3H6DRN4
- Google Analytics 4: G-2Y3XFZ1LN7


## Form Submission (POST) & Troubleshooting

All forms use **method="POST"** and submit to **https://formsubmit.co/** with UTF-8 encoding.
If you see an error when submitting:
1) Make sure the first-ever submission to your email has been **verified** (FormSubmit sends a verification email).
2) Test from an HTTPS host (e.g., GitHub Pages) instead of local `file://` if your browser blocks mixed context.
3) Confirm hidden fields exist: `_next`, `_subject`, `_captcha=false`, `_template=table`.
4) Check that your ad blockers or privacy extensions aren't blocking `formsubmit.co`.
5) Ensure required fields are filled; the page has client-side validation enabled.


## Home Page (welcome.html)

The Home page now combines:
- Intro + About content
- Quick Inquiry form (POST → thank-you.html)
- Services section
- How it works section
- Testimonials ("What families say")
- CTA banner: "Ready to begin?" with link to full form

## Thank You Page

After submitting any form:
- Redirects to thank-you.html
- Shows countdown (30s) then auto-redirects to Home
- Includes a subtle "Return to Home" CTA button under the message

## GA4 & GTM coverage
GA4 (**G-2Y3XFZ1LN7**) and GTM (**GTM-T3H6DRN4**) are injected on **all pages** via the shared `head_block` template, including the `<noscript>` GTM iframe.


## Navigation & Pages
- **Home (welcome.html)** — Introduction + Quick Inquiry + About + Services + How it works + Testimonials + CTA banner to Full Form
- **Form (custom-form.html)** — Two separate forms: “Looking for a maid” and “Jobseeker” (both POST to FormSubmit and redirect to Thank You)
- **Thank You (thank-you.html)** — Countdown + Return to Home CTA
- **Mission & Vision (mission.html)**, **Contact (contact.html)**, **Team (team.html)**
- **About** is removed from nav and merged into **Home**


## Tracking Note
Both **Google Analytics 4 (GA4: G-2Y3XFZ1LN7)** and **Google Tag Manager (GTM: GTM-T3H6DRN4)** are included on **all pages**:
- index.html (Form)
- welcome.html (Home)
- custom-form.html (Full Form)
- thank-you.html (Thank You)
- mission.html, contact.html, team.html

This includes both the script snippet in `<head>` and the `<noscript>` fallback in `<body>`.


### Analytics Coverage Note
Google Analytics 4 (GA4) and Google Tag Manager (GTM) are present on **all pages**, including **Form** pages and the **Thank You** page. They are injected by the shared `head_block()` template (head script + body `<noscript>`).
