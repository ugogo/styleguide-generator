var Navigation = {
  arr: [],
  data: null
};

Navigation.add = function (name) {
  var $li = '<li class="Styleguide-navItem">';
  var $link = '<a class="Styleguide-navLink" href="#s-' + name.toLowerCase() + '">' + name + '</a>';

  return this.arr.push($li + $link + '</li>');
};

Navigation.build = function () {
  this.arr.push('</ul>');
  this.data = this.arr.join('');

  return this.data;
};

Navigation.arr.push('<ul class="Styleguide-navWrapper">');

module.exports = Navigation;
