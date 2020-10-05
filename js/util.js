'use strict';

(() => {
  const Key = {
    ENTER: `Enter`,
    ESCAPE: `Escape`
  };

  const getRandom = (min = 0, max = 100) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.util = {
    getRandomFrom: (arr) => {
      return arr[getRandom(0, arr.length - 1)];
    },
    getMaxElement: (arr) => {
      let maxElement = arr[0];

      for (let i = 0; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }
      return maxElement;
    },
    getRandomHSL: () => {
      return `hsl(240, ${getRandom(0, 100)}%, 50%)`;
    },
    isEscEvent: (evt, action) => {
      if (evt.key === Key.ESCAPE) {
        evt.preventDefault();
        action();
      }
    },
    isEnterEvent: (evt, action) => {
      if (evt.key === Key.ENTER) {
        action();
      }
    }
  };
})();
