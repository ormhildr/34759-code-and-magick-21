'use strict';

(() => {
  const MAX_SIMILAR_WIZARD_COUNT = 4;

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

  const renderWizard = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const successHandler = (wizards) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);

    window.dialog.userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.load(successHandler, errorHandler);

  window.colors.colorize(wizardCoat, window.colors.COAT_COLORS, inputCoat);
  window.colors.colorize(wizardEyes, window.colors.EYES_COLORS, inputEyes);
  window.colors.colorize(fireball, window.colors.FIREBALL_COLORS, inputFireball);
})();
