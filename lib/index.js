var fs = require('fs');
var glob = require('glob');
var mdConvert = require('marked');
var Utils = require('./utils.js');
var u = new Utils;

var defaultOpts = {
  srcFolder: 'example/assets/css/',
  distFolder: 'example/styleguide/',
  distComponentFolder: 'components/',
  distFilesExtensions: '.html',
  beforeCompilation: function (str) { return str; },
  afterCompilation: function (str) { return str; }
};

var mdOptions = {
  renderer: new mdConvert.Renderer(),
  sanitize: false,
  smartLists: true
};

mdConvert.setOptions( mdOptions );



/* Add some utils functions */
u.addFunc({
  name: 'getMd',
  content: function( fn, str ){
    return fn ? fn(str) : str;
  }
});

u.addFunc({
  name: 'getHtml',
  content: function( fn, mdStr ){
    var html = mdConvert(mdStr);
    return fn ? fn(html) : html;
  }
});

u.addFunc({
  name: 'eachInGlob',
  content: function (path, cb) {
    glob( path, function (err, arr) {
      arr.forEach( function (path) {
        cb( path );
      });
    });
  }
});



function checkOptions (userOpts) {

  /* For each option passed by user, test typeof
   * if it's a function, also test value
   * Use default value for other options */

  var finalOpts = {};

  for (var key in defaultOpts) {
    var currentDefaultOption = key;
    var CurrentDefaultValue = defaultOpts[ currentDefaultOption ];
    var typeOfCurrentDefaultValue = typeof CurrentDefaultValue;

    if (userOpts.hasOwnProperty( key )) {
      var currentUserValue = userOpts[ key ];

      if (typeOfCurrentDefaultValue === 'function') {
        u.checkFunction( currentUserValue, currentDefaultOption, 'string' );
      }
      else {
        u.checkVal( currentUserValue, typeOfCurrentDefaultValue, currentDefaultOption );
      }

      finalOpts[ key ] = currentUserValue;
    }
    else {
      finalOpts[ key ] = CurrentDefaultValue;
    }
  }

  return finalOpts;
};



function Styleguide (userOpts) {

  /* Generate options
   * add custom ones */

   var ext;

  this.opts = checkOptions( userOpts );

  ext = this.opts.distFilesExtensions;

  this.opts.distFilesExtensions = ext.charAt(0) !== '.' ? '.' + ext : ext;
  this.opts.distComponentFolder = this.opts.distFolder + this.opts.distComponentFolder;
};

Styleguide.prototype.generate = function () {
  var self = this;

  u.clearFolder( this.opts.distComponentFolder );

  /* for each .md files into srcFolder
   * convert it */
  u.eachInGlob( this.opts.srcFolder + '**/*.md', function (path){
    fs.readFile( path, 'utf8', function (err, mdContent) {
      self.convertMdFile( mdContent, function (html){
        self.createFile( path, html );
      });
    });
  });
};

Styleguide.prototype.convertMdFile = function (content, cb) {
  var newContent = u.getMd( this.opts.beforeCompilation, content );
  var html = u.getHtml( this.opts.afterCompilation, newContent );

  if(cb) cb( html );
};

Styleguide.prototype.createFile = function (MdFilePath, htmlStr) {
  var pathArray = MdFilePath.split( '/' );
  var fileName = pathArray[ pathArray.length - 1 ].replace( '.md', this.opts.distFilesExtensions );
  var filePath = this.opts.distComponentFolder + fileName;

  u.createFile( filePath, htmlStr );
};

module.exports = Styleguide;
