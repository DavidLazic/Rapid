export default {

  id (name, scope = document) {
    return scope.getElementById(name);
  },

  class (name, scope = document) {
    return Array.from(scope.getElementsByClassName(name));
  }
}
