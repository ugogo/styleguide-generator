var fs = require('fs');
var stream = require('stream');

var total = 5;
var index = 0;

function getData ( content ) {
	var rs = stream.Readable();

	rs._read = function () {
		if (index >= total) rs.push(null)
		else {
			rs.push( content );
			index++;
		}
	}

	return rs;
}


function writeData () {
	var ws = stream.Writable();
	ws._write = function (chunk, enc, next) {
		console.log('- ', chunk.toString());
		setTimeout(next, 500);
	};
	return ws;
}

function transformData() {
	var ts = stream.Transform();
	ts._transform = function (chunk, enc, next) {
		var newContent = chunk.toString().toUpperCase();
		this.push(newContent)
		setTimeout(next, 500);
	}
	return ts;
}


var data = fs.readFileSync('./t01.txt', 'utf8');
var getData = new getData( data );
var writeData = new writeData();
var transformData = new transformData();

getData.pipe( transformData ).pipe( writeData );
