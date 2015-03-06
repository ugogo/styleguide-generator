var Utils = require('uo-node-utils');
var errorsManager = require('../errors-manager');

module.exports = function () {
	var errors = new errorsManager();
	var opts = this.opts;
	var generateColors = opts.files.colors;
	var validType = opts.type === 'onepage' || opts.type === 'one-page' || opts.type === 'components';

	this._opts = {
		generateColors: generateColors,
		onePage: opts.type === 'onepage' || opts.type === 'one-page',
		canContinue: false
	};

	if (!validType)
		return errors.log('Type is not valid' + '\n' + '> Accepted types: "onepage", "one-page" or "components"', 'opts.type');

	if (generateColors) {
		if (!Utils.exist(opts.files.colors)) {
			return errors.log('Colors\' file not found' + '\n' + '> If you want to disable colors, set opts.colors to false', 'opts.colors');
		}
	}

	if (!Utils.exist(opts.files.src))
		return errors.log('Files\' folder not found' , 'opts.files.src');

	if (!Array.isArray(opts.files.ignore))
		return errors.log('Ignore is not an array.' + '\n' + '> This array can be empty', 'opts.files.ignore');

	if (typeof opts.components.beforeCompilation !== 'function')
		return errors.log('beforeCompilation is not a function', 'opts.components.beforeCompilation');

	if (typeof opts.components.afterCompilation !== 'function')
		return errors.log('afterCompilation is not a function', 'opts.components.afterCompilation');

	if (opts.type === 'onepage' || opts.type === 'one-page') {
		if (!Utils.exist(opts.onepage.layout))
			return errors.log('Layout not found', 'opts.onepage.layout');

		var layoutContent = Utils.read.file(opts.onepage.layout, 'utf8');

		if (layoutContent.indexOf('<!-- %layout-content% -->') === -1)
			return errors.log('String "<!-- %layout-content% -->" was not found in the layout', 'This string will be replace by your components');
	}

	this._opts.canContinue = true;
	return this;
};
