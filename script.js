/* Smile Premium — script.js */
(function(){
  'use strict';
  var yearEl=document.getElementById('year');
  if(yearEl&&(!yearEl.textContent||/^\{\{/.test(yearEl.textContent)))yearEl.textContent=new Date().getFullYear();

  var canvas=document.getElementById('scroll-canvas');
  var section=document.getElementById('scroll-anim');
  if(canvas&&section){
    var ctx=canvas.getContext('2d');
    var pin=section.querySelector('.scroll-anim-pin');
    var FRAME_PATH='https://8ispuxmgjxgu2r5q.public.blob.vercel-storage.com/templates/dentisti-002/frames/';var FRAME_COUNT=151;
    var FRAME_PREFIX='frame_';var FRAME_PAD=4;var FRAME_EXT='.webp';
    var images=[];var loaded=0;
    function setupCanvas(){var dpr=window.devicePixelRatio||1;var cw=pin.clientWidth;var ch=pin.clientHeight;canvas.width=cw*dpr;canvas.height=ch*dpr;canvas.style.width=cw+'px';canvas.style.height=ch+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}
    function render(progress){var idx=Math.min(FRAME_COUNT-1,Math.max(0,Math.floor(progress*FRAME_COUNT)));var img=images[idx];if(!img||!img.complete)return;var cw=pin.clientWidth;var ch=pin.clientHeight;var iw=img.naturalWidth;var ih=img.naturalHeight;var scale=Math.max(cw/iw,ch/ih);var dw=iw*scale;var dh=ih*scale;ctx.clearRect(0,0,cw,ch);ctx.drawImage(img,(cw-dw)/2,(ch-dh)/2,dw,dh)}
    function onScroll(){var rect=section.getBoundingClientRect();var scrollable=section.offsetHeight-window.innerHeight;if(scrollable<=0){render(0);return}render(Math.min(1,Math.max(0,-rect.top/scrollable)))}
    for(var i=1;i<=FRAME_COUNT;i++){var img=new Image();var num=String(i);while(num.length<FRAME_PAD)num='0'+num;img.src=FRAME_PATH+FRAME_PREFIX+num+FRAME_EXT;img.onload=function(){loaded++;if(loaded===1){setupCanvas();onScroll()}};images.push(img)}
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',function(){setupCanvas();onScroll()});
  }

  if('IntersectionObserver' in window){
    var fadeObs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');fadeObs.unobserve(e.target)}})},{threshold:0,rootMargin:'0px 0px -60px 0px'});
    document.querySelectorAll('.fade-up').forEach(function(el){fadeObs.observe(el)});
    var revealObs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');revealObs.unobserve(e.target)}})},{threshold:0.15});
    document.querySelectorAll('.reveal-wrapper').forEach(function(el){revealObs.observe(el)});
    var stagObs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){setTimeout(function(){e.target.classList.add('visible')},parseInt(e.target.dataset.stagger||0,10)*120);stagObs.unobserve(e.target)}})},{threshold:0.1});
    document.querySelectorAll('.stagger-card').forEach(function(el){stagObs.observe(el)});
  }else{document.querySelectorAll('.fade-up,.stagger-card,.reveal-wrapper').forEach(function(el){el.classList.add('visible')})}
})();
window.__imgFallback=function(img,label){var w=document.createElement('div');w.className='img-svg-fallback';w.setAttribute('role','img');w.setAttribute('aria-label',label);var gid='g'+Date.now()+Math.random().toString(36).substr(2,4);w.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="'+gid+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="currentColor" stop-opacity="0.12"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.04"/></linearGradient></defs><rect width="800" height="600" fill="url(#'+gid+')"/><text x="400" y="320" text-anchor="middle" font-family="serif" font-size="24" font-style="italic" fill="currentColor" opacity="0.4">'+label+'</text></svg>';img.replaceWith(w)};
