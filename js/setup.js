'use strict';

const NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

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

const getRandomValue = (array, min = 0, max = array.length - 1) => {
  const random = Math.floor(min + Math.random() * (max + 1 - min));
  return random;
};

const getNewObject = () => {
  return {
    name: `${NAMES[getRandomValue(NAMES)]} ${SURNAMES[getRandomValue(SURNAMES)]}`,
    coatColor: COAT_COLORS[getRandomValue(COAT_COLORS)],
    eyesColor: EYES_COLORS[getRandomValue(EYES_COLORS)]
  };
};

const wizards = [];
for (let i = 0; i < 4; i++) {
  wizards.push(getNewObject());
}

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
.content.querySelector(`.setup-similar-item`);

const similarListElement = userDialog.querySelector(`.setup-similar-list`);

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const getFillList = (array) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(renderWizard(array[i]));
  }
  similarListElement.appendChild(fragment);
};

getFillList(wizards);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
