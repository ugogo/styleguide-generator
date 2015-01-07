var Styleguide = require('../lib/index.js');

var MyStyleguide = new Styleguide({
	onePage: true
});

MyStyleguide.generate( function () {
	console.log('\n__END__\n');
});
