var Styleguide = require('../lib/index.js');

new Styleguide ({
	files: {
		src: 'example/assets/css/',
		dist: 'dist',
		colors: 'example/assets/css/_colors.scss',
		ignore: []
	},

	components: {
		wrap: 'components/',
		extension: 'html',
		beforeCompilation: function (str) {
			return str;
		},
		afterCompilation: function (str) {
			return str;
		},
	},

	type: 'components',
	layout: 'example/styleguide/layout.html',

	mdConverter: {
		heading: function (text, level) {
			var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
			var _class = 'Styleguide-title--' + level;

			return '<h' + level + ' id="' + escapedText + '" class="' + _class + '">' + text + '</h' + level + '>';
		}
	},

	silent: false
})
.generate(function () {
	console.log('✓ Styleguide generated\n');
});
