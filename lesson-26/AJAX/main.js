"use strict";

const getData = (url) => {
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(
        `Загрузка данных: "${response.url}", завершилась ошибкой: "${response.status}: ${response.statusText}"`
      );
    }
  });
};
const sendData = (url, data = {}) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(
        `Отправка данных: "${response.url}", завершилась ошибкой: "${response.status}: ${response.statusText}"`
      );
    }
  });
};

getData("db.json")
  .then((readedData) => sendData("https://jsonplaceholder.typicode.com/posts", readedData))
  .then((respondedData) => {
    console.log(respondedData);
  })
  .catch((error) => {
    console.log(error);
  });
