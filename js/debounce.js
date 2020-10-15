'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;

  window.debounce = function (cb) {
    let lastTimeout = null;

    return function () {
      const parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
