# ARIA Practices

Runs axe-core on the examples provided in the [ARIA Practices](https://www.w3.org/WAI/ARIA/apg/). To run the tests, run `npm run test:apg`.

If certain axe-core rules should not be run on certain pages, you can disable those rules using the `disabledRules` object in [apg.spec.js](./apg.spec.js). Please be sure to add a comment as to why the rule should not be run. If applicable, please open an issue in either axe-core or [aria-practices](https://github.com/w3c/aria-practices) and link to the issue in the code so that we can track the issue and know when we can run the rule again.
