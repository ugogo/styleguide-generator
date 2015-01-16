module.exports = function (components, colors) {
	var self = this;
	var colorFileName = 'colors' + self.opts.components.filesExtension;
	var colorsPath = this.opts.distFolder + this.opts.components.folder + colorFileName;

	u.newFile(colorsPath, colors);

	components.forEach( function (path) {
		var fileName = u.extractFileName(path) + self.opts.components.filesExtension;
		var filePath = self.opts.distFolder + self.opts.components.folder + fileName;
		var contents = self.convert(path);

		u.newFile(filePath, contents.html);
	});
};
