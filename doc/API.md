# aXe Javascript Accessibility API

## Table of Contents

1. [Section 1: Introduction](#section-1-introduction)
	1. [Get Started](#getting-started)
1. [Section 2: API Reference](#section-2-api-reference)
	1. [Overview](#overview)
	1. [API Notes](#api-notes)
	1. [API Name: axe.getRules](#api-name-axegetrules)
	1. [API Name: axe.configure](#api-name-axeconfigure)
	1. [API Name: axe.reset](#api-name-axereset)
	1. [API Name: axe.run](#api-name-axerun)
		1. [Parameters axe.run](#parameters-axerun)
			1. [Context Parameter](#context-parameter)
			2. [Options Parameter](#options-parameter)
			3. [Callback Parameter](#callback-parameter)
		1. [Return Promise](#return-promise)
		1. [Error result](#error-result)
		1. [Results Object](#results-object)
	1. [API Name: axe.registerPlugin](#api-name-axeregisterplugin)
	1. [API Name: axe.cleanup](#api-name-axecleanup)
	1. [API Name: axe.a11yCheck](#api-name-axea11ycheck)
1. [Section 3: Example Reference](#section-3-example-reference)

## Section 1: Introduction

The aXe API is designed to be an improvement over the previous generation of accessibility APIs. It provides the following benefits:

* Runs in any modern browser
* Designed to work with existing testing infrastructure
* Runs locally, no connection to a third-party server is necessary
* Performs violation checking on multiple levels of nested iframes
* Provides list of rules and elements that passed accessibility checking, ensuring rules have been run against entire document

### Getting Started
This section gives a quick description of how to use the aXe APIs to analyze web page content and return a JSON object that lists any accessibility violations found.

The aXe API can be used as part of a broader process that is performed on many, if not all, pages of a website. The API is used to analyze web page content and return a JSON object that lists any accessibility violations found. Here is how to get started:

1. Load page in testing system
2. Optionally, set configuration options for the javascript API (`axe.configure`)
3. Call analyze javascript API (`axe.run`)
4. Either assert against results or save them for later processing


## Section 2: API Reference

### Overview

The aXe APIs are provided in the javascript file axe.js. It must be included in the web page under test. Parameters are sent as javascript function parameters. Results are returned in JSON format.

### API Notes

* A Rule test is made up of sub-tests. Each sub-test is returned in an array of 'checks'
* The `"helpUrl"` in the results object is a link to a broader description of the accessibility issue and suggested remediation. All of links point to Deque University help pages and require a valid login to that system.

### API Name: axe.getRules

#### Purpose

To get information on all the rules in the system.

#### Description

Returns a list of all rules with their ID and description

#### Synopsis

`axe.getRules([Tag Name 1, Tag Name 2...]);`

#### Parameters

* `tags` - **optional** Array of tags used to filter returned rules.  If omitted, it will return all rules.

**Returns:** Array of rules that match the input filter with each entry having a format of `{ruleId: <id>, description: <desc>}`

The current set of tags supported are listed in the following table:

| Tag Name           | Accessibility Standard                |
|--------------------|:-------------------------------------:|
| `wcag2a`           | WCAG 2.0 Level A                      |
| `wcag2aa`          | WCAG 2.0 Level AA                     |
| `section508`       | Section 508                           |
| `best-practice`    | Best practices endorsed by Deque      |


#### Example 1

In this example, we pass in the WCAG 2 A and AA tags into `axe.getRules` to retrieve only those rules. The function call returns an array of rules.

**Call:** `axe.getRules(['wcag2aa', 'wcag2a']);`

**Returned Data:**

```javascript
[
  { ruleId: "area-alt", description: "Checks the <area> elements of image…" },
  { ruleId: "aria-allowed-attr", description: "Checks all attributes that start…" },
  { ruleId: "aria-required-attr", description: "Checks all elements that contain…" },
  …
]
```

### API Name: axe.configure

#### Purpose

To configure the format of the data used by aXe. This can be used to add new rules, which must be registered with the library to execute.

#### Description

User specifies the format of the JSON structure passed to the callback of `axe.run`

#### Synopsis

```javascript
axe.configure({
	branding: {
		brand: String,
		application: String
	},
	reporter: "option",
	checks: [Object],
	rules: [Object]});
```

#### Parameters

* `configurationOptions` - Options object; where the valid name, value pairs are:
  * `branding` - mixed(optional) Used to set the branding of the helpUrls
     * `brand` - string(optional) sets the brand string - default "axe"
     * `application` - string(optional) sets the application string - default "axeAPI"
  * `reporter` - Used to set the output format that the axe.run function will pass to the callback function
     * `v1` to use the previous version's format: `axe.configure({ reporter: "v1" });`
     * `v2` to use the current version's format: `axe.configure({ reporter: "v2" });`
  * `checks` - Used to add checks to the list of checks used by rules, or to override the properties of existing checks
  	 * The checks attribute is an array of check objects
  	 * Each check object can contain the following attributes
  	 	 * `id` - string(required). This uniquely identifies the check. If the check already exists, this will result in any supplied check properties being overridden. The properties below that are marked required if new are optional when the check is being overridden.
  	 	 * `evaluate` - function(required for new). This is the function that implements the check's functionality.
  	 	 * `after` - function(optional). This is the function that gets called for checks that operate on a page-level basis, to process the results from the iframes.
  	 	 * `options` - mixed(optional). This is the options structure that is passed to the evaluate function and is intended to be used to configure checks. It is the most common property that is intended to be overridden for existing checks.
  	 	 * `enabled` - boolean(optional, default `true`). This is used to indicate whether the check is on or off by default. Checks that are off are not evaluated, even when included in a rule. Overriding this is a common way to disable a particular check across multiple rules.
  * `rules` - Used to add rules to the existing set of rules, or to override the properties of existing rules
  	 * The rules attribute is an Array of rule objects
  	 * each rule object can contain the following attributes
  	 	 * `id` - string(required). This uniquely identifies the rule. If the rule already exists, it will be overridden with any of the attributes supplied. The attributes below that are marked required, are only required for new rules.
  	 	 * `selector` - string(optional, default `*`). A CSS selector used to identify the elements that are passed into the rule for evaluation.
  	 	 * `excludeHidden` - boolean(optional, default `true`). This indicates whether elements that are hidden from all users are to be passed into the rule for evaluation.
  	 	 * `enabled` - boolean(optional, default `true`). Whether the rule is turned on. This is a common attribute for overriding.
  	 	 * `pageLevel` - boolean(optional, default `false`). When set to true, this rule is only applied when the entire page is tested. Results from nodes on different frames are combined into a single result. See [page level rules](#page-level-rules).
  	 	 * `any` -  array(optional, default `[]`). This is the list of checks that must all "pass" or else there is a violation.
  	 	 * `all` - array(optional, default `[]`). This is the list of checks that, if any "fails", will generate a violation.
  	 	 * `none` - array(optional, default `[]`). This is a list of the checks that, if none "pass", will generate a violation.
  	 	 * `tags` - array(optional, default `[]`). A list if the tags that "classify" the rule. In practice, you must supply some valid tags or the default evaluation will not invoke the rule. The convention is to include the standard (WCAG 2 and/or section 508), the WCAG 2 level, Section 508 paragraph, and the WCAG 2 success criteria. Tags are constructed by converting all letters to lower case, removing spaces and periods and concatinating the result. E.g. WCAG 2 A success criteria 1.1.1 would become ["wcag2a", "wcag111"]
  	 	 * `matches` - string(optional, default `*`). A filtering CSS selector that will exclude elements that do not match the CSS selector.

**Returns:** Nothing

##### Page level rules

Page level rules split their evaluation into two phases. A 'data collection' phase which is done inside the 'evaluate' function and an assessment phase which is done inside the 'after' function. The evaluate function executes inside each individual frame and is responsible for collection data that is passed into the after function which inspects that data and makes a decision.

Page level rules raise violations on the entire document and not on individual nodes or frames from which the data was collected. For an example of how this works, see the heading order check:
- [lib/checks/navigation/heading-order.json](https://github.com/dequelabs/axe-core/blob/master/lib/checks/navigation/heading-order.json)
- [lib/checks/navigation/heading-order.js](https://github.com/dequelabs/axe-core/blob/master/lib/checks/navigation/heading-order.js)
- [lib/checks/navigation/heading-order-after.js](https://github.com/dequelabs/axe-core/blob/master/lib/checks/navigation/heading-order-after.js)

### API Name: axe.reset

#### Purpose

Reset the configuration to the default configuration.

#### Description

Override any previous calls to `axe.configure` and restore the configuration to the default configuration. Note: this will NOT unregister any new rules or checks that were registered but will reset the configuration back to the default configuration for everything else.

#### Synopsis

```javascript
axe.reset();
```

#### Parameters

None


### API Name: axe.run

#### Purpose

Analyze currently loaded page

#### Description

Runs a number of rules against the provided HTML page and returns the resulting issue list

#### Synopsis

```javascript
axe.run(context, options, callback);
```

#### Parameters axe.run

* [`context`](#context-parameter): (optional) Defines the scope of the analysis - the part of the DOM that you would like to analyze. This will typically be the `document` or a specific selector such as class name, ID, selector, etc.
* [`options`](#options-parameter): (optional) Set of options passed into rules or checks, temporarily modifying them. This contrasts with `axe.configure`, which is more permanent. [See below for more information](#axerun-parameters)
* [`callback`](#callback-parameter): (optional) The callback function which receives either null or an [error result](#error-result) as the first parameter, and the [results object](#results-object) when analysis is completed successfully, or undefined if it did not.

##### Context Parameter

By default, axe.run will test the entire document. The context object is an optional parameter that can be used to specify which element should and which should not be tested. It can be passed one of the following:

1. An element reference that represents the portion of the document that must be analyzed
	* Example: To limit analysis to the `<div id="content">` element: `document.getElementById("content")`
2. A NodeList such as returned by `document.querySelectorAll`.
3. A CSS selector that selects the portion(s) of the document that must be analyzed. This includes:
	*  A CSS selector as a class name  (e.g. `.classname`)
	*  A CSS selector as a node name (e.g. `div`)
	*  A CSS selector of an element id (e.g. `#tag`)
4. An include-exclude object (see below)


###### Include-Exclude Object

The include exclude object is a JSON object with two attributes: include and exclude. Either include or exclude is required.  If only `exclude` is specified; include will default to the entire `document`.

* A node, or
* An array of arrays of CSS selectors
    * If the nested array contains a single string, that string is the CSS selector
    * If the nested array contains multiple strings
      * The last string is the final CSS selector
      * All other's are the nested structure of iframes inside the document

In most cases, the component arrays will contain only one CSS selector. Multiple CSS selectors are only required if you want to include or exclude regions of a page that are inside iframes (or iframes within iframes within iframes). In this case, the first n-1 selectors are selectors that select the iframe(s) and the nth selector, selects the region(s) within the iframe.

###### Context Parameter Examples

1. Include the first item in the `$fixture` NodeList but exclude its first child

	```javascript
	{
	  include: $fixture[0],
	  exclude: $fixture[0].firstChild
	}
	```
2. Include the element with the ID of `fix` but exclude any `div`s within it

	```javascript
	{
	  include: [['#fix']],
	  exclude: [['#fix div']]
	}
	```
3. Include the whole document except any structures whose parent contains the class `exclude1` or `exclude2`

	```javascript
	{
	  exclude: [['.exclude1'], ['.exclude2']]
	}
	```
4. Include the element with the ID of `fix`, within the iframe with id `frame`

  ```javascript
  {
    include: [['#frame', '#fix']]
  }
  ```
5. Include the element with the ID of `fix`, within the iframe with id `frame2`, within the iframe with id `frame1`

  ```javascript
  {
    include: [['#frame1', '#frame2', '#fix']]
  }
  ```
6. Include the following:
  * The element with the ID of `fix`, within the iframe with id `frame2`, within the iframe with id `frame1`
  * The element with id `header`
  * All links

  ```javascript
  {
    include: [
      ['#header'],
      ['a'],
      ['#frame1', '#frame2', '#fix']
    ]
  }
  ```


##### Options Parameter

The options parameter is flexible way to configure how `axe.run` operates. The different modes of operation are:

* Run all rules corresponding to one of the accessibility standards
* Run all rules defined in the system, except for the list of rules specified
* Run a specific set of rules provided as a list of rule ids

###### Options Parameter Examples

1. Run only Rules for an accessibility standard

	There are certain standards defined that can be used to select a set of rules. The defined standards and tag string are defined as follows:

	| Tag Name           | Accessibility Standard                |
	|--------------------|:-------------------------------------:|
	| `wcag2a`           | WCAG 2.0 Level A                      |
	| `wcag2aa`          | WCAG 2.0 Level AA                     |
	| `section508`       | Section 508                           |
	| `best-practice`    | Best practices endorsed by Deque      |

	To run only WCAG 2.0 Level A rules, specify `options` as:

	```javascript
	{
	  runOnly: {
		  type: "tag",
		  values: ["wcag2a"]
		}
	}
	```

	To run both WCAG 2.0 Level A and Level AA rules, you must specify both `wcag2a` and `wcag2aa`:

	```javascript
	{
	  runOnly: {
	    type: "tag",
	    values: ["wcag2a", "wcag2aa"]
	  }
	}
	```

2. Run only a specified list of Rules

	If you only want to run certain rules, specify options as:

	```javascript
	{
	  runOnly: {
	    type: "rule",
	    values: [ "ruleId1", "ruleId2", "ruleId3" ]
	  }
	}
	```

	This example will only run the rules with the id of `ruleId1`, `ruleId2`, and `ruleId3`. No other rule will run.

3. Run all enabled Rules except for a list of rules

	The default operation for axe.run is to run all WCAG 2.0 Level A and Level AA rules. If certain rules should be disabled from being run, specify `options` as:
	```javascript
	{
	  "rules": {
	    "color-contrast": { enabled: false },
	    "valid-lang": { enabled: false }
	  }
	}
	```

	This example will disable the rules with the id of `color-contrast` and `valid-lang`. All other rules will run. The list of valid rule IDs is specified in the section below.

4. Run a modified set or rules using tags and rule enable

	By combining runOnly with type: tags and the rules option, a modified set can be defined. This lets you include rules with unspecified tags, and exclude rules that do have the specified tag(s).
	```javascript
	{
	  runOnly: {
	    type: "tag",
	    values: ["wcag2a"]
	  },
	  "rules": {
	    "color-contrast": { enabled: true },
	    "valid-lang": { enabled: false }
	  }
	}
	```

	This example includes all level A rules except for valid-lang, and in addition will include the level AA color-contrast rule.

5. Run only some tags, bug exclude others

	Similar to scope, the runOnly option can accept an object with an 'include' and 'exclude' property. Only those checks that match an included tag will run, except those that share a tag from the exclude list.
	```javascript
	{
	  runOnly: {
	    type: 'tags',
	    value: {
	      include: ['wcag2a', 'wcag2aa'],
	      exclude: ['experimental']
	    }
	  }
	}
	```

	This example first includes all `wcag2a` and `wcag2aa` rules. All rules that are tagged as `experimental` are than removed from the list of rules to run.

##### Callback Parameter

The callback parameter is a function that will be called when the asynchronous `axe.run` function completes. The callback function is passed two parameters. The first parameter will be an error thrown inside of aXe if axe.run could not complete. If axe completed correctly the first parameter will be null, and the second parameter will be the results object.


#### Return Promise

If the callback was not defined, aXe will return a Promise instead. Axe does not polyfill a Promise library however. So on systems without support for Promises this feature is not available. If you are unsure if the systems you will need aXe on has Promise support we suggest you use the callback provided by axe.run instead.

#### Error Result

This will either be null or an object which is an instance of Error. If you are consistently receiving errors, please report this issue on the [Github issues list of Axe](https://github.com/dequelabs/axe-core/issues).


#### Results Object

The callback function passed in as the third parameter of `axe.a11yCheck` runs on the results object. This object has two components – a passes array and a violations array.  The passes array keeps track of all the passed tests, along with detailed information on each one. This leads to more efficient testing, especially when used in conjunction with manual testing, as the user can easily find out what tests have already been passed. Similarly, the violations array keeps track of all the failed tests, along with detailed information on each one.

###### `url`

The URL of the page that was tested.

###### `timestamp`

The date and time that analysis was completed.

###### result arrays

The results of axe are grouped according to their outcome into the following arrays:
* `passes`: These results indicate what elements passed the rules
* `violations`: These results indicate what elements failed the rules
* `inapplicable`: These results indicate which rules did not run because no matching content was found on the page. For example, with no video, those rules won't run.
* `incomplete`: These results were aborted and require further testing. This can happen either because of technical restrictions to what the rule can test, or because a javascript error occurred.

Each object returned in these arrays have the following properties:

* `description` - Text string that describes what the rule does
* `help` - Help text that describes the test that was performed
* `helpUrl` - URL that provides more information about the specifics of the violation. Links to a page on the Deque University site.
* `id` - Unique identifier for the rule; [see the list of rules](rule-descriptions.md)
* `impact` - How serious the violation is. Can be one of "minor", "moderate", "serious", or "critical" if the Rule failed or `null` if the check passed
* `tags` - Array of tags that this rule is assigned. These tags can be used in the option structure to select which rules are run ([see `axe.a11yCheck` parameters below for more information](#a11ycheck-parameters)).
* `nodes` - Array of all elements the Rule tested
	* `html` - Snippet of HTML of the Element
	* `impact` - How serious the violation is. Can be one of "minor", "moderate", "serious", or "critical" if the test failed or `null` if the check passed
	* `target` - Array of selectors that has each element correspond to one level of iframe or frame. If there is one iframe or frame, there should be two entries in `target`. If there are three iframe levels, there should be four entries in `target`.
	* `any` - Array of checks that were made where at least one must have passed. Each entry in the array contains:
		* `id` - Unique identifier for this check. Check ids may be the same as Rule ids
		* `impact` - How serious this particular check is. Can be one of "minor", "moderate", "serious", or "critical". Each check that is part of a rule can have different impacts. The highest impact of all the checks that fail is reported for the rule
		* `message` - Description of why this check passed or failed
		* `data` - Additional information that is specific to the type of Check which is optional. For example, a color contrast check would include the foreground color, background color, contrast ratio, etc.
		* `relatedNodes` - Optional array of information about other nodes that are related to this check. For example, a duplicate id check violation would list the other selectors that had this same duplicate id. Each entry in the array contains the following information:
			* `target` - Array of selectors for the related node
			* `html` - HTML source of the related node
	* `all` - Array of checks that were made where all must have passed. Each entry in the array contains the same information as the 'any' array
	* `none` - Array of checks that were made where all must have not passed. Each entry in the array contains the same information as the 'any' array

#### Example 2

In this example, we will pass the selector for the entire document, pass no options, which means all enabled rules will be run, and have a simple callback function that logs the entire results object to the console log:

```javascript
axe.run(document, function(err, results) {
  if (err) throw err;
  console.log(results);
});
```

###### `passes`

* `passes[0]`
  ...
  * `help` - `"Elements must have sufficient color contrast"`
  * `helpUrl` - `"https://dequeuniversity.com/courses/html-css/visual-layout/color-contrast"`
  * `id` - `"color-contrast"`
		* `nodes`
			* `target[0]` - `"#js_off-canvas-wrap > .inner-wrap >.kinja-title.proxima.js_kinja-title-desktop"`

* `passes[1]`
   ...

###### `violations`

* `violations[0]`
  * `help` - `"<button> elements must have alternate text"`
  * `helpUrl` - `"https://dequeuniversity.com/courses/html-css/forms/form-labels#id84_example_button"`
  * `id` - `"button-name"`
		* `nodes`
			* `target[0]` - `"post_5919997 > .row.content-wrapper > .column > span > iframe"`
			* `target[1]` - `"#u_0_1 > .pluginConnectButton > .pluginButtonImage > button"`

* `violations[1]` ...


##### `passes` Results Array

In the example above, the `passes` array contains two entries that correspond to the two rules tested. The first element in the array describes a color contrast check. It relays the information that a list of nodes was checked and subsequently passed. The `help`, `helpUrl`, and `id` fields are returned as expected for each of the entries in the `passes` array. The `target` array has one element in it with a value of

`#js_off-canvas-wrap > .inner-wrap >.kinja-title.proxima.js_kinja-title-desktop`

This indicates that the element selected by the entry in `target[0]` was checked for the color contrast rule and that it passed the test.

Each subsequent entry in the passes array has the same format, but will detail the different rules that were run as part of this call to `axe.run()`.

##### `violations` Results Array

The array of `violations` contains one entry; this entry describes a test that check if buttons have valid alternate text (button-name).  This first entry in the array has the `help`, `helpUrl` and `id` fields returned as expected.

The `target` array demonstrates how we specify the selectors when the node specified is inside of an `iframe` or `frame`. The first element in the `target` array - `target[0]` - specifies the selector to the `iframe` that contains the button. The second element in the `target` array - `target[1]` -  specifies the selector to the actual button, but starting from inside the iframe selected in `target[0]`.

Each subsequent entry in the violations array has the same format, but will detail the different rules that were run that generated accessibility violations as part of this call to `axe.run()`.


#### Example 3

In this example, we pass the selector for the entire document, enable two additional best practice rules, and have a simple callback function that logs the entire results object to the console log:

```javascript
axe.run(document, {
  rules: {
    "heading-order": { enabled: true },
    "label-title-only": { enabled: true }
  }
}, function(err, results) {
  if (err) throw err;
  console.log(results);
});
```
### API Name: axe.registerPlugin

Register a plugin with the aXe plugin system. See [implementing a plugin](plugins.md) for more information on the plugin system

### API Name: axe.cleanup

Call the plugin system's cleanup function. See [implementing a plugin](plugins.md).

### API Name: axe.a11yCheck

In axe-core v1 the main method for axe was `axe.a11yCheck()`. This method was replaced with `axe.run()` in order to better deal with errors. The method `axe.a11yCheck()` differs from `axe.run()` in the following ways:

- .a11yCheck does not pass the error object to the callback, rather it returns the result as the first parameter and logs errors to the console.
- .a11yCheck requires a context object, and so will not fall back to the document root.
- .a11yCheck does not return a Promise.

## Section 3: Example Reference

This package contains examples for [jasmine](examples/jasmine), [mocha](examples/mocha), [phantomjs](examples/phantomjs), [qunit](examples/qunit), [selenium using javascript](examples/selenium), and [generating HTML from the violations array](examples/html-handlebars.md). Each of these examples is in the [doc/examples](examples) folder. In each folder, there is a README.md file which contains specific information about each example.
