# Frame Messenger

Axe frameMessenger can be used to configure how axe-core communicates information between frames. By default, axe-core uses `window.postMessage()`. Since other scripts on the page may also use `window.postMessage`, axe-core's use of it can sometimes disrupt page functionality. This can be avoided by providing `axe.frameMessenger()` a way to communicate to frames that does not use `window.postMessage`. If reliable and secure frame communication is not possible, use [axe.runPartial and axe.finishRun instead](run-partial.md).

Tools like browser extensions and testing environments often have different channels through which information can be communicated. `axe.frameMessenger` must be set up in **every frame** axe-core is included.

```js
axe.frameMessenger({
  // Called to initialize message handling
  open(topicHandler) {
    // Map data from the bridge to topicHandler
    function subscriber(frameWin, data, response) {
      // Data deserializations / validation / etc. here
      topicHandler(data, response);
    }
    // Start listening for "axe-core" events
    const unsubscribe = bridge.subscribe('axe-core', subscriber);
    // Tell axe how to close the connection if it needs to
    return unsubscribe;
  },

  // Called when axe needs to send a message to another frame
  async post(frameWindow, data, replyHandler) {
    // Send a message to another frame for "axe-core"
    const replies = bridge.send(frameWindow, 'axe-core', data);
    // Async handling replies as they come back
    for await (let data of replies) {
      replyHandler(data);
    }
  }
});
```

## axe.frameMessenger({ open })

`open` is a function that should set up the communication channel with iframes. It is passed a `topicHandler` function, which must be called when a message is received from another frame.

The `topicHandler` function takes two arguments: the `data` object and a callback function that is called when the subscribed listener completes. The `data` object is exclusively passed data that can be serialized with `JSON.stringify()`, which depending on the system may need to be used.

The `open` function can `return` an optional `close` function. Axe-core will only ever have one frameMessenger open at a time. The `close` function is called when another frameMessenger is registered.

## axe.frameMessenger({ post })

`post` is a function that dictates how axe-core communicates with frames. It is passed three arguments: `frameWindow`, which is the frame's `contentWindow`, the `data` object, and a `replyHandler` that must be called when responses are received. To inform axe-core that no message was sent, return `false`. This informs axe-core not to await for the ping to time out.

Currently, axe-core will only require `replyHandler` to be called once, so promises can also be used here. This may change in the future, so it is preferable to make it possible for `replyHandler` to be called multiple times. Some axe-core [plugins](plugins.md) may rely on this feature.

A second frameMessenger feature available to plugins, but not used in axe-core by default is to reply to a reply. This works by passing `replyHandler` a `responder` callback as a second argument. This requires a different setup in which callbacks are stored based on their `channelId` property.

```js
// store handlers based on channelId
const channels = {};

axe.frameMessenger({
  post(frameWindow, data, replyHandler) {
    // Store the handler so it can be called later
    channels[data.channelId] = replyHandler;
    // Send a message to the frame
    bridge.send(frameWindow, data);
  },

  open(topicHandler) {
    function subscriber(frameWin, data) {
      const { channelId, message, keepalive } = data;
      // Create a callback to invoke on a reply.
      const responder = createResponder(frameWin, channelId);

      // If there is a topic, pass it to the axe supplied topic-handler
      if (data.topic) {
        topicHandler(data, responder);

        // If there is a replyHandler stored, invoke it
      } else if (channels[channelId]) {
        const replyHandler = channels[channelId];
        replyHandler(message, keepalive, responder);

        // Clean up replyHandler, as no further messages are expected
        if (!keepalive) delete channels[channelId];
      }
    }

    // Start listening for "axe-core" events
    const unsubscribe = bridge.subscribe('axe-core', subscriber);
    // Tell axe how to close the connection if it needs to
    return unsubscribe;
  }
});

// Return a function to be called when a reply is received
function createResponder(frameWin, channelId) {
  return function responder(message, keepalive, replyHandler) {
    // Store the new reply handler, possibly replacing a previous one
    //   to avoid receiving a message twice.
    channels[channelId] = replyHandler;
    // Send a message to the frame
    bridge.send(frameWin, { channelId, message, keepalive });
  };
}
```

## Error handling & Timeouts

If for some reason the frameMessenger fails to open, post, or close you should not throw an error. Axe-core will handle missing results by reporting them in the `frame-tested` rule. It should not be possible for the `topicHandler` and `replyHandler` callbacks to throw an error. If this happens, please file an issue.

Axe-core has a built-in timeout mechanism, which pings frames to see if they respond before instructing them to run. There is no retry behavior in axe-core, which assumes that whatever channel is used is stable. If this isn't the case, this will need to be built into frameMessenger.

The `message` passed to responder may be an `Error`. If axe-core passes an `Error`, this should be propagated "as is". If this is not possible because the message needs to be serialized, a new `Error` object must be constructed as part of deserialization.

### pingWaitTime

When axe-core tests frames, it first sends a ping to that frame, to check that the frame has a compatible version of axe-core in it that can respond to the message. If it gets no response, that frame will be skipped in the test. Axe-core does this to avoid a situation where it waits the full frame timeout, just to find out the frame didn't have axe-core in it in the first place.

In situations where communication between frames can be slow, it may be necessary to increase the ping timeout. This can be done with the `pingWaitTime` option. By default, this is 500ms. This can be configured in the following way:

```js
const results = await axe.run(context, { pingWaitTime: 1000 });
```

It is possible to skip this ping altogether by setting `pingWaitTime` to `0`. This can slightly speed up performance, but should only be used when long wait times for unresponsive frames are avoided. Axe-core handles timeout errors the same way it handles any other frame communication errors. Therefore if a custom frame messenger has a timeout, it can inform axe by calling `replyHandler` with an `Error` object.
