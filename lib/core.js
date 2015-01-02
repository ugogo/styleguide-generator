var Utils = require('./utils');
var extend = require('extend');
var mdConvert = require('marked');

var defaultOptions = require('./default-options');



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
  smartLists: true
});



/* Extend Utils functions
 * getMd, getHtml, eachInGlob */

global.u = new Utils;

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



/* Styleguide Class
 * On new instance
 * Extend default options with the User ones
 * Format paths and extension
 * Create new ones */

function Styleguide (userOpts) {
  this.options = extend( true, defaultOptions, userOpts );

  this.options.srcFolder = this.formatPath( this.options.srcFolder );
  this.options.distFolder = this.formatPath( this.options.distFolder );
  this.options.components.folder = this.formatPath( this.options.components.folder );
  this.options.components.filesExtension = this.formatExtension( this.options.components.filesExtension );
  this.options.onePageContent = [];
};

Styleguide.prototype.generate = require('./start');

Styleguide.prototype.updateTitle = require('./update-title.js');
//
Styleguide.prototype.readAndConvert = require('./read-and-convert.js');
//
Styleguide.prototype.formatExtension = require('./format-extension');
//
Styleguide.prototype.formatPath = require('./format-path');
//
Styleguide.prototype.generateIndex = require('./generate-index');

module.exports = Styleguide;
