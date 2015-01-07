/* generateColors();
 * Read and clean colors file
 * Filter colors array
 * Wrap and return module */

var regex = {
	'singleLineComment': /(\/\/)(.*)(\n)/gi,
	'multiLinesComment': /(\/[*])([\s\S]*?)([*]\/)/gi,
	'default': /(\s|)(!default)(\s|)/gi
};

function wrap (nodeClass, value, attrs) {
	return '<div class="' + nodeClass + '" ' + (attrs ? attrs : "") + '>' + value + '</div>';
}

function cleanFile (str) {
	for (var key in regex)
		str = str.replace( regex[ key ], '' );

	return u.trim( str );;
}

module.exports = function () {
	var fileContent = u.readFile( this.opts.colorsPath );
	var colorsArr = [];
	var colorsNode = [];
	var moduleWrapper;

	fileContent = cleanFile( fileContent );
	colorsArr = fileContent.split( ';' );

	colorsArr = colorsArr.filter( function (color) {
		return color.length > 0;
	});

	colorsArr.forEach( function (color) {
		color = color.split( ':' );

		var wrapper;
		var name = color[ 0 ];
		var code = color[ 1 ];
		var bgColor = 'style="background-color: ' + code + '" ';

		name = wrap( 'Styleguide-colorDescription', name );
		code = wrap( 'Styleguide-colorItem', '', bgColor);
		wrapper = wrap( 'Styleguide-colorWrapper', code + name );

		colorsNode.push( wrapper );
	});

	colorsNode = colorsNode.join( '' );
	moduleWrapper = wrap( 'Styleguide-module', colorsNode );

	return moduleWrapper;
}
