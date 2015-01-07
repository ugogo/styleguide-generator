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

function findInIndex (obj, value) {
	for (var key in obj) {
		if (key === value)
			return obj[ key ];
	}
}



module.exports = function () {
	var fileContent = u.readFile( this.opts.colorsPath );
	var colorsIndex = {};
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
		var bgColor;
		var colorName = color[ 0 ];
		var colorCode = color[ 1 ];
		var firstLetter = colorCode.charAt( 0 );
		var goodStart = firstLetter === '#' || colorCode.substring(0, 3) === 'rgb';

		if (firstLetter === '$')
			colorCode = findInIndex( colorsIndex, colorCode );
		else if (goodStart)
			colorsIndex[ colorName ] = colorCode;
		else
			return;

		bgColor = 'style="background-color: ' + colorCode + '" ';
		colorName = wrap( 'Styleguide-colorDescription', colorName );
		colorCode = wrap( 'Styleguide-colorItem', '', bgColor);
		wrapper = wrap( 'Styleguide-colorWrapper', colorCode + colorName );

		colorsNode.push( wrapper );
	});

	colorsNode = colorsNode.join( '' );
	moduleWrapper = wrap( 'Styleguide-module Styleguide-module--colors', colorsNode );

	return moduleWrapper;
}
