var fs = require('fs');
var glob = require('glob');
var mdConvert = require('marked');
var Utils = require('./utils.js');
var extend = require('extend');

var defaultOptions = {
  srcFolder: 'example/assets/css/',
  distFolder: 'example/styleguide/',
  onePage: false,

  layout: {
    path: 'example/styleguide/layout.html',
    title: {
      str: '<!-- %layout-title% -->',
      content: 'Styleguide.'
    },
    content: {
      str: '<!-- %layout-content% -->'
    }
  },

  components: {
    folder: 'components/',
    filesExtension: 'html',
    beforeCompilation: function( MardowknStr ) { return MardowknStr; },
    afterCompilation:  function( HtmlStr ) {
      return '<div class="Styleguide-module">' + htmlStr + '</div>';
    }
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

var u = new Utils;

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



/* Styleguide Class
 * On new instance
 * Extend default options with the User ones
 * Create new ones */

function Styleguide (userOpts) {
  this.options = extend(true, defaultOptions, userOpts);

  this.options.components.filesExtension = this.buildExtension( this.options.components.filesExtension );
  this.options.components.folder = this.buildFolderPath(this.options.components.folder);
  this.options.srcFolder = this.buildFolderPath(this.options.srcFolder);
  this.options.distFolder = this.buildFolderPath(this.options.distFolder);
};



/* convertMdFile()
 * Update Markdown str with options.beforeCompilation
 * Return html string */

Styleguide.prototype.convertMd = function (content) {
  var newContent = u.getMd( this.options.components.beforeCompilation, content );
  var html = u.getHtml( this.options.components.afterCompilation, newContent );

  return html;
};



/* createDistFile()
 * Create file's path and name
 * Create file */

Styleguide.prototype.createDistFile = function (MdFilePath, htmlStr) {
  var pathArray = MdFilePath.split( '/' );
  var fileName = pathArray[ pathArray.length - 1 ].replace( '.md', this.options.components.filesExtension );
  var filePath = this.options.distFolder + this.options.components.folder + fileName;

  u.createFile( filePath, htmlStr );
};



/* buildExtension()
* Add '.' if not at the begin of a string */

Styleguide.prototype.buildExtension = function (ext) {
  return ext.charAt( 0 ) !== '.' ? '.' + ext : ext;
};



/* buildExtension()
* Add '.' if not at the begin of a string */

Styleguide.prototype.buildFolderPath = function (path) {
  return path.charAt( path.length - 1 ) !== '/' ? path + '/' : path;
};



/* generateIndex()
 * Read layout content and extension
 * Add indexPath into this.options
 * Generate index.{layoutExtension} */

Styleguide.prototype.generateIndex = function () {
  var layoutPath = this.options.layout.path;
  var layoutExt = layoutPath.split('.').pop();
  var layoutContent = u.readFile( layoutPath );
  var indexPath = this.options.distFolder +  'index.' + layoutExt;

  this.options.indexPath = indexPath;

  u.createFile( indexPath, layoutContent );
};



/* generateIndex()
 * Read layout content and extension
 * Generate index.{layoutExtension} */

Styleguide.prototype.replaceInFile = function (filePath, strToReplace, newContent) {
  var fileContent = u.readFile( filePath );
  newContent = fileContent.replace( strToReplace, newContent );
  u.createFile( filePath, newContent );
};



/* Generate()
 * Clear index
 * Clear components folder if onePage isn't active
 * For each .md files into srcFolder,
 * convert it and create dest file */

Styleguide.prototype.generate = function (cb) {
  var self = this;
  var onePage = this.options.onePage;
  var onePageContent = [];
  var components = u.eachInGlob( this.options.srcFolder + '**/*.md' );

  this.generateIndex();

  this.replaceInFile( this.options.indexPath, this.options.layout.title.str, this.options.layout.title.content );

  if (!onePage) {
    u.createFolder( this.options.distFolder + this.options.components.folder );
  }

  components.forEach( function (path) {
    var mdContent = u.readFile( path );
    var htmlContent = self.convertMd( mdContent );

    if (onePage) {
      onePageContent.push( htmlContent );
    }
    else {
      self.createDistFile( path, htmlContent );
    }
  });

  if (onePage) {
    onePageContent = onePageContent.join('');
    this.replaceInFile( this.options.indexPath, this.options.layout.content.str, onePageContent );
  }

  if (cb) cb();
};



module.exports = Styleguide;
