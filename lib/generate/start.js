var Utils = require('uo-node-utils');

module.exports = function (cb) {
	var opts = this.opts;

	if (!this._opts.allGood)
		return;

	delete this._opts.allGood;

	this._components = {
		paths: Utils.filterComponents(opts)
	};

	this._opts.colors = this._opts.generateColors ? this._generate.colors.call(this) : null;

	if (this._opts.onePage)
		this._generate.onepage.call(this, components);
	else {
		Utils.create.folder(opts.files.dist + opts.components.wrap);
		this._generate.components.call(this, components);
	}

	return cb();
};
