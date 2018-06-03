class Recipe {
  constructor(brain, data, roomData) {
    this.brain = brain;
    this.key = data.key;
    this.name = data.name;
    this.conditions = data.conditions;
    this.dirty = data.dirty;
    this.enabled = data.enabled;
    this.isCustom = data.isCustom;
    this.isHiddenRecipe = data.isHiddenRecipe;
    this.mainDeviceType = data.mainDeviceType;
    this.roomKey = data.roomKey;
    this.roomName = data.roomName;
    this.scenarioKey = data.scenarioKey;
    this.type = data.type;
    this.weight = data.weight;
    this.trigger = data.trigger;
    this.steps = data.steps;
    this.devices = roomData.find(room => room.key === this.roomKey).devices;
  }

  getDevice(name) {
    return this.devices.find(device => device.name.toLowerCase() === name.toLowerCase());
  }

  powerOn() {
    return this.brain.get(`projects/home/rooms/${this.roomKey}/recipes/${this.key}/execute`);
  }

  powerOff() {
    return this.brain.get(`projects/home/rooms/${this.roomKey}/scenarios/${this.scenarioKey}/poweroff`)
  }
}

module.exports = Recipe;
