# Test Pattern Examples

Quick-reference examples for axe-core test conventions.

## Unit Test — Commons Function

```javascript
describe('text.sanitize', function () {
  'use strict';

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
  'use strict';

  var fixture = document.getElementById('fixture');
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
    axe._tree = null;
  });

  it('should return true if all ARIA attributes are allowed', function () {
    fixture.innerHTML =
      '<div role="textbox" aria-placeholder="foo" id="target"></div>';
    axe.testUtils.flatTreeSetup(fixture);
    var node = fixture.querySelector('#target');
    var virtualNode = axe.utils.getNodeFromTree(node);

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, node, {}, virtualNode)
    );
  });
});
```

## Shadow DOM Test

```javascript
it('should work with Shadow DOM', function () {
  var shadowSupport = axe.testUtils.shadowSupport.v1;
  if (!shadowSupport) {
    this.skip();
  }

  fixture.innerHTML = '<div id="host"></div>';
  var host = fixture.querySelector('#host');
  var shadowRoot = host.attachShadow({ mode: 'open' });
  shadowRoot.innerHTML = '<div role="button" id="target">Test</div>';

  axe.testUtils.flatTreeSetup(fixture);
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
