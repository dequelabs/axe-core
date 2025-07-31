describe('axe.utils.getXpath', () => {
  'use strict';

  const fixture = document.getElementById('fixture');

  it('should be a function', () => {
    assert.isFunction(axe.utils.getXpath);
  });

  it('should generate an XPath selector', () => {
    const node = document.createElement('div');
    fixture.appendChild(node);

    const sel = axe.utils.getXpath(node);

    assert.equal(sel, "//div[@id='fixture']/div");
  });

  it('should handle special characters', () => {
    const node = document.createElement('div');
    node.id = 'monkeys#are.animals\\ok';
    fixture.appendChild(node);
    assert.equal(
      axe.utils.getXpath(node),
      "//div[@id='monkeys#are.animals\\ok']"
    );
  });

  it('should stop on unique ID', () => {
    const node = document.createElement('div');
    node.id = 'monkeys';
    fixture.appendChild(node);

    const sel = axe.utils.getXpath(node);
    assert.equal(sel, "//div[@id='monkeys']");
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
  });

  it('should work on the documentElement', () => {
    const sel = axe.utils.getXpath(document.documentElement);
    assert.equal(sel, '/html');
  });

  it('should work on the body', () => {
    const sel = axe.utils.getXpath(document.body);
    assert.equal(sel, '/html/body');
  });

  it('should work on namespaced elements', () => {
    fixture.innerHTML = '<hx:include>Hello</hx:include>';
    const node = fixture.firstChild;
    const sel = axe.utils.getXpath(node);

    assert.equal(sel, "//div[@id='fixture']/hx:include");
  });
});
