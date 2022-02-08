"use strict";

const longClock = document.querySelector(".clock__long");
const shortClock = document.querySelector(".clock__short");
//const ending;

const timeObject = {
  endingHour: ["ов", "", "а"],
  endingAny: ["", "а", "ы"],

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
};

for (let i = 0; i <= 24; i++) {
  console.log(i, timeObject.getMinuteName(i));
}
