var Utils = require('uo-node-utils');
var Navigation = require('../navigation');

module.exports = function (components) {
	var self = this;
	var opts = this.opts;
	var componentsLength = components.length;

	if (this._opts.generateColors) {
		var colorFileName = 'colors' + opts.components.extension;
		var colorsPath = opts.files.dist + opts.components.wrap + colorFileName;
		Utils.create.file(colorsPath, this._opts.colors);
	}

	for (var i=0; i < componentsLength; i++) {
		var path = components[i];
		var contents = self.convert(path);
		var baseName = Utils.extractFileName(path);
		var newFile = {};

		newFile.path = opts.files.dist + opts.components.wrap + baseName + opts.components.extension;

		// UpperCase first letter for Navigation
		baseName = baseName.charAt(0).toUpperCase() + baseName.slice(1);

		Navigation.add(baseName);
		Utils.create.file(newFile.path, contents.html);
	}

	Utils.create.file(opts.files.dist + 'nav' + opts.components.extension, Navigation.build());
};
