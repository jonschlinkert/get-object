#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var ansi = require('ansi');
var chalk = require('chalk');
var Benchmark = require('benchmark');
var cursor = ansi(process.stdout);
var files = fs.readdirSync('./benchmark/impl');

files = files.map(function (fp) {
  return path.join(__dirname, 'impl', fp);
});

var fixture = {a: {b: {c: {foo: 'bar'}, d: 'd', e: 'd', 'g.h.i': {deep: 'obj'}} } };
var props = ['a', 'a.b', 'a.c', 'a.b.c', 'a.b.d', 'a.b.e', 'a.b.f', 'x.y.z'];

props.forEach(function (prop, i) {
  var suite = new Benchmark.Suite('get', {
    onStart: function () {
      console.log(chalk.magenta('\nSample:  #%s value: %s'), i, '[' + prop + ']');
    },
    onComplete: function () {
      cursor.write('\n');
    }
  });

  files.forEach(function (impl) {
    var name = path.basename(impl);
    var fn = require(path.resolve(impl));
    suite
      .add(name, {
        onCycle: function onCycle(event) {
          cursor.horizontalAbsolute();
          cursor.eraseLine();
          cursor.write(' > ' + event.target);
        },
        onComplete: function () {
          cursor.write('\n');
        },
        fn: function () {
          fn.apply(null, [fixture, 'a.b']);
          return;
        }
      });
  });

  suite.run();
});