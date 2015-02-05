module.exports = function (components, colors) {
	var self = this;

	if (this.opts.generateColors) {
		var colorFileName = 'colors' + self.opts.components.filesExtension;
		var colorsPath = this.opts.distFolder + this.opts.components.folder + colorFileName;
		Utils.create.file(colorsPath, colors);
	}

	components.forEach( function (path) {
		var fileName = Utils.extractFileName(path) + self.opts.components.filesExtension;
		var filePath = self.opts.distFolder + self.opts.components.folder + fileName;
		var contents = self.convert(path);

		Utils.create.file(filePath, contents.html);
	});
};
