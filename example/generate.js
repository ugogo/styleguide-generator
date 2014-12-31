var Styleguide = require('../lib/index.js');
var styleguide;

styleguide = new Styleguide().generate(function(){
	console.log('$ end');
});
