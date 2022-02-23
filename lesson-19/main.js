const inputField = document.getElementById("input");
const outputField = document.getElementById("text");

class Debounce {
  constructor() {
    this.timerHandle = null;
  }
  setAction(callback) {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
    }
    this.timerHandle = setTimeout(() => {
      if (!!callback) {
        callback.apply(this);
      }
    }, 300);
  }
}

const debounceInst = new Debounce();

inputField.addEventListener("keyup", () => {
  debounceInst.setAction(() => {
    outputField.textContent = inputField.value;
  });
});
