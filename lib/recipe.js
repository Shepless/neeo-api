/** Class representing a NEEO Recipe. */
class Recipe {
  /**
   * @hideconstructor
   */
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

  /**
   * Get a device that belongs to this recipe
   * @param {string} name - The name of the device to get
   * @return {Device} The matched device
   */
  getDevice(name) {
    return this.devices.find(device => device.name.toLowerCase() === name.toLowerCase());
  }

  /**
   * Power on the recipe
   * @return {Promise}
   */
  powerOn() {
    return this.brain.get(`projects/home/rooms/${this.roomKey}/recipes/${this.key}/execute`);
  }

  /**
   * Power off the recipe
   * @return {Promise}
   */
  powerOff() {
    return this.brain.get(`projects/home/rooms/${this.roomKey}/scenarios/${this.scenarioKey}/poweroff`)
  }
}

module.exports = Recipe;
