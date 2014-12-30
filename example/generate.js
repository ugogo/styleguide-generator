var Styleguide = require('../lib/index.js');
var styleguide;

styleguide = new Styleguide({
	components: {
		afterCompilation: function(str){
			return str + '<hr>';
		}
	}
}).generate(function(){
	console.log('$ end');
});
