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
	}
};
