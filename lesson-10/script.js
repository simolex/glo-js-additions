const body = document.querySelector("body");
const adware = document.querySelector(".adv");
const booksSection = document.querySelector(".books");
const bookList = document.querySelectorAll(".book");

booksSection.insertAdjacentElement("afterbegin", bookList[1]);
booksSection.insertAdjacentElement("beforeend", bookList[2]);
bookList[3].before(bookList[4]);

body.style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';

const titleBook_3 = bookList[4].querySelector("h2>a");
titleBook_3.textContent = "Книга 3. this и Прототипы Объектов";
adware.remove();

const bookContentTwo = bookList[0].querySelectorAll("ul>li");
bookContentTwo[10].before(bookContentTwo[2]);
bookContentTwo[3].after(bookContentTwo[6]);
bookContentTwo[4].before(bookContentTwo[8]);

const bookContentFive = bookList[5].querySelectorAll("ul>li");
bookContentFive[1].after(bookContentFive[9]);
bookContentFive[6].before(bookContentFive[2]);
bookContentFive[8].before(bookContentFive[5]);

const bookContentSix = bookList[2].querySelectorAll("ul>li");
const newContent = document.createElement("li");
newContent.textContent = "Глава 8: За пределами ES6";
bookContentSix[8].after(newContent);
