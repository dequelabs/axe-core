# aXe Javascript Accessibility API

## Table of Contents


1. [Section 1: Introduction](#section-1:-introduction)
1. [Get Started](#getting-started)
1. [Section 2: API Reference](#section-2:-api-reference)
1. [Overview](#overview)
1. [API Notes](#api-notes)
1. [API Name: axe.getRules](#api-name-axe.getrules)
1. [API Name: axe.configure](#api-name-axe.configure)
1. [API Name: axe.a11yCheck](#api-name-axe.a11ycheck)
1. [Section 3: Example Reference](#section-3:-example-reference)

## Section 1: Introduction

The aXe API is designed to be an improvement over the previous generation of accessibility APIs. It provides the following benefits:

* Designed to work with existing testing infrastructure

* No authentication to back-end server necessary for accessibility check performance

* Works in any PC-based browser

* Performs violation checking on multiple levels of iframes, not just one

* Provides list of rules and elements that passed accessibility checking, ensuring rules have been run against entire document

## Getting Started
This section gives a quick description of how to use the aXe APIs to analyze web page content and return a JSON object that lists any Accessibility violations found.

The aXe API can be used as part of a broader process that is performed on many, if not all, pages of a website. The API is used to analyze web page content and return a JSON object that lists any accessibility violations found. Here is how to get started:

1. Load page to test

2. Build list of links on page

3. Load page in testing system

4. Set configuration options for the javascript API (`axe.configure`)

5. Call analyze javascript API (`axe.a11yCheck`)

6. Do other processing required by your testing process


## Section 2: API Reference

### Overview

The aXe APIs are provided in the javascript file axe.js. It must be included in the web page under test. Parameters are sent as javascript function parameters. Results are returned in JSON format.

### API Notes

* All requests and parameters are case sensitive

* All strings parameter values must be enclosed in quotes

* A Rule test is made up of sub-tests. Each sub-test is returned in an array of ‘checks'

* The "helpUrl" in the results object is a link to a broader description of the accessibility issue and suggested remediation. All of the links point to Deque University help pages and require a valid login to that system

### API Name: axe.getRules

#### Purpose

To get information on all the rules in the system

#### Description

Returns a list of all rules in the system complete with all IDs and descriptions

#### Synopsis

`axe.getRules(Tag Name 1, Tag Name 2...);`

#### Parameters

* `tags` - array of tags used to filter returned rules

**Returns:** Array of rules that match the input filter with each entry having a format of `{ruleId: <id> description: <desc>}`

The current set of tags supported are listed in the following table:

| Tag Name           | Accessibility Standard                |
|--------------------|:-------------------------------------:|
| `wcag2a`           | WCAG 2.0 Level A                      |
| `wcag2aa`          | WCAG 2.0 Level AA                     |
| `section508`       | Section 508                           |
| `best-practice`    | Best practices endorsed by Deque      |


#### Example 1

In this example, we pass in the WCAG 2 A and AA tags into `axe.getRules` to retrieve only those rules. The function call return the array of rules.

**Call:** `axe.getRules([‘wcag2aa’, ‘wcag2a’]);`

**Returned Data:**

```
[
{ruleId: "area-alt", description: "Checks the <area> elements of image…"},
{ruleId: "aria-allowed-attr", description: "Checks all attributes that start…"},
{ruleId: "aria-required-attr", description: "Checks all elements that contain…"},
…
]
```

### API Name: axe.configure

#### Purpose

To configure the format of the data for the current session

#### Description

User configures the format of the JSON structure passed by the API to the callback of `axe.a11yCheck`

#### Synopsis

`axe.configure({reporter: "option"});`

#### Parameters

* `configurationOptions` - array of options, where the valid name, value pairs are:
  * `reporter` - Used to set the output format that the axe.a11yCheck function will pass to the callback function
     * Enter `v1` to use the previous version's format: `axe.configure({reporter: "v1"});`
     * Enter `v2` to use the current version's format: `axe.configure({reporter: "v2"});`

**Returns:** Nothing


### API Name: axe.a11yCheck

#### Purpose

Analyze currently loaded page

#### Description

Runs a number of rules against the provided HTML page and returns the resulting issue list

#### Synopsis

`axe.a11yCheck(context, options, callback)`

#### Parameters

* `context`: Defines the scope of the analysis - the part of the DOM that you would like to analyze. This will typically be a document name or a specific selector such as class name, ID, selector, etc.
* `options`: Set of options passed into rules or checks. See below for more information (optional).
* `callback`: the callback function is passed in as an argument; this function runs on the results object (see below) when the check is complete

#### Results Object

The callback function passed in as the third parameter of axe.allyCheck runs on the results object. This object has two components – a passes array and a violations array.  The passes array keeps track of all the passed tests, along with detailed information on each one. This leads to more efficient testing, especially when used in conjunction with manual testing, as the user can easily find out what tests have already been passed. Similarly, the violations array keeps track of all the failed tests, along with detailed information on each one.

###### `passes`

  * `description` - text string that describes what the rule does

  * `help` - help text that describes the test that was performed

  * `helpURL` - URL that provides more information about the specifics of the violation. Links to a page on the Deque University site.

  * `id` - unique identifier for this test rule; see the list of rules in the Rules Overview section below

  * `impact` - since the test passed, impact is always null

  * `tags` - array of tags that this rule is assigned. These tags can be used in the option structure to select which rules are run (see `allyCheck` parameters below for more information).

  * `nodes` - array of all checks performed as part of this test. Each entry in the array has the following fields:

     * `html` - snippet of HTML where the violation occurred

     * `impact` - since the test passed, impact is always null

     * `target` - array of selectors that has each element correspond to one level of iframe or frame. If there is one iframe or frame, there should be two entries in `target`. If there are three iframe levels, there should be four entries in `target`.

###### `violations`

  * `description` - text string that describes what the rule does

  * `help` - help text that describes the test that was performed

  * `helpURL` - URL that provides more information about the specifics of the violation. Links to a page on the Deque University site.

  * `id` - unique identifier for this test rule; see the list of rules in the Rules Overview section below

  * `impact` - how serious the violation is. Can be one of "minor", "moderate", "serious", or "critical".

  * `tags` - array of tags that this rule is assigned. These tags can be used in the option structure to select which rules are run (see `allyCheck` parameters below for more information).

  * `nodes` - array of all instances of violations of the specified type on the tested page

     * `failureSummary` - string that provides a readable explanation of the failure as well as suggestions for the different ways a violation may be remediated, if more than one is possible.

     * `html` - snippet of HTML where the violation occurred

     * `impact` - how serious the violation is. Can be one of "minor", "moderate", "serious", or "critical".

     * `target` - array of selectors that has each element correspond to one level of iframe or frame. If there is one iframe or frame, there should be two entries in `target`. If there are three iframe levels, there should be four entries in `target`.


#### a11yCheck Parameters

##### A. Context Parameter

The context object can be passed one of the following:

1. An element that represents the portion of the document that must be analyzed

  * Example: the ID of a `<div>` tag: `document.getElementById("tag"))`

2. A CSS selector that selects the portion(s) of the document that must be analyzed. This includes:

  *  A CSS selector as a class name  (e.g. `.classname`)

  *  A CSS selector as a node name (e.g. `div.tagname`)

  *  A CSS selector of an element id (e.g. `#tag`)

3. An include-exclude object (see below)

###### Include-Exclude Object

The include exclude object is a JSON object with two attributes: include and exclude. The include attribute must always be supplied, whereas the exclude attribute is optional. Each attribute is of Mixed type and can either be:

* A node, or

* An array of arrays of CSS selectors

In most cases, the component arrays will contain only one CSS selector. Multiple CSS selectors are only required if you want to include or exclude regions of a page that are inside iframes (or iframes within iframes within iframes). In this case, the first n-1 selectors are selectors that select the iframe(s) and the nth selector, selects the region(s) within the iframe.

###### Context Parameter Examples

1. Include the first item in the `$fixture `nodelist but exclude its first child
```
{
include: $fixture[0],
exclude: $fixture[0].firstChild
}
```

2. Include the element with the ID of `fix` but exclude any `div`s within it
```
{
include: [['#fix']],
exclude: [[‘#fix>div’]]
}
```

3. Include the whole document except any structures whose parent contains the class `exclude1` or `exclude2`
```
{
include: document,
exclude: [['.exclude1'],['.exclude2']]
}
```

##### B. Options Parameter

The options parameter is flexible way to configure how a11yCheck operates. The different modes of operation are:

* Run all rules corresponding to one of the accessibility standards

* Run all rules defined in the system, except for the list of rules specified

* Run a specific set of rules provided as a list of rule ids

###### Options Parameter Examples

1. Run all Rules for an Accessibility Standard

There are certain standards defined that can be used to select a set of rules to be run. The defined standards and tag string are defined as follows:

| Tag Name           | Accessibility Standard                |
|--------------------|:-------------------------------------:|
| `wcag2a`           | WCAG 2.0 Level A                      |
| `wcag2aa`          | WCAG 2.0 Level AA                     |
| `section508`       | Section 508                           |
| `best-practice`    | Best practices endorsed by Deque      |

To run one of the standards, specify `options` as

`{ runOnly: { type: "tag", values: { "wcag2a" } } }`

This tells a11yCheck that only the specific rules should be run corresponding to the provided standard. The standard passed in values can be an array of tag names

2. Run all Rules except for a list of rules

The default operation for a11yCheck is to run all rules. If certain rules should be disabled from being run, specify `options` as:
```
{ rules: {
	      "ruleId1": { enabled: false },
	      "ruleId2": { enabled: false}
         }
}
```

This example will disable the rules with the id of `ruleId1` and `ruleId2`. All other rules will run. The list of valid rule IDs is specified in the section below.

3. Run only a specified list of Rules

If you only want certain rules to be run, specify options as:

`{ runOnly: { type: "rule", values: [ "ruleId1", "ruleId2", "ruleId3" ] } } }`

This example will only run the rules with the id of `ruleId1`, `ruleId2`, and `ruleId3`. No other rule will run.


##### C. Callback Parameter

The callback parameter is a function that will be called when the asynchronous `axe.a11yCheck` function completes. The callback function is passed a single parameter - the results object of the `axe.a11yCheck` call.


#### Example 2

In this example, we will pass the selector for the entire document, pass no options, which means all rules will be run, and have a simple callback function that logs the entire results object to the console log:

`axe.a11yCheck(document, null, function(results) { console.log(results);});`

###### `passes`

* `passes[0]`
  ...

  * `help` - `"Elements must have sufficient color contrast"`

  * `helpURL` - `"https://dequeuniversity.com/courses/html-css/visual-layout/color-contrast"`

  * `id` - `"color-contrast"`

     `target[0]: "#js_off-canvas-wrap > .inner-wrap >.kinja-title.proxima.js_kinja-title-desktop"`

     `target[1]...`

* `passes[1]`
   ...

###### `violations`

* `violations[0]`

  * `help` - `"<button> elements must have alternate text"`

  * `helpURL` - `"https://dequeuniversity.com/courses/html-css/forms/form-labels#id84_example_button"`

  * `id` - `"button-name"`

     `target[0]: "post_5919997 > .row.content-wrapper > .column > span > iframe"`

     `target[1]: "#u_0_1 > .pluginConnectButton > .pluginButtonImage > button"`


* `violations[1]` ...


##### `passes` Results Array

In the example above, the `passes` array contains two entries that correspond to the two rules tested. The first element in the array describes a color contrast check. It relays the information that a list of nodes was checked and subsequently passed. The `help`, `helpUrl`, and `id` fields are returned as expected for each of the entries in the `passes` array. The `target` array has one element in it with a value of

`#js_off-canvas-wrap > .inner-wrap >.kinja-title.proxima.js_kinja-title-desktop`

This indicates that the element selected by the entry in `target[0]` was checked for the color contrast rule and that it passed the test.

Each subsequent entry in the passes array has the same format, but will detail the different rules that were run as part of this call to `axe.a11yCheck()`.

##### `violations` Results Array

The array of `violations` contains one entry; this entry describes a test that check if buttons have valid alternate text (button-name).  This first entry in the array has the `help`, `helpUrl` and `id` fields returned as expected.

The `target` array demonstrates how we specify the selectors when the node specified is inside of an `iframe` or `frame`. The first element in the `target` array - `target[0]` - specifies the selector to the `iframe` that contains the button. The second element in the `target` array - `target[1]` -  specifies the selector to the actual button, but starting from inside the iframe selected in `target[0]`.

Each subsequent entry in the violations array has the same format, but will detail the different rules that were run that generated Accessibility violations as part of this call to `axe.a11yCheck()`.


#### Example 3

In this example, we pass the selector for the entire document, enable two rules to be run, and have a simple callback function that logs the entire results object to the console log:

`axe.a11yCheck(document, rules: { "button-check":  {enabled: true}, "color-contrast": {enabled: true}}, function(results) { console.log(results);});`


## Section 3: Example Reference

The distribution package contains examples for jasmine, mocha, phantomjs, qunit, selenium using javascript, selenium using java. Each of these examples is in the dist/doc/examples folder. In each folder, there is a README.md file that contains specific information about each example.
