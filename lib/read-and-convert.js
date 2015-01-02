/* convertMdFile()
 * Update Markdown str with options.beforeCompilation
 * Return html string */

module.exports = function (path) {
	var htmlContent;
	var mdContent = u.readFile( path );

	mdContent = u.getMd( this.options.components.beforeCompilation, mdContent );
	htmlContent = u.getHtml( this.options.components.afterCompilation, mdContent );

	return htmlContent;
};
