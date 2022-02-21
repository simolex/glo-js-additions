"use strict";

const commentLine = document.getElementById("comment");
let game;

class Switch {
  constructor(switchId, lightBulb) {
    this.lightBulb = lightBulb;
    this.switchId = switchId;
    this.isPowerOn = false;
    this.switchButton = document.getElementById(switchId);
    this.switchState = this.switchButton.querySelector(".main__state");
    this.switchButton.addEventListener("click", () => {
      this.toggleSwitcher();
    });
    this.disable = false;
  }
  toggleSwitcher() {
    if (!this.disable) {
      this.switchState.classList.toggle("main__state--power-on");
      this.isPowerOn = !this.isPowerOn;

      this.lightBulb.setState(this.isPowerOn);
    }
    //////// test
    //this.lightBulb.showState();
  }

  setDisable() {
    this.disable = true;
  }
}

class SelectorBulb {
  constructor(selectorId, switchID, pos) {
    this.switchID = switchID;
    this.lightBulb = pos + 1;
    this.selector = document.getElementById(selectorId);
    this.description = this.selector
      .closest(".main__select-bulb")
      .querySelector(".main__control-text");
    this.selector.value = this.lightBulb;
    this.selector.addEventListener("input", (e) => {
      this.setState(e.target.value);
    });
    this.selector.addEventListener("click", (e) => {
      this.setState(e.target.value);
    });
  }
  setState(value) {
    this.lightBulb = +value;
    game.getLightBulb(this.lightBulb).setHighlight(this.switchID);
    this.description.textContent = `Выключатель №${(this.switchID + "").replace(
      "switch-",
      ""
    )} включает лампу №${this.lightBulb}`;
  }
}

class LightBulb {
  constructor(lightId) {
    this.isHot = false;
    this.isOn = false;
    this.lightId = lightId;
    this.lightBulb = document.getElementById(lightId);
    this.listColor = [
      "main__switcher--color-1",
      "main__switcher--color-2",
      "main__switcher--color-3",
    ];
    this.userNumberSwitch;
  }
  setState(isOn) {
    this.isOn = isOn;
    if (this.isOn) {
      this.isHot = true;
    }
  }
  showState() {
    const img = this.lightBulb.querySelector("img");
    const tooltip = this.lightBulb.querySelector(".tooltiptext");
    if (this.isOn) {
      img.src = "img/lightbulb-on.svg";
      tooltip.textContent = "Лампочка светит и горячая";
    } else {
      img.src = "img/lightbulb-off.svg";
      if (this.isHot) {
        tooltip.textContent = "Лампочка несветит и теплая";
      } else {
        tooltip.textContent = "Лампочка несветит и холодная";
      }
    }
  }
  setHighlight(numSwitch) {
    const highLighter = this.lightBulb.querySelector(".main__switcher");

    this.userNumberSwitch = numSwitch;
    this.listColor.forEach((color) => {
      highLighter.classList.remove(color);
      highLighter.classList.add("main__switcher--color-" + numSwitch);
    });
    //
  }
}

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
    game.setLevel(this.nextStage);
  }
}

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

class Game {
  constructor() {
    this.levels = {
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
      result: {
        blocks: {
          switchs: true,
          selectors: true,
          lights: true,
        },
        comment: "",
      },
    };
    this.rooms = {
      switchs: new Room("switchs"),
      selectors: new Room("selectors"),
      lights: new Room("lights"),
    };
    this.buttons = {
      0: new Button("button-start", "start"),
      start: new Button("button-next", "next"),
      next: new Button("button-ready", "result"),
    };
    this.ligthBulbIDs = ["light-1", "light-2", "light-3"];
    this.switchIDs = ["switch-1", "switch-2", "switch-3"];
    this.selectorIDs = ["range-1", "range-2", "range-3"];
    this.bulbElements = [];
    this.switchElements = [];
    this.selectorElements = [];
    this.init();
  }
  setLevel(levelState) {
    const level = this.levels[levelState];
    let resultGame = true;

    if (levelState === "result") {
      console.log("Хочу результат!!!");

      game.switchElements.forEach((sw) => {
        console.log(sw.switchtId, sw.lightBulb.userNumberSwitch);
        if (sw.switchId !== "switch-" + sw.lightBulb.userNumberSwitch) {
          resultGame = false;
        }
      });
      commentLine.textContent = resultGame
        ? "Поздравляю, вы выиграли!!! Ура-а-а!!!"
        : "К сожалению вы проиграли. 😐";
      return true;
    }
    for (let btn in this.buttons) {
      if (btn === levelState) {
        this.buttons[btn].show();
      } else {
        this.buttons[btn].hide();
      }
    }
    for (let block in level.blocks) {
      if (level.blocks[block]) {
        this.rooms[block].show();
      } else {
        this.rooms[block].hide();
      }
    }
    if (levelState === "next") {
      this.bulbElements.forEach((lightBulb) => lightBulb.showState());
      this.selectorElements.forEach((selector, index) => selector.setState(index + 1));
      this.switchElements.forEach((sw) => {
        sw.setDisable();
      });
    }
    commentLine.textContent = level.comment;
  }

  init() {
    const lightKeys = [];
    this.ligthBulbIDs.forEach((id, index) => {
      lightKeys.push(index);
    });

    this.switchIDs.forEach((id, index) => {
      const newLightBubl = this.getLightByRandom(lightKeys);

      this.switchElements[index] = new Switch(id, newLightBubl);
      console.log(this.switchElements[index]);
    });

    this.selectorIDs.forEach((id, index) => {
      this.selectorElements[index] = new SelectorBulb(id, index + 1, index);
    });
  }

  getLightByRandom(lightKeys) {
    const randIndex = Math.floor(Math.random() * lightKeys.length);
    const lightIndex = lightKeys[randIndex];
    lightKeys.splice(randIndex, 1);

    this.bulbElements[lightIndex] = new LightBulb(this.ligthBulbIDs[lightIndex]);
    this.bulbElements[lightIndex].setHighlight(lightIndex + 1);
    return this.bulbElements[lightIndex];
  }
  getLightBulb(num) {
    return this.bulbElements[num - 1];
  }
}
game = new Game();

game.setLevel("0");
