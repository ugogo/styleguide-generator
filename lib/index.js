var util = require('util');
var Utils = require('uo-node-utils');
var EventEmitter = require('events').EventEmitter;

var Styleguide = function (userOpts) {
  Utils.silent = userOpts.silent || false;

  require('./options/extend').call(this, userOpts);
  require('./options/compare').call(this);

  this.generate = require('./generate/start');

  this._convert = require('./convert');
  this._getComponents = require('./get-components');
  this._generateOnePage = require('./generate/one-page.js');
  this._generateColors = require('./generate/colors');
};

util.inherits(Styleguide, EventEmitter);

module.exports = Styleguide;
