"use strict";

let lang;
const langAll = ["en", "ru"];

do {
  lang = prompt("Введите значение Lang = en | ru:");
} while (!langAll.includes(lang));

const weekEn = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const weekRu = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

console.log("Задание 1 (через if)");
if (lang == "en") {
  console.log(weekEn);
} else {
  console.log(weekRu);
}

console.log("Задание 1 (switch-case)");
switch (lang) {
  case "en":
    console.log(weekEn);
    break;
  case "ru":
    console.log(weekRu);
    break;
}

console.log("Задание 1 (через многомерный массив без ифов и switch)");
let week = [];
week["en"] = weekEn;
week["ru"] = weekRu;
console.log(week[lang]);

//Задание 2

const namePerson = prompt("Введите Имя: ");

const rank =
  namePerson == "Артем" ? "директор" : namePerson == "Александр" ? "преподаватель" : "студент";
console.log(`Это: ${rank}`);
