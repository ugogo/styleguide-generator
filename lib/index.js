var Utils = require('uo-node-utils');
global.mdConvert = require('marked');

function Styleguide (userOpts) {
  Utils.silent = userOpts.silent || false;

  this.extendOpts = require('./options/extend');
  this.testOptions = require('./options/test');
  this.convert = require('./convert');
  this.generate = require('./generate/start');
  this.generateIndex = require('./generate/index');
  this.generateColors = require('./generate/colors');
  this.generateOnePage = require('./generate/one-page');
  this.generateComponents = require('./generate/components');

  this.extendOpts(userOpts);
  this.testOptions();
}


module.exports = Styleguide;
