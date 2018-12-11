# Frame
### `Singleton`

## Description
In order to maximize performance, `Frame` is instantiated as a singleton class object, and is designed to work based on a pub-sub pattern.

By registering callbacks or `listeners`, a single `requestAnimationFrame` loop is created. Each frame render will trigger each of the listener functions, with next frame's ID as a parameter, which can be used as a check flag inside a component.

> Too many listeners inside a single frame render could result in a lower performance

Once started, rAF loop will continue on as long as at least one listener is subscribed.

To run listeners at 60 FPS consider doing a constant code profiling via DevTools.

## Import

## Optimization
- Manually instantiate a second Frame instance
- Extract heavy code to a [Web Worker](web_worker.md)

> Multiple `Frame` instances could induce higher memory usage

## Usage

Frame.register(id, callback)<br>
Frame.unregister(id)

API: 
register
unregister

Static props:
requestAnimationFrame
cancelAnimationFrame
