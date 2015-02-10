var fs = require('fs');
var errorsManager = require('../errors-manager');

module.exports = function () {
	var errors = new errorsManager();
	var opts = this.opts;
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

	if (typeof opts.afterCompilation !== 'function' ) {
		return errors.log('afterCompilation isn\'t a function');
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
};
