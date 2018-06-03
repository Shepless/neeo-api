const Macro = require('./macro');

/** Class representing a NEEO Device. */
class Device {
  /**
   * @hideconstructor
   */
  constructor(brain, data) {
    /**
     * @type {NeeoBrain}
     * @description The brain this device belongs to
     */
    this.brain = brain;

    /**
     * @type {string}
     * @description The name of the device
     */
    this.name = data.name;

    /**
     * @type {string}
     * @description The name of the room this device is assigned to
     */
    this.roomName = data.roomName;

    /**
     * @type {string}
     * @description The device type
     */
    this.type = data.details.type;

    /**
     * @type {string}
     * @description The device manufacturer name
     */
    this.manufacturer = data.details.manufacturer;

    /**
     * @type {string}
     * @description The device key
     */
    this.key = data.key;
    this.weight = data.weight;
    this.icon = data.details.icon;
    this.powerMode = data.powerMode;
    this.sensors = data.sensors;
    this.favorites = data.favorites;
    this.capabilities = data.capabilities;
    this.adapterDeviceId = data.adapterDeviceId;
    this.sourceName = data.details.sourceName;
    this.adapterName = data.details.adapterName;

    /**
     * @type {Array<Macro>}
     * @description The macros for this device
     */
    this.macros = Object.keys(data.macros).map(name => new Macro(this.brain, {
      name,
      ...data.macros[name]
    }));
  }

  /**
   * Get a macro that belongs to this device
   * @param {string} name - The name of the macro to get
   * @return {Macro}
   */
  getMacro(name) {
    return this.macros.find(macro => macro.name.toLowerCase() === name.toLowerCase());
  }
}

module.exports = Device;
