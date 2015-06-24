put into axe-core on bitbucket


# Architecture Overview

aXe runs a series of tests to check for accessibility of content and functionality on a website. A test is made up of a series of Rules which are, themselves, made up of Checks. aXe executes these Rules asynchronously and, when the Rules are finished running, runs a callback function which is passed a Result structure. Since some Rules run on the page level while otheres do not, tests will also run in one of two ways. If a document is specified, the page level rules will run, otherwise they will not.

## Test Structure

aXe tests for accessibility using objects called Rules. Each Rule tests for a high-level aspect of accessibility, such as color contrast, button labels, and alternate text for images. Each rule is made up of a series of Checks. Depending on the rule, all, some, or none of these checks must pass in order for the rule to pass. 

## Running Rules

A syntax check runs on all Rules. For this reason, a valid Rule must have each of the following elements in its JSON file: 

* an `id` that represents the name of the Rule

* a `selector` which is a CSS selectors that specifies the elements of the page on which the Rule runs

* a `tags` section that lists the accessibility guidelines the Rule, if passed, fulfills. This field is not necessary for the Rule to run, though it is very helpful. 

* a `metadata` section consisting of `description`, `helpUrl`, and `help`. Except for the `helpUrl`, all of these fields are required.

* an array of checks that make up this Rule; a Check can be stored in one of the `all`, `some`, or `none` arrays, depending on what results constitute a passing Rule

## Execution of Checks

A syntax check runs on all Checks. For this reason, a valid Check has a number of elements in its JSON file: 

* an `id` that represents the name of the Check

* an `evaluate` field that contains the name of the javascript file to be executed for the Check to run

* a `metadata` field consisting of `impact` (one of minor, moderate, serious, or critical) and `messages` - one if the check passes and one if it fails. 

Upon execution, a Rule runs each of its Checks against all relevant nodes in the HTML file. Which nodes are "relevant" is determined by the given Rule and/or Check; both of these objects can filter which nodes are tested. 

After execution, a Check will return `true` or `false` depending on whether or not it passed. The result, as well as more information on what caused the Check to pass or fail, will be stored in either the `passes` array or the `violations` array
.

For more information on Rules and their Checks, see the [Rule and Check Structure document](rule_and_check_structure.md)

## Callback Function

The call to `axe.allyCheck` produces a result object containing details on which Rules and Checks passed or failed. The callback function passed into `axe.a11yCheck` runs on this object in the same frame as the test. For example, if the test was initiated inside an iframe, the after function will run there; if initiated in the main window, the function will run in the main window. 

This function is necessary to access the results object produced by the call to the API. The user determines what the function does - it can be as simple as checking if the violations array has zero elements or printing the entire results object to the console log.

# Examples

There are a number of ways to further customize the checks that aXe performs. The developer can specifying related Nodes, give the Check additional data, or include a list of valid options.

## Related Nodes

When writing a check, a user can specify nodes that may not be central to the Check, but are nevertheless necessary for the Check to accurately run. Related nodes can be used to specify information, to check for duplicate violations, etc. You can expose the related nodes by writing `this.relatedNodes()` in the Check's javascript file. The related nodes are contained in an array that is passed as a parameter to the `relatedNodes()` function.

The `duplicate-id` Check makes use of the related nodes feature to see if the same violation appears more than once. Instead of printing multiple error messages for the same violation, it uses the related nodes to check if the violation has already appeared in a node, printing only if it has not.

## Data

A user can also add a data object to the Check's javascript file. This object contains additional information that a Check may need to run successfully. 

There are two main uses for data:

* Cross-Frame Rules: if a Rule runs on more than one frame, the data object can store information from one frame that is used in another frame to determine if the Check passes.

* Message: if you want to include information from a frame in a message printed by the after-function, you can store this in the data object. For example, the `color-contrast` check stores the hexadecimal color value of its fore- and background colors so this information is available to the callback function. 

The [`color-contrast`](color-contrast.js) check has a `data` object with the following contents:

```javascript
this.data({
	fgColor: fgColor.toHexString(),
	bgColor: bgColor.toHexString(),
	contrastRatio: cr.contrastRatio.toFixed(2),
	fontSize: (fontSize * 72 / 96).toFixed(1) + 'pt',
	fontWeight: bold ? 'bold' : 'normal',
});
```

## Options

The `options` object is useful if there is a relatively short list of possible "correct" values. Such is the case for the language check, which ensures that the page has a valid language in the html language tag. This check has all valid language options specified in the `options` array inside the [`valid-lang.json` file](valid-lang.json):

can also be anything

```javascript
{
  "id": "valid-lang",
  "options": [
    "en",
    "es",
    "ja"
  ],
  "evaluate": ...
}
```

The [`valid-lang.js` file](valid-lang.js) checks if the language value specified matches one of the options: 

```javascript
(options || []).forEach(function (cc) {
	cc = cc.toLowerCase();
	if (lang && (lang === cc || lang.indexOf(cc.toLowerCase() + '-') === 0)) {
		lang = null;
	}
	if (xmlLang && (xmlLang === cc || xmlLang.indexOf(cc.toLowerCase() + '-') === 0)) {
		xmlLang = null;
	}
});
```

The options array specifies that "en", "es", and "ja" are the only acceptable values for the language tag; if the language tag contains some other value, the check will not pass.

## Common Functions

internal library for all the rules and checks
documented in the source code 

If you have code repeated across rules and checks, you can use these functions and contribute to them

## Getting Started

David will find the readme

## Unit and Integration Tests

next week

## More Information

* See the [aXe README](README.md) for an overview of aXe and instructions on getting started

* See the [aXe Glossary](Glossary.md) for definitions of commonly used terms in aXe documentation

* See detailed information on Rules and Checks in the [Rule and Check structure document](rule_and_check_structure.md)

* See an [example](Example.md) of a Rule and its Checks 

* See a [tutorial](Tutorial.md) on creating a new Rule
