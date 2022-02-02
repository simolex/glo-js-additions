"use strict";

//Задание 1
console.log("Задание 1:");
const arr = ["54684", "4", "229", "682", "489", "279", "798"];
arr.forEach((item) => {
  if (item[0] == "2" || item[0] == "4") {
    console.log(item);
  }
});

//Задание 2
console.log("Задание 2:");
let primeCollection = [2];
let isPrime;

for (let i = 3; i <= 100; i++) {
  isPrime = true;
  //console.log(`Число: ${i}`);
  primeCollection.forEach((prime) => {
    if (!(i % prime)) {
      isPrime = false;
    }
  });
  if (isPrime) {
    primeCollection[primeCollection.length] = i;
  }
}
primeCollection = [1, ...primeCollection];
primeCollection.forEach((prime) => {
  console.log(prime, `Делители этого числа: 1 и ${prime}`);
});
