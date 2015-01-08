/* generateColors();
 * Read and clean colors file
 * Filter colors array
 * Generate color module
 * Wrap and return module */

var regex = {
	'singleLineComment': /(\/\/)(.*)(\n)/gi,
	'multiLinesComment': /(\/[*])([\s\S]*?)([*]\/)/gi,
	'default': /(\s|)(!default)(\s|)/gi
};

var colorsRefs = {};

function wrap (nodeClass, value, attrs) {
	return '<div class="' + nodeClass + '" ' + (attrs ? attrs : "") + '>' + value + '</div>';
}

function cleanFile (str) {
	for (var key in regex)
		str = str.replace( regex[ key ], '' );

	return u.trim( str );
}



module.exports = function () {
	var fileContent = u.readFile( this.opts.colorsPath );
	fileContent = cleanFile( fileContent );

	var colorsArr = [];
	var colorsNode = [];
	var moduleWrapper;


	colorsArr = fileContent.split( ';' );

	colorsArr = colorsArr.filter( function (color) {
		return color.length > 0;
	});

	// buildRefs( colorsArr );

	colorsArr.forEach( function (currentColor) {
		var wrapper, bgColor;
		var color = currentColor.split( ':' );
		var varName = color[0];
		var colorValue = color[1];
		var goodFirstLetter = colorValue.charAt(0) === '#' || colorValue.charAt(0) === '$';

		if (goodFirstLetter || colorValue.substring(0, 3) === 'rgb')
			colorsRefs[ varName ] = colorValue;
		else
			return;

		while (colorValue.charAt(0) === '$') {
			colorValue = colorsRefs[ colorValue ];
			if (colorValue === undefined) return;
		}


		bgColor = 'style="background-color: ' + colorValue + '" ';
		varName = wrap( 'Styleguide-colorDescription', varName );
		colorValue = wrap( 'Styleguide-colorItem', '', bgColor);
		wrapper = wrap( 'Styleguide-colorWrapper', colorValue + varName );

		colorsNode.push( wrapper );
	});

	colorsNode = colorsNode.join( '' );
	moduleWrapper = wrap( 'Styleguide-module Styleguide-module--colors', colorsNode );

	return moduleWrapper;
};
