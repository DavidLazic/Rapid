window.requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function (cb) {
    return window.setTimeout(cb, 1000 / 60);
  };

window.cancelAnimationFrame = window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame;

export const Frame = {
  id: null,

  listeners: new Map(),

  register (id, listener)  {

    if (!this.listeners.has(id)) {
      this.listeners.set(id, listener);
    }

    return this.id || window.requestAnimationFrame(this.render.bind(this));
  },

  unregister (id) {
    this.listeners.delete(id);

    if (!this.listeners.size) {
      this.cancel();
    }
  },

  cancel () {
    window.cancelAnimationFrame(this.id);
    this.id = null;
  },

  render () {
    this.id = window.requestAnimationFrame(this.render.bind(this));

    let i = this.listeners.size;
    const listeners = [ ...this.listeners.values() ];

    while (i--) {
      listeners[i](this.id);
    }
  }
}


