/* generateIndex()
 * Read layout content and extension
 * Add indexPath into this.opts
 * Generate index.{layoutExtension} */

module.exports = function () {
	var layoutPath = this.opts.layoutPath;
	var layoutContent = u.readFile(layoutPath);

	var ext;
	var extArr = layoutPath.split('.');

	extArr.shift();
	ext = extArr.join('.');

	this.opts.indexPath = this.opts.distFolder +  'index.' + ext;

	u.newFile(this.opts.indexPath, layoutContent);
};
