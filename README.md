NannyProvider.PH — Site Bundle (GA4 + GTM + TikTok + Chat)

- GA4: G-2Y3XFZ1LN7
- GTM: GTM-T3H6DRN4
- Forms post via FormSubmit to: nanny.provider1@gmail.com
- Address: 206 Casa Susana Building, 1121 Pedro Gil St., Paco Manila

Pages
- index.html — Custom Form (Looking for a maid / Jobseeker)
- welcome.html — Home (Quick Inquiry, TikTok, About, Services, How it works, Testimonials, CTA to Full Form)
- mission.html — Mission and Vision
- contact.html — Contact + Map + Get Directions + TikTok + Follow us
- team.html — Team (4 placeholders) + TikTok + Follow us
- thank-you.html — Countdown 30s with Return to Home CTA

Behavior
- First-visit gate: non-form pages redirect once to index.html (localStorage: np_first_seen)
- _next redirect in forms is made absolute at runtime for reliability
- CTA click tracking: any link with data-cta pushes 'cta_click' into dataLayer

