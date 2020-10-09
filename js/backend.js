'use strict';

(() => {
  const URL = {
    save: `https://21.javascript.pages.academy/code-and-magick`,
    load: ` https://21.javascript.pages.academy/code-and-magick/data`
  };

  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const createXhr = (request, url, onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL.load);

    return xhr;
  };

  const load = (onLoad, onError) => {
    createXhr(`GET`, URL.load, onLoad, onError).send();
  };
  const save = (data, onLoad, onError) => {
    createXhr(`POST`, URL.load, onLoad, onError).send(data);
  };

  window.backend = {
    load,
    save
  };
})();
