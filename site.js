/* hamidah.me — small behaviours, no dependencies.
   0. Colour scheme toggle in the nav; light is the default, dark only by choice.
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
   5. Mail: the address is stored reversed and assembled here.
   6. Game of Life drawn behind the page on wide screens. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var alphabet = 'abcdefghijklmnopqrstuvwxyz';
  function rand() { return alphabet[Math.floor(Math.random() * alphabet.length)]; }

  /* 0. Colour scheme toggle, showing the scheme it switches to: half moon
     in light mode, sun in dark. The choice is stored per browser. */
  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }
  var themeBtn = document.querySelector('.theme');
  function paintTheme() {
    if (!themeBtn) return;
    var dark = isDark();
    themeBtn.classList.toggle('is-dark', dark);
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeBtn.setAttribute('title', dark ? 'Light mode' : 'Dark mode');
    themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
  }
  /* A soft click on toggle: a short filtered noise burst, synthesised so no
     file is fetched. Runs inside the click, which satisfies autoplay rules. */
  var audio = null;
  function click() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      audio = audio || new AC();
      if (audio.state === 'suspended') audio.resume();
      var t = audio.currentTime;
      var len = Math.floor(audio.sampleRate * 0.012);
      var buf = audio.createBuffer(1, len, audio.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      var src = audio.createBufferSource(); src.buffer = buf;
      var filt = audio.createBiquadFilter(); filt.type = 'bandpass'; filt.frequency.value = 2600; filt.Q.value = 1.2;
      var gain = audio.createGain(); gain.gain.setValueAtTime(0.18, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
      src.connect(filt); filt.connect(gain); gain.connect(audio.destination);
      src.start(t); src.stop(t + 0.03);
    } catch (e) {}
  }
  if (themeBtn) {
    paintTheme();
    themeBtn.addEventListener('click', function () {
      click();
      var next = isDark() ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      paintTheme();
      document.dispatchEvent(new Event('themechange'));
    });
  }

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

  /* 3b. Blog index timeline: mark the year in view, decrypt each year label
     once as it enters. */
  var years = document.querySelectorAll('.year');
  var ticks = document.querySelectorAll('.timeline a[data-year]');
  if (years.length && ticks.length && 'IntersectionObserver' in window) {
    var seen = {};
    function setCurrent(y) {
      Array.prototype.forEach.call(ticks, function (t) {
        if (t.getAttribute('data-year') === y) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current');
      });
    }
    var spy = new IntersectionObserver(function (entries) {
      var best = null;
      Array.prototype.forEach.call(years, function (sec) {
        var r = sec.getBoundingClientRect();
        if (r.top <= innerHeight * 0.35 && r.bottom > 40) best = sec;
      });
      if (!best) best = years[0];
      setCurrent(best.id.slice(1));
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var label = en.target.querySelector('.year-label');
        if (label && !seen[en.target.id]) { seen[en.target.id] = true; decrypt(label, label.getAttribute('data-name') || label.textContent, { scramble: 250, step: 90 }); }
      });
    }, { rootMargin: '0px 0px -40% 0px', threshold: [0, 0.1, 0.5, 1] });
    Array.prototype.forEach.call(years, function (s) { spy.observe(s); });
    window.addEventListener('scroll', function () {
      var best = years[0];
      Array.prototype.forEach.call(years, function (sec) { if (sec.getBoundingClientRect().top <= innerHeight * 0.35) best = sec; });
      setCurrent(best.id.slice(1));
    }, { passive: true });
  }

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

  /* 6. Game of Life behind the page: a flat, uniform grid in the lower half
     of the frame, light blue at low alpha. Calm by design: the rules tick
     slowly and each cell's brightness eases in and out; nothing re-seeds the
     board, so an untouched page settles and fades; moving the pointer over
     the frame drops a few cells in its wake. Wide screens only, a still faint
     frame under reduced motion, paused while the tab is hidden. */
  (function life() {
    if (window.innerWidth < 992) return;
    var canvas = document.createElement('canvas');
    canvas.className = 'life';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var CELL = 14, GAP = 2;
    var W, H, dpr, cols, rows, grid, next, bright;
    function rgb() { return isDark() ? '122, 162, 255' : '37, 99, 235'; }
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
      cols = Math.ceil(W / CELL); rows = Math.ceil(H / CELL);
      grid = new Uint8Array(cols * rows); next = new Uint8Array(cols * rows); bright = new Float32Array(cols * rows);
      for (var i = 0; i < grid.length; i++) grid[i] = Math.random() < 0.22 ? 1 : 0;
    }
    function step() {
      for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
        var n = 0;
        for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          n += grid[((y + dy + rows) % rows) * cols + ((x + dx + cols) % cols)];
        }
        var i = y * cols + x;
        var alive = (grid[i] && (n === 2 || n === 3)) || (!grid[i] && n === 3) ? 1 : 0;
        if (alive && grid[i] && Math.random() < 0.003) alive = 0;   /* slow extinction */
        next[i] = alive;
      }
      var t = grid; grid = next; next = t;
    }
    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      var c = rgb(), s = CELL - GAP;
      for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
        var i = y * cols + x, target = grid[i], b = bright[i];
        if (Math.abs(target - b) > 0.01) { b += (target - b) * 0.08; bright[i] = b; } else bright[i] = b = target;
        if (b <= 0.01) continue;
        ctx.fillStyle = 'rgba(' + c + ',' + (b * 0.15).toFixed(3) + ')';
        ctx.fillRect(x * CELL, y * CELL, s, s);
      }
    }
    size();
    if (reduced) { for (var k = 0; k < bright.length; k++) bright[k] = grid[k]; draw(); return; }
    var last = 0, running = false, raf = 0;
    function frame(t) {
      if (!running) return;
      if (t - last > 600) { last = t; step(); }
      draw();
      raf = requestAnimationFrame(frame);
    }
    function start() { if (running) return; running = true; raf = requestAnimationFrame(frame); }
    function stop() { running = false; cancelAnimationFrame(raf); }
    start();
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(size, 200); });
    /* Pointer seeds a few cells along its path. */
    var px = -1, py = -1;
    window.addEventListener('pointermove', function (e) {
      if (px >= 0 && Math.hypot(e.clientX - px, e.clientY - py) < 24) return;
      px = e.clientX; py = e.clientY;
      var gx = Math.floor(e.clientX / CELL), gy = Math.floor(e.clientY / CELL);
      for (var k = 0; k < 3; k++) {
        var xx = (gx + Math.floor(Math.random() * 3) - 1 + cols) % cols, yy = (gy + Math.floor(Math.random() * 3) - 1 + rows) % rows;
        grid[yy * cols + xx] = 1;
      }
    }, { passive: true });
    document.addEventListener('themechange', draw);
  })();

  /* 5. Mail: the address is stored reversed in data-m and assembled here, so it
     appears nowhere in the HTML as written. */
  Array.prototype.forEach.call(document.querySelectorAll('a.mail[data-m]'), function (a) {
    a.href = 'mailto:' + a.getAttribute('data-m').split('').reverse().join('');
  });
})();
