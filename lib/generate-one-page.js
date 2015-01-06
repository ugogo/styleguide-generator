module.exports = function (components) {
	var self = this;
	var layoutStr = this.options.layout.contentStr;
	var newContent = [];

	components.forEach( function (path) {
		var contents = self.generateContent( path );
		newContent.push( contents.html );
	});

	newContent = newContent.join( '' );

	u.replaceInFile( this.options.indexPath, layoutStr, newContent );
};
