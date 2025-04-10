# Axe Testing Context

Axe-core's `context` argument is a powerful tool for controlling precisely which elements are tested and which are ignored. The context lets you do many things, including:

1. [Test specific elements](#test-specific-elements)
1. [Test DOM nodes](#test-dom-nodes)
1. [Exclude Elements from Test](#exclude-elements-from-test)
1. [Select from prior tests](#select-from-prior-tests)
1. [Limit frame testing](#limit-frame-testing)
1. [Limit shadow DOM testing](#limit-shadow-dom-testing)
1. [Combine Shadow DOM and Frame Context](#combine-shadow-dom-and-frame-context)
1. [Implicit frame and shadow DOM selection](#implicit-frame-and-shadow-dom-selection)

## Test Specific Elements

When passed a CSS selector or array of CSS selectors, axe will test only the elements that match those selectors, along with any content inside those elements:

```js
// Test every <nav> and <main> element, and everything inside them:
await axe.run('nav, main');
// Test every <nav> element, every element with the sideBar class,
// and the element with the #header ID, along with all their content:
await axe.run(['nav', '.sideBar', '#header']);
```

**Tip**: Sometimes, pages are worked on by multiple teams. If you mark your team's sections up with a unique class, axe can use that class to only test the sections your team works on.

Axe-core is commonly used through browser driver APIs such as Selenium, Puppeteer, and Playwright. Most of these APIs do not pass a context object in directly. Instead, the following is achieved through the `.include()` method. Visit the docs of your API for more information. For most cases, this will look like the following:

```js
const axe = new AxeBuilder({ page });
// Test every <nav> and <main> element, and everything inside them:
axe.include('nav, main');
```

## Test DOM Nodes

Axe can accept native DOM elements for testing. These must be attached to the DOM tree first. Testing DOM elements is useful in test environments such as Karma and Jest. The following example shows axe testing DOM elements:

```js
// Test a single DOM node
const img = document.createElement('img');
document.body.appendChild(img);
await axe.run(img);

// Test a Node list:
const nodes = document.querySelector('main, header');
await axe.run(nodes);

// Test an array of nodes:
const navbar = document.getElementById('navbar');
const cookiePopup = document.getElementById('cookie-popup');
await axe.run([navbar, cookiePopup]);
```

### Component Frameworks

Because axe requires a DOM to test, components such as those created for React, Vue, and Angular must be rendered before they are tested. The following example shows how to render the `<MyApp>` React component before testing it with axe:

```jsx
const appRoot = document.getElementById('app');
ReactDOM.createRoot(appRoot).render(MyApp);
await axe.run(appRoot);
```

**Important**: Component testing libraries like [Enzyme](https://enzymejs.github.io/enzyme/) include both a `render` and `shallow` method. Because axe requires a complete render, attached to the DOM tree, it is unable to test components built with `shallow` methods.

## Exclude Elements from Test

There are often areas of a page that as a developer you have no control over. You can tell axe to skip such elements in the test by using an object with the `exclude` property. The `exclude` property accepts all the same properties used before, including CSS selectors and DOM nodes:

```js
// Test everything except the ad banners:
await axe.run({ exclude: '.ad-banner' });

// Test everything except these DOM nodes:
const youtubeVids = document.querySelector('iframe[src^="youtube.com"]');
await axe.run({ exclude: youtubeVids });
```

When using an axe API such as axe-core/playwright, you must use the AxeBuilder's `.exclude` method to exclude elements from the test. See the docs of your API for details:

```js
const axe = new AxeBuilder({ page });
// Test everything except the ad banner and YouTube frames:
axe.exclude('.ad-banner, iframe[src^="youtube.com"]');
```

### The `include` Property

When axe is passed a CSS selector or an array of DOM nodes, this is treated as an implicit `include`. All examples from [Test specific elements](#test-specific-elements) and [Test DOM nodes](#test-dom-nodes) use this implicit `include`. All of these could be rewritten using an object with the `include` property. The following examples function identically:

```js
await axe.run('main'); // is the same as:
await axe.run({ include: 'main' });
```

When axe isn't passed an `include` (explicit or not), it uses `document` instead:

```js
await axe.run({ exclude: '.ad-banner' }); // is the same as:
await axe.run({
  include: document,
  exclude: '.ad-banner'
});
```

### Combine `exclude` with `include`

To test specific sections of the page while skipping parts within that section, you can pass an object with `include` and `exclude` properties. `include` tells axe what elements to test, and `exclude` tells axe to skip certain included sections. The following shows how to test the `main` and `footer` elements in a page, except for any `.ad-banner` element:

```js
await axe.run({
  include: ['main', 'footer'],
  exclude: '.ad-banner'
});
```

**Note**: When an element is both included and excluded, the selector that matches the nearest ancestor takes priority. I.e. if a node's grandparent is included, but the parent is excluded, then the node is excluded. If the node's grandparent is excluded, but its parent is included, the node is included.

## Select From Prior Tests

It is possible to `include` or `exclude` nodes from prior tests. This lets you either skip those issues, or repeat a test while you are working on a solution. This can be done using the `target` property from an axe result:

```js
// Grab the target property from all color-contrast violations:
const violation = priorResult.violations.find(
  ({ id }) => id === 'color-contrast'
);
const targets = violation.nodes.map(issue => issue.target);
// Run axe, only testing the prior color-contrast violations
await axe.run(targets);

// Or, to exclude those nodes from the test:
await axe.run({ exclude: targets });
```

**Important**: It is not possible to pass a single `target` property to axe. This must be wrapped in an array. This is because axe-core's `target` property is itself an array. See [Implicit Frame And Shadow DOM Selection](#implicit-frame-and-shadow-dom-selection) for details.

## Limit Frame Testing

Including or excluding specific sections within a frame can be done with a `fromFrames` selector object. This property takes an array of selectors: the first to select the frame element(s) and the last to select the element(s) to include or exclude. The following shows how to test all `form` elements a `#paymentFrame` frame or iframe:

```js
// Test each <form> inside each #paymentFrame frame or iframe:
axe.run({ fromFrames: ['#paymentFrame', 'form'] });
```

To select elements in nested frames, axe will need a selector for each level of nesting. Because axe tests frames recursively, this can be any number of levels deep. The following shows how to test the `form`, inside an `#inner`, inside an `#outer` iframe:

```js
// Test <form> inside, #inner, inside #outer:
axe.run({ fromFrames: ['iframe#outer', 'iframe#inner', 'form'] });
```

The `fromFrames` object can be used as part of an `exclude` or `include` property. It can be by itself or as part of an array along with other selectors. The following example shows how to exclude all `.ad-banner` elements on the top window, as well as any that are part of the first level of iframes:

```js
// Skip any .ad-banner, as well as any .ad-banner inside iframes:
axe.run({
  exclude: [
    '.ad-banner',
    {
      fromFrames: ['iframe', '.ad-banner']
    }
  ]
});
```

The `fromFrames` selector object can be used on both the `include` and `exclude` property. The following shows how to test the `form` inside the `#payment` iframe, except for the `.ad-banner` in that `form`:

```js
axe.run({
  include: {
    fromFrames: ['iframe#payment', 'form']
  },
  exclude: {
    fromFrames: ['iframe#payment', 'form > .ad-banner']
  }
});
```

**Note**: The `fromFrames` property cannot be used on the same object as `include` and `exclude`.

## Limit Shadow DOM Testing

Including or excluding specific sections of a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) tree can be done with a `fromShadowDom` selector object. This works similar to the [`fromFrames` selector](#limit-frame-testing). The `fromShadowDom` property takes an array of strings: the first to select the shadow DOM host element(s) and the last to select the element(s) to include or exclude. The following example shows how to test the `#search` form inside the shadow DOM tree attached to the `.app-header` element:

```js
// Test each search form inside each <app-header> shadow DOM tree.
axe.run({ fromShadowDom: ['.app-header', 'form#search'] });
```

To select elements in nested shadow DOM trees, axe will need a selector for each level of nesting. The following shows how to test the `#search` element inside the `.header` element's Shadow DOM tree, inside the `app-root` custom element's shadow DOM tree:

```js
// Test #search, inside each .header, inside each <app-root>
axe.run({ fromShadowDom: ['app-root', '.header', '#search'] });
```

The `fromShadowDom` selector object can also be used as part of an `exclude` or `include` property. It can be by itself, or part of an array along with other selectors. The following example shows how to exclude all `.comment` elements inside the `<blog-comments>` custom element, as well as excluding the `footer` element:

```js
// Skip footer, as well as any .comment element inside the shadow DOM tree of <blog-comments>
axe.run({
  exclude: [
    'footer',
    {
      fromShadowDom: ['blog-comments', '.comment']
    }
  ]
});
```

The `fromShadowDom` selector object can be used on both the `include` and `exclude` property. The following shows how to test the `<app-footer>` custom component, inside the shadow DOM of the `#root` element, but to exclude any `.ad-banner` inside the `<app-footer>`'s shadow DOM tree:

```js
axe.run({
  include: {
    fromShadowDom: ['#root', 'app-footer']
  },
  exclude: {
    fromShadowDom: ['#root', 'app-footer', '.ad-banner']
  }
});
```

**Note**: The `fromShadowDom` property cannot be used on the same object as `include` and `exclude`.

### Slotted Elements

Axe uses the flattened DOM tree to determine whether an element is included or excluded. Because of this when a shadow DOM node is selected, all descendants inserted through the [`<slot />` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Slot) are also selected.

## Combine Shadow DOM and Frame Context

To select frames inside shadow DOM trees or shadow DOM trees inside frames, it is possible to use [`fromShadowDom`](#limit-shadow-dom-testing) as a selector in the [`fromFrames`](#limit-frame-testing) selector object. The following example shows how to test the `main` element, inside each `iframe` that is part of the shadow DOM tree of `#appRoot`:

```js
await axe.run({
  fromFrames: [
    {
      fromShadowDom: ['#appRoot', 'iframe']
    },
    'main'
  ]
});
```

These selectors can also be used on `include` or `exclude`. The following shows how to exclude the `footer`, as well as any `.commentBody` elements in the `#userComments` shadow DOM tree, inside the `#blog-comments` iframe:

```js
await axe.run({
  exclude: [
    'footer',
    {
      fromFrames: [
        'iframe#blog-comments',
        {
          fromShadowDom: ['#userComments', '.commentBody']
        }
      ]
    }
  ]
});
```

**Note**: Even though the iframe is inside the shadow DOM tree, the `fromShadowDom` selector object must be part of the `fromFrames` selector. Doing the reverse does not work and will cause an error.

## Implicit Frame and Shadow DOM Selection

In earlier versions of axe, using nested arrays was the only way to include or exclude elements inside iframes. These are still supported in axe and is how axe works internally. This nested array syntax is used in the `target` property. For example, the following is a possible selector for a `.commentBody` element, in the shadow DOM tree of `#userComments`, inside the `#blog-comments` iframe:

```js
result = await axe.run();
result.violations[0].nodes[0].target; // ['#blog-comments', ['#userComments', '.commentBody']]
```

To pass a `target` property into axe, it must be wrapped in another array. This creates three nested arrays: the outer array to allow multiple selectors, the middle array to select into frames, and the inner array, which is optional, to select elements inside shadow DOM trees.

While this syntax continues to be supported, it is recommended to avoid it and to use the [fromFrames](#limit-frame-testing) and [fromShadowDom](#limit-shadow-dom-testing) object selectors instead since these are clearer and don't need to be wrapped in otherwise empty arrays.
