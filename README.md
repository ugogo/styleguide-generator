# Node styleguide

## Install
```
npm i node-styleguide
```

### Use
Assuming this folder structure
```
_my_project/
  |_ assets/
    |_ css/
      |_ component-a/
        |_ component-a.css
        |_ component-a.md
      |_ component-b/
        |_ component-b.css
        |_ component-b.md
  |_ index.js
```
```js
var styleguide = require('node-styleguide');

styleguide.generate({
  baseFolder: 'assets/css/',
  distFolder: 'styleguide/',
  distComponentFolder: 'components/',
  distFilesExtensions: '.html',

  /* Will output styleguide/components/component-name.html */

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

Will output
```
_my_project/
  |_ styleguide/
    |_ components
      |_ component-a.html
      |_ component-b.html
```
