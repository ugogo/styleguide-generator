module.exports = {
	srcFolder: "example/assets/css/",
	distFolder: "example/styleguide/",
	onePage: true,

	layout: {
		path: "example/styleguide/layout.html",
		title: {
			str: "<!-- %layout-title% -->",
			content: "Styleguide."
		},
		content: {
			"str": "<!-- %layout-content% -->"
		}
	},

	components: {
		folder: "components/",
		filesExtension: "html",
		beforeCompilation: function( str ) { return str; },
		afterCompilation:  function( str ) { return str; }
	}
};
