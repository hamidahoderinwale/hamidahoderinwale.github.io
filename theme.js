/* Applies a remembered colour scheme before first paint so there is no
   flash. Loaded synchronously in the head. Without a stored choice the page
   follows the system setting. */
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();
