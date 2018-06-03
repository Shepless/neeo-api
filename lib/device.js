const Macro = require('./macro');

/** Class representing a NEEO Device. */
class Device {
  /**
   * @hideconstructor
   */
  constructor(brain, data) {
    this.brain = brain;
    this.name = data.name;
    this.roomName = data.roomName;
    this.adapterDeviceId = data.adapterDeviceId;
    this.sourceName = data.details.sourceName;
    this.adapterName = data.details.adapterName;
    this.type = data.details.type;
    this.manufacturer = data.details.manufacturer;
    this.icon = data.details.icon;
    this.powerMode = data.powerMode;
    this.sensors = data.sensors;
    this.favorites = data.favorites;
    this.capabilities = data.capabilities;
    this.key = data.key;
    this.weight = data.weight;

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
