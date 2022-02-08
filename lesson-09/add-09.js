"use strict";

const longClock = document.querySelector(".clock__long");
const shortClock = document.querySelector(".clock__short");

//const ending;

const timeObject = {
  nowClock: {},
  endingHour: ["ов", "", "а"],
  endingAny: ["", "а", "ы"],
  week: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
  months: [
    "",
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ],

  setEnding: function (value, pattern) {
    return value > 10 && value < 15
      ? pattern[0]
      : value % 10 == 1
      ? pattern[1]
      : (value + 9) % 10 >= 4
      ? pattern[0]
      : pattern[2];
  },

  getHourName: function (hourValue) {
    return "час" + this.setEnding(hourValue, this.endingHour);
  },
  getMinuteName: function (hourValue) {
    return "минут" + this.setEnding(hourValue, this.endingAny);
  },
  getSecondName: function (hourValue) {
    return "секунд" + this.setEnding(hourValue, this.endingAny);
  },

  getNowDate: function () {
    const nowDate = new Date();

    return {
      dd: nowDate.getDate(),
      mm: nowDate.getMonth(),
      yy: nowDate.getFullYear(),
      hh: nowDate.getHours(),
      mi: nowDate.getMinutes(),
      ss: nowDate.getSeconds(),
      wc: this.week[nowDate.getDay()],
    };
  },

  zeroFormat: function (number) {
    return number - 0 < 10 ? "0" + number : number;
  },
  getLongDate: function () {
    const d = this.nowClock;
    return (
      `Сегодня ${d.wc}, ${d.dd} ${this.months[d.mm]} ${d.yy}, ` +
      `${d.hh} ${this.getHourName(d.hh)} ` +
      `${d.mi} ${this.getMinuteName(d.mi)} ${d.ss} ${this.getSecondName(d.ss)}`
    );
  },

  getShortDate: function () {
    let d = this.nowClock;
    for (let key in d) {
      if (key != "wc") {
        d[key] = this.zeroFormat(d[key]);
      }
    }

    return `${d.dd}.${d.mm}.${d.yy} - ${d.hh}:${d.mi}:${d.ss}`;
  },

  clock: function () {
    timeObject.nowClock = this.getNowDate();
    longClock.textContent = this.getLongDate();
    shortClock.textContent = this.getShortDate();
  },
};

setInterval(() => timeObject.clock(), 1000);
timeObject.clock();
