'use strict';

module.exports = function get(o, lookup) {
  if (typeof o !== 'object') {
    return null;
  }

  var seg = lookup.split('.');
  var len = seg.length;

  for (var i = 0; i < len; i++) {
    var key = seg[i];
    if (!o.hasOwnProperty(key)) {
      o[key] = {};
    }
    o = o[key];
  }
  return o;
};
