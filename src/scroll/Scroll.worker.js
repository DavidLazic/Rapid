export default function ScrollWorker () {

  normalizeOffset = ({ offset, ch, vh }) => {

    switch (true) {
      case (offset < 0): {
        return 0;
      }

      case (offset > ch - vh): {
        return ch - vh
      }

      default: {
        return offset
      }
    }
  }

  getPosition = ({ offset, rendered, damping }) => {
    const distance = offset - rendered;
    return Number.parseFloat((offset - (distance * damping)).toFixed(2));
  }

  onmessage = evt => {
    const {
      frame,
      offset,
      ch,
      vh,
      damping,
      rendered
    } = evt.data;

    const position = self.getPosition({
      offset: self.normalizeOffset({ offset, ch, vh }),
      rendered,
      damping
    });

    self.postMessage({
      frame,
      position
    });
  };
}
