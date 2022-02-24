const text = document.getElementById("text");

//text.textContent = text.textContent.replace(/Lorem/gi, "Лорем");
text.innerHTML = text.innerHTML.replace(/(<span>[\w\s]+<\/span>)/gi, (str, $1) => {
  return `<strong>${$1}</strong>`;
});

const form = document.getElementById("form");
const textInput = document.getElementById("text");
const numberInput = document.getElementById("number");
//const btnSubmit = document.getElementById("btn");

// textInput.addEventListener("input", (e) => {
//   e.target.value = e.target.value.replace(/\d+/gi, "");
// });
// numberInput.addEventListener("input", (e) => {
//   e.target.value = e.target.value.replace(/\D+/gi, "");
// });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isError = false;
  if (!/[^а-яА-Я]/g.test(textInput.value) && textInput.value !== "") {
    console.log("В первом поле только текст");
  } else {
    isError = true;
  }

  if (!/[^\d]/g.test(numberInput.value) && numberInput.value !== "") {
    console.log("Во втором поле только цифры");
  } else {
    isError = true;
  }
  !isError && console.log("Данные отправлены");
});
console.log(form);
