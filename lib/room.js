const Device = require('./device');

class Room {
  constructor(brain, data) {
    this.brain = brain;
    this.name = data.name;
    this.icon = data.icon;
    this.key = data.key;
    this.weight = data.weight;
    this.hasController = data.hasController;
    this.deviceCount = data.nrDevices;
    this.devices = data.devices;

    this.devices = Object.keys(data.devices).map(name => new Device(this.brain, {
        name,
        ...data.devices[name]
      }));
  }

  getDevice(name) {
    return this.devices.find(device => device.name.toLowerCase() === name.toLowerCase());
  }
}

module.exports = Room;
