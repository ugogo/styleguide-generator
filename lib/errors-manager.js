module.exports = function () {
	this.errors = 0;

	this.log = function(str, opts) {
		this.errors++;
		return console.log('> Error! ' + str + '\n> ' + opts);
	};

	this.count = function () {
		return this.errors.length;
	};

	this.reset = function () {
		this.errors = 0;
		return this;
	};
};
