/* generateColors();
 * Read and clean colors file
 * Filter colors array
 * Generate color module
 * Wrap and return module */

var Utils = require('uo-node-utils');

module.exports = function () {
	var moduleWrapper, colorsArr;
	var colorsRefs = {};
	var colorsNode = [];
	var fileContent = Utils.readAndClean(this.opts.files.colors, {
		'singleLineComment': /(\/\/)(.*)(\n)/gi,
		'multiLinesComment': /(\/[*])([\s\S]*?)([*]\/)/gi,
		'default': /(\s|)(!default)(\s|)/gi
	});

	function wrap (nodeClass, value, attrs) {
		return '<div ' + (attrs ? attrs : "") + ' class="' + nodeClass + '">' + value + '</div>';
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
	colorsNode.push('<h1 id="colors" class="s-Title--1">Colors</h1>');

	colorsArr.forEach(function (currentColor) {
		var wrapper, bgColor, colorCode;
		var color = currentColor.split(':');
		var varName = color[0];
		var colorValue = color[1];

		if (!isGoodColor(colorValue))
			return;

		colorValue = buildRef(varName, colorValue);

		bgColor = 'style="background-color: ' + colorValue + '" ';
		colorCode = wrap('Styleguide-colorCode', colorValue);
		varName = wrap('s-Color-desc', varName + colorCode);
		colorValue = wrap('s-Color', '', bgColor);
		wrapper = wrap('s-Color-wrapper', colorValue + varName);

		colorsNode.push(wrapper);
	});

	colorsNode = colorsNode.join('');
	moduleWrapper = wrap('s-Module s-Module--colors', colorsNode, 'id="s-colors"');

	return moduleWrapper;
};
