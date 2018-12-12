/**
 * Copyright 2018 David Lazic. All rights reserved.
 * Licensed under the MIT License.
 */

import { Factory } from '../../factory';
import { Frame } from '../../frame';

/**
 * @description
 * Creates Element instance
 *
 * @constructor
 */
class Element {

  constructor (props = {}) {
    this.id = Factory.id();
    this.scope = props.scope;
    this.frame = props.frame || Frame;

    this.height = this.scope.clientHeight;
    this.viewHeight = window.innerHeight;

    this.events();
  }

  /**
   * @description
   * Binds DOM events
   *
   * @return {void}
   * @public
   */
  events () {}

  /**
   * @description
   * Applies transformation to an element
   *
   * @param {String} transform
   *
   * @return {void}
   * @public
   */
  transform (transform) {
    this.scope.style.transform = transform;
  }
}

export { Element as default, Element };
