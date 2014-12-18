# Node styleguide

## Install
```
npm i node-styleguide
```

### Use
Assuming this folder structure
```
my_project/
|_ assets/
|_ css/
|_ component-a/
|_ component-a.css
|_ component-a.md
|_ component-a/
|_ component-a.css
|_ component-a.md
|_ index.js
```
```js
var styleguide = require('node-styleguide');

styleguide.generate({
	baseFolder: 'assets/css/',
	distFolder: 'styleguide/',
	distComponentFolder: 'components/'
});
```
Will output
```
my_project/
|_ assets/
...
|_ styleguide/
|_ components
|_ component-a
|_ component-a.html
|_ component-b
|_ component-b.html
|_ index.js
```
