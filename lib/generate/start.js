/* onePage behavior
 * Generate index.{filesExtension}
 * Replace page content with components
 * Components behavior
 * Create a file.{filesExtension} per component */

module.exports = function (cb) {
	if (!this.opts.canContinue) return;

	var components = Utils.each( this.opts.srcFolder + '**/*.md' );
	var colors = this.opts.generateColors ? this.generateColors() : null;

	if (this.opts.onePage) {
		this.generateIndex();
		this.generateOnePage(components, colors);
	}
	else {
		Utils.create.folder(this.opts.distFolder + this.opts.components.folder);
		this.generateComponents(components, colors);
	}

	return cb ? cb() : "Styleguide generated!";
};
