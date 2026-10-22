# Back-Compat and Output Stability

Read this before renaming, removing or re-signing an export in `lib/commons/` or `lib/core/utils/` (public as `axe.commons` and `axe.utils`), or changing anything else on `axe`, its options, a result field, selector output, a rule ID, a tag, a default, the standards object, a type in `axe.d.ts`, or a supported platform. Downstream tools track issues across axe-core versions by page and state, rule ID and selector (see "Tracking Issues Over Time" in [Backwards Compatibility](../backwards-compatibility-doc.md)).

- **Breaking changes:** Avoid them. Support old and new formats side by side. If unavoidable, add `BREAKING CHANGE: description` to the commit footer, include a migration guide in `CHANGELOG.md`, and tag deprecated code with `@deprecated`.
- **Public functions:** Treat every function on `axe`, including `axe.utils` and `axe.commons`, as public, even beyond what the backwards compatibility doc guarantees. A rename adds the new function and keeps the old one as a deprecated wrapper. Underscore-prefixed internals such as `axe._tree` are exempt.
- **API docs and types:** An API change updates [API](../API.md) and `axe.d.ts`. A new field on a public object, such as the standards object, updates [standards object](../standards-object.md) or [API](../API.md) in the same PR.
- **Types:** New fields on an exported interface in `axe.d.ts` are optional, so typed consumers that build those objects still compile. Where a function always returns the field, narrow its return type instead, as `getRules()` does.
- **Selectors, rule IDs and tags:** Don't change selector output for an unchanged page. Raise any rule ID or tag removal, or a rule split, on an issue first. Ship a new algorithm as an opt-in beside the old one, with versioned names, as the `v1` and `v2` reporters do.
- **New failures:** See [Accessibility Decisions](./accessibility-decisions.md).
- **Defaults:** Experimental rules stay off without an explicit opt-in, and WCAG 2.2-only rules stay off by default. Platform breaks, such as dropping IE11, wait for a major version.
