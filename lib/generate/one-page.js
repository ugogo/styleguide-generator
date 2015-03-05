var Utils = require('uo-node-utils');

module.exports = function (components, colors) {
	var componentsLength = components.length;
	var newContent = [];

	if (this.opts.generateColors)
		newContent.push(colors);

	for (var i=0; i < componentsLength; i++) {
		var componentPath = components[i];
		var contents = this.convert(componentPath);
		var componentName = Utils.extractFileName(componentPath);

		if (!contents) {
			this.opts.canContinue = false;
			break;
		}

		componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
		this.nav.add(componentName);
		newContent.push(contents.html);
	}

	if (!this.opts.canContinue)
		return false;

	this.nav.build();
	newContent = newContent.join('');

	Utils.replaceInFile(this.opts.indexPath, '<!-- %layout-content% -->', newContent);
	Utils.replaceInFile(this.opts.indexPath, '<!-- %layout-nav% -->', this.nav.data);
};
