class Singleton {

  static instance;

  constructor () {
    if (this.instance) {
      return this.instance;
    }
  }
}

export { Singleton as default, Singleton }
