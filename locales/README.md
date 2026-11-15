# Localizations

We welcome any localization for axe-core. For details on how to contribute, see the [Contributing section](../README.md#contributing) of the main README. For details on the message syntax, see [Check Message Template](../doc/check-message-template.md).

## Review requirement

We only accept a new locale, or a substantial rewrite of an existing one, once it has been thoroughly reviewed by a native speaker who works in accessibility in a country where that language is spoken. Accessibility terminology is very specific, and machine and AI translations often miss the terms local practitioners actually use.

Using AI or machine translation to produce a first draft is fine. The review is what matters:

- **The reviewer reads every string against the English source and checks the terminology.** Expect this to take 4–6 hours. A skim isn't enough.
- **Key terms match local usage**, such as accessible name, landmark and focusable. Where there is an official WCAG translation in that language, use its terms.
- **The reviewer comments on the pull request themselves.** They confirm they reviewed all of it and include a link that shows their accessibility work, such as a LinkedIn profile or an organisation page.

We can't find reviewers for you. If you open a pull request before the review is done, tell us who will review it and roughly when. Pull requests that don't respond within a week will be closed. You're welcome to reopen once the review is done.

To create a new translation for axe, start by running `pnpm run translate -- --lang=<langcode>`. This will create a JSON file with the default English text in it for you to translate. Alternatively, you could copy `_template.json`.

To update an existing translation file, re-run `pnpm run translate -- --lang=<langcode>`. This will add new messages used in English and remove messages that are no longer used in English.

`_template.json` is a generated file which is created every time axe is built. It's compiled using each rule's `description` and `help` properties, as well as each check's `metadata.messages` property. To update the `_template.json` file you'll need to update the corresponding [rule](../lib/rules) or [check](../lib/checks) metadata file and rebuild.
