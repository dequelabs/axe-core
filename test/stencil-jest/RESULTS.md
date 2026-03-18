# Stencil + Jest + axe-core Diagnostic Results

## Test Summary

All 6 diagnostic tests **pass** (errors are caught and logged, not thrown):

| #   | Test                                         | axe.run() Outcome                |
| --- | -------------------------------------------- | -------------------------------- |
| 1   | Environment capabilities probe               | N/A (diagnostic only)            |
| 2   | Shadow component - axe.run on page.doc       | **CRASH** in `_getFlattenedTree` |
| 3   | Shadow component - axe.run on page.body      | **CRASH** in `_getFlattenedTree` |
| 4   | Scoped component - axe.run                   | **CRASH** in `_getFlattenedTree` |
| 5   | Nested components with slots                 | **CRASH** in `_getFlattenedTree` |
| 6   | Structure-only rules (layout rules disabled) | **CRASH** in `_getFlattenedTree` |

Every `axe.run()` invocation fails with the same error:

```
TypeError: Cannot read properties of undefined (reading '0')
    at _getFlattenedTree (axe.js:18414)
    at new Context (axe.js:18904)
    at Object.runRules [as _runRules] (axe.js:29024)
    at Object.run [as run] (axe.js:29292)
```

The crash occurs in `lib/core/utils/get-flattened-tree.js` during the tree-building phase, **before any rules execute**. This means no axe-core rule — whether layout-dependent or structure-only — can run in Stencil's Jest environment.

---

## Root Cause

The error traces to `_getFlattenedTree`, which recursively walks `node.childNodes` to build axe-core's virtual DOM tree. Stencil's mock DOM (`MockDocument` / `MockElement`) returns `childNodes` values that don't behave like standard `NodeList` objects. When `_getFlattenedTree` indexes into `childNodes[0]`, it gets `undefined` where it expects a `Node`, and the next property access (`undefined['0']` or `undefined.something`) throws.

This is **not** a shadow DOM issue per se — the crash happens on the very first recursive call into `document.documentElement`, before shadow root detection even begins. Both shadow (`shadow: true`) and scoped (`shadow: false`) components fail identically.

---

## Environment Capabilities: What Stencil's Mock DOM Provides

### Present (work correctly)

| API                               | Status                                           |
| --------------------------------- | ------------------------------------------------ |
| `window`                          | object                                           |
| `document`                        | object                                           |
| `window.Node`                     | function (constructor exists)                    |
| `window.NodeList`                 | function                                         |
| `window.HTMLElement`              | function                                         |
| `window.Element`                  | function                                         |
| `window.ShadowRoot`               | function                                         |
| `Element.prototype.attachShadow`  | function                                         |
| `document.documentElement`        | HTML element, nodeType=1                         |
| `document.body`                   | BODY element                                     |
| `window.innerWidth`               | 1366                                             |
| `window.innerHeight`              | 768                                              |
| `element.shadowRoot`              | works (returns ShadowRoot for shadow components) |
| `shadowRoot.childNodes`           | works (returns 5 child nodes)                    |
| `shadowRoot.innerHTML`            | works (returns 98 chars of HTML)                 |
| `element.getBoundingClientRect()` | exists but returns all zeros                     |

### Missing (undefined)

| API                           | Impact on axe-core                                               |
| ----------------------------- | ---------------------------------------------------------------- |
| `document.createTreeWalker`   | **Critical** — used by `createGrid()` for visual layout analysis |
| `document.createNodeIterator` | Used by some DOM traversal utilities                             |
| `document.elementsFromPoint`  | Used by overlap/obscured element detection                       |
| `document.elementFromPoint`   | Used by overlap/obscured element detection                       |
| `document.createRange`        | Used by text content measurement                                 |
| `window.getSelection`         | Used by focus/selection analysis                                 |
| `MutationObserver`            | Used by frame messaging and observation                          |
| `element.getClientRects()`    | Throws: "not a function"                                         |

### Present but broken (return undefined/zeros for all properties)

| API                                  | Return value                         | Impact                                 |
| ------------------------------------ | ------------------------------------ | -------------------------------------- |
| `getBoundingClientRect()`            | `{x:0, y:0, width:0, height:0, ...}` | All elements invisible to layout rules |
| `getComputedStyle().display`         | `undefined`                          | Cannot determine element visibility    |
| `getComputedStyle().visibility`      | `undefined`                          | Cannot determine element visibility    |
| `getComputedStyle().color`           | `undefined`                          | Color contrast checks impossible       |
| `getComputedStyle().backgroundColor` | `undefined`                          | Color contrast checks impossible       |
| `getComputedStyle().position`        | `undefined`                          | Stacking context analysis impossible   |
| `getComputedStyle().overflow`        | `undefined`                          | Overflow detection impossible          |
| `getComputedStyle().width`           | `undefined`                          | Size calculations impossible           |
| `getComputedStyle().height`          | `undefined`                          | Size calculations impossible           |
| `element.offsetWidth`                | `undefined`                          | Size calculations impossible           |
| `element.offsetHeight`               | `undefined`                          | Size calculations impossible           |
| `element.clientWidth`                | `undefined`                          | Size calculations impossible           |
| `element.clientHeight`               | `undefined`                          | Size calculations impossible           |
| `element.scrollWidth`                | `undefined`                          | Scroll detection impossible            |
| `element.scrollHeight`               | `undefined`                          | Scroll detection impossible            |

---

## DOM Structure Observations

### Shadow component (`shadow: true`)

Stencil's mock DOM serializes shadow roots as `<template shadowrootmode="open">`:

```html
<html>
  <head>
    <style data-styles>
      my-shadow-component {
        visibility: hidden;
      }
      .hydrated {
        visibility: inherit;
      }
    </style>
  </head>
  <body>
    <my-shadow-component>
      <template shadowrootmode="open">
        <h1>Hello Shadow</h1>
        <button>Click me</button>
        <img src="test.png" />
        <input type="text" />
        <slot></slot>
      </template>
    </my-shadow-component>
  </body>
</html>
```

The `element.shadowRoot` property **does** work and returns a ShadowRoot with the expected child nodes. However, axe-core never gets far enough to inspect it because `_getFlattenedTree` crashes on the root document traversal.

### Scoped component (`shadow: false`)

```html
<html>
  <head>
    <style data-styles>
      slot-fb {
        display: contents;
      }
      slot-fb[hidden] {
        display: none;
      }
      my-scoped-component {
        visibility: hidden;
      }
      .hydrated {
        visibility: inherit;
      }
    </style>
  </head>
  <body>
    <my-scoped-component>
      <!---->
      <h1>Hello Scoped</h1>
      <button>Click me</button>
      <img src="test.png" />
      <input type="text" />
    </my-scoped-component>
  </body>
</html>
```

No shadow root — content is directly in the light DOM. Still crashes in the same place.

### Nested component (shadow with slots)

```html
<my-nested-component>
  <template shadowrootmode="open">
    <div class="wrapper">
      <h2>Nested Parent</h2>
      <my-shadow-component>
        <template shadowrootmode="open">
          <h1>Hello Shadow</h1>
          <button>Click me</button>
          <img src="test.png" />
          <input type="text" />
          <slot></slot>
        </template>
        <p>Slotted content from parent</p>
      </my-shadow-component>
    </div>
  </template>
</my-nested-component>
```

Both inner and outer shadow roots are accessible via `.shadowRoot`. The slotted `<p>` content is correctly placed as a child of the inner `<my-shadow-component>`.

---

## Instrumentation Notes

### axe-core monkey-patching limitations

axe-core's `utils` and `commons.dom` properties are defined as getter-only (non-writable, non-configurable) on the module exports object. This means:

- Direct assignment (`axe.utils.getFlattenedTree = wrapper`) throws `TypeError: Cannot set property`
- `Object.defineProperty` with `configurable: true` throws `Cannot redefine property`
- Instrumentation can only be applied once; subsequent calls skip wrapping

This limits the depth of runtime instrumentation we can do from outside axe-core. To get deeper diagnostics (e.g., logging inside `_getFlattenedTree`'s recursion), the axe-core source would need to be modified directly or a custom build created.

---

## Conclusions

### 1. The blocker is `_getFlattenedTree`, not shadow DOM or layout

axe-core crashes before it can even begin rule evaluation. The `_getFlattenedTree` function in `lib/core/utils/get-flattened-tree.js` cannot traverse Stencil's `MockDocument` tree because `childNodes` doesn't behave like a standard `NodeList`.

### 2. Even if the tree crash were fixed, layout rules would all fail or return incomplete

Every layout API returns zeros or `undefined`. Rules that depend on:

- `getBoundingClientRect()` (target-size, focus-order, etc.)
- `getComputedStyle()` (color-contrast, hidden/visible detection, etc.)
- `getClientRects()` (inline element sizing)
- `document.createTreeWalker` (grid creation for overlap detection)

...would either throw errors or produce meaningless results.

### 3. Structure-only rules might work with a patched tree builder

If `_getFlattenedTree` were made resilient to mock DOM quirks (e.g., null-checking `childNodes` entries, handling non-standard `NodeList` implementations), then structural rules like `image-alt`, `label`, `button-name`, `html-lang`, etc. could potentially work since they only inspect DOM attributes and ARIA properties, not layout.

### 4. Shadow vs scoped makes no difference at this failure point

Both modes crash identically. The issue is fundamental to how Stencil's mock DOM implements `childNodes` on the `<html>` element, not how it handles shadow roots.

### 5. Possible paths forward

| Approach                                                                 | Effort | Coverage                     |
| ------------------------------------------------------------------------ | ------ | ---------------------------- |
| Patch `_getFlattenedTree` to handle mock DOM quirks                      | Medium | Structure-only rules         |
| Use Stencil's E2E testing (Puppeteer/Playwright) instead of spec testing | Low    | All rules (real browser)     |
| Create a jsdom adapter layer for Stencil's mock DOM                      | High   | Most rules except layout     |
| Run axe-core in a separate real-browser context and pass HTML            | Medium | All rules                    |
| Use axe-core's virtual rule API (`axe.runVirtualRule`)                   | Low    | Individual rule testing only |
