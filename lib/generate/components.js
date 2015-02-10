module.exports = function (components, colors) {
	var self = this;
	var componentsLength = components.length;

	if (this.opts.generateColors) {
		var colorFileName = 'colors' + self.opts.components.filesExtension;
		var colorsPath = this.opts.distFolder + this.opts.components.folder + colorFileName;
		Utils.create.file(colorsPath, colors);
	}

	for (var i = 0; i < componentsLength; i++) {
		var componentPath = components[i];
		var fileName = Utils.extractFileName(componentPath) + self.opts.components.filesExtension;
		var filePath = self.opts.distFolder + self.opts.components.folder + fileName;
		var contents = self.convert(componentPath);

		if (!contents) {
			this.opts.canContinue = false;
			break;
		}

		Utils.create.file(filePath, contents.html);
	}
};
