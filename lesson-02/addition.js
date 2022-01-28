"use strict";

const num = 266219;
const power = 3;
const stringNum = num + "";
let result = 1;

for (let i = 0; i < stringNum.length; i++) {
  result *= stringNum[i];
}

result **= power;

console.log((result + "").substring(0, 2));
