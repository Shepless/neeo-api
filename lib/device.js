const Macro = require('./macro');

class Device {
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

  getMacro(name) {
    return this.macros.find(macro => macro.name.toLowerCase() === name.toLowerCase());
  }
}

module.exports = Device;
