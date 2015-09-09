var Utils = require('uo-node-utils');
var Navigation = require('../navigation');

module.exports = function () {
	var opts = this.opts;
	var layoutContent = Utils.read.file(opts.onepage.layout);
	var dist = {
		path: opts.files.dist + 'index' + opts.components.extension,
		content: [],
		stylesheets: []
	};

	this._components.forEach(function (component) {
		dist.content.push(component.data.html);
	}, this);

	this.opts.onepage.stylesheets.forEach(function (path) {
		var content = "/*" + path + "*/" + Utils.read.file(path);
		dist.stylesheets.push(Utils.trim(content));
	});

	dist.stylesheets.unshift('<style>\n      ');
	dist.stylesheets.push('\n    </style>');

	dist.content = dist.content.sort();
	dist.content = layoutContent.replace('<!-- %layout-content% -->', dist.content.join(''));
	dist.content = dist.content.replace('<!-- %layout-stylesheets% -->', dist.stylesheets.join(''));
// 	dist.content = dist.content.replace('<!-- %layout-nav% -->', Navigation.build());

	Utils.create.file(dist.path, dist.content);
};
