# Styleguide generator

## Install
```
npm i styleguide-generator
```



## How it works

- For each `.md` files into your `srcFolder`
- Convert them to `html` (you can change the extension at `components.filesExtension` for a better match with your environnement, like `.hbs` for example)
- Automatically generate example before your code blocks
- Output files to `distFolder / components.folder` if `onePage: false`



## Usage

```js
var Styleguide = require('styleguide-generator');

var opts = {
  onePage: true
};

var MyStyleguide = new Styleguide(opts);

MyStyleguide.generate( function () {
  console.log( '\n__END__\n');
});

/* or shortcut
 *
 * MyStyleguide = new Styleguide({
 *   onePage: true
 * }).generate( function () {
 *   console.log( '__END__');
 * });
 */
```



## Opts

```js
var defaultOpts = {

  /* Log message when action is done */
  silent: false,

  /* Folder where your .md files are located */
  srcFolder: 'assets/css/',

  /* Folder where your styleguide is located */
  distFolder: 'example/styleguide/',

  /* If you don't want to generate a file per component
   * set it to true */
  onePage: false,

  /* When generating components,
   * if components' path has indexOf of one of this array,
   * it will be ignore */
  ignore: ['myIgnoredFile.md', 'myIgnoredFolder/', 'myIgnoredString'],

  /* Where you colors file is located
   * For generate colors module
   * Default: undefined */
  colorsPath: 'example/assets/css/_colors.scss',

  /* Layout path
   * Default: 'example/styleguide/layout.html' */
  layoutPath: 'styleguide/layout.html',

  /* Modify each Markdown file content before compilation
   * Default: return MardowknStr */
  beforeCompilation: function( MardowknStr ) {
    return MardowknStr + 'data appended on each file';
  },

  /* Modify each Markdown file after compilation
   * Default: return '<div class="Styleguide-module">' + htmlStr + '</div>'; */
  afterCompilation:  function( HtmlStr ) {
    return 'data prepend on each file' + HtmlStr;
  },


  components: {

    /* Folder where your components files will be generated (can be blank)
     * Default: 'components/' */
    folder: '',

    /* Specify your components files extension
     * Can be what you want (.html, .hbs...)
     * But files will only be compiled in html */
    filesExtension: 'html'
  },

  mdConverter: {

    /* All options can be founded here: https://github.com/chjj/marked#block-level-renderer-methods
     * Example (default behavior) with headings below */
     heading: function (text, level) {
       var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
       var _class = 'Styleguide-title--' + level;
       return '<h' + level + ' id="' + escapedText + '" class="' + _class + '">' + text + '</h' + level + '>';
     }
  }

}
```

## Example

### Files

```
my_project/
  assets/
    css/
      dropdown/
        dropdown.css
        dropdown.md
      modal.css
      modal.md
  styleguide/
    layout.html
  generate-styleguide.js
```


### Default

Generate a file per component into `components.folder`

Will output

```
my_project/
  assets/
    ...
  styleguide/
    components/
      modal.md
      dropdown.md
    index.html
    layout.html
  generate-styleguide.js
```


### OnePage

No external file will be generated and all components will be put into `index.html`.

Will output

```
my_project/
  assets/
    ...
  styleguide/
    index.html
    layout.html
  generate-styleguide.js
```



# The MIT License (MIT)

Copyright (c) 2015 Ugo Onali (http://twitter.com/onaliugo)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
