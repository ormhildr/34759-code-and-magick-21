'use strict';

const CloudSize = {
  CLOUD_WIDTH: 420,
  CLOUD_HEIGHT: 270
};
const {CLOUD_WIDTH, CLOUD_HEIGHT} = CloudSize;

const CloudCoordinate = {
  CLOUD_X: 100,
  CLOUD_Y: 10
};
const {CLOUD_X, CLOUD_Y} = CloudCoordinate;

const BarSize = {
  BAR_WIDTH: 40,
  BAR_HEIGHT: 150
};
const {BAR_WIDTH, BAR_HEIGHT} = BarSize;

const Gap = {
  CLOUD_GAP: 10,
  BAR_GAP: 50
};
const {CLOUD_GAP, BAR_GAP} = Gap;

const Colors = {
  FONT_COLOR: `#000`,
  CLOUD_COLOR: `#fff`,
  CLOUD_SHADOW: `rgba(0, 0, 0, 0.7)`,
  MAIN_PLAYER_COLOR: `rgba(255, 0, 0, 1)`,
};
const {FONT_COLOR, CLOUD_COLOR, CLOUD_SHADOW, MAIN_PLAYER_COLOR} = Colors;

const Font = {
  FONT_SIZE: `16px`,
  FONT_FAMILY: `PT Mono`,
  FONT_HEIGHT: 20
};
const {FONT_SIZE, FONT_FAMILY, FONT_HEIGHT} = Font;

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderTitle = (array, ctx) => {
  for (let i = 0; i < array.length; i++) {
    ctx.fillText(
        array[i],
        CLOUD_X + FONT_HEIGHT,
        CLOUD_Y + FONT_HEIGHT * (i + 1)
    );
  }
};

const getMaxElement = (arr) => {
  let maxElement = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

const getRandomNumber = (min, max) => {
  let random = Math.floor(min + Math.random() * (max + 1 - min));
  return random;
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(
      ctx,
      CLOUD_X + CLOUD_GAP,
      CLOUD_Y + CLOUD_GAP, CLOUD_SHADOW
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      CLOUD_COLOR
  );

  ctx.fillStyle = FONT_COLOR;
  ctx.font = `${FONT_SIZE} ${FONT_FAMILY}`;
  ctx.textBaseline = `hanging`;

  let titleArray = [`Ура вы победили!`, `Список результатов:`];

  renderTitle(titleArray, ctx);

  const maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    ctx.fillStyle = FONT_COLOR;

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        -((BAR_HEIGHT * times[i]) / maxTime) + (BAR_GAP + BAR_HEIGHT + CLOUD_Y + CLOUD_GAP)
    );

    ctx.fillText(
        names[i],
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        (CLOUD_HEIGHT - FONT_HEIGHT)
    );

    ctx.fillStyle = names[i] === `Вы` ? MAIN_PLAYER_COLOR : `hsl(240, ${getRandomNumber(0, 100)}%, 50%)`;

    ctx.fillRect(
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        BAR_GAP + BAR_HEIGHT + CLOUD_Y * 4,
        BAR_WIDTH,
        -(BAR_HEIGHT * times[i]) / maxTime
    );
  }
};
