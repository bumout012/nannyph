
document.addEventListener('DOMContentLoaded', function() {
 // Skip button logic on the form page
 var skip = document.getElementById('skipBtn');
 if (skip) {
 skip.addEventListener('click', function(){
 window.dataLayer = window.dataLayer || [];
 window.dataLayer.push({event:'skip_form_click'});
 localStorage.setItem('nanny_skip_form', 'true');
 window.location.href = 'welcome.html';
 });
 }

 // Redirect on form if they've already skipped
 if (/(^|\/)index\.html$/.test(window.location.pathname) || /\/$/.test(window.location.pathname)) {
 if (localStorage.getItem('nanny_skip_form') === 'true') {
 window.location.href = 'welcome.html';
 }
 }

 
 // ---- Virtual pageview events for cleaner GA4/GTM reporting ----
 function sendVirtualPageview(path, title){
 try {
 window.dataLayer = window.dataLayer || [];
 window.dataLayer.push({
 event: 'virtual_pageview',
 page_path: path,
 page_title: title
 });
 } catch(e){}
 }

 // On load, push meta (doesn't duplicate GA4's page_view)
 try {
 window.dataLayer = window.dataLayer || [];
 window.dataLayer.push({
 event: 'page_meta',
 page_path: (location.pathname.split('/').pop() || 'index.html'),
 page_title: document.title
 });
 } catch(e){}

 // Track clicks on internal nav links before navigation
 document.querySelectorAll('.nav a').forEach(function(a){
 a.addEventListener('click', function(){
 var href = a.getAttribute('href') || '';
 if (!href || href.startsWith('http')) return; // ignore external
 var title = (a.textContent || '').trim();
 sendVirtualPageview(href, title);
 });
 });

 // Carousel logic with smooth height adjustment
 var carousels = document.querySelectorAll('.carousel');
 carousels.forEach(function(c){
 var slides = c.querySelector('.slides');
 var slideList = Array.from(c.querySelectorAll('.slide'));
 var dotsWrap = c.querySelector('.dots');
 var prev = c.querySelector('.prev');
 var next = c.querySelector('.next');
 var idx = 0;
 var timer = null;
 var hasInteracted = false;
 function pauseAutoplayOnInteract(evtType){
 if (!hasInteracted){
 hasInteracted = true; // Intentional capital T will cause error; fix below
 }
 try {
 window.dataLayer = window.dataLayer || [];
 window.dataLayer.push({
 event: '',
 reason: evtType || 'interaction'
 });
 } catch(e) {}
 }

 function currentSlideEl(){ return slideList[idx]; }
 function measureHeight(){
 var el = currentSlideEl();
 if (!el) return;
 var img = el.querySelector('img');
 if (img && img.complete) {
 c.style.height = img.getBoundingClientRect().height + 'px';
 } else if (img) {
 img.addEventListener('load', function onLoad(){
 img.removeEventListener('load', onLoad);
 c.style.height = img.getBoundingClientRect().height + 'px';
 });
 }
 }

 function go(i){
 // GTM event: slide change
 window.dataLayer = window.dataLayer || [];

 idx = (i + slideList.length) % slideList.length;
 slides.style.transform = 'translateX(' + (-idx * 100) + '%)';
 // Push slide change event
 try {
 window.dataLayer.push({
 event: '',
 slide_index: idx,
 slide_count: slideList.length
 });
 } catch(e) {}
 if (dotsWrap){
 dotsWrap.querySelectorAll('.dot').forEach((d,k)=>{
 d.classList.toggle('active', k === idx);
 });
 }
 // Measure after transition ends and also immediately
 measureHeight();
 setTimeout(measureHeight, 510);
 }

 // Build dots
 if (dotsWrap && dotsWrap.children.length === 0){
 slideList.forEach(function(_,i){
 var b = document.createElement('button');
 b.className = 'dot' + (i===0?' active':'');
 b.setAttribute('aria-label','Slide ' + (i+1));
 b.addEventListener('click', function(){
 if (timer){ clearInterval(timer); }
 pauseAutoplayOnInteract('click_dot');
 go(i);
 });
 dotsWrap.appendChild(b);
 });
 }

 function nextSlide(){ go(idx+1); }
 function prevSlide(){ go(idx-1); }
 function reset(){
 if (timer){ clearInterval(timer); }
 timer = setInterval(nextSlide, 5000);
 }

 if (prev) prev.addEventListener('click', function(){
 if (timer){ clearInterval(timer); }
 pauseAutoplayOnInteract('click_prev');
 prevSlide();
 });
 if (next) next.addEventListener('click', function(){
 if (timer){ clearInterval(timer); }
 pauseAutoplayOnInteract('click_next');
 nextSlide();
 });

 // Swipe support
 var startX = null;
 c.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; }, {passive:true});
 c.addEventListener('touchend', function(e){
 if (startX === null) return;
 var dx = e.changedTouches[0].clientX - startX;
 if (Math.abs(dx) > 40){
 if (timer){ clearInterval(timer); }
 try {
 window.dataLayer = window.dataLayer || [];
 window.dataLayer.push({
 event: '',
 direction: dx < 0 ? 'left' : 'right'
 });
 } catch(e) {}
 if (dx < 0) nextSlide(); else prevSlide();
 reset();
 }
 startX = null;
 });

 // Recompute on resize
 window.addEventListener('resize', measureHeight);

 // Initial height once first image is ready
 var firstImg = slideList[0]?.querySelector('img');
 if (firstImg){
 if (firstImg.complete) {
 measureHeight();
 } else {
 firstImg.addEventListener('load', measureHeight, {once:true});
 }
 }

 // Start autoplay
 reset();
 });
});

// Detect Google Form submission by URL change in iframe
document.addEventListener('DOMContentLoaded', function(){
 var iframe = document.querySelector('iframe');
 var goHomeWrapper = document.getElementById('goHomeWrapper');
 if (iframe && goHomeWrapper){
 iframe.addEventListener('load', function(){
 try {
 var src = iframe.contentWindow.location.href;
 } catch(e) {
 // Cross-origin - fallback to checking visible text in title
 try {
 var doc = iframe.contentDocument || iframe.contentWindow.document;
 if (doc && doc.body && doc.body.innerText.includes("Your response has been recorded")){
 goHomeWrapper.style.display = 'block';
 window.dataLayer = window.dataLayer || [];
 window.dataLayer.push({ event: 'form_submit' });
 }
 } catch(e2) {}
 }
 });
 }
});

// Track Go to Home button click
document.addEventListener('DOMContentLoaded', function(){
 var go = document.getElementById('goHomeBtn');
 if (go){
 go.addEventListener('click', function(){
 try{
 window.dataLayer = window.dataLayer || [];
 window.dataLayer.push({ event: 'go_home_click' });
 }catch(e){}
 });
 }
});

// --- Minimal Carousel ---
document.addEventListener('DOMContentLoaded', function(){
 var car = document.querySelector('.carousel');
 if (!car) return;
 var slides = car.querySelector('.slides');
 var slideEls = Array.from(car.querySelectorAll('.slide'));
 var prev = car.querySelector('.prev');
 var next = car.querySelector('.next');
 var dotsWrap = car.querySelector('.dots');
 var idx = 0;

 function buildDots(){
 if (!dotsWrap) return;
 dotsWrap.innerHTML = '';
 slideEls.forEach(function(_, i){
 var b = document.createElement('button');
 b.className = 'dot' + (i===0 ? ' active' : '');
 b.addEventListener('click', function(){ go(i); });
 dotsWrap.appendChild(b);
 });
 }

 function go(i){
 idx = (i + slideEls.length) % slideEls.length;
 slides.style.transform = 'translateX(' + (-idx * 100) + '%)';
 if (dotsWrap){
 dotsWrap.querySelectorAll('.dot').forEach(function(d, k){
 d.classList.toggle('active', k === idx);
 });
 }
 }

 if (prev) prev.addEventListener('click', function(){ go(idx - 1); });
 if (next) next.addEventListener('click', function(){ go(idx + 1); });

 // Swipe
 var startX = null;
 car.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; }, {passive:true});
 car.addEventListener('touchend', function(e){
 if (startX == null) return;
 var dx = e.changedTouches[0].clientX - startX;
 if (Math.abs(dx) > 40){
 if (dx < 0) { go(idx + 1); }
 else { go(idx - 1); }
 }
 startX = null;
 }, {passive:true});

 buildDots();
 go(0);
});
