/** Class representing a NEEO Recipe. */
class Recipe {
  /**
   * @hideconstructor
   */
  constructor(brain, data, roomData) {
    /**
     * @type {NeeoBrain}
     * @description The brain this recipe belongs to
     */
    this.brain = brain;

    /**
     * @type {string}
     * @description The recipe key
     */
    this.key = data.key;

    /**
     * @type {string}
     * @description The recipe name
     */
    this.name = data.name;

    /**
     * @type {string}
     * @description The room key this recipe belongs to
     */
    this.roomKey = data.roomKey;

    /**
     * @type {string}
     * @description The room name this recipe belongs to
     */
    this.roomName = data.roomName;

    /**
     * @type {Array<Device>}
     * @description The devices in this recipe
     */
    this.devices = roomData.find(room => room.key === this.roomKey).devices;

    this.steps = data.steps;
    this.type = data.type;
    this.conditions = data.conditions;
    this.dirty = data.dirty;
    this.enabled = data.enabled;
    this.isCustom = data.isCustom;
    this.isHiddenRecipe = data.isHiddenRecipe;
    this.mainDeviceType = data.mainDeviceType;
    this.scenarioKey = data.scenarioKey;
    this.weight = data.weight;
    this.trigger = data.trigger;
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
