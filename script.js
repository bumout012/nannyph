// minimal shared interactions
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.nav a').forEach(function(a){
    a.addEventListener('click', function(){
      try{
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({event:'nav_click', href:a.getAttribute('href')});
      }catch(e){}
    });
  });
});