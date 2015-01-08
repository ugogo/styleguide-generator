module.exports = {
	srcFolder: "example/assets/css/",
	distFolder: "example/styleguide/",
	onePage: true,
	colorsPath: 'example/assets/css/_colors.scss',

	layout: {
		path: "example/styleguide/layout.html",
		contentStr: "<!-- %layout-content% -->"
	},

	components: {
		folder: "components/",
		filesExtension: "html",
		beforeCompilation: function( str ) { return str; },
		afterCompilation:  function( str ) { return str; }
	},

	mdConverter: {
		heading: function (text, level) {
			var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
			var _class = 'Styleguide-title--' + level;

			return '<h' + level + ' id="' + escapedText + '" class="' + _class + '">' + text + '</h' + level + '>';
		}
	}
};
