'use strict';

(() => {
  const userDialog = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = document.querySelector(`.setup-close`);
  const setupUserName = document.querySelector(`.setup-user-name`);
  const dialogHandle = userDialog.querySelector(`.upload`);

  const defaultCoord = {
    top: userDialog.style.top,
    left: userDialog.style.left
  };

  const onPopupEscPress = (evt) => {
    window.util.isEscEvent(evt, closePopup);
  };

  const closePopup = () => {
    userDialog.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupEscPress);
    userDialog.style.left = defaultCoord.left;
    userDialog.style.top = defaultCoord.top;
  };

  const openPopup = () => {
    userDialog.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  setupOpen.addEventListener(`click`, () => {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, (evt) => {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener(`click`, () => {
    closePopup();
  });

  setupClose.addEventListener(`keydown`, (evt) => {
    window.util.isEnterEvent(evt, closePopup);
  });

  setupUserName.addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onPopupEscPress);
  });

  setupUserName.addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onPopupEscPress);
  });

  window.dialog = {
    userDialog,
    dialogHandle
  };
})();
