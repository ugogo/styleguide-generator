module.exports = {
	srcFolder: "example/assets/css/",
	distFolder: "example/styleguide/",
	colorsPath: undefined,
	onePage: false,
	ignore: [],

	layoutPath: "example/styleguide/layout.html",
	layoutContentStr: "<!-- %layout-content% -->",

	beforeCompilation: function (str) {
		return str;
	},
	afterCompilation:  function (str) {
		return str;
	},

	components: {
		folder: "components/",
		filesExtension: "html"
	},

	mdConverter: {
		heading: function (text, level) {
			var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
			var _class = 'Styleguide-title--' + level;

			return '<h' + level + ' id="' + escapedText + '" class="' + _class + '">' + text + '</h' + level + '>';
		}
	}
};
