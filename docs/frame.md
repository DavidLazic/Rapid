# Frame
### `Instance`
### `Class (constructor):` $Frame

## Contents

- [Description](#description)
- [Usage](#usage)
- [Methods](#methods)
- [Manual override](#manual-override)

## Description
In order to maximize performance, `Frame` is instantiated once, and is designed to work as subject in observer pattern.

By registering callbacks or `listeners`, a single `requestAnimationFrame` loop is created. Each frame render will trigger each of the listener functions, with next frame's id as a parameter, which can be used as a check flag inside a component.

> Too many listeners for a single frame render could result in a lower performance

Once started, rAF loop will continue on as long as *at least* one listener is subscribed.

To run listeners at 60 FPS consider doing a constant code profiling via DevTools.

## Usage

```js
import { Frame } from '@davidlazic/rapid';

Frame.subscribe(this.id, () => {
 // Render frame
});

Frame.unsubscribe(this.id);
```

## Methods

### `subscribe(id, listener)` &rarr; `{number}`

Subscribes a listener to `requestAnimationFrame` loop.

| Param    | Type       | Details |
| -------  |:-----------| ------- |
| id       | `*`        | Unique identifier.
| listener | `function` | Callback invoked on each frame render.

#### Returns
`{number}`  Next frame's id.

---

### `unsubscribe(id)` &rarr; `{void}`

Unsubscribes a listener by id from `requestAnimationFrame` loop.

| Param    | Type       | Details |
| -------  |:-----------| ------- |
| id       | `*`        | Unique listener identifier.

#### Returns
`{void}`

---

## Manual override

As mentioned before, too many listeners in a single rendering frame could induce performance issues. In a case like this, consider splitting listeners into multiple `Frame` instances by manually creating each and supplying each component with its own Frame.

```js
import { Components } from '@davidlazic/rapid';

// Manually create new frame instance
const frame = new Frame.constructor();

// Supply component with its own frame instance
new Components.Panel({ frame })
```

> Multiple `Frame` instances could induce higher memory usage

Also, consider extracting listener's heavy calculations to a [Rapid.WebWorker](web_worker.md).

