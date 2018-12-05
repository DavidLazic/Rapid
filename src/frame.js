/**
 * Copyright 2018 David Lazic. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Connect to a single rAF loop by registering listeners
 * To maximize performance, single rAF instance is preferred for multiple listeners
 * Multiple rAF instances could result in a lower performance due to rAF memory stacks
 */
const Frame = (window => {

  /**
   * @description
   * Creates $Frame instance
   *
   * @constructor
   */
  class $Frame {

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

    /**
    * @description
    * Requests next frame ID
    * Invokes all active listeners and broadcasts next frame's ID for cancellation
    *
    * @private
    */
    static _broadcast = function () {
      this.id = $Frame.requestAnimationFrame.call(window, $Frame._broadcast.bind(this));

      let i = this.listeners.size;
      const listeners = [ ...this.listeners.values() ];

      while (i--) {
        listeners[i](this.id);
      }
    }

    /**
     * @description
     * Cancels next frame from running
     *
     * @private
     */
    static _cancel = function () {
      $Frame.cancelAnimationFrame.call(window, this.id);
      this.id = null;
    }

    constructor () {
      this.id = null;
      this.listeners = new Map();
    }

    /**
     * @description
     * Registers a frame listener
     * Returns next frame's ID
     *
     * @param {*} id
     * @param {Function} listener
     *
     * @return {Number}
     * @public
     */
    register (id, listener)  {

      if (!this.listeners.has(id)) {
        this.listeners.set(id, listener);
      }

      return this.id || $Frame.requestAnimationFrame.call(window, $Frame._broadcast.bind(this));
    }

    /**
     * @description
     * Removes listener by ID
     * Does frame loop cancellation check
     *
     * @param {*} id
     *
     * @return {void}
     * @public
     */
    unregister (id) {
      this.listeners.delete(id);

      return !this.listeners.size && $Frame._cancel.call(this);
    }
  }

  return new $Frame();
})(window);

export { Frame as default, Frame }


