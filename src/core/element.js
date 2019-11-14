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

    this.init();
  }

  /**
   * @description
   * Init
   *
   * @return {void}
   * @public
   */
  init () {}

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
  transform ({ offset, transform }) {
    const { top } = this.scope.getBoundingClientRect();
    const shouldUpdate = (top + offset <= this.viewHeight) && ((this.delta + offset + this.height) >= 0);

    if (shouldUpdate) {
      this.scope.style.transform = transform;
    }
  }

  /**
   * @description
   * Adds class to an element
   * when the element is in viewport
   *
   * @param {String} transform
   *
   * @return {void}
   * @public
   */
  class (name) {
    return ({ offset }) => {
      const shouldUpdate = (this.delta + offset + 100 <= this.viewHeight);

      return (shouldUpdate && !this.scope.classList.contains(name)) && this.scope.classList.add(name);
    };
  }
}

export { Element as default, Element };
