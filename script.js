// BEAR — interacciones del sitio. No gestiona comentarios (los controla comments.js vía ITM).
(function(){
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      var open = menu.hasAttribute('hidden');
      if(open){ menu.removeAttribute('hidden'); toggle.setAttribute('aria-expanded','true'); }
      else{ menu.setAttribute('hidden',''); toggle.setAttribute('aria-expanded','false'); }
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ menu.setAttribute('hidden',''); toggle.setAttribute('aria-expanded','false'); });
    });
  }

  // Filtro de menú
  var chips = document.querySelectorAll('.chip');
  var dishes = document.querySelectorAll('.dish');
  chips.forEach(function(c){
    c.addEventListener('click', function(){
      chips.forEach(function(x){ x.classList.remove('active'); x.setAttribute('aria-selected','false'); });
      c.classList.add('active'); c.setAttribute('aria-selected','true');
      var f = c.getAttribute('data-filter');
      dishes.forEach(function(d){
        d.style.display = (f === 'all' || d.getAttribute('data-cat') === f) ? '' : 'none';
      });
    });
  });

  // Lightbox galería
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  var close = document.getElementById('lightboxClose');
  document.querySelectorAll('.g-item').forEach(function(b){
    b.addEventListener('click', function(){
      lbImg.src = b.getAttribute('data-full');
      lb.removeAttribute('hidden');
    });
  });
  function hide(){ lb.setAttribute('hidden',''); lbImg.src=''; }
  if(close) close.addEventListener('click', hide);
  if(lb) lb.addEventListener('click', function(e){ if(e.target === lb) hide(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && lb && !lb.hasAttribute('hidden')) hide(); });

  // Abierto / cerrado según horario real del restaurante
  // Lun-Vie 7-21, Sáb 8-22, Dom 9-15
  function openState(){
    var n = new Date(), d = n.getDay(), h = n.getHours() + n.getMinutes()/60, el = document.getElementById('openNow');
    if(!el) return;
    var open = (d>=1&&d<=5&&h>=7&&h<21)||(d===6&&h>=8&&h<22)||(d===0&&h>=9&&h<15);
    el.textContent = open ? 'Abierto ahora · ven por tu ceviche y tu fría' : 'Cerrado ahora · te esperamos en horario de cocina';
  }
  openState();

  // Reveal on scroll
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12});
  document.querySelectorAll('.dish,.profile-card,.comments-card,.local-photo,.photo-stack').forEach(function(el){
    el.classList.add('reveal'); io.observe(el);
  });
})();
