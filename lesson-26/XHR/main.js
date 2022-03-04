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
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  try {
    xhr.send(JSON.stringify(data));
    if (xhr.status != 201) {
      throw new Error(
        `Отправка данных: "${url}", завершилась ошибкой: "${xhr.status}: ${xhr.statusText}"`
      );
    } else {
      return JSON.parse(xhr.response);
    }
  } catch (err) {
    console.log(err);
  }
};

getData("db.json")
  .then((readedData) => sendData("https://jsonplaceholder.typicode.com/posts", readedData))
  .then((respondedData) => {
    console.log(respondedData);
  })
  .catch((error) => {
    console.log(error);
  });
