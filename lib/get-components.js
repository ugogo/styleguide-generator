var Utils = require('uo-node-utils');

module.exports = function () {
  var paths = Utils.filterComponents(this.opts);
  var components = [];

  if (this._opts.generateColors)
    components.push({
      path: this.opts.distWrapped + 'colors' + this.opts.components.extension,
      name: 'Colors',
      data: {
        html: this._generateColors()
      }
    });

	paths.forEach(function (path) {
		var component = {};
		var baseName = Utils.extractFileName(path);

		component.path = this.opts.distWrapped + baseName + this.opts.components.extension;
		component.name = baseName = Utils.upperCase(baseName);
		component.data = this._convert(path);

		components.push(component);
	}, this);

  return components;
};
