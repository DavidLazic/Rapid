class Bounds {

  static DELTA_SCALE = {
    STANDARD: 1,
    OTHERS: -3
  };

  static DELTA_MODE = [1.0, 28.0, 500.0];

  static getDeltaMode (mode) {
    return this.DELTA_MODE[mode] || this.DELTA_MODE[0];
  }

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
  };

  static normalizeOffset ({ offset, ch, vh }) {

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

  static isNearEdge ({ ch, vh, offset, delta }) {
    return (offset <= 0 && delta <= 0) ||
      (offset >= ch - vh && delta >= 0);
  }
}

export { Bounds as default, Bounds };
