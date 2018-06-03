const Device = require('./device');

/** Class representing a NEEO Recipe. */
class Room {
  /**
   * @hideconstructor
   */
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

  /**
   * Get a device that belongs to this room
   * @param {string} name - The name of the device to get
   * @return {Device} The matched device
   */
  getDevice(name) {
    return this.devices.find(device => device.name.toLowerCase() === name.toLowerCase());
  }
}

module.exports = Room;
