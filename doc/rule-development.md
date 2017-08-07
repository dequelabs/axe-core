# Developing Axe-core Rules

Before you start writing axe-core rules, be sure to create a proposal for them in a github issue. Read [Proposing Axe-core rules](./rule-proposal.md) for details.

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
| metadata.help        | Short description of a violation, used in the aXe extension sidebar

## Check Properties

| Prop. Name         | Description
|--------------------|-----------------
| id                 | Unique identifier for the check
| evaluate           | Evaluating function, returning a boolean value
| options            | Configurable value for the check
| after              | Cleanup function, run after check is done
| metadata impact    | "minor", "serious", "critical"
| metadata pass      | Describes why the check passed
| metadata fail      | Describes why the check failed
| metadata incomplete| Describes why the check didn’t complete

Incomplete results occur when axe-core can’t produce a clear pass or fail result,
giving users the opportunity to review it manually. Incomplete messages can take
the form of a string, or an object with arbitrary keys matching the data returned
from the check.

A pass message is required, while fail and incomplete are dependent on the check result.

### Incomplete message string

As one example, the audio and video caption checks return an incomplete string:
```
messages: {
	pass: 'Why the check passed',
	fail: 'Why the check failed',
	incomplete: 'Why the check returned undefined'
}
```

### Incomplete message object with missingData

As another example, the color-contrast check returns missingData to aid in
remediation. Here’s the message format:

```
messages: {
	pass: 'Why the check passed',
	fail: 'Why the check failed',
	incomplete: {
		bgImage: 'The background color could not be determined due to a background image',
		default: 'fallback string'
	}
}
```

To wire up an incomplete message with a specific reason it returned undefined,
the check needs matching data. Otherwise, it will fall back to the `default` message.
Reasons are arbitrary for the check (such as 'bgImage') but they must match the
data returned:

```
this.data({
	missingData: 'bgImage'
});
```
