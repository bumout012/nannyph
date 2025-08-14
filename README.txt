NannyProvider.PH — Form to Google Sheets (Apps Script)
===========================================================

This package is pre-wired to your Apps Script endpoint:
https://script.google.com/macros/s/AKfycbxud-hOtKh1I6eqjTzlvPd4beHKL6rcWHblHBoHM3Y/exec

Files:
- custom-form.html  (two sections: looking for a maid, jobseeker; posts JSON to Apps Script)
- thank-you.html    (your image as the full backdrop + 30s redirect to Home)

Both pages already include:
- Google Tag Manager: GTM-T3H6DRN4
- Google Analytics 4: G-2Y3XFZ1LN7

Google Apps Script (for reference)
----------------------------------------------------------
Make sure your Apps Script (Code.gs) parses JSON and writes to your Sheet.
If you used the code I provided earlier, you're set. Web app access must be "Anyone".

If you need the minimal handler again, here it is:

function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

const SHEET_NAME = 'Sheet1'; // update if your tab is named differently

function doPost(e) {
  try {
    var body = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {}
    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    ss.appendRow([new Date(), body.type || '', body.name || '', body.email || '', body.phone || '', body.comments || '']);
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false, error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}

Publishing
----------------------------------------------------------
1) Upload custom-form.html and thank-you.html to your GitHub repo (root).
2) Visit /custom-form.html, submit a test, verify a row appears in your Sheet.
3) You can link to this form from your site's nav.
