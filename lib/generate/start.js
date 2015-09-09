var Utils = require('uo-node-utils');

module.exports = function (cb) {
	var opts = this.opts;

	if (!this._opts.allGood)
		return;

	delete this._opts.allGood;

	this._components = {
		paths: Utils.filterComponents(opts),
		data: []
	};

	if (this._opts.generateColors)
		this._colors = {
			data: this._generateColors()
		};


	if (this.opts.type === 'onepage')
		this._generate.onepage.call(this, components);
	else
		this._generateComponents();

	return cb();
};
