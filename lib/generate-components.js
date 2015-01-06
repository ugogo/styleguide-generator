module.exports = function (components) {
	var self = this;

	components.forEach( function (path) {
		var fileName = path.split('/').pop().replace( '.md', self.options.components.filesExtension );
		var filePath = self.options.distFolder + self.options.components.folder + fileName;
		var contents = self.generateContent( path );

		u.createFile( filePath, contents.html );
	});
};
