var Styleguide = require('../lib/index.js');

new Styleguide({
	files: {
		src: 'example/assets/css/',
		colors: 'example/assets/css/_colors.scss'
	},
	onepage: {
		layout: 'example/styleguide/layout.html',
		stylesheets: [
			'example/styleguide/styleguide.css',
			'example/styleguide/code-highlight.css',
			'example/assets/css/components/button/default.css',
			'example/assets/css/components/button/colors.css',
			'example/assets/css/components/button/sizes.css'
		]
	}
})
.generate(function () {
	console.log('✓ Styleguide generated\n');
});
