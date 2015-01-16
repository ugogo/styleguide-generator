module.exports = function (components, colors) {
	var self = this;
	var layoutStr = this.opts.layout.contentStr;
	var newContent = [];

	newContent.push(colors);

	components.forEach( function (path) {
		var contents = self.convert(path);
		newContent.push(contents.html);
	});

	newContent = newContent.join('');

	u.replaceInFile(this.opts.indexPath, layoutStr, newContent);
};
