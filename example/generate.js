var Styleguide = require('../lib/index.js');

new Styleguide({
	files: {
		src: 'example/assets/css/',
		colors: 'example/assets/css/_colors.scss'
	},
	type: 'onepage',
	layout: 'example/styleguide/layout.html'
})
.generate(function () {
	console.log('✓ Styleguide generated\n');
});
