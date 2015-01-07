/* onePage behavior
 * Generate index.{filesExtension}
 * Replace page content with components
 * Components behavior
 * Create a file.{filesExtension} per component */

module.exports = function (cb) {
	var components = u.each( this.opts.srcFolder + '**/*.md' );
	var colors = this.generateColors();

	if (this.opts.onePage) {
		this.generateIndex();
		this.generateOnePage( components, colors );
	}
	else {
		u.newFolder( this.opts.distFolder + this.opts.components.folder );
		this.generateComponents( components, colors );
	}

	return cb ? cb() : "Styleguide generated!";
};
