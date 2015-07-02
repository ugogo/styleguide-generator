var Navigation = {
  arr: [],

  reset: function () {
    this.arr = [];
  },

  add: function (name) {
    var li = [];
    var link = '<a class="Styleguide-navLink" href="#s-' + name.toLowerCase() + '">' + name + '</a>';

    li.push('<li class="Styleguide-navItem">');
    li.push(link);
    li.push('</li>');

    li = li.join('');

    this.arr.push(li);

    return li;
  },

  build: function () {
    var data = [];

    data.push('<ul class="Styleguide-navWrapper">');
    data.push(this.arr.join(''));
    data.push('</ul>');

    data = data.join('');

    this.reset();

    return data;
  }
};

module.exports = Navigation;
