/*!
 * get-object <https://github.com/jonschlinkert/get-object>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var get = require('./');

describe('.get()', function () {
  it('should get a value only.', function () {
    get({a: 'a', b: {c: 'd'}}, 'a').should.eql('a');
  });

  it('should get a value only.', function () {
    get({a: 'a', b: {c: 'd'}}, 'b.c').should.eql('d');
  });

  it('should get the value of a deeply nested property.', function () {
    get({a: {b: 'c', c: {d: 'e', e: 'f', g: {h: 'i'}}}}, 'a.c.g.h').should.eql('i');
  });

  it('should return an empty object when the value is undefined.', function () {
    get({a: {b: 'c', c: {d: 'e', e: 'f', g: {h: 'i'}}}}, 'a.d.f').should.eql({});
  });
});

