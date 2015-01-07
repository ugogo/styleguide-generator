/* init();
 * Extend userOpts with default ones
 * Format paths and extensions */

var extend = require('extend');
var mdOpts = require('./md');
var UtilsOpts = require('./utils');
var _default = require('./default');

module.exports = function (userOpts) {
	this.opts = extend( true, _default, userOpts );

	this.opts.srcFolder = u.formatPath( this.opts.srcFolder );
	this.opts.distFolder = u.formatPath( this.opts.distFolder );
	this.opts.components.folder = u.formatPath( this.opts.components.folder );

	this.opts.components.filesExtension = u.formatExtension( this.opts.components.filesExtension );
};
