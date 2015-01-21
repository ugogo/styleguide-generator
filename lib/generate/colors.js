/* generateColors();
 * Read and clean colors file
 * Filter colors array
 * Generate color module
 * Wrap and return module */

module.exports = function () {
	var moduleWrapper, colorsArr;
	var colorsRefs = {};
	var colorsNode = [];
	var fileContent = u.readAndClean(this.opts.colorsPath, {
		'singleLineComment': /(\/\/)(.*)(\n)/gi,
		'multiLinesComment': /(\/[*])([\s\S]*?)([*]\/)/gi,
		'default': /(\s|)(!default)(\s|)/gi
	});

	function wrap (nodeClass, value, attrs) {
		return '<div class="' + nodeClass + '" ' + (attrs ? attrs : "") + '>' + value + '</div>';
	}

	function isGoodColor (val) {
		var isHexaColor = (val.charAt(0) === '#');
		var isSassVar = (val.charAt(0) === '$');
		var isRgb = (val.substring(0, 3) === 'rgb');

		return isHexaColor || isSassVar || isRgb;
	}

	function buildRef (varName, colorValue) {
		colorsRefs[varName] = colorValue;

		while (colorValue && colorValue.charAt(0) === '$') {
			colorValue = colorsRefs[colorValue];
		}

		return colorValue;
	}

	colorsArr = fileContent.split(';');
	colorsArr.pop();

	colorsArr.forEach( function (currentColor) {
		var wrapper, bgColor;
		var color = currentColor.split(':');
		var varName = color[0];
		var colorValue = color[1];

		if (!isGoodColor(colorValue))
			return;

		colorValue = buildRef(varName, colorValue);

		bgColor = 'style="background-color: ' + colorValue + '" ';
		colorCode = wrap( 'Styleguide-colorCode', colorValue );
		varName = wrap( 'Styleguide-colorDescription', varName + colorCode );
		colorValue = wrap('Styleguide-colorItem', '', bgColor);
		wrapper = wrap('Styleguide-colorWrapper', colorValue + varName);

		colorsNode.push(wrapper);
	});

	colorsNode = colorsNode.join('');
	moduleWrapper = wrap('Styleguide-module Styleguide-module--colors', colorsNode);

	return moduleWrapper;
};
