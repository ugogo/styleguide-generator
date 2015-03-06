var Utils = require('uo-node-utils');
var Navigation = require('../navigation');

module.exports = function (components) {
	var componentsLength = components.length;
	var newContent = [];

	if (this._opts.generateColors)
		newContent.push(this._opts.colors);

	for (var i=0; i < componentsLength; i++) {
		var componentPath = components[i];
		var contents = this.convert(componentPath);
		var componentName = Utils.extractFileName(componentPath);

		componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
		Navigation.add(componentName);
		newContent.push(contents.html);
	}

	if (!this._opts.canContinue)
		return false;

	newContent = newContent.join('');

	Utils.replaceInFile(this._opts.indexPath, '<!-- %layout-content% -->', newContent);
	Utils.replaceInFile(this._opts.indexPath, '<!-- %layout-nav% -->', Navigation.build());
};
