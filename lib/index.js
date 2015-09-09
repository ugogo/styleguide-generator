var Utils = require('uo-node-utils');
var Navigation = require('./navigation');

function Styleguide (userOpts) {
  Utils.silent = userOpts.silent || false;

  require('./options/extend').call(this, userOpts);
  require('./options/compare').call(this);


  this.generate = require('./generate/start');

  this._convert = require('./convert');
  this._generateComponents = require('./generate/components');
  this._generateColors = require('./generate/colors');
}

Navigation.add('Colors');

module.exports = Styleguide;
