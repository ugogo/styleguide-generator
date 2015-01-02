var Styleguide = require('../lib/index.js');
var styleguide;

styleguide = new Styleguide({
	onePage: true
}).generate( function () {
	console.log('$ end');
});
