var Styleguide = require('../lib/index.js');

var opts = {
	files: {
		src: 'example/assets/css/',
		colors: 'example/assets/css/_colors.scss'
	},
	json: 'dist'
};

var styleguide = new Styleguide(opts);

styleguide.generate(function (data) {
	console.log('✓ Styleguide generated\n');
});
