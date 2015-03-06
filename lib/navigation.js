var baseArr = ['<ul class="Styleguide-navWrapper">'];
var Navigation = {
  arr: baseArr,

  add: function (name) {
    var $li = '<li class="Styleguide-navItem">';
    var $a = '<a class="Styleguide-navLink" href="#s-' + name.toLowerCase() + '">' + name + '</a>';
    return this.arr.push($li + $a + '</li>');
  },
  build: function () {
    var data;
    this.arr.push('</ul>');
    data = this.arr.join('');
    this.reset();
    return data;
  },
  reset: function () {
    this.arr = baseArr;
  }
};

module.exports = Navigation;
