const axios = require('axios');
const values = require('object.values');
const Room = require('./room');
const Recipe = require('./recipe');

/** Class representing a NEEO Brain. */
class NeeoBrain {
  /**
   * @hideconstructor
   */
  constructor(name, host, port, apiVersion = 'v1') {
    /**
     * @type {string}
     * @description The brain name
     */
    this.name = name;

    /**
     * @type {string}
     * @description The brain host
     */
    this.host = host;

    /**
     * @type {number}
     * @description The brain port
     */
    this.port = port;

    /**
     * @type {string}
     * @description The brain API version
     */
    this.apiVersion = apiVersion;
  }

  /**
   * @private
   */
  get(fragment) {
    return axios.get(`http://${this.host}:${this.port}/${this.apiVersion}/${fragment}/`)
      .then(response => response.data);
  }

  /**
   * @private
   */
  post(fragment, data = {}) {
    return axios.post(`http://${this.host}:${this.port}/${this.apiVersion}/${fragment}/`, data)
      .then(response => response.data);
  }

  /**
   * Get system info.
   * @return {Promise}
   */
  getSystemInfo() {
    return this.get('systeminfo');
  }

  /**
   * Make the LED blink
   * @return {Promise}
   */
  blink() {
    return this.get('systeminfo/identbrain');
  }

  /**
   * Get all rooms
   * @return {Promise<Room[]>}
   */
  getRooms() {
    return this.get(`projects/home/rooms?details=true`)
      .then(rooms => rooms.map(room => new Room(this, room)));
  }

  /**
   * Get all recipes
   * @return {Promise<Recipe[]>}
   */
  getRecipes() {
    return Promise.all([
      this.get('projects/home/recipes'),
      this.getRooms()
    ]).then(([recipes, rooms]) => recipes.map(recipe => new Recipe(this, recipe, rooms)));
  }

  /**
   * Get all active recipes
   * @return {Promise<Recipe[]>}
   */
  getActiveRecipes() {
    return Promise.all([
      this.get('projects/home/activescenariokeys'),
      this.getRecipes()
    ]).then(([activeScenarioKeys, recipes]) =>
      values(activeScenarioKeys).map(key => recipes.find(recipe => recipe.scenarioKey === key)));
  }

  /**
   * Set the forward actions endpoint config
   * @param {Object} options - The forward actions options
   * @param {string} options.host - The forward actions server host
   * @param {string} options.port - The forward actions server port
   * @param {string} [options.path='/neeo'] - The forward actions server path
   * @return {Promise}
   */
  setForwardActions(options) {
    options = Object.assign({
      path: '/neeo'
    }, options);

    if (!options.host || !options.port) {
      return Promise.reject(new Error('Forward Actions require a host and a port'));
    }

    return this.post('forwardactions', options);
  }

  /**
   * Delete the forward actions endpoint config
   * @return {Promise}
   */
  deleteForwardActions() {
    return this.post('forwardactions/delete');
  }
}

module.exports = NeeoBrain;
