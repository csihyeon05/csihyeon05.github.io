/* ============================================================
   APB Forum 2026 · main.js
   Shared behaviors: mobile nav, dropdowns, reveal, hero canvas
   ============================================================ */

(function(){
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.mobile-toggle');
  const primaryNav = document.querySelector('.topbar nav.primary');
  if(toggle && primaryNav){
    toggle.addEventListener('click', () => {
      primaryNav.classList.toggle('open');
    });
  }

  /* ---------- Dropdown (History) — mobile tap ---------- */
  document.querySelectorAll('.topbar .dropdown > .trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // On mobile, toggle the dropdown open state
      if(window.innerWidth <= 900){
        e.preventDefault();
        btn.parentElement.classList.toggle('open');
      }
    });
  });

  /* ---------- Reveal on scroll ---------- */
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  /* ---------- Hero ambient network canvas ---------- */
  function initHeroCanvas(){
    const wrap = document.querySelector('.home-hero .bg-canvas');
    if(!wrap) return;
    let canvas = wrap.querySelector('canvas');
    if(!canvas){
      canvas = document.createElement('canvas');
      wrap.appendChild(canvas);
    }
    const ctx = canvas.getContext('2d');
    let W, H;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nodes = [];
    const NUM = window.innerWidth < 700 ? 32 : 58;
    const LINK = 170;

    function resize(){
      W = canvas.clientWidth = wrap.clientWidth;
      H = canvas.clientHeight = wrap.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function init(){
      nodes.length = 0;
      for(let i = 0; i < NUM; i++){
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.3 + 0.4
        });
      }
    }
    function draw(){
      ctx.clearRect(0, 0, W, H);
      // depth gradient
      const grd = ctx.createRadialGradient(W * 0.75, H * 0.45, 60, W * 0.75, H * 0.45, Math.max(W, H) * 0.7);
      grd.addColorStop(0, 'rgba(79,195,247,0.05)');
      grd.addColorStop(1, 'rgba(5,11,31,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      for(const n of nodes){
        n.x += n.vx;
        n.y += n.vy;
        if(n.x < 0 || n.x > W) n.vx *= -1;
        if(n.y < 0 || n.y > H) n.vy *= -1;
      }
      // links
      for(let i = 0; i < nodes.length; i++){
        for(let j = i + 1; j < nodes.length; j++){
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if(d < LINK){
            const alpha = (1 - d / LINK) * 0.26;
            ctx.strokeStyle = 'rgba(125,211,252,' + alpha + ')';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // nodes
      for(const n of nodes){
        ctx.fillStyle = 'rgba(125,211,252,0.82)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    let raf;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resize();
    init();
    if(!reduced){
      draw();
    } else {
      // Draw a single static frame
      draw();
      cancelAnimationFrame(raf);
    }
    window.addEventListener('resize', () => {
      resize();
      init();
    });
  }

  // Wait for fonts/paint before initializing canvas
  if(document.readyState === 'complete'){
    initHeroCanvas();
  } else {
    window.addEventListener('load', initHeroCanvas);
  }
})();
