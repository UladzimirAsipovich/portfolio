(function () {
  window.addEventListener(
    'DOMContentLoaded',
    function () {
      import('./components/navbar.js').then((module) => {
        const NAVBAR = module.default;
        new NAVBAR();
      });
    },
    false
  );
})();
