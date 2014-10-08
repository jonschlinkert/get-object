/*!
 * get-object <https://github.com/jonschlinkert/get-object>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var isObject = require('isobject');

module.exports = function get(o, lookup) {
  if (o == null || !isObject(o)) {
    return {};
  }

  if (lookup == null) {
    return o;
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
