# axe-core

[![Greenkeeper badge](https://badges.greenkeeper.io/dequelabs/axe-core.svg)](https://greenkeeper.io/)

[![License](https://img.shields.io/npm/l/axe-core.svg)](LICENSE)
[![Version](https://img.shields.io/npm/v/axe-core.svg)](https://www.npmjs.com/package/axe-core)
[![Total npm downloads](https://img.shields.io/npm/dt/axe-core.svg)](https://www.npmjs.com/package/axe-core)
[![Commits](https://img.shields.io/github/commit-activity/y/dequelabs/axe-core.svg)](https://github.com/dequelabs/axe-core/commits/develop)
[![GitHub contributors](https://img.shields.io/github/contributors/dequelabs/axe-core.svg)](https://github.com/dequelabs/axe-core/graphs/contributors)
[![Join the chat at https://gitter.im/dequelabs/axe-core](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dequelabs/axe-core?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Package Quality](http://npm.packagequality.com/shield/axe-core.svg)](http://packagequality.com/#?package=axe-core)

The Accessibility Engine for automated testing of HTML-based user interfaces. Drop the aXe on your accessibility defects!

Thanks for helping us to make axe-core the most widely used HTML accessibility testing library in the galaxy! Share your axe-core story using #axecoresquad or by submitting it [here](https://accessibility.deque.com/axe-core-stories) to get a sweet T-shirt.

## Philosophy

We believe that automated testing has an important role to play in achieving digital equality and that in order to do that, it must achieve mainstream adoption by professional web developers. That means that the tests must inspire trust, must be fast, must work everywhere and must be available everywhere.

## Manifesto

1. Automated accessibility testing rules must have a zero false-positive rate
2. Automated accessibility testing rules must be lightweight and fast
3. Automated accessibility testing rules must work in all modern browsers
4. Automated accessibility testing rules must, themselves, be tested automatically

## The sharp edge of the aXe

aXe is the third generation of accessibility rules for HTML-based user interfaces that differentiates itself from other approaches and rules repositories in the following ways:

1. It works on all modern browsers,
2. It supports in-memory fixtures, static fixtures, integration tests and iframes of infinite depth
3. It has zero false positives (bugs notwithstanding)
4. It is open source
5. It is actively supported by a major accessibility vendor
6. It is designed to work with whatever tools, frameworks, libraries and environments you have today
7. It is designed to be integrated into your existing functional/acceptance automated tests
8. It automatically determines which rules to run based on the evaluation context
9. It is highly configurable

## Getting started

First download the package:

```console
npm install axe-core --save-dev
```

Now include the javascript file in each of your iframes in your fixtures or test systems:

```html
<script src="node_modules/axe-core/axe.min.js" ></script>
```

Now insert calls at each point in your tests where a new piece of UI becomes visible or exposed:

```js
axe.run(function (err, results) {
  if (err) throw err;
    ok(results.violations.length === 0, 'Should be no accessibility issues');
    // complete the async call
    ...
});
```

## Supported Browsers

The [aXe API](doc/API.md) fully supports the following browsers:

* Microsoft Edge v40 and above
* Google Chrome v42 and above
* Mozilla Firefox v38 and above
* Apple Safari v7 and above
* Internet Explorer v9, 10, 11

Support means that we will fix bugs and attempt to test each browser regularly. Only Firefox and Chrome are currently tested on every pull request.

There is limited support for JSDOM. We will attempt to make all rules compatible with JSDOM but where this is not possible, we recommend turning those rules off. Currently the `color-contrast` rule is known not to work with JSDOM.

## The Accessibility Rules

The complete list of rules run by axe-core can be found in [doc/rule-descriptions.md](./doc/rule-descriptions.md).

## Contents of the API Package

The [aXe API](doc/API.md) package consists of:

* `axe.js` - the JavaScript file that should be included in your web site under test (API)
* `axe.min.js` - a minified version of the above file

## Localization

Axe can be built using your local language. To do so, a localization file must be added to the `./locales` directory. This file must have be named in the following manner: `<langcode>.json`. To build aXe using this locale, instead of the default, run aXe with the `--lang` flag, like so:

`grunt build --lang=nl`

This will create a new build for aXe, called `axe.<lang>.js` and `axe.<lang>.min.js`. If you want to build localized versions, simply pass in `--all-lang` instead.

To create a new translation for aXe, start by running `grunt translate --lang=<langcode>`. This will create a json file fin the `./locales` directory, with the default English text in it for you to translate. We welcome any localization for axe-core. For details on how to contribute, see the Contributing section below.

To update existing translation file, re-run `grunt translate --lang=<langcode>`. This will add new messages used in English and remove messages which were not used in English.

Additionally, locale can be applied at runtime by passing a `locale` object to `axe.configure()`. The locale object must be of the same shape as existing locales in the `./locales` directory. For example:

```js
axe.configure({
  locale: {
    lang: 'de',
    rules: {
      accesskeys: {
        help: 'Der Wert des accesskey-Attributes muss einzigartig sein.'
      },
      // ...
    },
    checks: {
      abstractrole: {
        fail: 'Abstrakte ARIA-Rollen dürfen nicht direkt verwendet werden.'
      },
      'aria-errormessage': {
        // Note: doT (https://github.com/olado/dot) templates are supported here.
        fail: 'Der Wert der aria-errormessage {{~it.data:value}} `{{=value}}{{~}}` muss eine Technik verwenden, um die Message anzukündigen (z. B., aria-live, aria-describedby, role=alert, etc.).'
      }
      // ...
    }
  }
})
```

## Supported ARIA Roles and Attributes.

Refer [aXe ARIA support](./doc/aria-supported.md) for a complete list of ARIA supported roles and attributes by axe.

## Contributing

Read the [Proposing Axe-core Rules guide](./doc/rule-proposal.md)

Read the [documentation on the architecture](./doc/developer-guide.md)

Read the [documentation on contributing](CONTRIBUTING.md)

## Projects using axe-core

[List of projects using axe-core](doc/projects.md)

## Acknowledgements

Thanks to Dulin Marat for his [css-selector-parser](https://www.npmjs.com/package/css-selector-parser) implementation which is included for shadow DOM support.

Thanks to the [Slick Parser](https://github.com/mootools/slick/blob/master/Source/Slick.Parser.js) implementers for their contribution, we have used some of their algorithms in our shadow DOM support code.
