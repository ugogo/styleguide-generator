/* Markdown converter options
 * Wrap each <code> into a <pre class=language-related>
 * Generate an example if language is not CSS or JS
 * Replace '<' and '>' html entities */

var hljs = require('highlight.js');
var renderer = new mdConvert.Renderer();

mdConvert.setOptions({
	renderer: renderer,
	gfm: true,
	tables: true,
	smartLists: true
});

renderer.code = function (code, language) {
	var codeExample = '';
	var codeWrapped;

	if (language !== 'css' && language !== 'js')
		codeExample = code + '\n';

	code = hljs.highlightAuto( code ).value;
	codeWrapped = '<pre class="code">' + '<code class="' + (language ? language : "") + '">' + code + '</code>' + '</pre>';

	return codeExample + codeWrapped;
};

renderer.heading = function (text, level) {
	var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
	var _class = 'Styleguide-title--' + level;

	return '<h' + level + ' id="' + escapedText + '" class="' + _class + '">' + text + '</h' + level + '>';
};
