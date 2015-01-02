/* Generate()
 * Generate index
 * Create components folder if onePage isn't active
 * Convert each .md files into srcFolder */

var glob = require('glob');

module.exports = function (cb) {
	var self = this;
	var onePage = this.options.onePage;
	var components = glob.sync( this.options.srcFolder + '**/*.md' );

	this.generateIndex();
	this.updateTitle();

	if (onePage) {
		var newContent = [];

		components.forEach( function (path) {
			var htmlContent = self.readAndConvert( path );

			newContent.push( htmlContent );
		});

		u.replaceInFile( this.options.indexPath, this.options.layout.content.str, newContent.join('') );
	}
	else {
		u.createFolder( this.options.distFolder + this.options.components.folder );

		components.forEach( function (path) {
			var htmlContent = self.readAndConvert( path );
			var fileName = path.split('/').pop().replace( '.md', self.options.components.filesExtension );
			var filePath = self.options.distFolder + self.options.components.folder + fileName;

			u.createFile( filePath, htmlContent );
		});
	}

	if (cb) cb();
};
