/* hamidah.me — small behaviours, no dependencies.
   1. Reading progress: a bar at the top of the viewport scaled to how far
      the reader has scrolled (same idea as the procgrep page).
   2. Decrypt: an element marked .decrypt starts as yarn glyphs (Yarndings 12
      maps each Latin letter to a glyph), shuffles, then settles left to
      right into its text in the site's sans. Used on the name in the
      welcome line and on the rail labels when hovered.
   3. Rail: the icon links beside the card carry a label whose first two
      letters are plain and the rest encrypted; hover or focus decrypts it.
   4. Portrait: the reveal alternates between photos on each hover; tap
      toggles it on touch screens, where there is no hover.
   5. Mail: the address is assembled here so the raw mailto is not in the HTML. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var alphabet = 'abcdefghijklmnopqrstuvwxyz';
  function rand() { return alphabet[Math.floor(Math.random() * alphabet.length)]; }

  /* 1. Progress bar */
  var bar = document.createElement('div');
  bar.className = 'progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  var ticking = false;
  function paint() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var f = max > 0 ? Math.min(1, Math.max(0, (window.scrollY || doc.scrollTop) / max)) : 0;
    bar.style.transform = 'scaleX(' + f + ')';
    ticking = false;
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(paint); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  paint();

  /* 2. Decrypt. `keep` leading letters stay plain throughout. Returns a
     cancel function. */
  function decrypt(el, text, opts) {
    opts = opts || {};
    var scramble = opts.scramble == null ? 800 : opts.scramble; // ms all letters stay encrypted
    var step = opts.step == null ? 130 : opts.step;             // ms between letters resolving
    var keep = opts.keep || 0;
    el.textContent = '';
    var spans = [];
    for (var i = 0; i < text.length; i++) {
      var s = document.createElement('span');
      s.setAttribute('aria-hidden', 'true');
      s.textContent = text[i];
      if (text[i] === ' ' || i < keep) s.className = 'plain still';
      el.appendChild(s);
      spans.push(s);
    }
    if (reduced) {
      spans.forEach(function (s) { s.className = 'plain still'; });
      return function () {};
    }
    spans.forEach(function (s) { if (s.className !== 'plain still') { s.className = 'cipher'; s.textContent = rand(); } });
    var start = null, lastShuffle = 0, raf = 0, cancelled = false;
    function frame(t) {
      if (cancelled) return;
      if (start === null) start = t;
      var el2 = t - start;
      var shuffle = t - lastShuffle > 55;
      if (shuffle) lastShuffle = t;
      var done = true;
      spans.forEach(function (s, i) {
        if (text[i] === ' ' || i < keep) return;
        var settled = el2 >= scramble + (i - keep) * step;
        if (settled) {
          if (s.className !== 'plain') { s.className = 'plain'; s.textContent = text[i]; }
        } else {
          done = false;
          if (shuffle) s.textContent = rand();
        }
      });
      if (!done) raf = requestAnimationFrame(frame);
    }
    var ready = document.fonts && document.fonts.load ? document.fonts.load('1em "Yarndings 12"') : Promise.resolve();
    ready.then(function () { raf = requestAnimationFrame(frame); }, function () { raf = requestAnimationFrame(frame); });
    return function () { cancelled = true; cancelAnimationFrame(raf); };
  }

  /* Rest state for a label: the first `keep` letters plain, the rest set in
     Yarndings, which turns the word's own letters into its cipher. */
  function encrypted(el, text, keep) {
    el.textContent = '';
    for (var i = 0; i < text.length; i++) {
      var s = document.createElement('span');
      s.setAttribute('aria-hidden', 'true');
      s.className = i < keep ? 'plain still' : 'cipher';
      s.textContent = text[i];
      el.appendChild(s);
    }
  }

  var nameEl = document.querySelector('.decrypt');
  if (nameEl) {
    var name = nameEl.getAttribute('data-name') || nameEl.textContent.trim();
    nameEl.setAttribute('aria-label', name);
    decrypt(nameEl, name);
  }

  /* 3. Rail labels: partly readable at rest, fully decrypted on hover or focus. */
  Array.prototype.forEach.call(document.querySelectorAll('.rail a'), function (a) {
    var label = a.querySelector('.label');
    var text = a.getAttribute('data-label');
    if (!label || !text) return;
    var keep = 2;
    var cancel = null;
    encrypted(label, text, keep);
    function show() { if (cancel) cancel(); cancel = decrypt(label, text, { keep: keep, scramble: 150, step: 60 }); }
    function hide() { if (cancel) cancel(); cancel = null; encrypted(label, text, keep); }
    a.addEventListener('mouseenter', show);
    a.addEventListener('focus', show);
    a.addEventListener('mouseleave', hide);
    a.addEventListener('blur', hide);
  });

  /* 4. Portrait */
  var portrait = document.querySelector('.portrait');
  if (portrait) {
    var cover = portrait.querySelector('.portrait-cover');
    if (cover) {
      var dropCover = function () { if (cover.parentNode) cover.parentNode.removeChild(cover); };
      if (cover.complete && cover.naturalWidth === 0) dropCover();
      cover.addEventListener('error', dropCover);
    }
    /* Reveal photos alternate: each hover, focus or tap advances to the next. */
    var faces = portrait.querySelectorAll('.portrait-face');
    var face = 0;
    function advance() {
      if (faces.length < 2) return;
      faces[face].classList.remove('is-current');
      face = (face + 1) % faces.length;
      faces[face].classList.add('is-current');
    }
    portrait.addEventListener('mouseleave', advance);
    portrait.addEventListener('blur', advance);
    portrait.addEventListener('click', function () {
      if (portrait.classList.contains('show')) { portrait.classList.remove('show'); advance(); }
      else portrait.classList.add('show');
    });
  }

  /* 5. Mail */
  Array.prototype.forEach.call(document.querySelectorAll('a[data-user][data-domain]'), function (a) {
    var addr = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    a.href = 'mailto:' + addr;
    a.textContent = addr;
  });
})();
