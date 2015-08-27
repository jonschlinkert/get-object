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
  it('should get a value from an object.', function () {
    get({a: 'aaa', b: {c: 'd'}}, 'a').should.eql({a: 'aaa'});
    get({a: 'a', b: {c: 'd'}}, 'b.c').should.eql({c: 'd'});
  });

  it('should get a value from an array.', function () {
    get(['a', 'b', 'c'], '0').should.eql(['a']);
    get(['a', 'b', 'c'], 2).should.eql(['c']);
  });

  it('should get nested value from an array.', function () {
    get({a: ['a', 'b', 'c']}, 'a.0').should.eql(['a']);
    get({a: ['a', 'b', 'c']}, 'a.2').should.eql(['c']);
    get({a: {b: ['a', 'b', 'c']}}, 'a.b.2').should.eql(['c']);
  });

  it('should support array notation.', function () {
    get({a: ['a', 'b', 'c']}, 'a[0]').should.eql(['a']);
    get({a: ['a', 'b', 'c']}, 'a[2]').should.eql(['c']);
    get({a: {b: ['a', 'b', {c: 'd'}]}}, 'a.b[2].c').should.eql({c: 'd'});
  });

  it('should get a deeply nested property.', function () {
    get({a: {b: 'c', c: {d: 'e', e: 'f', g: {h: 'i'}}}}, 'a.c.g.h').should.eql({h: 'i'});
  });

  it('should return an empty object when the value is undefined.', function () {
    get({a: {b: 'c', c: {d: 'e', e: 'f', g: {h: 'i'}}}}, 'a.d.f').should.eql({});
  });

  it('should use property paths to get nested values from the source object.', function () {
    var fixture = {
      a: {locals : {name: {first: 'Brian'}}},
      b: {locals : {name: {last: 'Woodward'}}}
    };
    get(fixture, 'a.locals.name').should.eql({name: {first: 'Brian'}});
    get(fixture, 'b.locals.name').should.eql({name: {last: 'Woodward'}});
    get(fixture, 'b.locals.name.last').should.eql({last: 'Woodward'});
  });

  it('should return an empty object if the path is not found', function () {
    var fixture = {};
    get(fixture, 'a.locals.name').should.eql({});
    get(fixture, 'b.locals.name').should.eql({});
  });

  it('should get the specified property.', function () {
    get({a: 'aaa', b: 'b'}, 'a').should.eql({a: 'aaa'});
    get({first: 'Jon', last: 'Schlinkert'}, 'first').should.eql({first: 'Jon'});
    get({locals: {a: 'a'}, options: {b: 'b'}}, 'locals').should.eql({locals: {a: 'a'}});
  });

  it('should return the entire object if no property is passed.', function () {
    get({a: 'a', b: {c: 'd'}}).should.eql({a: 'a', b: {c: 'd'}});
  });

  it('should get the value of a deeply nested property.', function () {
    get({a: {b: 'c', c: {d: 'e', e: 'f', g: {h: 'i'}}}}, 'a.c.g.h').should.eql({h: 'i'});
  });

  it('should return an empty object if the first value is null.', function () {
    get(null, 'a.c.g.h').should.eql({});
  });
});

var obj = {
  prop1: {
    arr: ['a', 'b', 'c'],
    str: 'Hello'
  },
  prop2: {
    arr: [{
      nested: 'Universe'
    }],
    str: 'Hello again!'
  }
};


console.log(get(obj, 'prop1.str'))
console.log(get(obj, 'prop1.arr[2]'))
console.log(get(obj, 'prop2.arr[0]nested'))
