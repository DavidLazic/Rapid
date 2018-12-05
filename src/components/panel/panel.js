/**
 * Copyright 2018 David Lazic. All rights reserved.
 * Licensed under the MIT License.
 */

import { Element } from '../element/element';
import { Frame } from '../../frame';

/**
 * @description
 * Creates Panel instance
 *
 * @constructor
 * @extends Element
 */
class Panel extends Element {

  static DELTA_SCALE = {
    STANDARD: 1,
    OTHERS: -3
  };

  static DELTA_MODE = [1.0, 28.0, 500.0];

  /**
   * @description
   * Returns current delta mode
   *
   * @param {Number} mode
   *
   * @return {Number}
   * @private
   */
  static getDeltaMode (mode) {
    return this.DELTA_MODE[mode] || this.DELTA_MODE[0];
  }

  /**
   * @description
   * Normalizes wheel x and y delta
   * within client height and view height bounds
   *
   * @param {Object} evt
   *
   * @return {Object}
   * @private
   */
  static normalizeDelta (evt) {
    if ('deltaX' in evt) {
      const mode = this.getDeltaMode(evt.deltaMode);

      return {
        x: evt.deltaX / this.DELTA_SCALE.STANDARD * mode,
        y: evt.deltaY / this.DELTA_SCALE.STANDARD * mode,
      };
    }

    if ('wheelDeltaX' in evt) {
      return {
        x: evt.wheelDeltaX / this.DELTA_SCALE.OTHERS,
        y: evt.wheelDeltaY / this.DELTA_SCALE.OTHERS,
      };
    }

    return {
      x: 0,
      y: evt.wheelDelta / this.DELTA_SCALE.OTHERS,
    };
  }

  /**
   * @description
   * Normalizes offset
   * within client height and view height bounds
   *
   * @param {Number} offset
   * @param {Number} ch
   * @param {Number} vh
   *
   * @return {Number}
   * @private
   */
  static normalizeOffset (offset, ch, vh) {

    switch (true) {
      case (offset < 0): {
        return 0;
      }

      case (offset > ch - vh): {
        return ch - vh
      }

      default: {
        return offset
      }
    }
  }

  /**
   * @description
   * Checks if current offset and delta direction
   * are within client height and view height bounds
   *
   * @param {Number} offset
   * @param {Number} delta
   * @param {Number} max
   *
   * @return {Boolean}
   * @private
   */
  static isNearEdge (offset, delta, max) {
    return (offset <= 0 && delta <= 0) || (offset >= max && delta >= 0);
  }

  constructor (props, callback) {
    super(props);

    this.callback = callback || function () {};
    this.damping = props.damping || 0.9;

    this.frameId = null;
    this.offset = 0;
    this.rendered = 0;

    this.bindEvents();
  }

  bindEvents () {
    this.scope.addEventListener('wheel', this.onWheel.bind(this), { passive: false });

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    } else {
      window.onbeforeunload = () => window.scrollTo(0, 0);
    }
  }

  /**
   * @description
   * Removes next frame's ID
   * Unregisters module from the rAF loop
   *
   * @return {void}
   * @public
   */
  cancel () {
    this.frameId = null;
    Frame.unregister(this.id);
  }

  /**
   * @description
   * Prevents default scroll event from firing
   * Registers to a rAF loop
   *
   * @param {Object} evt
   *
   * @return {void}
   * @public
   */
  onWheel (evt) {
    evt.preventDefault();
    evt.stopPropagation();

    const { y } = Panel.normalizeDelta(evt);
    const isNearEdge = Panel.isNearEdge(this.offset, y, this.ch - this.vh);

    if (isNearEdge) return;

    if (!this.frameId) {
      this.frameId = Frame.register(this.id, this.render.bind(this));
    }

    this.offset += y;
  }

  /**
   * @description
   * Renders the current animation frame
   *
   * @return {Function<Number>}
   * @public
   */
  render () {
    const normalized = Panel.normalizeOffset(this.offset, this.ch, this.vh);

    const distance = normalized - this.rendered;
    const position = Number.parseFloat((normalized - (distance * this.damping)).toFixed(2));

    if (position === this.rendered) {
      return this.cancel();
    }

    this.offset = normalized;
    this.rendered = position;

    return this.callback(position);
  }
}

export { Panel as default, Panel };
