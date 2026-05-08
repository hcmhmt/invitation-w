/* ===== COUNTDOWN TIMER =====
   CUSTOMIZE: Set your wedding date below */
(function () {
  /* Geri sayım en yakın etkinliğe: Kına 03.06.2026 */
  var weddingDate = new Date('2026-09-06T13:30:00+03:00');

  function updateCountdown() {
    var now = new Date();
    var diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '0';
      document.getElementById('cd-hours').textContent = '0';
      document.getElementById('cd-mins').textContent = '0';
      document.getElementById('cd-secs').textContent = '0';
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = days;
    document.getElementById('cd-hours').textContent = hours;
    document.getElementById('cd-mins').textContent = mins;
    document.getElementById('cd-secs').textContent = secs;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

/* ===== SIDE NAV ===== */
(function () {
  var toggle   = document.getElementById('nav-toggle');
  var list     = document.getElementById('nav-list');
  var links    = Array.prototype.slice.call(document.querySelectorAll('#side-nav a'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('section'));
  var locked   = false;
  var lockTimer = null;

  /* --- Toggle açılır/kapanır --- */
  toggle.addEventListener('click', function () {
    var open = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  /* --- Aktif linki işaretle ve URL'i güncelle --- */
  function setActive(id) {
    links.forEach(function (link) {
      link.classList.toggle('active', link.dataset.section === id);
    });
    if (history.replaceState) {
      history.replaceState(null, '', '#' + id);
    }
  }

  /* --- Scroll'a göre hangi section viewport'un üst yarısında --- */
  function activeFromScroll() {
    var mid = window.scrollY + window.innerHeight * 0.4;
    var found = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= mid) found = sec;
    });
    return found.id;
  }

  /* --- Link tıklandığında: hemen aktif yap, scroll bitene kadar kilitle --- */
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      setActive(link.dataset.section);
      locked = true;
      clearTimeout(lockTimer);
      lockTimer = setTimeout(function () {
        locked = false;
        setActive(activeFromScroll());
      }, 900);
    });
  });

  /* --- Kullanıcı kendi scroll yaparken güncelle --- */
  window.addEventListener('scroll', function () {
    if (!locked) setActive(activeFromScroll());
  }, { passive: true });

  /* --- Sayfa yüklenince ilk aktifi ayarla --- */
  setActive(activeFromScroll());
})();

/* ===== SCROLL REVEAL ===== */
(function () {
  var sections = document.querySelectorAll('section:not(#davet)');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
