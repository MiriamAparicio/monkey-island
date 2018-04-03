"use strict"
function Utils() {
}

Utils.prototype.creatHtml = function (html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
};

Utils.prototype.shuffle = function(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
};