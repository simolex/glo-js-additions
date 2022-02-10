const inputField = document.querySelector("input[type=text]");
const lableForField = inputField.closest(".controls").querySelector("#text-span");
const mainButton = document.querySelector("#btn");
const squareElement = document.querySelector("#square");

const secondButton = document.querySelector("#e_btn");

const cicleSize = document.querySelector("input[type=range]");
const lableOfSize = cicleSize.closest(".controls").querySelector("#range-span");
const circleElement = document.querySelector("#circle");

//const allButton = [mainButton, secondButton];

console.dir(cicleSize);

const isColor = (color) => {
  return CSS.supports("color", color);
};

mainButton.addEventListener("click", () => {
  const color = inputField.value;
  console.log(color);
  console.log(isColor(color));
  if (isColor(color)) {
    squareElement.style.backgroundColor = color.trim();
    inputField.value = "";
  } else {
    inputField.style.borderColor = "red";
    lableForField.style.color = "red";
    lableForField.textContent = "Цвет - не существует";
    //squareElement.style.backgroundColor = "";
  }
});

inputField.addEventListener("input", () => {
  inputField.style.borderColor = "";
  lableForField.style.color = "";
  lableForField.textContent = "";
});

secondButton.addEventListener("click", () => {
  secondButton.style.display = "none";
});

cicleSize.value = 0;
lableOfSize.textContent = `0 %`;
cicleSize.min = -50;
cicleSize.max = 50;
const defaultWidth = parseFloat(getComputedStyle(circleElement).width);
const defaultHeight = parseFloat(getComputedStyle(circleElement).height);

const step = (parseFloat(getComputedStyle(squareElement).width) - defaultWidth) / 50;

cicleSize.addEventListener("input", () => {
  const size = cicleSize.value;
  lableOfSize.textContent = `${size} %`;

  circleElement.style.width = `${defaultWidth + Math.round(size * step)}px`;
  circleElement.style.height = `${defaultHeight + Math.round(size * step)}px`;
});
