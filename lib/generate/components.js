var Utils = require('uo-node-utils');

module.exports = function (components, colors) {
	var self = this;
	var componentsLength = components.length;

	if (this.opts.generateColors) {
		var colorFileName = 'colors' + this.opts.components.extension;
		var colorsPath = this.opts.files.dist + this.opts.components.folder + colorFileName;
		Utils.create.file(colorsPath, colors);
	}

	for (var i = 0; i < componentsLength; i++) {
		var componentPath = components[i];
		var fileName = Utils.extractFileName(componentPath) + self.opts.components.extension;
		var filePath = self.opts.files.dist + self.opts.components.folder + fileName;
		var contents = self.convert(componentPath);

		if (!contents) {
			this.opts.canContinue = false;
			break;
		}

		fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
		this.nav.add(fileName);
		Utils.create.file(filePath, contents.html);
	}

	this.nav.build();
	Utils.create.file(this.opts.files.dist + 'nav' + this.opts.components.extension, this.nav.data);
};
