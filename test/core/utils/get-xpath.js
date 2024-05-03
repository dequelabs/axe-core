describe('axe.utils.getXpath', function () {
  'use strict';

  let fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should be a function', function () {
    assert.isFunction(axe.utils.getXpath);
  });

  it('should generate an XPath selector', function () {
    let node = document.createElement('div');
    fixture.appendChild(node);

    let sel = axe.utils.getXpath(node);

    assert.equal(sel, "/div[@id='fixture']/div");
  });

  it('should handle special characters', function () {
    let node = document.createElement('div');
    node.id = 'monkeys#are.animals\\ok';
    fixture.appendChild(node);
    assert.equal(
      axe.utils.getXpath(node),
      "/div[@id='monkeys#are.animals\\ok']"
    );
  });

  it('should stop on unique ID', function () {
    let node = document.createElement('div');
    node.id = 'monkeys';
    fixture.appendChild(node);

    let sel = axe.utils.getXpath(node);
    assert.equal(sel, "/div[@id='monkeys']");
  });

  it('should not use ids if they are not unique', function () {
    let node = document.createElement('div');
    node.id = 'monkeys';
    fixture.appendChild(node);

    node = document.createElement('div');
    node.id = 'monkeys';
    fixture.appendChild(node);

    let sel = axe.utils.getXpath(node);

    assert.equal(sel, "/div[@id='fixture']/div[2]");
  });

  it('should properly calculate number when siblings are of different type', function () {
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

    let sel = axe.utils.getXpath(target);

    assert.equal(sel, "/div[@id='fixture']/div[2]");
  });

  it('should work on the documentElement', function () {
    let sel = axe.utils.getXpath(document.documentElement);
    assert.equal(sel, '/html');
  });

  it('should work on the body', function () {
    let sel = axe.utils.getXpath(document.body);
    assert.equal(sel, '/html/body');
  });

  it('should work on namespaced elements', function () {
    fixture.innerHTML = '<hx:include>Hello</hx:include>';
    let node = fixture.firstChild;
    let sel = axe.utils.getXpath(node);

    assert.equal(sel, "/div[@id='fixture']/hx:include");
  });
});
