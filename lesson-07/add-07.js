"use strict";

const weekRu = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const holidayStyle = "font-style: italic";
const nowStyle = "font-weight: bold";
const nowDay = new Date().getDay();

//let style;

for (let weekDay in weekRu) {
  //style = weekDay == nowDay ? nowStyle : weekDay == 0 || weekDay == 6 ? holidayStyle : "";
  console.log(
    `%c ${weekRu[weekDay]}`,
    weekDay == nowDay ? nowStyle : weekDay == 0 || weekDay == 6 ? holidayStyle : ""
  );
}
