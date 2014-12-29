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

/* Markdown converter options
 * Wrap each <code> into a <pre>
 * Add a language-related class on the <pre> tag
 * Replace '<' and '>' html entities */

var mdRenderer = new mdConvert.Renderer();

mdRenderer.code = function (code, language) {
  code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return  '<pre class="code' + (language ? ' language-' + language : '') +'">' +
  '<code>' + code + '</code>' +
  '</pre>';
};

mdConvert.setOptions({
  renderer: mdRenderer,
  gfm: true,
  breaks: true,
  smartLists: true
});



/* Extend utils functions
 * getMd, getHtml, eachInGlob */

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



/* For each option passed by user, test typeof
 * if it's a function, also test value
 * Use default value for other options */

function checkOptions (userOpts) {
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



/* Generate options
 * add custom ones */

function Styleguide (userOpts) {
  this.opts = checkOptions( userOpts );

  var ext = this.opts.distFilesExtensions;

  this.opts.distFilesExtensions = ext.charAt(0) !== '.' ? '.' + ext : ext;
  this.opts.distComponentFolder = this.opts.distFolder + this.opts.distComponentFolder;
};



/* Generate()
 * Clear distComponentFolder
 * For each .md files into srcFolder,
 * convert it and create dest file */

Styleguide.prototype.generate = function () {
  var self = this;

  u.clearFolder( this.opts.distComponentFolder );

  u.eachInGlob( this.opts.srcFolder + '**/*.md', function (path){
    fs.readFile( path, 'utf8', function (err, mdContent) {
      self.convertMdFile( mdContent, function (html){
        self.createFile( path, html );
      });
    });
  });
};



/* convertMdFile()
 * update Markdown str with opts.beforeCompilation
 * return html */

Styleguide.prototype.convertMdFile = function (content, cb) {
  var newContent = u.getMd( this.opts.beforeCompilation, content );
  var html = u.getHtml( this.opts.afterCompilation, newContent );

  if(cb) cb( html );
};



/* createFile()
 * create file's path and name
 * create file */

Styleguide.prototype.createFile = function (MdFilePath, htmlStr) {
  var pathArray = MdFilePath.split( '/' );
  var fileName = pathArray[ pathArray.length - 1 ].replace( '.md', this.opts.distFilesExtensions );
  var filePath = this.opts.distComponentFolder + fileName;

  u.createFile( filePath, htmlStr );
};



module.exports = Styleguide;
