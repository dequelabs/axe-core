# Test Pattern Examples

Quick-reference examples for axe-core test conventions.

## Unit Test — Commons Function

```javascript
describe('text.sanitize', function () {
  it('should collapse whitespace and trim', function () {
    assert.equal(axe.commons.text.sanitize('\thi\t'), 'hi');
    assert.equal(axe.commons.text.sanitize('\t\nhi \t'), 'hi');
    assert.equal(axe.commons.text.sanitize('hello\u00A0there'), 'hello there');
  });

  it('should accept null', function () {
    assert.equal(axe.commons.text.sanitize(null), '');
  });
});
```

## Unit Test — Check Evaluate

```javascript
describe('aria-allowed-attr', function () {
  const { queryFixture } = axe.testUtils;
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    checkContext.reset();
  });

  it('should return true if all ARIA attributes are allowed', function () {
    const vNode = queryFixture(
      '<div role="textbox" aria-placeholder="foo" id="target"></div>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, vNode.actualNode, {}, vNode)
    );
  });
});
```

## Check Options

Give each option its own `describe` block, with a pair of cases whose result differs with and without the option, so the test goes red if the option is ignored:

```javascript
describe('options.ignoredTags', function () {
  const { html, queryFixture, getCheckEvaluate, MockCheckContext } =
    axe.testUtils;
  const checkContext = MockCheckContext();
  const evaluate = getCheckEvaluate('aria-allowed-role');

  afterEach(function () {
    checkContext.reset();
  });

  it('fails an unallowed role without the option', function () {
    const vNode = queryFixture(
      html`<article id="target" role="button"></article>`
    );
    assert.isFalse(evaluate.call(checkContext, null, {}, vNode));
    assert.deepEqual(checkContext._data, ['button']);
  });

  it('passes an ignored tag', function () {
    const vNode = queryFixture(
      html`<article id="target" role="button"></article>`
    );
    const options = { ignoredTags: ['article'] };
    assert.isTrue(evaluate.call(checkContext, null, options, vNode));
    assert.isNull(checkContext._data);
  });
});
```

Assert the result and `checkContext._data`, not the message text.

## Shadow DOM Test

Only add a Shadow DOM test when the result depends on something across the shadow boundary — here, the host's style decides whether content inside its shadow tree is hidden:

```javascript
it('should treat shadow content as hidden when its host is hidden', function () {
  const vNode = queryFixture(html`
    <div id="shadow" style="display:none">
      <template shadowrootmode="open">
        <p id="target">Hidden</p>
      </template>
    </div>
  `);
  assert.isTrue(axe.commons.dom.isHiddenForEveryone(vNode));
});
```

If the target and everything that decides the result are in the same shadow root (e.g. a `<th>` and its `<table>` both inside the shadow tree), the test is no different from a light DOM test — don't add it.

## Integration Test — Rule

Each change to a rule's behavior requires an HTML + JSON pair in `test/integration/rules/<rule-name>/` (mocha-hosted), or an HTML page and `.js` test in `test/integration/full/<rule-name>/` (full HTML page). Virtual-rules tests in `test/integration/virtual-rules/` should also be updated or created for appropriate rules. See sections below for details.

### HTML file (`aria-allowed-attr.html`)

```html
<div role="textbox" aria-placeholder="foo" id="pass1">Valid</div>
<div role="button" aria-placeholder="invalid" id="fail1">Invalid</div>
```

### JSON file (`aria-allowed-attr.json`)

```json
{
  "description": "aria-allowed-attr test",
  "rule": "aria-allowed-attr",
  "violations": [["#fail1"]],
  "passes": [["#pass1"]]
}
```

IDs use axe selector array format. For elements inside iframes:

```json
{
  "violations": [["iframe", "#fail-inside-iframe"]]
}
```

### Full-page integration tests

For rules that need a complete HTML page (e.g., landmark rules, page-level rules), use `test/integration/full/` instead. These tests run against a full HTML document rather than injected fragments.

### Virtual rules tests

Rules that can run without a DOM (using only virtual nodes) should have tests in `test/integration/virtual-rules/`. These tests verify that rules work correctly with `axe.runVirtualRule()` on `SerialVirtualNode` data.
