const Device = require('./device');

/** Class representing a NEEO Recipe. */
class Room {
  /**
   * @hideconstructor
   */
  constructor(brain, data) {
    /**
     * @type {NeeoBrain}
     * @description The brain this room belongs to
     */
    this.brain = brain;

    /**
     * @type {string}
     * @description The room name
     */
    this.name = data.name;

    /**
     * @type {string}
     * @description The room key
     */
    this.key = data.key;

    /**
     * @type {number}
     * @description The number of devices assigned to this room
     */
    this.deviceCount = data.nrDevices;

    /**
     * @type {Array<Device>}
     * @description The devices assigned to this room
     */
    this.devices = Object.keys(data.devices).map(name => new Device(this.brain, {
        name,
        ...data.devices[name]
      }));

    this.icon = data.icon;
    this.weight = data.weight;
    this.hasController = data.hasController;
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
