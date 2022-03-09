/**
 * @param {String} type  - Тип искомого параметра
 * @param {Array} values - Входной массив
 * @returns {Array}
 *
 * Функция фильтрации входного массива по указанному типу
 */
const filterByType = (type, ...values) => values.filter((value) => typeof value === type),
  /**
   * @param {void}
   *
   * Функция скрытия всех блоков: "Результаты"
   */
  hideAllResponseBlocks = () => {
    //Отбор всех элементов: "div" с классом: "dialog__response-block"
    //Преобразоываем псевдомассива NodeList в объект Array и запись его в константу responseBlocksArray
    const responseBlocksArray = Array.from(document.querySelectorAll("div.dialog__response-block"));
    // перебор массива responseBlocksArray и установка каждому блоку стиля [display=none]
    responseBlocksArray.forEach((block) => (block.style.display = "none"));
  },
  /**
   *  @param {String} blockSelector	- селектор блока результатов
   *  @param {String} msgText				- сообщение
   *  @param {String} spanSelector	- селектор блока, в который печатается сообщение msgText
   *  Функция отображения блока и выода в него сообщения
   */
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    //Скрыть все блоки результатов
    hideAllResponseBlocks();
    // По селектору blockSelector найти элемент и установить стили [display=block]
    document.querySelector(blockSelector).style.display = "block";
    //Если в функцию передан селектор блока сообщения, то:
    if (spanSelector) {
      // Найти этот блок и напечатать в него текст сообщения
      document.querySelector(spanSelector).textContent = msgText;
    }
  },
  /**
   * @param {String} msgText  - Текстовое сообщение
   *
   * Вывести сообщение о ошибке через вызов функции showResponseBlock()
   */
  showError = (msgText) => showResponseBlock(".dialog__response-block_error", msgText, "#error"),
  /**
   * @param {String} msgText  - Текстовое сообщение
   *
   * Вывести сообщение с результатом через вызов функции showResponseBlock()
   */
  showResults = (msgText) => showResponseBlock(".dialog__response-block_ok", msgText, "#ok"),
  /**
   * @param {String} msgText  - Текстовое сообщение
   *
   * Вывести сообщение без результата через вызов функции showResponseBlock()
   */
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"),
  /**
   * @param {String} type  - Тип искомого параметра
   * @param {Array} values - Входной массив
   *
   * Функция фильтрации входного массива по указанному типу
   */
  tryFilterByType = (type, values) => {
    //начала блока попытки
    try {
      // Передача в filterByType() всех значенией разделенных запятыми,
      // как параметры  функции.
      // Получения резльтата фильтрации массива values по типу type
      // и объединение результатов в строку, через разделитель запятая + пробел
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      // формирование текта сообщения с результатом фильтрации
      // по критерию длина результирующей строки
      const alertMsg = valuesArray.length
        ? //При длине долее нуля выводим искомый тип и результат
          `Данные с типом ${type}: ${valuesArray}`
        : //Иначе сообщаем об отсутствии такого типа в искомой строке
          `Отсутствуют данные типа ${type}`;
      //выводим результат на экран через showResults()
      showResults(alertMsg);
      //блок исключения
    } catch (e) {
      //При любой ошибке выводим её на экран через showError()
      showError(`Ошибка: ${e}`);
    }
  };
//Ищем в DOM элемент по селектору #filter-btn и объявляем кнопку фильтрации
const filterButton = document.querySelector("#filter-btn");
//На кнопку фильтрации привязвываем событие Click
filterButton.addEventListener("click", (e) => {
  //Ищем в DOM элемент по селектору #type и объявляем кнопку фильтрации
  const typeInput = document.querySelector("#type");
  //Ищем в DOM элемент по селектору #data и объявляем кнопку фильтрации
  const dataInput = document.querySelector("#data");
  // Если поле Данные  пустое,
  if (dataInput.value === "") {
    //то вывести подсказку через метод setCustomValidity()
    dataInput.setCustomValidity("Поле не должно быть пустым!");
    //и сообщить об отсутствии результата
    showNoResults();
    //Иначе (поле Данные не пустое), то:
  } else {
    //Очистить подсказку Валидации формы
    dataInput.setCustomValidity("");
    //остановить стандартное поведение формы при событии Submit
    e.preventDefault();
    //выполнить фильтрацию значений поля Данные в соответствии
    // с выбранным значением Тип данных
    //(предварительно почистив крайние пустые и пробельные символы)
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
});
