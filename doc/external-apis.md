# External APIs

Axe externalAPIs can be used to pass information to axe-core that it would be otherwise unable to obtain on its own (such as when it is running in an isolated JavaScript context of an extension). By default axe-core will try to gather the information if the external API for it is not set. If the external API is set axe-core will only rely on the passed in data and will not gather it itself.

```js
axe.externalAPIs({
  // Pass ElementInternal data to axe-core
  elementInternals() {
    return Promise.resolve(internalData);
  }
});
```

## axe.externalAPIs({ elementInternals })

`elementInternals` is a function that can be used to pass ElementInternal data for the elements on the page. It should return a Promise with the ElementInternal data array. The data inside the ElementInternal array must have the following properties:

```js
axe.externalAPIs({
  elementInternals() {
    return Promise.resolve([
      {
        // The CSS ancestry selector, which is either a string or an array of strings if the element is inside a ShadowDom tree. Generated using `axe.utils.getAncestry(node)`
        ancestry: 'html > body > main > my-custom-button',

        // Object of each ElementInternals property name and value. The properties must be serialized so some serialization work is needed for element reference properties (idref(s))
        internals: {
          // A simple String value
          role: 'button',

          // An idref value. The type will always be "HTMLElement" and the value is a CSS ancestry selector
          ariaActiveDescendantElement: {
            type: 'HTMLElement',
            value: 'html > body > main > my-custom-button > div:nth-child(1)'
          },

          // An idrefs value. The type will always be "NodeList" and the value is an array of CSS ancestry selectors for each node
          ariaLabelledbyElements: {
            type: 'NodeList',
            value: ['html > body > div:nth-child(4)']
          }
        }
      }
    ]);
  }
});
```

Axe-core provides a package script `gather-internals.js` that can be used to inject into the main context when working in an extension. The returned object from the script can be used directly as the returned value of the Promise for `elementInternals`.

```js
const internals = await chrome.scripting.executeScript({
  target: {
    tabId: tab.id
  },
  files: ['/node_modules/axe-core/gather-internals.js'],
  world: 'MAIN'
});
```

See [element-internals.md](element-internals.md) for more information on what ElementInternal properties are supported.

> [!Note]
> Support for ElementInternals is behind a feature flag `axe._enableElementInternals`, which must manually be set to `true` before axe runs, even when passing in `elementInternals` data.

## axe.externalAPIs({ elementInternalsTimeout })

Since gathering ElementInternals data is an async operation, you can configure how long axe-core will wait for `elementInternals` promise to resolve. By default the timeout is set to 1 second. If the timeout occurs axe-core will not run and will throw an error.
