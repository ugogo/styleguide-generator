/* generateIndex()
 * Read layout content and extension
 * Add indexPath into this.options
 * Generate index.{layoutExtension} */

module.exports = function () {
	var layoutPath = this.options.layout.path;
	var layoutExt = layoutPath.split('.').pop();
	var layoutContent = u.readFile( layoutPath );

	this.options.indexPath = this.options.distFolder +  'index.' + layoutExt;

	u.createFile( this.options.indexPath, layoutContent );
};
