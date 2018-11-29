class Element {

  constructor (props = {}) {
    this.id = props.id;
    this.scope = props.scope;
  }

  translate (props = {}) {
    const speed = props.speed || 1;
    this.scope.style.transform = `translate3d(0, ${-props.offset * speed}px, 0)`;
  }
}

export { Element as default, Element };
