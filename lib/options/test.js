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
	var generateColors = opts.colorsPath !== undefined;

	if (generateColors) {
		if (!fs.existsSync(opts.colorsPath)) {
			return errors.log('colors\' file not found');
		}
	}

	if (!fs.existsSync(opts.srcFolder)) {
		return errors.log('src folder not found');
	}

	if (typeof opts.beforeCompilation !== 'function' ) {
		return errors.log('beforeCompilation isn\'t a function');
	}

	if (typeof opts.beforeCompilation('# test content', 'path/to/fake') !== 'string' ) {
		return errors.log('beforeCompilation should return a string');
	}

	if (typeof opts.afterCompilation !== 'function' ) {
		return errors.log('afterCompilation isn\'t a function');
	}

	if (typeof opts.afterCompilation('# test content', 'path/to/test') !== 'string' ) {
		return errors.log('afterCompilation should return a string');
	}

	if (opts.onePage) {
		if (!fs.existsSync(opts.layoutPath)) {
			return errors.log('layout not found');
		}

		var layoutContent = fs.readFileSync(opts.layoutPath, 'utf8');

		if (layoutContent.indexOf(opts.layoutContentStr) === -1) {
			return errors.log('<!-- %layout-content% --> is not found in layout');
		}
	}

	this.opts.generateColors = generateColors;
	this.opts.canContinue = canContinue = errors.errors === 0;

	if (!canContinue)
		console.log('> Aborted\n');
};
