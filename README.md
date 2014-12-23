# Node styleguide

## Install
```
npm i node-styleguide
```

## How it works
- For each `.md` files into your `baseFolder`
- Convert them to `html` (note that you can change the extension with `distFilesExtensions` for a better match with your environnement)
- Output to `distFolder / distComponentFolder`

## Usage
```js
var styleguide = require('node-styleguide');
styleguide.generate(opts);
```

## Complete example
```js
// styleguide.js

var styleguide = require('node-styleguide');

styleguide.generate({
  baseFolder: 'assets/css/',
  distFolder: 'styleguide/',
  distComponentFolder: 'components/',
  distFilesExtensions: '.html',

  beforeCompilation: function(str){
    /* Receive each Markdown file content as an argument
     * Can manipulate and return it */
  },
  afterCompilation: function(str){
    /* Receive each converted file content as an argument
     * Can manipulate it and return it */
  }
});
```

### Will output
```
_my_project/
  |_ styleguide/
    |_ components
      |_ component-a.html
      |_ component-b.html
```
