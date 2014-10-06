'use strict';

module.exports = function get(o, lookup) {
  if (typeof o !== 'object') {
    return null;
  }

  var seg = lookup.split('.');
  var key;

  while (key = seg.shift()) {
    if (!o.hasOwnProperty(key)) {
      o[key] = {};
    }
    o = o[key];
  }
  return o;
};
