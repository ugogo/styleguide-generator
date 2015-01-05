var Utils = require('./utils');
global.u = new Utils;



function Styleguide (userOpts) {
  this.initOptions(userOpts);
};

Styleguide.prototype.generate = require('./start');
Styleguide.prototype.formatPath = require('./format-path');
Styleguide.prototype.updateTitle = require('./update-title.js');
Styleguide.prototype.initOptions = require('./init-options.js');
Styleguide.prototype.generateIndex = require('./generate-index');
Styleguide.prototype.readAndConvert = require('./read-and-convert.js');
Styleguide.prototype.formatExtension = require('./format-extension');

module.exports = Styleguide;
