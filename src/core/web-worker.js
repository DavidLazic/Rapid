/**
 * Copyright 2018 David Lazic. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @description
 * Creates WebWorker instance
 * Converts Web Worker to a Blob
 *
 * @constructor
 */
class WebWorker {

  constructor (worker) {
    let code = worker.toString();
    code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

    const blob = new Blob([code], { type: 'application/javascript' });
    return new Worker(window.URL.createObjectURL(blob));
  }
}

export { WebWorker as default, WebWorker };
