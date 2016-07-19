# aXe Developer Guide

aXe runs a series of tests to check for accessibility of content and functionality on a website. A test is made up of a series of Rules which are, themselves, made up of Checks. aXe executes these Rules asynchronously and, when the Rules are finished running, runs a callback function which is passed a Result structure. Since some Rules run on the page level while others do not, tests will also run in one of two ways. If a document is specified, the page level rules will run, otherwise they will not.

## Getting Started

### Environment Pre-requisites

1.  You must have NodeJS installed.
2.  Grunt must be installed globally.  `npm install -g grunt-cli`
3.  Install npm development dependencies.  `npm install`

### Building axe.js

To build axe.js, simply run `grunt build`.  axe.js and axe.min.js are placed into the `dist` folder.

### Running Tests

To run all tests from the command line you can run `grunt test`, which will run all unit and integration tests using PhantomJS.

You can also load tests in any supported browser, which is helpful for debugging.  Tests require a local server to run, you must first start a local server to serve files.  You can use Grunt to start one by running `grunt connect watch`.  Once your local server is running you can load the following pages in any browser to run tests:


1.  [Core Tests](../test/core/)
2.  [Commons Tests](../test/commons/)
3.  [Check Tests](../test/checks/)
4.  [Integration Tests](../test/integration/rules/)
5.  There are additional tests located in [test/integration/full/](../test/integration/full/) for tests that need to be run against their own document.

## Architecture Overview

aXe tests for accessibility using objects called Rules. Each Rule tests for a high-level aspect of accessibility, such as color contrast, button labels, and alternate text for images. Each rule is made up of a series of Checks. Depending on the rule; all, some, or none of these checks must pass in order for the rule to pass.

Upon execution, a Rule runs each of its Checks against all relevant nodes. Which nodes are relevant is determined by the Rule's `selector` property and `matches` function. If a Rule has no Checks that apply to a given node, the Rule will result in an inapplicable result.

After execution, a Check will return `true` or `false` depending on whether or not the tested condition was satisfied. The result, as well as more information on what caused the Check to pass or fail, will be stored in either the `passes` array or the `violations` array.


### Rules

Rules are defined by JSON files in the [lib/rules directory](../lib/rules).  The JSON object is used to seed the [Rule object](../lib/core/base/rule.js#L30).  A valid Rule JSON consists of the following:

* `id` - `String` A unique name of the Rule.
* `selector` - **optional** `String` which is a CSS selector that specifies the elements of the page on which the Rule runs.  If omitted, the rule will run against every node.
* `excludeHidden` - **optional** `Boolean` Whether the rule should exclude hidden elements.  Defaults to `true`.
* `enabled` - **optional** `Boolean`  Whether the rule is enabled by default.  Defaults to `true`.
* `pageLevel` - **optional** `Boolean`  Whether the rule is page level.  Page level rules will only run if given an entire `document` as context.
* `matches` - **optional** `String`  Relative path to the JavaScript file of a custom matching function.  See [matches function](#matches-function) for more information.
* `tags` - **optional** `Array` Strings of the accessibility guidelines of which the Rule applies.
* `metadata` - `Object` Consisting of:
	* `description` - `String` Text string that describes what the rule does.
	* `helpUrl` - `String` **optional** URL that provides more information about the specifics of the violation. Links to a page on the Deque University site.
	* `help` - `String` Help text that describes the test that was performed.
* `any` - `Array` Checks that make up this Rule; one of these checks must return `true` for a Rule to pass.
* `all` - `Array` Checks that make up this Rule; all these checks must return `true` for a Rule to pass.
* `none` - `Array` Checks that make up this Rule; none of these checks must return `true` for a Rule to pass.

The `any`, `all` and `none` arrays must contain either a `String` which references the `id` of the Check; or an object of the following format:
* `id` - `String` The unique ID of the Check.
* `options` - `Mixed` Any options the Check requires that are specific to the Rule.

There is a Grunt target which will ensure each Rule has a valid format, which can be run with `grunt validate`.

#### Matches Function

Custom `matches` functions are executed against each node which matches the Rule's `selector` and receive a single parameter named `node`, which is the Node to test.  The function must return either `true` or `false`.  Common functions are provided as `commons`. [See the data-table matches function for an example.](../lib/rules/data-table-matches.js)

### Checks

Similar to Rules, Checks are defined by JSON files in the [lib/checks directory](../lib/checks).  The JSON object is used to seed the [Check object](../lib/core/base/check.js).  A valid Check JSON consists of the following:

* `id` - `String` A unique name of the Check
* `evaluate` - `String` Relative path to the JavaScript file which contains the function body of the Check itself
* `after` - **optional** `String` Relative path to the JavaScript file which contains the function body of a Check's after (or post-processing) function.f
* `options` - **optional** `Mixed` Any information the Check needs that you might need to customize and/or is locale specific.  Options can be overridden at runtime (with the options parameter) or config-time.  For example, the [valid-lang](../lib/checks/language/valid-lang.json) Check defines what ISO 639-1 language codes it should accept as valid.  Options do not need to follow any specific format or type; it is up to the author of a Check to determine the most appropriate format.
* `metadata` - `Object` Consisting of:
	* `impact` - `String` (one of `minor`, `moderate`, `serious`, or `critical`)
	* `messages` - `Object` These messages are displayed when the Check passes or fails
		* `pass` - `String` [doT.js](http://olado.github.io/doT/) template string displayed when the Check passes
		* `fail` - `String` [doT.js](http://olado.github.io/doT/) template string displayed when the Check fails

#### Check `evaluate`

A Check's evaluate function is run a special context in order to give access to APIs which provide more information.  Checks will run against a single node and do not have access to other frames.  A Check must either return `true` or `false`.

The following variables are defined for `Check#evaluate`:

* `node` - `HTMLElement`  The element that the Check is run against
* `options` - `Mixed`  Any options specific to this Check that may be necessary.  If not specified by the user at run-time or configure-time; it will use `options` as defined by the Check's JSON file.
* `this.data()` - `Function`  Free-form data that either the Check message requires or is presented as `data` in the CheckResult object.  Subsequent calls to `this.data()` will overwrite previous.  See [aria-valid-attr](../lib/checks/aria/valid-attr.js) for example usage.
* `this.relatedNodes()` - `Function`  Array or NodeList of elements that are related to this Check.  For example the [duplicate-id](../lib/checks/shared/duplicate-id.js) Check will add all Elements which share the same ID.
* `commons` - Common functions that may be used across multiple Checks.  See [Common Functions](#common-functions) for more information.

#### Check `after`

You can use the `after` function to evaluate nodes that might be in other frames or to filter the number of violations or passes produced.  The `after` function runs once for each Rule in the top-most (or originating) frame.  Due to this, you should not perform DOM operations in after functions, but instead operate on `data` defined by the Check.

For example, the [duplicate-id](../lib/checks/shared/duplicate-id.json) Check include an [after function](../lib/checks/shared/duplicate-id-after.js) which reduces the number of violations so that only one violation per instance of a duplicate ID is found.

The following variables are defined for `Check#after`:

* `results` - `Array` Contains [CheckResults](#checkresult) for every matching node.
* `commons` - Common functions that may be used across multiple Checks.  See [Common Functions](#common-functions) for more information.

The after function must return an `Array` of CheckResults, due to this, it is a very common pattern to just use `Array#filter` to filter results:

```javascript
var uniqueIds = [];
return results.filter(function (r) {
	if (uniqueIds.indexOf(r.data) === -1) {
		uniqueIds.push(r.data);
		return true;
	}
	return false;
});
```

#### Pass and Fail Templates

Occasionally, you may want to add additional information about why a Check passed or failed into its message.  For example, the [aria-valid-attr](../lib/checks/aria/valid-attr.json) will add information about any invalid ARIA attributes to its fail message.  The message uses the [doT.js](http://olado.github.io/doT/) and is compiled to a JavaScript function at build-time.  In the Check message, you have access to the `CheckResult` as `it`.

#### CheckResult

When a Check is executed, its result is then added to a [CheckResult object](../lib/core/base/check-result.js).  Much like the RuleResult object, the CheckResult object only contains information that is required to determine whether a Check, and its parent Rule passed or failed.  `metadata` from the originating Check is combined later and will not be available until aXe reaches the reporting stage.

A CheckResult has the following properties:
* `id` - `String`  The ID of the Check this CheckResult belongs to.
* `data` - `Mixed`  Any data the Check's evaluate function added with `this.data()`.  Typically used to insert data from analysis into a message or to perform further tests in the post-processing function.
* `relatedNodes` - `Array`  Nodes that are related to the current Check as defined by [check.evaluate](#check-evaluate).
* `result` - `Boolean`  The return value of [check.evaluate](#check-evaluate).

### Common Functions

Common functions are an internal library used by the rules and checks.  If you have code repeated across rules and checks, you can use these functions and contribute to them.  They are made available to every function as `commons`.  Documentation is available in [source code](../lib/commons/).

### Core Utilities

Core Utilities are an internal library that provides aXe with functionality used throughout its core processes. Most notably among these are the queue function and the DqElement constructor.


#### Queue Function

The queue function creates an asynchronous "queue", list of functions to be invoked in parallel, but not necessarily returned in order. The queue function returns an object with the following methods:

* `defer(func)` Defer a function that may or may not run asynchronously
* `then(callback)` The callback to execute once all "deferred" functions have completed.  Will only be invoked once.
* `abort()` Abort the "queue" and prevent `then` function from firing


#### DqElement Class

The DqElement is a "serialized" `HTMLElement`. It will calculate the CSS selector, grab the source outerHTML and offer an array for storing frame paths. The DqElement class takes the following parameters:
 * `Element` - `HTMLElement` The element to serialize
 * `Spec` - `Object` Properties to use in place of the element when instantiated on Elements from other frames

```javascript
var firstH1 = document.getElementByTagName('h1')[0];
var dqH1 = new axe.utils.DqElement(firstH1);
```

Elements returned by the DqElement class have the following methods and properties:
* `selector` - `string` A unique CSS selector for the element
* `source` - `string` The generated HTML source code of the element
* `element` - `DOMNode` The element which this object is based off or the containing frame, used for sorting.
* `toJSON()` - Returns an object containing the selector and source properties
