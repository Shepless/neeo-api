const {discoverDevices} = require('./lib/discovery');

module.exports = {
  /** Find all brains connected to the local network
  * @return {NeeoBrain[]} All discovered brains on the local network
  */
  discoverBrains: discoverDevices
};
