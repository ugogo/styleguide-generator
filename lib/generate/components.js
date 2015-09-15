var Utils = require('uo-node-utils');

module.exports = function () {
  this._components.forEach(function (component) {
    Utils.create.file(component.path, component.data.html);
  });
};
