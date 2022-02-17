class Switch {
  constructor(switchId) {
    this.switchId = switchId;
    this.isHot = false;
    this.isPowerOn = false;
    this.switchButton = document.getElementById(switchId);
    this.switchState = this.switchButton.querySelector(".main__state");
    this.switchButton.addEventListener("click", (e) => {
      this.toggleSwitcher();
    });
  }
  toggleSwitcher() {
    this.switchState.classList.toggle("main__state--power-on");
    this.isPowerOn = !this.isPowerOn;
    if (this.isPowerOn) this.isHot = true;
  }
}

const switchFirst = new Switch("switch-1");
const switchSecond = new Switch("switch-2");
const switchThree = new Switch("switch-3");

class SelectorBulb {
  constructor(selectorId) {
    this.lightBulb = 1;
    this.selector = document.getElementById(selectorId);
    this.selector.value = 1;
    this.selector.addEventListener("input", (e) => {
      this.setState(e.target.value);
    });
  }
  setState(value) {
    this.lightBulb = +value;
  }
}

const selectorFirst = new SelectorBulb("range-1");

console.log(switchFirst, selectorFirst);

class LightBulb {
  isOn;
  constructor(lightId) {
    this.lightId = lightId;
    this.lightBulb = document.getElementById(lightId);
  }
  setState(isOn) {
    this.isOn = isOn;
  }
  showState() {
    const img = this.lightBulb.querySelector("img");
    if (this.isOn) {
      img.src = "img/lightbulb-on.svg";
    } else {
      img.src = "img/lightbulb-off.svg";
    }
  }
}

const lightFirst = new LightBulb("light-1");

console.log(lightFirst);

class Button {
  constructor(buttonId) {
    this.buttonId = buttonId;
    this.element = document.getElementById(buttonId);
    this.element.addEventListener("click", () => {
      this.action();
    });
  }

  action() {
    console.log("Click: " + this.buttonId);
  }
}

const buttonFirst = new Button("button-start");

console.log(buttonFirst);
