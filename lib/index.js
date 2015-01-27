var Utils = require('uo-node-utils');

global.u = new Utils();

global.mdConvert = require('marked');

function Styleguide (userOpts) {
  this.init(userOpts);
  this.testOptions();
}

Styleguide.prototype.init = require('./options/extend');
Styleguide.prototype.testOptions = require('./options/test');
Styleguide.prototype.convert = require('./convert');
Styleguide.prototype.generate = require('./generate/start');
Styleguide.prototype.generateIndex = require('./generate/index');
Styleguide.prototype.generateColors = require('./generate/colors');
Styleguide.prototype.generateOnePage = require('./generate/one-page');
Styleguide.prototype.generateComponents = require('./generate/components');

module.exports = Styleguide;
