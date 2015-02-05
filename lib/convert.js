module.exports = function (path) {
	var beforeFn = this.opts.beforeCompilation;
	var afterFn = this.opts.afterCompilation;
	var fileName = Utils.extractFileName(path);
	var classes = "Styleguide-module Styleguide-module--" + fileName;

	mdContent = Utils.readFile(path);
	mdContent = beforeFn(mdContent, path);

	htmlContent = '<div class="' + classes + '">' + mdConvert(mdContent) + '</div>';
	htmlContent = afterFn(htmlContent, path);

	return {
		md: mdContent,
		html: htmlContent
	};
};
