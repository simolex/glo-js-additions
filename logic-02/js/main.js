class Switch {
  constructor(switchId) {
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

console.log(switchFirst.switchButton);
