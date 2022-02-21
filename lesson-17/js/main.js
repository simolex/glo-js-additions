"use strict";

class App {
  constructor() {
    this.equipments = {};
    this.nextId = 1;
  }
  get nextId() {
    return this.nextId++;
  }
}

class Equipment {
  constructor(nameEquip, brandEquip, modelEquip, numberEquip, dateEquip) {
    this.nameEquip = nameEquip;
    this.brandEquip = brandEquip;
    this.modelEquip = modelEquip;
    this.numberEquip = numberEquip;
    this.dateEquip = dateEquip;
  }
}
