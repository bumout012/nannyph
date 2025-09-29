
(function(){
  // ---- Analytics helpers: dataLayer and gtag ----
  function pushDL(evt, params){
    try{
      window.dataLayer = window.dataLayer || [];
      var payload = Object.assign({event: evt}, params||{});
      window.dataLayer.push(payload);
    }catch(e){}
  }
  function pushGA(evt, params){
    try{
      if(typeof window.gtag === 'function'){
        window.gtag('event', evt, params || {});
      }
    }catch(e){}
  }
  function track(evt, params){
    pushDL(evt, params);
    pushGA(evt, params);
  }

  var css = `
    .np-help-launcher{position:fixed;right:18px;bottom:18px;z-index:9999;background:#0a66c2;color:#fff;padding:10px 14px;border-radius:999px;font-weight:700;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.15);}
    .np-help-panel{position:fixed;right:18px;bottom:76px;width:320px;max-width:92vw;background:#fff;border:1px solid #e5e7eb;border-radius:14px;box-shadow:0 8px 28px rgba(0,0,0,.2);z-index:10000;display:none;overflow:hidden}
    .np-help-panel.open{display:block}
    .np-help-hd{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:#0a66c2;color:#fff;font-weight:700}
    .np-help-bd{padding:12px;max-height:60vh;overflow:auto}
    .np-help-msg{font-size:.95rem;line-height:1.45;margin:8px 0}
    .np-help-msg.user{font-weight:600}
    .np-help-input{display:flex;gap:8px;margin-top:8px}
    .np-help-input input{flex:1;border:1px solid #e5e7eb;border-radius:10px;padding:10px}
    .np-help-input button{background:#0a66c2;color:#fff;border:0;border-radius:10px;padding:10px 12px;font-weight:700;cursor:pointer}
    .np-chipgrp{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
    .np-chip{border:1px solid #e5e7eb;border-radius:999px;padding:6px 10px;cursor:pointer;background:#fff}
  `;
  var style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
  function el(html){var d=document.createElement('div');d.innerHTML=html.trim();return d.firstElementChild;}
  var launcher=el('<div class="np-help-launcher" data-cta="chat_open">Help</div>');
  var panel=el('<div class="np-help-panel" aria-hidden="true"></div>');
  var header=el('<div class="np-help-hd"><span>Nanny Provider Bot</span><button class="np-close" aria-label="Close">&times;</button></div>');
  var body=el('<div class="np-help-bd"></div>');
  panel.appendChild(header);panel.appendChild(body);
  document.body.appendChild(launcher);document.body.appendChild(panel);
  body.appendChild(el('<div class="np-help-msg">Ask a question or pick a suggestion below.</div>'));
  var chips=el('<div class="np-chipgrp"></div>');
  var chipLabels = ['What are your hours?','What services do you offer?','What is your address?','How do I hire a nanny?','I am a jobseeker'];
  chipLabels.forEach(function(s){
    var c=el('<div class="np-chip">'+s+'</div>');
    c.addEventListener('click',function(){
      track('np_help_chip_click', {chip_label: s});
      sendUser(s);
    });
    chips.appendChild(c);
  });
  body.appendChild(chips);
  var thread=el('<div></div>');body.appendChild(thread);
  var input=el('<div class="np-help-input"><input type="text" placeholder="Type your question..."><button type="button" data-cta="chat_send">Send</button></div>');
  body.appendChild(input);var inputEl=input.querySelector('input');

  // Launcher open
  launcher.addEventListener('click',function(){
    panel.classList.add('open');panel.setAttribute('aria-hidden','false');
    track('np_help_open', {page_title: document.title, page_location: location.href});
  });
  // Close
  header.querySelector('.np-close').addEventListener('click',function(){
    panel.classList.remove('open');panel.setAttribute('aria-hidden','true');
    track('np_help_close', {});
  });

  function addMsg(cls,txt){
    var m=el('<div class="np-help-msg '+cls+'"></div>');
    m.textContent = txt;
    thread.appendChild(m);
    thread.scrollTop=thread.scrollHeight;
  }

  function sendUser(txt){
    if(!txt) return;
    addMsg('user',txt);
    track('np_help_user_send', {query: txt});
    handleAI(txt.toLowerCase());
    inputEl.value='';
  }

  input.querySelector('button').addEventListener('click',function(){
    sendUser(inputEl.value);
  });
  inputEl.addEventListener('keydown',function(e){ if(e.key==='Enter'){ sendUser(inputEl.value); }});

  function handleAI(q){
    var ans='';
    if(/hour|open|close|time/.test(q))ans='We are open daily from 9:00 AM to 6:00 PM.';
    else if(/address|where|located|location/.test(q))ans='Our address is 206 Casa Susana Building, 1121 Pedro Gil St., Paco Manila.';
    else if(/service|offer|nanny|maid|housekeep|cook/.test(q))ans='We offer Nannies, Housekeepers/Maids, and Cook/All-around support.';
    else if(/hire|start|begin/.test(q))ans='Begin by using the Quick Inquiry on Home or the forms on Contact.';
    else if(/jobseek|apply|trabaho|work/.test(q))ans='Jobseekers: please use the Jobseeker form on the Contact page.';
    else if(/license|dole|pea/.test(q))ans='DOLE PEA LICENSE NO. M-23-00-016.';
    else if(/phone|contact|email|call/.test(q))ans='Email: nanny.provider1@gmail.com. Phone numbers are on the Contact page.';
    else ans="I might not have that answer yet. Would you like to send us this question by email?";
    addMsg('ai',ans);
    track('np_help_ai_reply', {reply_length: ans.length});
  }

  // Mark widget ready
  track('np_help_loaded', {});
})();