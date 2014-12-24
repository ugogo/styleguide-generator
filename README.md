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

```
// Base folder

my_project/
  assets/
    css/
      dropdown.css
      modal.css
  styleguide/
    index.html
```

```js
// styleguide.js

var styleguide = require('node-styleguide');

styleguide.generate({
  baseFolder: 'my_project/assets/css/',
  distFolder: 'my_project/styleguide/',
  distComponentFolder: 'components/',
  distFilesExtensions: '.html',

  beforeCompilation: function(str){
    /* Receive each Markdown file content as an argument
     * Can manipulate and return it */

    return str;
  },
  afterCompilation: function(str){
    /* Receive each converted file content as an argument
     * Can manipulate it and return it */

    return str;
  }
});
```

### Will output
```
my_project/
  assets/
    ...
  styleguide/
    index.html
    components/
      dropdown.html
      modal.html
```
