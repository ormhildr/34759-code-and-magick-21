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

const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];

const WIZARDS_AMOUNT = 4;

const userDialog = document.querySelector(`.setup`);

const similarListElement = userDialog.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
.content.querySelector(`.setup-similar-item`);

const setup = document.querySelector(`.setup`);

const setupOpen = document.querySelector(`.setup-open`);

const setupClose = document.querySelector(`.setup-close`);

const setupUserName = document.querySelector(`.setup-user-name`);

const setupWizard = setup.querySelector(`.setup-wizard`);

const wizardCoat = setupWizard.querySelector(`.wizard-coat`);

const inputCoat = setup.querySelector(`input[name=coat-color]`);

const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);

const inputEyes = setup.querySelector(`input[name=eyes-color]`);

const fireball = setup.querySelector(`.setup-fireball-wrap`);

const inputFireball = setup.querySelector(`input[name=fireball-color]`);

const getRandom = (min = 0, max = 100) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomFrom = (arr) => {
  return arr[getRandom(0, arr.length - 1)];
};

const generateWizard = () => ({
  name: `${NAMES[getRandom(0, NAMES.length - 1)]} ${SURNAMES[getRandom(0, SURNAMES.length - 1)]}`,
  coatColor: getRandomFrom(COAT_COLORS),
  eyesColor: getRandomFrom(EYES_COLORS)
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

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const closePopup = () => {
  setup.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const openPopup = () => {
  setup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, () => {
  openPopup();
});

setupOpen.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, () => {
  closePopup();
});

setupClose.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

setupUserName.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, onPopupEscPress);
});

setupUserName.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, onPopupEscPress);
});

wizardCoat.addEventListener(`click`, () => {
  const color = generateWizard().coatColor;
  wizardCoat.style.fill = color;
  inputCoat.value = color;
});

wizardEyes.addEventListener(`click`, () => {
  const color = generateWizard().eyesColor;
  wizardEyes.style.fill = color;
  inputEyes.value = color;
});

fireball.addEventListener(`click`, () => {
  const color = getRandomFrom(FIREBALL_COLORS);
  fireball.style.backgroundColor = color;
  inputFireball.value = color;
});

userDialog.classList.remove(`hidden`);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
