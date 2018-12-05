/**
 * Copyright 2018 David Lazic. All rights reserved.
 * Licensed under the MIT License.
 */

export default function memoize (fn) {
  return function (...args) {
    fn.cache = fn.cache || {};
    return fn.cache[args]
      ? fn.cache[args]
      : (fn.cache[args] = fn.apply(this, args));
  }
}
