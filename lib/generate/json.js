var Utils = require('uo-node-utils');

module.exports = function () {
  var components = JSON.stringify(this._components);
  var json = '{ "components":' + components + '}';
  var dist = this.opts.json + 'components.json';

  Utils.create.file(dist, json);
};
