/**
 * Copyright 2018 David Lazic. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Tracks unique IDs
 * for pub-sub / observer pattern purposes
 */
const uuid = (() => {

  let _id = 0;

  /**
   * @description
   * Get UUID
   *
   * @return {Number}
   * @public
   */
  return function () {
    return `${_id++}__${(new Date().valueOf().toString())}`;
  };

})();

export { uuid as default, uuid }

