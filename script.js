
// GTM helpers
window.dataLayer = window.dataLayer || [];
function pushEvent(name, payload){
  try { window.dataLayer.push(Object.assign({event:name}, payload||{})); }
  catch(e){}
}

// CTA clicks (buttons & primary links)
document.addEventListener('click', function(e){
  const a = e.target.closest('a.btn, a.go, .cta-banner a');
  if (!a) return;
  pushEvent('cta_click', {
    href: a.getAttribute('href') || '',
    text: (a.textContent || '').trim(),
    page: location.pathname.split('/').pop() || 'index.html'
  });
}, {capture:true});

// Form submit attempts (before leaving page)
document.addEventListener('submit', function(e){
  const form = e.target;
  if (!(form instanceof HTMLFormElement)) return;

  // identify form role by hidden "type" or heading text nearby
  const typeField = form.querySelector('input[name="type"]');
  let formType = typeField ? typeField.value : '';
  if (!formType){
    const h = form.closest('section, .form-card')?.querySelector('h2,h3');
    formType = h ? (h.textContent || '').trim() : 'unknown';
  }

  // push attempt
  pushEvent('form_submit_attempt', {
    form_type: formType,
    page: location.pathname.split('/').pop() || 'index.html'
  });

  // After native submit, we won't know success; rely on thank-you page view
}, {capture:true});

// On thank-you page, push a dedicated event
document.addEventListener('DOMContentLoaded', function(){
  if ((location.pathname || '').toLowerCase().indexOf('thank-you.html') !== -1){
    pushEvent('thank_you_view', {
      referrer: document.referrer || ''
    });
  }
});
