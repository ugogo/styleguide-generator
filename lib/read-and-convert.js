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



/* Extend Utils functions
 * getMd, getHtml, eachInGlob */

u.addFunc({
	name: 'getMd',
	content: function( fn, str ){
		return fn ? fn(str) : str;
	}
});

u.addFunc({
	name: 'getHtml',
	content: function( fn, mdStr ){
		var html = mdConvert(mdStr);
		return fn ? fn(html) : html;
	}
});



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
