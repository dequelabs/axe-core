# axe runPartial / finishRun

`axe.runPartial` and `axe.finishRun` are two methods which allow axe to test a page in two stages. This is different from `axe.run()`, in that `axe.runPartial` and `axe.finishRun` do not require communication between frames. This can be useful when frame communication is not possible or not secure. See [axe.frameMessenger](frame-messenger.md) for information on frame communication.

To use these methods, call `axe.runPartial()` in the top window, and in all nested frames and iframes. The results are put into an array, and then passed to `axe.finishRun()`. `axe.finishRun()` then completes the test and generates the axe report.

This results in code that looks something like the following. The `context` and `options` arguments used are the same as would be passed to `axe.run`. See [API.md](api.md) for details.

```js
const partialResults = await Promise.all(runPartialRecursive(context, options));
const axeResults = await axe.finishRun(partialResults, options);
```

**note**: The code in this page uses native DOM methods. This will only work on frames with the same origin. Scripts do not have access to `contentWindow` of cross-origin frames. Use of `runPartial` and `finishRun` in browser drivers like Selenium and Puppeteer works in the same way.

**note**: Because `axe.runPartial()` is designed to be serialized, it will not return element references even if the `elementRef` option is set.

## axe.runPartial(context, options): Promise<PartialResult>

When using `axe.runPartial()` it is important to keep in mind that the `context` may be different for different frames. For example, `context` can be done in such a way that in frame A, `main` is excluded, and in frame B `footer` is. The `axe.utils.getFrameContexts` method will provide a list of frames that must be tested, and what context to test it with.

```js
function runPartialRecursive(context, options = {}, win = window) {
  const { axe, document } = win;
  // Find all frames in context, and determine what context object to use in that frame
  const frameContexts = axe.utils.getFrameContexts(context, options);
  // Run the current context, in the current window.
  const promiseResults = [axe.runPartial(context, options)];

  // Loop over all frames in context
  frameContexts.forEach(({ frameSelector, frameContext }) => {
    // Find the window of the frame
    const frame = axe.utils.shadowSelect(frameSelector);
    const frameWin = frame.contentWindow;
    // Call axe.runPartial() in the frame, and its child frame
    const frameResults = runPartialRecursive(frameContext, options, frameWin);
    promiseResults.push(...frameResults);
  });
  return promiseResults;
}
```

**important**: The order in which these methods are called matters for performance. Internally, axe-core constructs a flattened tree when `axe.utils.getFrameContexts` is called. This is fairly slow, and so should not happen more than once per frame. When `axe.runPartial` is called, that tree will be used if it still exists. Since this tree can get out of sync with the actual DOM, it is important to call `axe.runPartial` immediately after `axe.utils.getFrameContexts`.

To run efficiently, axe.runPartial calls should happen in parallel, so that, when possible, browsers can test multiple frames simultaneously.

## axe.finishRun(partialResults, options): Promise<AxeResults>

The `axe.finishRun` method does two things: It calls the `after` methods of checks that have them, and it creates the final report. For `axe.finishRun` to work, the order in which the partial results are passed to it is important. Starting from the top window, partial results must include child frame content before sibling frames. For example:

```js
// Given the following frame structure:
// top
// - frame_1
//   - frame_1a
// - frame_2
// The partial results are passed in the following order:
axe.finishRun([top, frame_1, frame_1a, frame_2]);
```

If for some reason `axe.runPartial` fails to run, the integration API **must** include `null` in the data in place of the results object, so that axe-core knows to skip over it. If a frame fails to run, results from any descending frames **must be omitted**. To illustrate this, consider the following:

```js
// Given the following frame structure:
// top
// - frame_1
//   - frame_1a
// - frame_2

// If axe.runPartial throws an error, the results must be passed to finishRun like this:
axe.finishRun([top, null, /* nothing for frame 1a, */ frame_2]);
```

**important**: Since `axe.finishRun` may have access to cross-origin information, it should only be called in an environment that is known not to have third-party scripts. When using a browser driver, this can for example by done in a blank page.

## axe.utils.getFrameContexts(context, options): FrameContext[]

The `axe.utils.getFrameContexts` method takes any valid context, and returns an array of objects. Each object represents a frame that is in the context. The object has the following properties:

- `frameSelector`: This is a CSS selector, or array of CSS selectors in case of nodes in a shadow DOM tree to locate the frame element to be tested.
- `frameContext`: This is an object is a context object that should be tested in the particular frame.

The `options` object takes the same RunOptions object that axe.run accepts. When the `iframes` property is `false`, it returns an empty array.

## Custom Rulesets and Reporters

Because `axe.finishRun` does not run inside the page, the `reporter` and `after` methods do not have access to the top-level `window` and `document` objects, and might not have access to common browser APIs. Axe-core reporters use the `environmentData` property that is set on the partialResult object of the initiator.

Because of this constraint, custom reporters, and custom rulesets that add `after` methods must not rely on browser APIs or globals. Any data needed for either should either be taken from the `environmentData` property, or collected in an `evaluate` method of a check, and stored using its `.data()` method.

## Recommendations

When building integrations with browser drivers using axe-core, it is safer and more stable to use `axe.runPartial` and `axe.finishRun` then to use `axe.run`. These two methods ensure that no information from one frame is ever handed off to another. That way if any script in a frame interferes with the `axe` object, or with `window.postMessage`, other frames will not be affected.

Because `axe.runPartial` does not require frame communication, it can run in any frame, regardless of its origin. This is different from `axe.run()`, which is limited by `axe.configure({ allowedOrigins })`.
