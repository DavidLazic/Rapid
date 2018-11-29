import { Factory } from '../factory';
import Panel from './panel';
import Element from './element';

export default {

  Panel (props) {
    return Factory.create(Panel, props);
  },

  Element (props) {
    return Factory.create(Element, props);
  }
}
