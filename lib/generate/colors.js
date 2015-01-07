/* generateColors();
 * Read and trim colors file
 * Filter colors array
 * Wrap and return module */

module.exports = function () {
	var fileContent = u.readFile( 'example/assets/css/_colors.scss' );
	var colors = u.trim( fileContent ).split( ';' );
	var colorsArr = [];
	var moduleWrapper;

	var wrap = function (nodeClass, value, attrs) {
		return '<div class="' + nodeClass + '" ' + (attrs ? attrs : "") + '>' + value + '</div>';
	};

	colors = colors.filter( function (color) {
		return color.length > 0;
	});

	colors.forEach( function (color) {
		color = color.split( ':' );

		var wrapper;
		var name = color[ 0 ];
		var code = color[ 1 ];
		var bgColor = 'style="background-color: ' + code + '" ';

		name = wrap( 'Styleguide-colorDescription', name );
		code = wrap( 'Styleguide-colorItem', '', bgColor);
		wrapper = wrap( 'Styleguide-colorWrapper', code + name );

		colorsArr.push( wrapper );
	});

	colors = colorsArr.join( '' );
	moduleWrapper = wrap( 'Styleguide-module Styleguide-module--colors', colors );

	return moduleWrapper;
};
