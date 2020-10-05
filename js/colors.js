'use strict';

(() => {
  const COAT_COLORS = [
    `rgb(101, 137, 164)`,
    `rgb(241, 43, 107)`,
    `rgb(146, 100, 161)`,
    `rgb(56, 159, 117)`,
    `rgb(215, 210, 55)`,
    `rgb(0, 0, 0)`
  ];

  const EYES_COLORS = [
    `black`,
    `red`,
    `blue`,
    `yellow`,
    `green`
  ];

  const FIREBALL_COLORS = [
    `#ee4830`,
    `#30a8ee`,
    `#5ce6c0`,
    `#e848d5`,
    `#e6e848`
  ];

  window.colors = {
    COAT_COLORS,
    EYES_COLORS,
    FIREBALL_COLORS,
    colorize: (element, type, input) => {
      element.addEventListener(`click`, ()=> {
        const color = window.util.getRandomFrom(type);
        input.value = color;
        if (element.tagName.toLowerCase() === `div`) {
          element.style.backgroundColor = color;
        } else {
          element.style.fill = color;
        }
      });
    }
  };
})();
