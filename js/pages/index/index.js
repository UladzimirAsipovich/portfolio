(function () {
  window.addEventListener(
    'DOMContentLoaded',
    function () {
      import('../../components/native-slider.js').then((module) => {
        const NATIVE_SLIDER = module.default;
        new NATIVE_SLIDER();
      });
    },
    false
  );
})();
