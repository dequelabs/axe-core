describe('axe.utils.getXpath', () => {
  'use strict';

  const fixture = document.getElementById('fixture');

  // @see https://stackoverflow.com/a/14284815/2124254
  function getElementByXPath(path) {
    return document.evaluate(
      path,
      document,
      () => 'http://www.w3.org/1998/Math/MathML',
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  }

  it('should be a function', () => {
    assert.isFunction(axe.utils.getXpath);
  });

  it('should generate an XPath selector', () => {
    const node = document.createElement('div');
    fixture.appendChild(node);

    const sel = axe.utils.getXpath(node);

    assert.equal(sel, "//div[@id='fixture']/div");
    assert.equal(node, getElementByXPath(sel));
  });

  it('should handle special characters', () => {
    const node = document.createElement('div');
    node.id = 'monkeys#are.animals\\ok';
    fixture.appendChild(node);

    const sel = axe.utils.getXpath(node);

    assert.equal(sel, "//div[@id='monkeys#are.animals\\ok']");

    assert.equal(node, getElementByXPath(sel));
  });

  it('should stop on unique ID', () => {
    const node = document.createElement('div');
    node.id = 'monkeys';
    fixture.appendChild(node);

    const sel = axe.utils.getXpath(node);
    assert.equal(sel, "//div[@id='monkeys']");
    assert.equal(node, getElementByXPath(sel));
  });

  it('should use the nearest unique ID', () => {
    fixture.innerHTML = `
      <div id="dogs">
        <div>
          <div>
            <div id="monkeys">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    `;
    const node = fixture.querySelector('#monkeys > div');

    const sel = axe.utils.getXpath(node);
    assert.equal(sel, "//div[@id='monkeys']/div");
    assert.equal(node, getElementByXPath(sel));
  });

  it('should not use ids if they are not unique', () => {
    let node = document.createElement('div');
    node.id = 'monkeys';
    fixture.appendChild(node);

    node = document.createElement('div');
    node.id = 'monkeys';
    fixture.appendChild(node);

    const sel = axe.utils.getXpath(node);

    assert.equal(sel, "//div[@id='fixture']/div[2]");
    assert.equal(node, getElementByXPath(sel));
  });

  it('should properly calculate number when siblings are of different type', () => {
    let node, target;
    node = document.createElement('span');
    fixture.appendChild(node);

    node = document.createElement('span');
    fixture.appendChild(node);

    node = document.createElement('div');
    fixture.appendChild(node);

    node = document.createElement('div');
    target = node;
    fixture.appendChild(node);

    node = document.createElement('div');
    fixture.appendChild(node);

    node = document.createElement('span');
    fixture.appendChild(node);

    const sel = axe.utils.getXpath(target);

    assert.equal(sel, "//div[@id='fixture']/div[2]");
    assert.equal(target, getElementByXPath(sel));
  });

  it('should work on the documentElement', () => {
    const sel = axe.utils.getXpath(document.documentElement);
    assert.equal(sel, '/html');
    assert.equal(document.documentElement, getElementByXPath(sel));
  });

  it('should work on the body', () => {
    const sel = axe.utils.getXpath(document.body);
    assert.equal(sel, '/html/body');
    assert.equal(document.body, getElementByXPath(sel));
  });

  it('should work on namespaced elements', function () {
    fixture.innerHTML = '<hx:include>Hello</hx:include>';
    var node = fixture.firstChild;
    var sel = axe.utils.getXpath(node);

    assert.equal(sel, "//div[@id='fixture']/hx:include");
    // couldn't figure out how to use document.evaluate to select an element with namespace
  });
});
