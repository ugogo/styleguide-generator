/* Markdown converter options
 * Wrap each <code> into a <pre class=language-related>
 * Generate an example if language is not CSS or JS
 * Replace '<' and '>' html entities */

var mdConvert = require('marked');
var mdRenderer = new mdConvert.Renderer();

mdConvert.setOptions({
	renderer: mdRenderer,
	gfm: true,
	smartLists: true
});

mdRenderer.code = function (code, language) {
	codeEscaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	codeExample = '';

	if (language !== 'css' && language !== 'js')
		codeExample = code;

	return  codeExample + '<pre class="code' + (language ? ' language-' + language : '') +'">' +
	'<code>' + codeEscaped + '</code>' +
	'</pre>';
};



/* convertMdFile()
 * Update Markdown str with options.beforeCompilation
 * Return html string */

module.exports = function (path) {
	var htmlContent;
	var mdContent = u.readFile( path );
	var beforeFn = this.options.components.beforeCompilation;
	var afterFn = this.options.components.afterCompilation;

	mdContent = beforeFn( mdContent, path );

	htmlContent = mdConvert( mdContent );
	htmlContent = afterFn( htmlContent, path );

	return htmlContent;
};
