import { Frame } from '../frame/Frame';

export class Scroller {

  static DELTA_SCALE = {
    STANDARD: 1,
    OTHERS: -3
  };

  static DELTA_MODE = [1.0, 28.0, 500.0];

  static getDeltaMode (mode) {
    return Scroller.DELTA_MODE[mode] || Scroller.DELTA_MODE[0];
  }

  static normalizeDelta (evt) {
    if ('deltaX' in evt) {
      const mode = Scroller.getDeltaMode(evt.deltaMode);

      return {
          x: evt.deltaX / Scroller.DELTA_SCALE.STANDARD * mode,
          y: evt.deltaY / Scroller.DELTA_SCALE.STANDARD * mode,
      };
    }

    if ('wheelDeltaX' in evt) {
      return {
          x: evt.wheelDeltaX / Scroller.DELTA_SCALE.OTHERS,
          y: evt.wheelDeltaY / Scroller.DELTA_SCALE.OTHERS,
      };
    }

    return {
      x: 0,
      y: evt.wheelDelta / Scroller.DELTA_SCALE.OTHERS,
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

  static getPosition ({ offset, rendered, damping }) {
    const distance = offset - rendered;
    return Number.parseFloat((offset - (distance * damping)).toFixed(2));
  }

  static isNearEdge ({ ch, vh, offset, delta }) {
    return (offset <= 0 && delta <= 0) ||
      (offset >= ch - vh && delta >= 0);
  }

  constructor (props = {}) {
    this.id = props.id;
    this.el = props.el;
    this.children = Array.from(props.children) || [];
    this.damping = props.damping || 0.9;
    this.ch = this.el.clientHeight;
    this.vh = window.innerHeight;

    this.state = {
      frame: null,
      offset: 0,
      rendered: 0
    };

    this.bindEvents();
  }

  bindEvents () {
    this.el.addEventListener('wheel', this.onScroll.bind(this), { passive: false });

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    } else {
      window.onbeforeunload = () => window.scrollTo(0, 0);
    }
  }

  onStop () {
    this.state.frame = null;
    Frame.unregister(this.id);
  }

  onScroll (evt) {
    evt.preventDefault();

    if (!this.state.frame) {
      this.state.frame = Frame.register(this.id, this.render.bind(this));
    }

    return this.updateOffset(evt);
  }

  updateOffset (evt) {
    const {
      ch,
      vh,
      state: { offset }
    } = this;
    const { y } = Scroller.normalizeDelta(evt);
    const isNearEdge = Scroller.isNearEdge({
      ch,
      vh,
      offset,
      delta: y
    });

    if (isNearEdge) return;

    this.state.offset += y;
  }

  updateElements ({ children, position }) {
    let i = children.length;
    while (i--) {
      children[i].style.transform = `translate3d(0, ${-position}px, 0)`;
    }
  }

  render (frame) {
    const {
      ch,
      vh,
      children,
      damping,
      state: { offset, rendered }
    } = this;

    this.state.offset = Scroller.normalizeOffset({ offset, ch, vh });

    const position = Scroller.getPosition({
      offset,
      rendered,
      damping
    });

    if (position === rendered) {
      return this.onStop();
    }

    this.updateElements({
      children,
      position
    });

    this.state = {
      ...this.state,
      frame,
      rendered: position
    };
  }
}
