"use strict";
/**
 *
 * Написать функцию, которая рассчитает угол между часовой и минутной стрелками часов.
 * Функция принимает два аргумента: часы и минуты.
 * Задачу выполнить в Сodepen, код должен быть рабочим! Ответы не в Сodepen не принимаются!
 * (Ссылка на Сodepen codepen.io) https://codepen.io/simolex/pen/gOXGjqz
 *
 * Пример вызова функции:
 * func(6, 0) =>>> 180
 * func(3, 0) =>>> 90
 * func(3, 30) =>>> 75
 *
 * @param {number} hour
 * @param {number} minute
 * @returns {number angle}| null
 */

const getAngleClock = (hour, minute) => {
  const hourAngle = 30;
  const hourAngleByMinute = 0.5;
  const minuteAngle = 6;

  //hour = hour % 12;

  const angleForHourFromStart = hour * hourAngle + hourAngleByMinute * minute;
  const angleForMinuteFromStart = minute * minuteAngle;
  const angle = Math.abs(angleForHourFromStart - angleForMinuteFromStart);
  return hour < 12 && minute < 60 ? (angle > 180 ? 360 - angle : angle) : null;
};

console.log(getAngleClock(6, 0));
