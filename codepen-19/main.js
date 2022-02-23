const templateClouds = ["#cloud-1", "#cloud-2"];

class Cloud {
  constructor(templateLayer) {
    const cloudId = templateClouds[Math.floor(Math.random() * templateClouds.length)];
    const layer = templateLayer[Math.floor(Math.random() * templateLayer.length)];
    this.scale = Math.random() + 1;
    this.speed = Math.random() * 0.5 + 1;

    this.svgSymbol = document.createElementNS("http://www.w3.org/2000/svg", "use");
    this.svgSymbol.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", cloudId);
    this.svgSymbol.setAttribute("transform", `matrix(${this.scale},0,0,${this.scale},0,0)`);
    layer.append(this.svgSymbol);

    this.x = Math.floor(Math.random() * 500) - 200;
    this.y = Math.floor(Math.random() * 150) + 20;
    this.setCoordinate();
  }

  animate() {
    this.x += this.speed;
    this.setCoordinate();
  }
  isVisible() {
    return this.x < 1200;
  }

  setCoordinate() {
    this.svgSymbol.setAttribute("x", this.x * (1 / this.scale));
    this.svgSymbol.setAttribute("y", this.y * (1 / this.scale));
  }
  remove() {
    this.svgSymbol.remove();
  }
}
class Scena {
  constructor() {
    this.templateLayer = [document.getElementById("back"), document.getElementById("front")];
    this.clouds = [];
    for (let i = 0; i < 15; i++) {
      this.clouds.push(this.createCloud());
    }
  }
  createCloud() {
    return new Cloud(this.templateLayer);
  }
  nextStep() {
    this.clouds.forEach((cloud, index) => {
      if (cloud.isVisible()) {
        cloud.animate();
      } else {
        cloud.remove();
        this.clouds[index] = this.createCloud();
      }
    });
  }
  remove() {
    this.clouds.forEach((cloud) => cloud.remove());
  }
}

const Animation = () => {
  let scenaOnce = new Scena();
  const start = document.getElementById("start");
  const reset = document.getElementById("reset");
  let isAnimated = false;

  const step = function () {
    if (isAnimated) {
      requestAnimationFrame(step);
      scenaOnce.nextStep();
    }
  };

  start.addEventListener("click", () => {
    isAnimated = !isAnimated;
    step();
  });
  reset.addEventListener("click", () => {
    isAnimated = false;
    scenaOnce.remove();
    scenaOnce = new Scena();
  });
};
Animation();
