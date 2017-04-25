# Writing Axe-core Rules

A rule is a JSON Object that defines a test for aXe-core to run. At a high level, think of a rule as doing two things. First it finds all elements that it should test, and after that it runs a number of checks to see if those selected elements pass or fail the rule.

## Rule Select and Matches

Each rule has a 'selector' and optionally a 'matches' property. The selector is a CSS selector. Each element matching this selector will be tested by the rule, unless the matches function says otherwise. The `matches` property is a reference to a function that returns a boolean, which indicates if the element should be tested.

The last thing that may influence if an element is selected for testing in the rule is it's visibility. By default, hidden elements are ignored by the rule, unless   the `excludeHidden` is set to 'false'.

## Using Checks in Rules

The actual testing of elements in axe-core is done by checks. A rule has one or more checks which end up generating a result. There are three properties with which to define a rule's checks. Each of them deals differently:

- **All**: Takes an array of check names, **all** of which has to return true for the rule to pass.
- **none**: Takes an array of check names, **none** of which can to return true for the rule to pass.
- **any**: Takes an array of check names, **at least one** of which has to return true for the rule to pass.

## Rule Properties

| Prop. Name           | Description
|----------------------|-------------------------
| id                   | Unique identifier for the rule
| selector             | CSS Selector that matches elements to test
| matches              | Function to further filter the outcome of the selector
| excludeHidden        | Should hidden elements be excluded
| all                  | Checks that must all return true
| any                  | Checks that must all return false
| none                 | Checks of which at least one must return true
| pageLevel            | Should the rule only run on the main window
| enabled              | Does the rule run by default
| tags                 | Grouping for the rule, such as wcag2a, best-practice
| metadata.description | Description of what a rule does
| metadata.help        | Description of how to resolve an issue

## Check Properties

| Prop. Name      | Description
|-----------------|-----------------
| id              | Unique identifier for the check
| evaluate        | Evaluating function, returning a boolean value
| options         | Configurable value for the check
| after           | Cleanup function, run after check is done
| metadata impact | "minor", "serious", "critical"
| metadata pass   | Describes why the check passed
| metadata fail   | Describes why the check failed
