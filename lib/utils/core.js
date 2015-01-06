var fs = require('fs');
var del = require('del');
var mkdirp = require('mkdirp');

function Utils () {
  this.addFunc = function (obj) {
    this[obj.name] = obj.content;
  };

  this.checkFunction = function (fn, args, expectedType, name) {
    if (typeof fn( args ) !== expectedType) {
      throw new Error( name + ' must return ' + expectedType );
    }
  };

  this.checkVal = function (val, expectedType, name) {
    if (typeof val !== expectedType) {
      throw new Error( name + ' must return ' + expectedType );
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

  this.createFile = function (path, html) {
    fs.writeFileSync( path, html );
    console.log('$ generate:', path);
  };

  this.readFile = function (path) {
    return fs.readFileSync( path, 'utf8' );
  };

  this.replaceInFile = function (filePath, strToReplace, newContent) {
    var fileContent = this.readFile( filePath );
    newContent = fileContent.replace( strToReplace, newContent );
    u.createFile( filePath, newContent );
  };
}

module.exports = Utils;
