export const Factory = {
  id: 0,

  createInstance (Module, props) {
    return new Module({ id: this.id++, ...props });
  }
};
