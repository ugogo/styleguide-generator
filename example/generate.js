var Styleguide = require('../lib/core.js');
var styleguide;

styleguide = new Styleguide({
	onePage: true
}).generate( function () {
	console.log('$ end');
});
