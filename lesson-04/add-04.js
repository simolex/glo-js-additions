"use strict";

const getShortText = (text) => {
  let resultText;

  if (typeof text != "string") {
    console.warn("Предупреждение: Значение должно быть текстовое");
    return "";
  }

  resultText = text.trim();
  return resultText.length <= 30 ? resultText : `${resultText.substring(0, 30)}...`;
};

console.log(getShortText("012345678901234567890123456789aaaaaaa"));
