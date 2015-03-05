/* generateIndex()
 * Read layout content and extension
 * Add indexPath into this.opts
 * Generate index.{layoutExtension} */

var Utils = require('uo-node-utils');

module.exports = function () {
	var layoutPath = this.opts.layout;
	var layoutContent = Utils.read.file(layoutPath);

	var ext;
	var extArr = layoutPath.split('.');

	extArr.shift();
	ext = extArr.join('.');

	this.opts.indexPath = this.opts.files.dist +  'index.' + ext;

	return Utils.create.file(this.opts.indexPath, layoutContent);
};
