var Styleguide = require('../lib/core.js');

var MyStyleguide = new Styleguide({
	onePage: true
});

MyStyleguide.generate( function () {
	console.log('__END__');
});
