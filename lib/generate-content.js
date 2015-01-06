module.exports = function (path) {
	var beforeFn = this.options.components.beforeCompilation;
	var afterFn = this.options.components.afterCompilation;

	mdContent = u.readFile( path );
	mdContent = beforeFn( mdContent, path );
	htmlContent = '<div class="Styleguide-module">' + mdConvert( mdContent ) + '</div>';
	htmlContent = afterFn( htmlContent, path );

	return {
		md: mdContent,
		html: htmlContent
	};
};
