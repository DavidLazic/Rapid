export default function Worker () {

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

  self.onmessage = evt => {
    const normalized = self.normalizeOffset(evt.data);

    const distance = normalized - evt.data.rendered;
    self.postMessage({
      normalized,
      position: Number.parseFloat((normalized - (distance * evt.data.damping)).toFixed(2))
    });
  }
}
