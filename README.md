# Styleguide generator

## Install
```
npm install --save-dev styleguide-generator
```



## How it works

- Each `.md` files into your `files.src` will be convert (files extension can be change in `components.extension`)
- Files will be output to `files.dist`. If `type: 'components'`, files will be output in `files.dist + components.wrap`
- An example will be automatically generate before code blocks



## Usage example

```js
var Styleguide = require('styleguide-generator');

var styleguide = new Styleguide({
  type: 'onepage',
  onepage: {
    layout: 'path/to/layout.html',
    stylesheets: ['path/to/styleguide.css']
  }
  components: {
    extension: 'html',
    beforeCompilation: function (str, path) {
      return str + 'data append on each file';
    }
  }
}).generate(function () {
  return console.log('✓ Styleguide generated\n');
});
```



## Default options

```js
var defaultOpts = {

  /* files {}

   * files.src: 'string'
   * folder where your .md files are located

   * files.dist: 'string'
   * where your files will be output

   * files.colors: 'string' | false
   * path to your colors file

   * files.ignore: []
   * array to strings to ignore
   */

	files: {
		src: 'assets/css/',
		dist: 'dist',
		colors: 'assets/css/_colors.scss',
    	ignore: ['myIgnoredFile.md', 'myIgnoredFolder/', 'myIgnoredString']
	},

  /* components {}

   * components.wrap: 'string'
   * wrap your components into a folder, can be blank

   * components.extension: 'string'
   * specify your components files extension
   * but files will be compiled in html (for now)

   * components.beforeCompilation: function
   * modify each .md file before compilation
   * must return a string

   * components.afterCompilation: function
   * modify each converted file after compilation
   * must return a string
   */

	components: {
		wrap: 'components/',
    	extension: 'html',
		beforeCompilation: function (str) {
			return str;
		},
		afterCompilation: function (str) {
			return str;
		}
	},

  /* type: 'string' -> 'components' || 'onepage'
   * generate a file per component
   * or a single page */

	type: 'components',

  /* onepage {}
   * onepage options

   * onepage.layout: 'string'
   * path to your layout (for onepage)

   * onepage.stylesheets: []
   * array of css files (will be inline in head) */

  onepage: {
    layout: layout: 'styleguide-layout.html',
    stylesheets: ['path/to/styleguide.css']
  },

  /* silent: boolean
   * log a message when action is done
   * -> uo-node-utils package */

	silent: false
};
```



### Files

```
.project/
—— css/
———— dropdown/
—————— dropdown.css
—————— dropdown.md
———— modal.css
———— modal.md
—— styleguide/
———— layout.html
———— generate.js
```

### generate.js

```js
// ...

new styleguide({
  files: {
    src: '../css/'
    dist: '../dist'
  },
  type: 'onepage',
  layout: 'layout.html'
})
.generate();

// ...
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
