/**
 * Copyright 2018 David Lazic. All rights reserved.
 * Licensed under the MIT License.
 */

import { uuid } from './uuid';
import { Frame } from './frame';

/**
 * @description
 * Creates Element instance
 *
 * @constructor
 */
class Element {

  frame = Frame;

  viewHeight = window.innerHeight;

  constructor (props = {}) {
    this.id = uuid();
    this.scope = props.scope;

    this.height = this.scope.clientHeight;

    this.delta = this.scope.getBoundingClientRect().top;

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
   * when the element is in viewport
   *
   * @param {String} transform
   *
   * @return {void}
   * @public
   */
  transform (props) {
    const { top } = this.scope.getBoundingClientRect();
    const shouldUpdate = (top + props.offset <= this.viewHeight) && ((this.delta + props.offset + this.height) >= 0);

    if (shouldUpdate) {
      this.scope.style.transform = props.str;
    }
  }
}

export { Element as default, Element };
