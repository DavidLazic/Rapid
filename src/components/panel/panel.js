/**
 * Copyright 2018 David Lazic. All rights reserved.
 * Licensed under the MIT License.
 */

import { Element } from '../../core/element';
import { Bounds } from '../../core/bounds';

/**
 * @description
 * Creates Panel instance
 *
 * @constructor
 * @extends Element
 */
class Panel extends Element {

  constructor (props, callback) {
    super(props, Panel);

    this.callback = callback || function () {};
    this.damping = props.damping || 0.9;

    this.offset = 0;
    this.rendered = 0;
  }

  init () {
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
    this.frame.unsubscribe(this.id);
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

    const { y } = Bounds._normalizeDelta(evt);
    const isNearEdge = Bounds._isNearEdge(this.offset, y, this.height - this.viewHeight);

    if (isNearEdge) return;

    this.frame.subscribe(this.id, this.render.bind(this));
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
    const normalized = Bounds._normalizeOffset(this.offset, this.height - this.viewHeight);

    const distance = normalized - this.rendered;
    const position = Number.parseFloat((normalized - (distance * this.damping)).toFixed(2));

    if (position === this.rendered) {
      return this.cancel();
    }

    this.offset = normalized;
    this.rendered = position;

    return this.callback(-position);
  }
}

export { Panel as default, Panel };
