/* convertMdFile()
 * Update Markdown str with options.beforeCompilation
 * Return html string */

module.exports = function (content) {
	var newContent = u.getMd( this.options.components.beforeCompilation, content );
	var html = u.getHtml( this.options.components.afterCompilation, newContent );

	return html;
};
