module.exports = function () {
	this.errors = 0;

	this.log = function(str) {
		this.errors++;
		return console.log('> Error! ' + str);
	};

	this.count = function () {
		return this.errors.length;
	};

	this.reset = function () {
		return this.errors = 0;
	}
};
