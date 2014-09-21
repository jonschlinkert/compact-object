/*!
 * compact-object <https://github.com/jonschlinkert/compact-object>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var isPlainObject = require('is-plain-object');
var reduceObj = require('reduce-object');

module.exports = function omitEmpty(o, noZero) {
  return reduceObj(o, function (acc, value, key) {
    if (isPlainObject(value) && !Array.isArray(value)) {
      var val = omitEmpty(value, noZero);
      if (!isEmpty(val)) {
        acc[key] = val;
      }
    } else if (Array.isArray(value)) {
      do {
        value = [].concat.apply([], value);
      } while (value.some(Array.isArray));
      if (value.length) {
        acc[key] = value;
      }
    } else if (!isEmpty(value, noZero)) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

function isEmpty(o, noZero) {
  if (o === null || o === undefined) {
    return true;
  }
  if (typeof o === 'boolean') {
    return false;
  }
  if (typeof o === 'number') {
    if (noZero && o === 0) {
      return true;
    }
    return false;
  }
  if (o.length !== undefined) {
    return o.length === 0;
  }
  for (var key in o) {
    if (o.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}