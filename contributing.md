# Contributing

## Contributor License Agreement

In order to contribute, you must accept the [contributor licence agreement](https://cla-assistant.io/dequelabs/axe-core) (CLA). Acceptance of this agreement will be checked automatically and pull requests without a CLA cannot be merged.

## Contribution Guidelines

### Code Quality

Although we do not have official coding guidelines, we can and will request you to make changes if we think that your code is sloppy. You can take clues from the existing code base to see what we consider to be reasonable code quality. Please be prepared to make changes that we ask of you even if you might not agree with the request(s).

Pull requests that change the tabs of a file (spacing or changes from spaces to tabs and vice versa) will not be accepted. Please respect the coding style of the files you are changing and adhere to that.

That having been said, we prefer:

1. Tabs over spaces
2. Single quotes for string literals
3. Function definitions like `function functionName(arguments) {`
4. Variable function definitions like `Class.prototype.functionName = function (arguments) {`
5. Use of 'use strict'
6. Variables declared at the top of functions

### Testing

We expect all code to be 100% covered by tests. We don't have or want code coverage metrics but we will review tests and suggest changes when we think the test(s) do(es) not adequately exercise the code/code changes.

### Documentation and Comments

Functions should contain a preceding comment block with [jsdoc](http://usejsdoc.org/) style documentation of the function. For example:

```
/**
 * Runs the Audit; which in turn should call `run` on each rule.
 * @async
 * @param  {Context}   context The scope definition/context for analysis (include/exclude)
 * @param  {Object}    options Options object to pass into rules and/or disable rules or checks
 * @param  {Function} fn       Callback function to fire when audit is complete
 */
```

Classes should contain a jsdoc comment block for each attribute. For example:

```
/**
 * Constructor for the result of checks
 * @param {Object} check CheckResult specification
 */
function CheckResult(check) {
	'use strict';

	/**
	 * ID of the check.  Unique in the context of a rule.
	 * @type {String}
	 */
	this.id = check.id;

	/**
	 * Any data passed by Check (by calling `this.data()`)
	 * @type {Mixed}
	 */
	this.data = null;

	/**
	 * Any node that is related to the Check, specified by calling `this.relatedNodes([HTMLElement...])` inside the Check
	 * @type {Array}
	 */
	this.relatedNodes = [];

	/**
	 * The return value of the Check's evaluate function
	 * @type {Mixed}
	 */
	this.result = null;
}
```
