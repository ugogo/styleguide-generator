module.exports = function (components) {
	var self = this;

	components.forEach( function (path) {
		var fileName = path.split('/').pop().replace( '.md', self.opts.components.filesExtension );
		var filePath = self.opts.distFolder + self.opts.components.folder + fileName;
		var contents = self.convert( path );

		u.createFile( filePath, contents.html );
	});
};
