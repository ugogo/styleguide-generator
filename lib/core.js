var Utils = require('./utils/core');

global.u = new Utils();
global.mdConvert = require('marked');

function Styleguide (userOpts) {
  this.init(userOpts);
}

Styleguide.prototype.init = require('./init');
Styleguide.prototype.generate = require('./generate-init');
Styleguide.prototype.generateIndex = require('./generate-index');
Styleguide.prototype.generateContent = require('./generate-content');
Styleguide.prototype.generateOnePage = require('./generate-one-page');
Styleguide.prototype.generateComponents = require('./generate-components');

module.exports = Styleguide;
