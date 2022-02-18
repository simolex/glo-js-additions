"use strict";

const commentLine = document.getElementById("comment");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
  constructor(buttonId, stage) {
    this.nextStage = stage;
    this.buttonId = buttonId;
    this.element = document.getElementById(buttonId);
    this.element.addEventListener("click", () => {
      this.action();
    });
  }

  hide() {
    this.element.style.display = "none";
  }

  show() {
    this.element.style.display = "";
  }

  action() {
    setLevel(this.nextStage);
    console.log("Click: " + this.buttonId);
  }
}

const buttonFirst = new Button("button-start");

console.log(buttonFirst);

const levels = {
  0: {
    blocks: {
      switchs: false,
      selectors: false,
      lights: false,
    },
    comment: "Для начала игры нажмите старт",
  },
  start: {
    blocks: {
      switchs: true,
      selectors: false,
      lights: false,
    },
    comment:
      "Установите выключатели так, чтобы угадаить к каким лампам они подключены в соседеней комнате",
  },
  next: {
    blocks: {
      switchs: true,
      selectors: true,
      lights: true,
    },
    comment:
      "Угадайте какой выключатель, какой лампе соответствует? С помощью слайдеров(ползунков) покажите ваше решение",
  },
};

class Room {
  constructor(roomId) {
    this.roomId = roomId;
    this.element = document.getElementById(roomId);
  }
  hide() {
    this.element.style.visibility = "hidden";
    this.element.style.opacity = 0;
  }
  show() {
    this.element.style.visibility = "";
    this.element.style.opacity = "";
  }
}

const rooms = {
  switchs: new Room("switchs"),
  selectors: new Room("selectors"),
  lights: new Room("lights"),
};

const buttons = {
  0: new Button("button-start", "start"),
  start: new Button("button-next", "next"),
  next: new Button("button-ready", "0"),
};

class Game {}

let levelGlobal = "0";
const wait = (waitLevel) => {
  do {
    sleep(1000);
    console.log(`Ждем: ${waitLevel}`);
  } while (levelGlobal != waitLevel);
};

function setLevel(levelState) {
  console.log(levelState);
  const level = levels[levelState];
  for (let btn in buttons) {
    if (btn === levelState) {
      buttons[btn].show();
    } else {
      buttons[btn].hide();
    }
  }
  for (let block in level.blocks) {
    if (level.blocks[block]) {
      rooms[block].show();
    } else {
      rooms[block].hide();
    }
  }
  commentLine.textContent = level.comment;
}

setLevel("0");
