# Web Worker

## Contents

- [Description](#description)

## Description

Use a web worker to offload calculations off the main thread. Web worker uses CPU processing, so resulting optimizations may vary from case to case.


Create your worker file
```js
// test-worker.js

export default function TestWorker () {

  /**
   * To define custom methods in a worker, bind them to `self` context
   */
  self.testMethod = () => {}

  self.onmessage = evt => {
    // Read props from the main thread from evt.data 
    console.log(evt.data);
    
    // Post props to the main thread
    self.postMessage({});
  }
}
```
