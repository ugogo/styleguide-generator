/* init();
 * Extend userOpts with default ones
 * Format paths and extensions */

var extend = require('extend');
var mdOptions = require('./init-md-options');
var UtilsOptions = require('./init-utils-options');
var defaultOptions = require('./default-options');

module.exports = function (userOpts) {
	this.options = extend( true, defaultOptions, userOpts );

	this.options.srcFolder = u.formatPath( this.options.srcFolder );
	this.options.distFolder = u.formatPath( this.options.distFolder );
	this.options.components.folder = u.formatPath( this.options.components.folder );

	this.options.components.filesExtension = u.formatExtension( this.options.components.filesExtension );
};
