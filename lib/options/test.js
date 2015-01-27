var fs = require('fs');

var Errors = function () {
	this.errors = 0;
	this.log = function(str) {
		this.errors++;
		return console.log('> Error! ' + str);
	}
};

module.exports = function () {
	var opts = this.opts;
	var errors = new Errors();
	var canContinue = false;

	if (!fs.existsSync(opts.colorsPath)) {
		return errors.log('colors\' file not found');
	}

	if (!fs.existsSync(opts.srcFolder)) {
		return errors.log('src folder not found');
	}

	if (typeof opts.components.beforeCompilation !== 'function' ) {
		return errors.log('beforeCompilation isn\'t a function');
	}

	if (typeof opts.components.beforeCompilation('default') !== 'string' ) {
		return errors.log('beforeCompilation should return a string');
	}

	if (typeof opts.components.afterCompilation !== 'function' ) {
		return errors.log('afterCompilation isn\'t a function');
	}

	if (typeof opts.components.afterCompilation('default') !== 'string' ) {
		return errors.log('afterCompilation should return a string');
	}

	if (opts.onePage) {
		if (!fs.existsSync(opts.layout.path)) {
			return errors.log('layout not found');
		}
	}

	this.opts.canContinue = canContinue = errors.errors === 0;

	if (!canContinue)
		console.log('> Aborted\n');
};
