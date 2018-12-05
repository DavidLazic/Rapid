/**
 * Copyright 2018 David Lazic. All rights reserved.
 * Licensed under the MIT License.
 */

import { Singleton } from './singleton';

/**
 * Binds a unique ID to each module for pub-sub pattern purposes
 */
const Factory = (() => {

  let _id = 0;

  /**
   * @description
   * Creates $Factory instance
   *
   * @constructor
   * @extends Singleton
   */
  class $Factory extends Singleton {

    constructor (props) {
      super(props);
    }

    /**
     * @description
     * Get unique module ID
     *
     * @param {Function} Module
     * @param {Object} props
     *
     * @return {Object}
     * @public
     */
    id () {
      return _id++;
    }

    /**
     * @description
     * Creates new module instance
     * Appends unique module ID
     *
     * @param {Function} Module
     * @param {Object} props
     *
     * @return {Object}
     * @public
     */
    create (Module, props = {}) {
      return new Module({ id: _id++, ...props });
    }
  }

  return new $Factory();
})();

export { Factory as default, Factory }

