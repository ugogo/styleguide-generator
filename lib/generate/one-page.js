module.exports = function (components, colors) {
	var layoutStr = this.opts.layoutContentStr;
	var componentsLength = components.length;
	var newContent = [];

	if (this.opts.generateColors)
		newContent.push(colors);

	for (var i = 0; i < componentsLength; i++) {
		var componentPath = components[i];
		var contents = this.convert(componentPath);

		if (!contents) {
			this.opts.canContinue = false;
			break;
		}

		newContent.push(contents.html);
	}

	if (!this.opts.canContinue)
		return false;

	newContent = newContent.join('');
	Utils.replaceInFile(this.opts.indexPath, layoutStr, newContent);
};
