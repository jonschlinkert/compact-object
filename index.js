/*!
 * compact-object <https://github.com/jonschlinkert/compact-object>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var hasValue = require('has-value');
var isPlainObject = require('is-plain-object');
var reduceObj = require('reduce-object');

module.exports = function omitEmpty(o, noZero) {
  return reduceObj(o, function (acc, value, key) {
    if (isPlainObject(value) && !Array.isArray(value)) {
      var val = omitEmpty(value, noZero);
      if (hasValue(val)) {
        acc[key] = val;
      }
    } else if (Array.isArray(value)) {
      do {
        value = [].concat.apply([], value);
      } while (value.some(Array.isArray));
      if (value.length) {
        acc[key] = value;
      }
    } else if (hasValue(value, noZero)) {
      acc[key] = value;
    }
    return acc;
  }, {});
};
