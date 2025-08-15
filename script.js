// NannyProvider.PH - unified script (v6)
document.addEventListener('DOMContentLoaded', function () {
  var skip = document.getElementById('skipBtn') || document.getElementById('skip-btn');
  if (skip) {
    skip.addEventListener('click', function () {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'skip_form_click' });
      try { localStorage.setItem('nanny_skip_form', 'true'); } catch (e) {}
      window.location.href = 'welcome.html';
    });
  }
  var path = (window.location.pathname || '');
  var isIndexLike = /(^|\/)index\.html$/.test(path) || /\/$/.test(path);
  if (isIndexLike) {
    try {
      if (localStorage.getItem('nanny_skip_form') === 'true') {
        window.location.href = 'welcome.html';
      }
    } catch (e) {}
  }
  function sendVirtualPageview(p, t) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'virtual_pageview', page_path: p, page_title: t });
    } catch (e) {}
  }
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'page_meta', page_path: (location.pathname.split('/').pop() || 'index.html'), page_title: document.title });
  } catch (e) {}
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () {
      var href = a.getAttribute('href') || '';
      if (!href || /^https?:\/\//i.test(href)) return;
      var title = (a.textContent || '').trim();
      sendVirtualPageview(href, title);
    });
  });
  var car = document.querySelector('.carousel');
  if (car) {
    var slides = car.querySelector('.slides');
    var slideEls = Array.from(car.querySelectorAll('.slide'));
    var prev = car.querySelector('.prev, .ctrl.prev');
    var next = car.querySelector('.next, .ctrl.next');
    var dotsWrap = car.querySelector('.dots');
    var idx = 0;
    function buildDots(){
      if (!dotsWrap) return;
      dotsWrap.innerHTML='';
      slideEls.forEach(function(_,i){
        var b=document.createElement('button');
        b.className='dot'+(i===0?' active':'');
        b.addEventListener('click',function(){ go(i); });
        dotsWrap.appendChild(b);
      });
    }
    function go(i){
      idx=(i+slideEls.length)%slideEls.length;
      slides.style.transform='translateX('+(-idx*100)+'%)';
      if (dotsWrap){ dotsWrap.querySelectorAll('.dot').forEach(function(d,k){ d.classList.toggle('active',k===idx); }); }
      try{ window.dataLayer.push({event:'carousel_slide_change', slide_index:idx, slide_count:slideEls.length}); }catch(e){}
    }
    if (prev) prev.addEventListener('click', function(){ go(idx-1); });
    if (next) next.addEventListener('click', function(){ go(idx+1); });
    buildDots(); go(0);
  }
});
