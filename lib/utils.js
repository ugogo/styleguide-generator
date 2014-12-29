var fs = require('fs');
var del = require('del');
var mkdirp = require('mkdirp');

function Utils () {
  this.addFunc = function (obj) {
    this[obj.name] = obj.content;
  };

  this.checkFunction = function (fn, name, type) {
    if (typeof fn( 'default string' ) !== type) {
      throw new Error( name + ' must return ' + type );
    }
  };

  this.checkVal = function (content, type, name) {
    if (typeof content !== type) {
      throw new Error( name + ' must return a ' + type );
    }
  };

  this.suppr = function (path, cb) {
    del.sync( path );
    console.log('$ clear:', path);
  };

  this.createFolder = function (path, cb) {
    mkdirp.sync( path );
    console.log('$ create folder:', path);
    if(cb) cb();
  };

  this.clearFolder = function (path) {
    if (fs.existsSync( path )) {
      this.suppr( path + '**/*' );
    }
    else {
      this.createFolder( path );
    }
  };

  this.createFile = function (filePath, html) {
    fs.writeFileSync( filePath, html );
    console.log('$ generate:', filePath);
  };

  this.readFile = function (path) {
    return fs.readFileSync( path, 'utf8' );
  };
};

module.exports = Utils;
