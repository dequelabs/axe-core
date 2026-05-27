# ElementInternals

Axe-core supports CustomElements with attached ElementInternals or ARIA Properties. However, JavaScript does not provide an API for accessing ElementInternals information on a node so axe-core must rely on developers implementing a [community protocol](https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/element-internals-declaration.md) on their CustomElements in order to find this information.

> [!Note]
> At this time, axe-core only supports the ElementInternals `role` property and no others (e.g. `ariaLabel`), though support for other properties is planned. Additionally axe-core will not validate the value of the ElementInternals `role`, and many rules will not run against the element (e.g. `aria-required-attr`). Rules that do run may only be partially supported (e.g. `aria-required-children`).
>
> Lastly, support for ElementInternals is behind a feature flag `axe._enableElementInternals`, which must manually be set to `true` before axe runs.

```js
CustomElements.define(
  'my-custom-button',
  class MyCustomButton extends HTMLElement {
    constructor() {
      super();

      const internals = this.attachInternals();
      internals.role = 'button';

      globalThis._elementInternals ??= new WeakMap();
      globalThis._elementInternals.set(this, internals);
    }
  }
);
```

In addition to the global WeakMap `globalThis._elementInternals`, axe-core also supports the following public properties or Symbols on the CustomElement:

- `_internals`
- `internals`
- `internals_`
- `Symbol('internals')`
- `Symbol('privateInternals')`

```js
CustomElements.define(
  'my-custom-button',
  class MyCustomButton extends HTMLElement {
    constructor() {
      super();

      this._internals = this.attachInternals();
      this._internals.role = 'button';
    }
  }
);
```
