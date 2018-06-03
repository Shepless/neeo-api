/** Class representing a NEEO Device Macro. */
class Macro {
  /**
   * @hideconstructor
   */
  constructor(brain, data) {
    this.brain = brain;
    this.name = data.name;
    this.key = data.key;
    this.label = data.label;
    this.deviceName = data.deviceName;
    this.deviceKey = data.deviceKey;
    this.roomName = data.roomName;
    this.roomKey = data.roomKey;
  }

  /**
   * Get a macro that belongs to this device
   * @return {Promise}
   */
  trigger() {
    return this.brain.get(`projects/home/rooms/${this.roomKey}/devices/${this.deviceKey}/macros/${this.key}/trigger`);
  }
}

module.exports = Macro;
