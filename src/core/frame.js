/**
 * Copyright 2018 David Lazic. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Connect to a single rAF loop by registering listeners
 * To maximize performance, single rAF instance is preferred for multiple listeners
 * Multiple rAF instances could result in a lower performance due to rAF memory stacks
 */
const Frame = (win => {

  /**
    * @description
    * Requests next frame ID
    * Invokes all active listeners
    *
    * @private
    */
   function _update () {
    this.id = $Frame.requestAnimationFrame.call(win, _update.bind(this));

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
  function _cancel () {
    $Frame.cancelAnimationFrame.call(win, this.id);
    this.id = null;
  }

  /**
   * @description
   * Creates $Frame instance
   *
   * @constructor
   */
  class $Frame {

    static requestAnimationFrame = win.requestAnimationFrame ||
      win.webkitRequestAnimationFrame ||
      win.mozRequestAnimationFrame ||
      win.msRequestAnimationFrame ||
      win.oRequestAnimationFrame ||
      function (cb) {
        return win.setTimeout(cb, 1000 / 60);
      };

    static cancelAnimationFrame = win.cancelAnimationFrame ||
      win.mozCancelAnimationFrame;

    constructor () {
      this.id = null;
      this.listeners = new Map();
    }

    /**
     * @description
     * Subscribes a frame listener
     * Returns next frame's ID
     *
     * @param {*} id
     * @param {Function} listener
     *
     * @return {Number}
     * @public
     */
    subscribe (id, listener)  {

      if (!this.listeners.has(id)) {
        this.listeners.set(id, listener);
      }

      return this.id || $Frame.requestAnimationFrame.call(win, _update.bind(this));
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
    unsubscribe (id) {
      this.listeners.delete(id);

      return !this.listeners.size && _cancel.call(this);
    }
  }

  return new $Frame();
})(window);

export { Frame as default, Frame }


