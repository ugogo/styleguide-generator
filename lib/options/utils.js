var Utils = require('uo-node-utils');

Utils.extend({
	name: 'upperCase',
	content: function (str) {
		return str = str.charAt(0).toUpperCase() + str.slice(1);
	}
});

Utils.extend({
	name: 'formatPath',
	content: function (path) {
		var lastLetter = path.charAt(path.length - 1);

		if (path.length > 0 && lastLetter !== '/')
			return path + '/';
		else
			return path;
	}
});

Utils.extend({
	name: 'formatExtension',
	content: function (ext) {
		return ext.charAt(0) !== '.' ? '.' + ext : ext;
	}
});

Utils.extend({
	name: 'extractFileName',
	content: function (path) {
		return path.split('/').pop().replace('.md', '');
	}
});

Utils.extend({
	name: 'readAndClean',
	content: function (path, rgxs) {
		var content = this.read.file(path);

		for (var entry in rgxs) {
			content = content.replace(rgxs[ entry ], '');
		}

		return this.trim(content);
	}
});

Utils.extend({
	name: 'filterComponents',
	content: function (opts) {
		var files = this.each(opts.files.src + '**/*.md');
		var paths = [];
		var errors;

		files.forEach(function (path) {
			errors = 0;

			opts.files.ignore.forEach(function (currentIgnore) {
				var match = path.indexOf(currentIgnore) !== -1;
				return  match ? errors++ : false;
			});

			return errors === 0 ? paths.push(path) : false;
		});

		return paths;
	}
});
