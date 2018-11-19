import { Scroller } from './Scroll.scroller';
import { Factory } from '../helpers/Factory';

class Scroll {

  Scroller (props) {
    return Factory.createInstance(Scroller, props);
  }
}

export default new Scroll();
