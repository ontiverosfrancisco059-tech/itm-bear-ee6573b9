// BEAR — interacciones base (comments.js gestiona login/comentarios)
(function(){
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if(burger && nav){
    burger.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Filtro de menú
  var chips = document.querySelectorAll('.chip');
  var dishes = document.querySelectorAll('.dish');
  chips.forEach(function(c){
    c.addEventListener('click', function(){
      chips.forEach(function(x){ x.classList.remove('active'); });
      c.classList.add('active');
      var f = c.getAttribute('data-filter');
      dishes.forEach(function(d){
        d.style.display = (f === 'all' || d.getAttribute('data-cat') === f) ? '' : 'none';
      });
    });
  });

  // Reveal on scroll
  var els = document.querySelectorAll('.dish, .visit-card, .visit-steps, .photo-stack, .gallery figure, .hero-card');
  els.forEach(function(e){ e.classList.add('reveal'); });
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target); } });
    }, {threshold:.12});
    els.forEach(function(e){ io.observe(e); });
  } else {
    els.forEach(function(e){ e.classList.add('visible'); });
  }
})();
