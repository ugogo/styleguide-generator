var Utils = require('uo-node-utils');

module.exports = function (cb) {
	var opts = this.opts;
	var isOnePage = this.opts.type === 'onepage';

	if (!this._opts.allGood)
		return;

	this._components = this._getComponents();

	if (isOnePage)
		this._generateOnePage();
	else
		this._components.forEach(function (component) {
			Utils.create.file(component.path, component.data.html);
		});

	if (cb)
		cb();

	return {
		opts: opts,
		components: this._components
	};
};
