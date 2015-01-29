var Utils = require('uo-node-utils');

global.mdConvert = require('marked');

function Styleguide (userOpts) {
  global.u = new Utils({
    silent: userOpts.silent || false
  });

  this.init = require('./options/extend');
  this.testOptions = require('./options/test');
  this.convert = require('./convert');
  this.generate = require('./generate/start');
  this.generateIndex = require('./generate/index');
  this.generateColors = require('./generate/colors');
  this.generateOnePage = require('./generate/one-page');
  this.generateComponents = require('./generate/components');

  this.init(userOpts);
  this.testOptions();
}


module.exports = Styleguide;
