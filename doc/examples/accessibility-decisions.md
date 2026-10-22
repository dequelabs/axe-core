# Accessibility Decisions

Read this before writing a new rule, or before changing anything that can alter what axe reports as passed, failed or incomplete (a rule, check, matcher or selector, `standards/` data, or a commons function such as roles, accessible names or visibility), or a rule's impact or WCAG mapping. Record the outcome in the PR template's "Accessibility behavior" section.

- **Accessibility supported:** Follow the decision order in [How we make decisions on rules](../accessibility-supported.md). When browsers and assistive technologies all agree against the spec, match them and link the upstream issue. Complex table markup is the exception: axe follows the spec there even where screen readers mishandle it.
- **Evidence:** Support claims come from testing in real browsers and assistive technologies. Spec text, unit-test output and support tables aren't enough. You can't observe assistive technology behavior, so list what you're unsure of as open questions for the maintainers rather than deciding it.
- **Fail vs. incomplete:** Report a violation when axe can determine a real problem, including a pattern that fails in a tested assistive technology, harms users there, and has no fallback axe can detect. Return `undefined` (needs review) when a person has to judge, such as a visible label axe can't confirm.
- **False positives:** When an approach trades a false positive against a false negative, prefer the false negative.
- **New failures:** Say in the PR when the change will report new failures on pages that passed before, so maintainers can choose between `feat` and `fix`.
- **Departures:** Explain any deliberate departure from the spec or an ACT rule example in the code or PR, with the upstream issue linked.
