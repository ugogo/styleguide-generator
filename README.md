# Node styleguide

## Install
```
npm i node-styleguide
```

## How it works
- For each `.md` files into your `srcFolder`
- Convert them to `html` (you can change the extension with `distFilesExtensions` for a better match with your environnement, `.hbs` for example)
- Output to `distFolder / components.folder`

## Usage
```js
var Styleguide = require('node-styleguide');
var styleguide;

styleguide = new Styleguide(opts).generate(cb);
```

## Options

```js
// styleguide.js

var Styleguide = require('../lib/index.js');

var styleguide = new Styleguide({

  /* Folder where your .md files are located
  * Default: 'example/assets/css/' */
  srcFolder: 'assets/css/',

  /* Folder where your styleguide is located
  * Default: 'example/styleguide/' */
  distFolder: 'styleguide/',

  /* If you don't want to generate a file per component
   * set active to true
   * Default: false */
  onePage: false,

  layout: {

    /* Layout path
     * Default: 'example/styleguide/layout.html' */
    path: 'example/styleguide/layout.html',

    title: {

      /* Title str to replace
       * Default: '<!-- %layout-title% -->' */
      str: '<!-- %layout-title% -->',

      /* Title new content
       * Default: 'Styleguide.' */
      content: 'Styleguide.'
    },

    content: {
      /* Content str to replace
       * It will be replace by the components' Html generated
       * Default: '<!-- %layout-content% -->' */
      str: '<!-- %layout-content% -->'
    }
  },

  components : {

    /* Folder where your components files will be generated
    * Can be blank
    * Default :'components/' */
    folder: '',

    /* Specify your compnents files extension
    * Can be what you want (.html, .hbs...)
    * But files will only be compiled in .html
    * Default: '.html' */
    filesExtension: 'html',

    /* Modify each Markdown file content before compilation
    * Default: return MardowknStr */
    beforeCompilation: function( MardowknStr ) {
      return MardowknStr + 'data appended on each file';
    },

    /* Modify each Markdown file before compilation
    * Default: return '<div class="Styleguide-module">' + htmlStr + '</div>'; */
    afterCompilation:  function( HtmlStr ) {
      return 'data prepend on each file' + HtmlStr;
    }
  }
});

styleguide.generate();
```

## Example

### Normal

```js
// project folder (srcFolder)

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
  styleguide.js
```

### One page

Will output

```
my_project/
  assets/
    ...
  styleguide/
    index.html
    layout.html
```

## Usages

### Default

Default behavior: generate a file per component.
Files content will **only** be Markdown content converted.
You can specify a folder where all components will be generated -> `components.folder`

### One page

If you set `onePage` to `true`, no external file will be generate and all components will be put into the layout.
`layout.content.str` will be replace by the content.

### Default with layout

Todo.
