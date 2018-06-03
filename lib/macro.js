/** Class representing a NEEO Device Macro. */
class Macro {
  /**
   * @hideconstructor
   */
  constructor(brain, data) {
    /**
     * @type {NeeoBrain}
     * @description The brain this macro belongs to
     */
    this.brain = brain;

    /**
     * @type {string}
     * @description The macro name
     */
    this.name = data.name;

    /**
     * @type {string}
     * @description The macro key
     */
    this.key = data.key;

    /**
     * @type {string}
     * @description The macro label
     */
    this.label = data.label;

    /**
     * @type {string}
     * @description The device name this macro belongs to
     */
    this.deviceName = data.deviceName;

    /**
     * @type {string}
     * @description The device key this macro belongs to
     */
    this.deviceKey = data.deviceKey;

    /**
     * @type {string}
     * @description The room name this macro belongs to
     */
    this.roomName = data.roomName;

    /**
     * @type {string}
     * @description The room key this macro belongs to
     */
    this.roomKey = data.roomKey;
  }

  /**
   * Trigger this macro on the brain
   * @return {Promise}
   */
  trigger() {
    return this.brain.get(`projects/home/rooms/${this.roomKey}/devices/${this.deviceKey}/macros/${this.key}/trigger`);
  }
}

module.exports = Macro;
