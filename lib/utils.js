var fs = require('fs');
var del = require('del');
var mkdirp = require('mkdirp');

function Utils () {
  this.addFunc = function (obj) {
    this[obj.name] = obj.content;
  };

  this.suppr = function (path, cb) {
    del( path, function () {
      console.log('$ clear:', path);
      if(cb) cb();
    });
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

  this.createFolder = function (path, cb) {
    mkdirp( path, function () {
      console.log('$ create folder:', path);
      if(cb) cb();
    });
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
    fs.writeFile( filePath, html, function () {
      console.log('$ generate:', filePath);
    });
  };
};

module.exports = Utils;
