var Utils = require('uo-node-utils');
var Navigation = require('../navigation');

module.exports = function (components) {
	var layout = Utils.read.file(this.opts.onepage.layout);
	var stylesheets = {
		arr: [],
		paths: this.opts.onepage.stylesheets
	};
	var dist = {
		url: this.opts.files.dist + 'index' + this.opts.components.extension,
		content: []
	};

	if (this._opts.generateColors)
		dist.content.push(this._opts.colors);

	components.forEach(function (path, i) {
		var contents = this.convert(path);
		var name = Utils.extractFileName(path);

		dist.content.push(contents.html);

		name = name.charAt(0).toUpperCase() + name.slice(1);
		Navigation.add(name);
	}.bind(this));

	stylesheets.paths.forEach(function (path) {
		var content = Utils.read.file(path);
		stylesheets.arr.push('<style>\n' + content + '</style>');
	});

	dist.content = layout.replace('<!-- %layout-content% -->', dist.content.join(''));
	dist.content = dist.content.replace('<!-- %layout-nav% -->', Navigation.build());
	dist.content = dist.content.replace('<!-- %layout-stylesheets% -->', stylesheets.arr.join(''));

	Utils.create.file(dist.url, dist.content);
};
