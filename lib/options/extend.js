/* init();
 * Extend userOpts with default ones
 * Format paths and extensions
 * Trigger Markdown Converter options */

var Utils = require('uo-node-utils');
var extend = require('extend');
var mdOpts = require('./md');
var defaultOpts = require('./default');

require('./utils');

module.exports = function (userOpts) {
	this.opts = extend(true, defaultOpts, userOpts);

	this.opts.files.src = Utils.formatPath(this.opts.files.src);
	this.opts.files.dist = Utils.formatPath(this.opts.files.dist);
	this.opts.components.wrap = Utils.formatPath(this.opts.components.wrap);
	this.opts.components.extension = Utils.formatExtension(this.opts.components.extension);

	mdOpts(this);
};
