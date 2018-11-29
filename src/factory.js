/**
 * Copyright 2018 David Lazic. All rights reserved.
 * Licensed under the MIT License.
 */

import { Singleton } from './singleton';

/**
 * Bind a unique ID to each module for pub-sub pattern purposes
 */
const Factory = (() => {

  let __id = 0;

  class $Factory extends Singleton {

    constructor (props) {
      super(props);
    }

    /**
     * @description
     * Create new module instance
     * Append unique module ID
     *
     * @param {Function} Module
     * @param {Object} props
     *
     * @returns {Object}
     * @public
     */
    create (Module, props = {}) {
      return new Module({ id: __id++, ...props });
    }
  }

  return new $Factory();
})();

export { Factory as default, Factory }

