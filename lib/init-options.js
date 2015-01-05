/* Styleguide Class
 * On new instance
 * Extend default options with the User ones
 * Format paths and extension
 * Create new ones */

var defaultOptions = require('./default-options');
var extend = require('extend');

module.exports = function (newOptions) {
	this.options = extend( true, defaultOptions, newOptions );

	this.options.srcFolder = this.formatPath( this.options.srcFolder );
	this.options.distFolder = this.formatPath( this.options.distFolder );
	this.options.components.folder = this.formatPath( this.options.components.folder );
	this.options.components.filesExtension = this.formatExtension( this.options.components.filesExtension );
	this.options.onePageContent = [];
};
