const bonjour = require('bonjour');
const NeeoBrain = require('./brain');
const QUERY_DEVICES_INTERVAL = 10000;
const DISCOVER_TIME_MILLIS = 2000;
const brains = [];

let mdnsBrowser;
let mdnsQueryIntervalHandle;
let subscriptionFunction;

function getBrowser() {
  if (!mdnsBrowser) {
    mdnsBrowser = bonjour()
      .find({
        type: 'neeo'
      })
      .on('up', function (service) {
        brains.push(new NeeoBrain(service.name, service.host, service.port));
      });
  }

  return mdnsBrowser;
}

function queryDevices() {
  getBrowser().update();
}

function setTimeoutPromise(millis) {
  return new Promise(function (resolve) {
    setTimeout(resolve, millis);
  });
}

function discoverDevices() {
  queryDevices();

  return setTimeoutPromise(DISCOVER_TIME_MILLIS).then(getDiscoveredDevices);
}

function getDiscoveredDevices() {
  return brains;
}

function getDiscoveredDevice(brainName) {
  return getDiscoveredDevices().find(device => device.name === brainName);
}

function stopDiscoveringDevices() {
  if (!mdnsQueryIntervalHandle) {
    return;
  }

  getBrowser().stop();
  clearInterval(mdnsQueryIntervalHandle);
}

function startDiscoveringDevices() {
  if (mdnsQueryIntervalHandle) {
    return;
  }

  getBrowser().start();
  setInterval(queryDevices, QUERY_DEVICES_INTERVAL);
}

function setSubscriptionFunction(_subscriptionFunction_) {
  subscriptionFunction = _subscriptionFunction_;
}

module.exports = {
  startDiscoveringDevices,
  stopDiscoveringDevices,
  discoverDevices,
  getDiscoveredDevices,
  getDiscoveredDevice,
  setSubscriptionFunction
};
