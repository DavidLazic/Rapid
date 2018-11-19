const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = exports = {
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },

  "ecmaFeatures": {
    "modules": true
  },

  "parserOptions": {
    "sourceType": "module"
  },

  "extends": "eslint:recommended",

  "rules": {
    "no-console": 0
  }
};
