/**
 * Copyright 2018 David Lazic. All rights reserved.
 * Licensed under the MIT License.
 */


import { Element } from './element';

/**
 * @description
 * Creates $DOM instance
 *
 * @constructor
 * @extends Singleton
 */
const DOM = (document => ({

    /**
     * @description
     * Returns element by ID
     *
     * @param {String} name
     * @param {Object} scope
     *
     * @return {Object<DOM>}
     * @public
     */
    id (name, scope = document) {
      return scope.getElementById(name);
    },

    /**
     * @description
     * Returns elements by class name
     *
     * @param {String} name
     * @param {Object} scope
     *
     * @return {Array<DOM>}
     * @public
     */
    class (name, scope = document) {
      return Array
        .from(scope.getElementsByClassName(name))
        .map(scope => new Element({ scope }));
    }
  })
)(document);

export { DOM as default, DOM };
