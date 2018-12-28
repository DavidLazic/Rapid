import { DOM } from './core/dom';
import { Frame } from './core/frame';
import { uuid } from './core/uuid';
import { WebWorker } from './core/web-worker';
import { Element } from './core/element';

import Helpers from './helpers/index';
import Components from './components/index';

const R = {
  ...DOM
};

export {
  R as default,
  DOM,
  Frame,
  WebWorker,
  Element,
  uuid,
  Components,
  Helpers
};
