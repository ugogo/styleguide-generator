var Styleguide = require('../lib/index.js');

var styleguide = new Styleguide({
	components: {
		afterCompilation: function(str){
			console.log('***', str);
			return str + '<hr>';
		}
	}
}).generate();
