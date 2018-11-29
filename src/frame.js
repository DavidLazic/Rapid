/**
 * Copyright 2018 David Lazic. All rights reserved.
 * Licensed under the MIT License.
 */

import { Singleton } from './singleton';

/**
 * Connect to a single rAF loop by registering listeners
 *
 * To maximize performance, rAF singleton is used for multiple listeners
 * Multiple rAF instances resulted in a lower performance due to rAF memory stacks
 */
const Frame = (window => {

  let __id = null;

  let __listeners = new Map();

  /**
   * @description
   * Request next frame ID
   * Invoke all active listeners and forward next frame's ID for cancellation
   *
   * @private
   */
  function __render () {
    __id = $Frame.requestAnimationFrame.call(window, __render.bind(this));

    let i = __listeners.size;
    const listeners = [ ...__listeners.values() ];

    while (i--) {
      listeners[i](__id);
    }
  }

  /**
   * @description
   * Cancel next frame from running
   *
   * @private
   */
  function __cancel () {
    $Frame.cancelAnimationFrame.call(window, __id);
    __id = null;
  }

  class $Frame extends Singleton {

    static requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function (cb) {
        return window.setTimeout(cb, 1000 / 60);
      };

    static cancelAnimationFrame = window.cancelAnimationFrame ||
      window.mozCancelAnimationFrame;

    constructor (props) {
      super(props);
    }

    /**
     * @description
     * Bind a frame listener
     * Return next frame's ID
     *
     * @param {*} id
     * @param {Function} listener
     *
     * @returns {Number}
     * @public
     */
    register (id, listener)  {

      if (!__listeners.has(id)) {
        __listeners.set(id, listener);
      }

      return __id || $Frame.requestAnimationFrame.call(window, __render.bind(this));
    }

    /**
     * @description
     * Remove listener by ID
     * Do frame loop cancellation check
     *
     * @param {*} id
     *
     * @returns {void}
     * @public
     */
    unregister (id) {
      __listeners.delete(id);

      return !__listeners.size && __cancel.call(this);
    }
  }

  return new $Frame();
})(window);

export { Frame as default, Frame }


