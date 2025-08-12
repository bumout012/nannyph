
// Mobile nav toggle (merge)
document.addEventListener('DOMContentLoaded', function(){
  var t = document.querySelector('.nav-toggle');
  var n = document.querySelector('#site-nav') || document.querySelector('.nav');
  if (t && n){
    t.addEventListener('click', function(){
      var open = n.classList.toggle('is-open');
      t.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Optional: track skip button click if ID present
  var skip = document.getElementById('skip-btn');
  if (skip){
    skip.addEventListener('click', function(){
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event:'skip_form_click'});
    });
  }
});
