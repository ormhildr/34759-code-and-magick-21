'use strict';

(() => {
  const MAX_SIMILAR_WIZARD_COUNT = 4;

  const similarListElement = window.dialog.userDialog.querySelector(`.setup-similar-list`);

  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content.querySelector(`.setup-similar-item`);

  const setupWizard = window.dialog.userDialog.querySelector(`.setup-wizard`);

  const wizardCoat = setupWizard.querySelector(`.wizard-coat`);

  const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);

  const fireball = window.dialog.userDialog.querySelector(`.setup-fireball-wrap`);

  let wizards = [];
  let coatColor = `rgb(101, 137, 164)`;
  let eyesColor = `black`;

  const getRank = (wizard) => {
    let rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  const namesComparator = (left, right) => {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  const renderWizard = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const renderWizards = (arr) => {
    const fragment = document.createDocumentFragment();

    const takeNumber = arr.length > MAX_SIMILAR_WIZARD_COUNT
      ? MAX_SIMILAR_WIZARD_COUNT
      : wizards.length;

    similarListElement.innerHTML = ``;

    for (let i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }

    similarListElement.appendChild(fragment);

    window.dialog.userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const updateWizards = () => {
    renderWizards(wizards.sort((left, right) => {
      let rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  const successHandler = (data) => {
    wizards = data;
    updateWizards();
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

  wizardCoat.addEventListener(`click`, () => {
    const color = window.util.getRandomFrom(window.colors.COAT_COLORS);
    wizardCoat.style.fill = color;
    coatColor = color;
    window.debounce(updateWizards);
  });

  wizardEyes.addEventListener(`click`, () => {
    const color = window.util.getRandomFrom(window.colors.EYES_COLORS);
    wizardEyes.style.fill = color;
    eyesColor = color;
    window.debounce(updateWizards);
  });

  fireball.addEventListener(`click`, () => {
    const color = window.util.getRandomFrom(window.colors.FIREBALL_COLORS);
    fireball.style.backgroundColor = color;
  });
})();
