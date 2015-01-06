/* onePage behavior
 * Generate index.{filesExtension}
 * Replace page content with components
 * Components behavior
 * Create a file.{filesExtension} per component */

var glob = require('glob');

module.exports = function (cb) {
	var components = glob.sync( this.options.srcFolder + '**/*.md' );

	if (this.options.onePage) {
		this.generateIndex();
		this.generateOnePage( components );
	}
	else {
		u.createFolder( this.options.distFolder + this.options.components.folder );
		this.generateComponents( components );
	}

	return cb ? cb() : "Styleguide generated!";
}
