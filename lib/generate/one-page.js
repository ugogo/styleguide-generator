var Utils = require('uo-node-utils');
var Navigation = require('../navigation');

module.exports = function (components) {
	var componentsLength = components.length;
	var stylesheets = this.opts.onepage.stylesheets
	var finalContent = [];
	var finalStylesheets = [];

	if (this._opts.generateColors)
		finalContent.push(this._opts.colors);

	for (var i=0; i < componentsLength; i++) {
		var componentPath = components[i];
		var contents = this.convert(componentPath);
		var componentName = Utils.extractFileName(componentPath);

		componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
		Navigation.add(componentName);
		finalContent.push(contents.html);
	}

	stylesheets.forEach(function (path) {
		var content = Utils.read.file(path);
		finalStylesheets.push('<style>\n' + content + '</style>');
	});

	Utils.replaceInFile(this._opts.indexPath, '<!-- %layout-content% -->', finalContent.join(''));
	Utils.replaceInFile(this._opts.indexPath, '<!-- %layout-nav% -->', Navigation.build());
	Utils.replaceInFile(this._opts.indexPath, '<!-- %layout-stylesheets% -->', finalStylesheets.join(''));
};
