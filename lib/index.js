var Utils = require('uo-node-utils');
var Navigation = require('./navigation');

function Styleguide (userOpts) {
  Utils.silent = userOpts.silent || false;

  require('./options/extend').call(this, userOpts);
  require('./options/compare').call(this);

  this._generate = {
    colors: require('./generate/colors'),
    components: require('./generate/components'),
    onepage: require('./generate/one-page')
  };

  this.convert = require('./convert');
  this.generate = require('./generate/start');
}

Navigation.add('Colors');

module.exports = Styleguide;
