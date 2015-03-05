var Styleguide = require('../lib/index.js');

new Styleguide ({
	files: {
		src: 'example/assets/css/',
		dist: 'dist',
		colors: false,
		ignore: null
	},

	components: {
		wrap: 'components/',
		extensions: 'html',
		beforeCompilation: function (str) {
			return str;
		},
		afterCompilation: function (str) {
			return str;
		},
	},

	layout: 'example/styleguide/layout.html',
	type: 'one-page',

	mdConverter: {
		heading: function (text, level) {
			var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
			var _class = 'Styleguide-title--' + level;

			return '<h' + level + ' id="' + escapedText + '" class="' + _class + '">' + text + '</h' + level + '>';
		}
	}
})
.generate(function () {
	console.log('✓ Styleguide generated\n');
});
