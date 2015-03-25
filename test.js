/*!
 * compact-object <https://github.com/jonschlinkert/compact-object>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var should = require('should');
var compactObj = require('./');

describe('.compactObj()', function () {
  it('should omit empty objects.', function () {
    compactObj({a: {b: {c: 'foo'}, d: {}}}).should.eql({a: {b: {c: 'foo'}}});
  });

  it('should omit empty primatives.', function () {
    compactObj({a: {b: {c: 'foo'}, d: ''}}).should.eql({a: {b: {c: 'foo'}}});
  });

  it('should omit empty arrays.', function () {
    compactObj({a: {b: {c: 'foo', d: []}, foo: []}}).should.eql({a: {b: {c: 'foo'}}});
  });

  it('should not omit `0`.', function () {
    compactObj({a: {b: {c: 'foo', d: 0}, foo: []}}).should.eql({a: {b: {c: 'foo', d: 0}}});
  });

  it('should omit `0` when `noZero` is defined.', function () {
    compactObj({a: {b: {c: 'foo', d: 0}, foo: []}}, true).should.eql({a: {b: {c: 'foo'}}});
  });

  it('should not omit `false`.', function () {
    compactObj({a: {b: {c: 'foo', d: 0}, foo: [], bar: false}}).should.eql({a: {b: {c: 'foo', d: 0}, bar: false}});
  });

  it('should flatten nested arrays in complex objects.', function () {
    var o = {a: {b: {c: 'foo', d: 0, e: {f: {g: {}, h: {i: 'i'}}}}, foo: [['bar', 'baz'], []], bar: [], one: 1, two: 2, three: 0 } };
    compactObj(o).should.eql({a: {b: {c: 'foo', d: 0, e: {f: {h: {i: 'i'}}}}, foo: ['bar', 'baz'], one: 1, two: 2, three: 0}});
  });
});

