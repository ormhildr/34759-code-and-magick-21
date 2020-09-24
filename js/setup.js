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

const WIZARDS_AMOUNT = 4;

const userDialog = document.querySelector(`.setup`);

const similarListElement = userDialog.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
.content.querySelector(`.setup-similar-item`);

const getRandom = (min = 0, max = 100) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const generateWizard = () => ({
  name: `${NAMES[getRandom(0, NAMES.length - 1)]} ${SURNAMES[getRandom(0, SURNAMES.length - 1)]}`,
  coatColor: COAT_COLORS[getRandom(0, COAT_COLORS.length - 1)],
  eyesColor: EYES_COLORS[getRandom(0, EYES_COLORS.length - 1)]
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

userDialog.classList.remove(`hidden`);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
