/* Filter components (exclude ignored ones)
 * if onePage
 *   Generate index.{filesExtension}
 *   Replace page content with components
 * else
 *   Create a file.{filesExtension} per component */

var Utils = require('uo-node-utils');

module.exports = function (cb) {
	var opts = this.opts;
	var files = opts.files;
	var index = files.dist + 'index' + opts.components.extension;

	if (!this._opts.canContinue)
		return;

	var components = Utils.each(files.src + '**/*.md');
	components = Utils.filterComponents(components, this);

	this._opts.colors = this._opts.generateColors ? this._generate.colors.call(this) : null;

	if (this._opts.onePage) {
		Utils.create.file(index, Utils.read.file(opts.layout));

		this._opts.indexPath = index;
		this._generate.onepage.call(this, components);
	}
	else {
		Utils.create.folder(files.dist + opts.components.wrap);
		this._generate.components.call(this, components);
	}

	return cb();
};
