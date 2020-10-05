'use strict';

(() => {
  const WIZARDS_AMOUNT = 4;

  const similarListElement = window.dialog.userDialog.querySelector(`.setup-similar-list`);

  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content.querySelector(`.setup-similar-item`);

  const setupWizard = window.dialog.userDialog.querySelector(`.setup-wizard`);

  const wizardCoat = setupWizard.querySelector(`.wizard-coat`);

  const inputCoat = window.dialog.userDialog.querySelector(`input[name=coat-color]`);

  const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);

  const inputEyes = window.dialog.userDialog.querySelector(`input[name=eyes-color]`);

  const fireball = window.dialog.userDialog.querySelector(`.setup-fireball-wrap`);

  const inputFireball = window.dialog.userDialog.querySelector(`input[name=fireball-color]`);

  const generateWizard = () => ({
    name: `${window.util.getRandomFrom(window.mocks.NAMES)} ${window.util.getRandomFrom(window.mocks.SURNAMES)}`,
    coatColor: window.util.getRandomFrom(window.colors.COAT_COLORS),
    eyesColor: window.util.getRandomFrom(window.colors.EYES_COLORS)
  });

  const getWizards = () => {
    const wizards = [];
    for (let i = 0; i < WIZARDS_AMOUNT; i++) {
      wizards.push(generateWizard());
    }
    return wizards;
  };

  const renderWizard = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

    return wizardElement;
  };

  const renderWizards = (wizards) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    return fragment;
  };

  similarListElement.appendChild(renderWizards(getWizards()));

  window.colors.colorize(wizardCoat, window.colors.COAT_COLORS, inputCoat);
  window.colors.colorize(wizardEyes, window.colors.EYES_COLORS, inputEyes);
  window.colors.colorize(fireball, window.colors.FIREBALL_COLORS, inputFireball);
})();
