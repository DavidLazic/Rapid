import { Factory } from '../Factory';
import Panel from './Panel';
import Element from './Element';

export default {

  Panel (props) {
    return Factory.createInstance(Panel, props);
  },

  Element (props) {
    return Factory.createInstance(Element, props);
  }
}
