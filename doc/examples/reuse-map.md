# Reuse Map

Search `lib/` for an existing implementation before writing a new helper. Most review comments asking for a rewrite point at a helper that already exists.

| Task                                         | Use                                                                                                                                                                                                               | Instead of                                       |
| :------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------- |
| Select a rule's candidate nodes              | `rule.gather()` (`lib/core/base/rule.js`)                                                                                                                                                                         | A copy of the rule's select code                 |
| Read a computed style                        | `vNode.getComputedStylePropertyValue()`, which is cached                                                                                                                                                          | `window.getComputedStyle()` per node             |
| Resolve an ambiguous node input              | `nodeLookup()` (`lib/core/utils/node-lookup.js`)                                                                                                                                                                  | Type checks on the argument                      |
| Get a role                                   | `getRole()`, or `getExplicitRole()` for the `role` attribute only (`lib/commons/aria/`)                                                                                                                           | Reading the `role` attribute directly            |
| Check visibility                             | `isVisibleOnScreen()`, `isVisibleToScreenReaders()` (`lib/commons/dom/`)                                                                                                                                          | CSS `display`/`visibility` checks alone          |
| Resolve idrefs                               | `getResolvedRefs()` (`lib/commons/dom/get-resolved-refs.js`)                                                                                                                                                      | Splitting the attribute and looking up each id   |
| Find the stacking context for color          | `getStackingContext()` (`lib/commons/color/stacking-context.js`)                                                                                                                                                  | A new stacking-context walk                      |
| Treat an element as presentational           | The `presentational-role` check (`lib/checks/shared/`)                                                                                                                                                            | A per-rule role list                             |
| Test containment across shadow DOM           | `contains(vNode, otherVNode)` (`lib/core/utils/contains.js`)                                                                                                                                                      | `node.contains()`, which fails across shadow DOM |
| Read attributes                              | `vNode.attr()`, `vNode.hasAttr()`, `vNode.attrNames`; where no Virtual Node exists, `getNodeAttributes()` (`lib/core/utils/get-node-attributes.js`), marked deprecated but still the way to read attributes there | `node.attributes`                                |
| Change configuration from `lib/core/public/` | Import `configure` (`lib/core/public/configure.js`)                                                                                                                                                               | Calling `axe.configure()` through the global     |

## Standards and Spec Logic

- Record attribute behavior, such as case sensitivity, once in `lib/standards` rather than adding an option to a helper like `getAriaValue()`.
- Extend the existing `matches` mechanism (`lib/commons/matches/`) for spec conditions instead of writing a one-off matcher.

## Test Utilities

`test/testutils.js` provides `queryFixture` (use it with declarative shadow DOM), `getCheckEvaluate`, `MockCheckContext` and the `html` template tag. See `doc/examples/test-patterns.md`.
