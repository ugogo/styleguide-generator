var fs = require('fs');
var glob = require('glob');
var mdConvert = require('marked');
var Utils = require('./utils.js');
var u = new Utils;

var defaultOpts = {
  srcFolder: 'example/assets/css/',
  distFolder: 'example/styleguide/',
  distFilesExtensions: 'html',
  distComponentFolder: 'components/',
  beforeCompilation: function(MardowknStr){
    return MardowknStr;
  },
  afterCompilation: function(HtmlStr){
    return HtmlStr;
  }
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
    return glob.sync(path);
    if(cb) cb( path );
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
  this.opts = checkOptions( userOpts || {} );

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
  var files = u.eachInGlob( this.opts.srcFolder + '**/*.md' );

  u.clearFolder( this.opts.distComponentFolder );

  files.forEach( function( path ){
    var mdContent = u.readFile( path );
    var htmlContent = self.convertMd( mdContent );

    self.createDistFile( path, htmlContent );
  });
};



/* convertMdFile()
 * update Markdown str with opts.beforeCompilation
 * return html */

Styleguide.prototype.convertMd = function (content) {
  var newContent = u.getMd( this.opts.beforeCompilation, content );
  var html = u.getHtml( this.opts.afterCompilation, newContent );

  return html;
};



/* createDistFile()
 * create file's path and name
 * create file */

Styleguide.prototype.createDistFile = function (MdFilePath, htmlStr) {
  var pathArray = MdFilePath.split( '/' );
  var fileName = pathArray[ pathArray.length - 1 ].replace( '.md', this.opts.distFilesExtensions );
  var filePath = this.opts.distComponentFolder + fileName;

  u.createFile( filePath, htmlStr );
};



module.exports = Styleguide;
