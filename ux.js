// ux.js — small interaction utilities used on biography, alash and index pages
// - portrait tilt on pointermove (only for fine pointers and if not reduced-motion)
// - hero parallax on main-image
// - lightweight, rAF-throttled updates and safe fallbacks

(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return; // do nothing if user prefers reduced motion

  // Small utility: clamp value
  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

  // Throttle via rAF
  function rafThrottle(fn){
    let busy = false;
    return function(...args){
      if (busy) { lastArgs = args; return; }
      busy = true;
      requestAnimationFrame(()=>{ fn(...args); busy = false; });
    };
  }

  // Portrait tilt: rotateX/rotateY based on pointer position within element
  function enableTilt(el){
    if (!el) return;
    let rect = null;
    const maxDeg = 6; // subtle tilt
    const update = rafThrottle((x,y)=>{
      if (!rect) rect = el.getBoundingClientRect();
      const px = (x - rect.left) / rect.width - 0.5; // -0.5..0.5
      const py = (y - rect.top) / rect.height - 0.5;
      const ry = clamp(px * maxDeg * -1, -maxDeg, maxDeg);
      const rx = clamp(py * maxDeg, -maxDeg, maxDeg);
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    });

    function reset(){ el.style.transform = ''; }

    el.addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return; // ignore touch
      update(e.clientX, e.clientY);
    });
    el.addEventListener('pointerleave', reset);
    el.addEventListener('pointerdown', ()=> el.style.transform += ' scale(.997)');
    el.addEventListener('pointerup', ()=> el.style.transform = '');
  }

  // Hero parallax: move inner image slightly on pointermove over container
  function enableParallax(container){
    if (!container) return;
    const img = container.querySelector('img');
    if (!img) return;
    const strength = 10; // px
    const update = rafThrottle((x,y)=>{
      const rect = container.getBoundingClientRect();
      const px = (x - rect.left) / rect.width - 0.5;
      const py = (y - rect.top) / rect.height - 0.5;
      img.style.transform = `translate(${px * strength}px, ${py * strength}px) scale(1.03)`;
    });
    function reset(){ img.style.transform = ''; }
    container.addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      update(e.clientX, e.clientY);
    });
    container.addEventListener('pointerleave', reset);
  }

  // Initialize: find portrait elements and main-image containers
  document.addEventListener('DOMContentLoaded', ()=>{
    try{
      document.querySelectorAll('.portrait').forEach(p => enableTilt(p));
      const mainImg = document.querySelector('.main-image');
      if (mainImg) enableParallax(mainImg);
    } catch(e){ console.error('ux.js init error', e); }
  });
})();
