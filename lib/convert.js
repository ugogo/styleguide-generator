var errorsManager = require('./errors-manager');

module.exports = function (path) {
	var errors = new errorsManager();
	var beforeFn = this.opts.beforeCompilation;
	var afterFn = this.opts.afterCompilation;
	var fileName = Utils.extractFileName(path);
	var classes = "Styleguide-module Styleguide-module--" + fileName;

	mdContent = Utils.readFile(path);
	mdContent = beforeFn(mdContent, path);

	if (typeof mdContent !== 'string' )
		return errors.log('beforeCompilation should return a string');

	htmlContent = '<div class="' + classes + '">' + mdConvert(mdContent) + '</div>';
	htmlContent = afterFn(htmlContent, path);

	if (typeof htmlContent !== 'string' )
		return errors.log('afterCompilation should return a string');

	return {
		md: mdContent,
		html: htmlContent
	};
};
