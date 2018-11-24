import { Frame } from '../Frame';
import { Bounds } from '../Bounds';

class Panel {

  constructor (props = {}) {
    this.id = props.id;
    this.scope = props.scope;
    this.cb = props.onScroll;
    this.damping = props.damping || 0.9;

    this.ch = this.scope.clientHeight;
    this.vh = window.innerHeight;

    this.frame = null;
    this.offset = 0;
    this.rendered = 0;

    this.bindEvents();
  }

  bindEvents () {
    this.scope.addEventListener('wheel', this.onScroll.bind(this), { passive: false });

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    } else {
      window.onbeforeunload = () => window.scrollTo(0, 0);
    }
  }

  onStop () {
    this.frame = null;
    Frame.unregister(this.id);
  }

  onScroll (evt) {
    evt.preventDefault();

    if (!this.frame) {
      this.frame = Frame.register(this.id, this.render.bind(this));
    }

    return this.updateOffset(evt);
  }

  updateOffset (evt) {
    const { y } = Bounds.normalizeDelta(evt);
    const isNearEdge = Bounds.isNearEdge({
      ch: this.ch,
      vh: this.vh,
      offset: this.offset,
      delta: y
    });

    if (isNearEdge) return;

    this.offset += y;
  }

  render () {
    const normalized = Bounds.normalizeOffset({
      offset: this.offset,
      ch: this.ch,
      vh: this.vh
    });

    const distance = normalized - this.rendered;
    const position = Number.parseFloat((normalized - (distance * this.damping)).toFixed(2));

    if (position === this.rendered) {
      return this.onStop();
    }

    this.offset = normalized;
    this.rendered = position;

    return this.cb && this.cb(position);
  }
}

export { Panel as default, Panel };
