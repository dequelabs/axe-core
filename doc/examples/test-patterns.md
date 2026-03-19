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
  const fixture = document.getElementById('fixture');
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

## Shadow DOM Test

```javascript
it('should work with Shadow DOM', function () {
  const vNode = queryShadowFixture(
    '<div id="host"></div>',
    '<div role="button" id="target">Test</div>'
  );
  // Test your function against the shadow DOM content
});
```

## Integration Test — Rule

Each rule change requires an HTML + JSON pair in `test/integration/rules/<rule-name>/`.

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

Rules that can run without a DOM (using only virtual nodes) should have tests in `test/virtual-rules/`. These tests verify that rules work correctly with `axe.run()` on serialized node data.
