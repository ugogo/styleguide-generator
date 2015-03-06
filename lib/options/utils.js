var Utils = require('uo-node-utils');

Utils.extend({
	name: 'formatPath',
	content: function (path) {
		return path.charAt(path.length - 1) !== '/' ? path + '/' : path;
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
	content: function (components, constructor) {
		var arr = [];
		var errors = 0;
		var ignore = constructor.opts.files.ignore;

		components = components.forEach(function (currentComponent) {
			errors = 0;
			ignore.forEach(function (currentIgnore) {
				return currentComponent.indexOf(currentIgnore) !== -1 ? errors++ : false;
			});
			return errors === 0 ? arr.push(currentComponent) : false;
		});

		return arr;
	}
});
