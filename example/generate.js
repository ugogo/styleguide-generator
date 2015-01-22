var Styleguide = require('../lib/index.js');
var isOnePage = process.argv[2] === '--onepage';

var MyStyleguide = new Styleguide({
	onePage: isOnePage || false
});

MyStyleguide.generate( function () {
	console.log('\n__END__\n');
});
