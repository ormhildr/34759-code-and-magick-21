'use strict';

const CloudSize = {
  CLOUD_WIDTH: 420,
  CLOUD_HEIGHT: 270
};

const CloudCoordinate = {
  CLOUD_X: 100,
  CLOUD_Y: 10
};

const BarSize = {
  BAR_WIDTH: 40,
  BAR_HEIGHT: 150
};

const Gap = {
  CLOUD_GAP: 10,
  BAR_GAP: 50
};

const Colors = {
  FONT_COLOR: `#000`,
  CLOUD_COLOR: `#fff`,
  CLOUD_SHADOW: `rgba(0, 0, 0, 0.7)`,
  MAIN_PLAYER_COLOR: `rgba(255, 0, 0, 1)`
};

const Font = {
  FONT_SIZE: `16px`,
  FONT_FAMILY: `PT Mono`,
  FONT_HEIGHT: 20
};

const TITLE_ARRAY = [`Ура вы победили!`, `Список результатов:`];

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CloudSize.CLOUD_WIDTH, CloudSize.CLOUD_HEIGHT);
};

const renderTitle = (titles, ctx) => {
  for (let i = 0; i < titles.length; i++) {
    ctx.fillText(
        titles[i],
        CloudCoordinate.CLOUD_X + Font.FONT_HEIGHT,
        CloudCoordinate.CLOUD_Y + Font.FONT_HEIGHT * (i + 1)
    );
  }
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(
      ctx,
      CloudCoordinate.CLOUD_X + Gap.CLOUD_GAP,
      CloudCoordinate.CLOUD_Y + Gap.CLOUD_GAP, Colors.CLOUD_SHADOW
  );
  renderCloud(
      ctx,
      CloudCoordinate.CLOUD_X,
      CloudCoordinate.CLOUD_Y,
      Colors.CLOUD_COLOR
  );

  ctx.fillStyle = Colors.FONT_COLOR;
  ctx.font = `${Font.FONT_SIZE} ${Font.FONT_FAMILY}`;
  ctx.textBaseline = `hanging`;

  renderTitle(TITLE_ARRAY, ctx);

  const maxTime = window.util.getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    ctx.fillStyle = Colors.FONT_COLOR;

    ctx.fillText(
        names[i],
        CloudCoordinate.CLOUD_X + Gap.BAR_GAP + (Gap.BAR_GAP + BarSize.BAR_WIDTH) * i,
        (CloudSize.CLOUD_HEIGHT - Font.FONT_HEIGHT)
    );

    ctx.fillStyle = names[i] === `Вы` ? Colors.MAIN_PLAYER_COLOR : window.util.getRandomHSL();

    ctx.fillRect(
        CloudCoordinate.CLOUD_X + Gap.BAR_GAP + (Gap.BAR_GAP + BarSize.BAR_WIDTH) * i,
        Gap.BAR_GAP + BarSize.BAR_HEIGHT + CloudCoordinate.CLOUD_Y * 4,
        BarSize.BAR_WIDTH,
        -(BarSize.BAR_HEIGHT * times[i]) / maxTime
    );
  }
};
