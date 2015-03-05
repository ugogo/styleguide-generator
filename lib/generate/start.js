/* Filter components (exclude ignored ones)
 * if onePage
 *   Generate index.{filesExtension}
 *   Replace page content with components
 * else
 *   Create a file.{filesExtension} per component */

var Utils = require('uo-node-utils');

module.exports = function (cb) {
	if (!this.opts.canContinue)
		return;

	var components = Utils.each(this.opts.files.src + '**/*.md');
	var colors = this.opts.generateColors ? this.generateColors() : null;

	componentsFiltered = Utils.filterComponents(components, this);

	if (this.opts.onePage) {
		this.generateIndex();
		this.generateOnePage(componentsFiltered, colors);
	}
	else {
		Utils.create.folder(this.opts.files.dist + this.opts.components.folder);
		this.generateComponents(componentsFiltered, colors);
	}

	return cb();
};
