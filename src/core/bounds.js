class Bounds {

  static _DELTA_SCALE = {
    STANDARD: 1,
    OTHERS: -3
  };

  static _DELTA_MODE = [1.0, 28.0, 500.0];

  /**
   * @description
   * Returns current delta mode
   *
   * @param {Number} mode
   *
   * @return {Number}
   * @private
   */
  static _getDeltaMode (mode) {
    return Bounds._DELTA_MODE[mode] || Bounds._DELTA_MODE[0];
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
  static _normalizeDelta (evt) {
    if ('deltaX' in evt) {
      const mode = Bounds._getDeltaMode(evt.deltaMode);

      return {
        x: evt.deltaX / Bounds._DELTA_SCALE.STANDARD * mode,
        y: evt.deltaY / Bounds._DELTA_SCALE.STANDARD * mode,
      };
    }

    if ('wheelDeltaX' in evt) {
      return {
        x: evt.wheelDeltaX / Bounds._DELTA_SCALE.OTHERS,
        y: evt.wheelDeltaY / Bounds._DELTA_SCALE.OTHERS,
      };
    }

    return {
      x: 0,
      y: evt.wheelDelta / Bounds._DELTA_SCALE.OTHERS,
    };
  }

  /**
   * @description
   * Normalizes offset
   * within client height and view height bounds
   *
   * @param {Number} offset
   * @param {Number} max
   *
   * @return {Number}
   * @private
   */
  static _normalizeOffset (offset, max) {
    switch (true) {
      case (offset < 0): {
        return 0;
      }

      case (offset > max): {
        return max
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
  static _isNearEdge (offset, delta, max) {
    return (offset <= 0 && delta <= 0) || (offset >= max && delta >= 0);
  }
}

export { Bounds as default, Bounds };
