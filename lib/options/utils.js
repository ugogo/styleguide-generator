u.addFunc({
	name: 'formatPath',
	content: function (path) {
		return path.charAt( path.length - 1 ) !== '/' ? path + '/' : path;
	}
});

u.addFunc({
	name: 'formatExtension',
	content: function (ext) {
		return ext.charAt( 0 ) !== '.' ? '.' + ext : ext;
	}
});

u.addFunc({
	name: 'extractFileName',
	content: function (path) {
		return path.split('/').pop().replace( '.md', '' );
	}
});
