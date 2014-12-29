var Styleguide = require('../lib/index.js');

var styleguide = new Styleguide({
	afterCompilation: function(str){
		return str + '<hr>';
	}
});

styleguide.generate();
