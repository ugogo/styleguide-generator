var Utils = require('uo-node-utils');
var Navigation = require('../navigation');

module.exports = function (components) {
	var opts = this.opts;

	Utils.create.folder(opts.distWrapped);

	if (this._opts.generateColors) {
		var colorFileName = 'colors' + opts.components.extension;
		var colorsPath = opts.distWrapped + colorFileName;

		Utils.create.file(colorsPath, this._colors.data);
	}

	this._components.paths.forEach(function (path) {
		var component = {};
		var baseName = Utils.extractFileName(path);

		component.path = opts.distWrapped + baseName + opts.components.extension;
		component.name = baseName = Utils.upperCase(baseName);
		component.data = this._convert(path);

		this._components.data.push(component);

		// 	Navigation.add(baseName);
		Utils.create.file(component.path, component.data.html);
	}, this);

	// Utils.create.file(opts.files.dist + 'nav' + opts.components.extension, Navigation.build());
};
