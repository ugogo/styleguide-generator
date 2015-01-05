var Styleguide = require('../lib/core.js');

var opts = {
	onePage: false
};

var MyStyleguide = new Styleguide( opts );

MyStyleguide.generate( function () {
	console.log('__END__');
});
