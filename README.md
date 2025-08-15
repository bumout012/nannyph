# NannyProvider.PH — Forms wired to Google Sheets (Apps Script)

This repo is set up to submit directly to your Apps Script Web App endpoint:

```
https://script.google.com/macros/s/AKfycbzuwXu-N_HIrjDjblac2E31snJ-z_YhaEvpjSGoBW8-TvzQ9ukTROiCA1yIETrvcEZM/exec
```

## Live pages in this repo

- `index.html` — **Two separate forms** (Looking for a maid / Jobseeker). Each submits independently to the endpoint above and then redirects to `thank-you.html`.
- `thank-you.html` — Thank you screen with auto-redirect to `welcome.html` after 30 seconds.
- `welcome.html` — Home page with header/nav and CTA.

> **Important:** Earlier drafts mentioned `custom-form.html`. That file is **not used**. Please remove any links to `custom-form.html` or older endpoints.

## Tracking

Both pages already include:
- **Google Tag Manager:** `GTM-T3H6DRN4`
- **Google Analytics 4:** `G-2Y3XFZ1LN7`

Events pushed:
- `custom_form_submit_attempt`, `custom_form_submit_success`, `custom_form_submit_error`, `custom_form_invalid`
- `thank_you_view` (with `status` and `type` query params if present)

## Apps Script notes

Your Apps Script should accept **multipart/form-data** (from `FormData`) or handle generic POST data.
A minimal handler that reads fields and appends to `Sheet1` looks like this:

```javascript
const SHEET_NAME = 'Sheet1'; // change if needed

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    var data = {};
    if (e.parameter) {
      // Handles multipart/form-data & x-www-form-urlencoded
      data = e.parameter;
    } else if (e.postData && e.postData.contents) {
      // Optional: if you later send JSON, parse here
      data = JSON.parse(e.postData.contents);
    }
    sheet.appendRow([
      new Date(),
      data.type || '',
      data.name || '',
      data.email || '',
      data.phone || '',
      data.comments || ''
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

**Deploy** the Apps Script as **Web app** with:
- *Execute as:* **Me**
- *Who has access:* **Anyone**

If you redeploy and the URL changes, update `index.html` → `NP_ENDPOINT` in the inline script.

## GitHub Pages

- Custom domain: `www.nannyprovider.com.ph`
- Root redirect: Cloudflare `A` records at apex and `CNAME` for `www` to your GitHub Pages.
- After uploading changes, hard refresh your browser (Cmd/Ctrl + Shift + R).

## What to remove if you see conflicts

- Any old `README.md` that references `custom-form.html` or the old endpoint.
- Any stray `custom-form.html` file.
- Old `thank-you.html` variants without the auto-redirect.

---

If you want me to add the same header/nav and polish to `about.html`, `mission.html`, and `contact.html`, say the word and I’ll generate an updated bundle.
