const axios = require('axios');
const values = require('object.values');
const Room = require('./room');
const Recipe = require('./recipe');

class NeeoBrain {
  constructor(name, host, port, apiVersion = 'v1') {
    this.name = name;
    this.host = host;
    this.port = port;
    this.apiVersion = apiVersion;
  }

  get(fragment) {
    return axios.get(`http://${this.host}:${this.port}/${this.apiVersion}/${fragment}/`)
      .then(response => response.data);
  }

  post(fragment, data = {}) {
    return axios.post(`http://${this.host}:${this.port}/${this.apiVersion}/${fragment}/`, data)
      .then(response => response.data);
  }

  getSystemInfo() {
    return this.get('systeminfo');
  }

  blink() {
    return this.get('systeminfo/identbrain');
  }

  getRooms() {
    return this.get(`projects/home/rooms?details=true`)
      .then(rooms => rooms.map(room => new Room(this, room)));
  }

  getRecipes() {
    return Promise.all([
      this.get('projects/home/recipes'),
      this.getRooms()
    ]).then(([recipes, rooms]) => recipes.map(recipe => new Recipe(this, recipe, rooms)));
  }

  getActiveRecipes() {
    return Promise.all([
      this.get('projects/home/activescenariokeys'),
      this.getRecipes()
    ]).then(([activeScenarioKeys, recipes]) =>
      values(activeScenarioKeys).map(key => recipes.find(recipe => recipe.scenarioKey === key)));
  }

  setForwardActions(options) {
    options = Object.assign({
      path: '/neeo'
    }, options);

    if (!options.host || !options.port) {
      return Promise.reject(new Error('Forward Actions require a host and a port'));
    }

    return this.post('forwardactions', options);
  }

  deleteForwardActions() {
    return this.post('forwardactions/delete');
  }
}

module.exports = NeeoBrain;
