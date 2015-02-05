Utils._extend({
	name: 'formatPath',
	content: function (path) {
		return path.charAt(path.length - 1) !== '/' ? path + '/' : path;
	}
});

Utils._extend({
	name: 'formatExtension',
	content: function (ext) {
		return ext.charAt(0) !== '.' ? '.' + ext : ext;
	}
});

Utils._extend({
	name: 'extractFileName',
	content: function (path) {
		return path.split('/').pop().replace('.md', '');
	}
});

Utils._extend({
	name: 'readAndClean',
	content: function (path, rgxs) {
		var content = this.readFile(path);

		for (var entry in rgxs) {
			content = content.replace( rgxs[ entry ], '' );
		}

		return this.trim(content);
	}
});
