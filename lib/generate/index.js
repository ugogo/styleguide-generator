/* generateIndex()
 * Read layout content and extension
 * Add indexPath into this.opts
 * Generate index.{layoutExtension} */

module.exports = function () {
	var layoutPath = this.opts.layout.path;
	var layoutExt = layoutPath.split('.').pop();
	var layoutContent = u.readFile( layoutPath );

	this.opts.indexPath = this.opts.distFolder +  'index.' + layoutExt;

	u.newFile( this.opts.indexPath, layoutContent );
};
