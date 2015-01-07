module.exports = function (path) {
	var beforeFn = this.opts.components.beforeCompilation;
	var afterFn = this.opts.components.afterCompilation;
	var fileName = u.extractFileName( path );
	var classes = "Styleguide-module Styleguide-module--" + fileName;

	mdContent = u.readFile( path );
	mdContent = beforeFn( mdContent, path );

	htmlContent = '<div class="' + classes + '">' + mdConvert( mdContent ) + '</div>';
	htmlContent = afterFn( htmlContent, path );

	return {
		md: mdContent,
		html: htmlContent
	};
};
