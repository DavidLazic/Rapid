/**
 * Copyright 2018 David Lazic. All rights reserved.
 * Licensed under the MIT License.
 */

 /**
 * @description
 * Creates Singleton instance
 *
 * @constructor
 */
class Singleton {

  static instance;

  constructor () {
    if (this.instance) {
      return this.instance;
    }
  }
}

export { Singleton as default, Singleton }
