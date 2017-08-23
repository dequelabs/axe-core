describe('dom.findElmsInContext', function () {
  'use strict';

  var shadowSupport = axe.testUtils.shadowSupport;
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var findElmsInContext = axe.commons.dom.findElmsInContext;

  afterEach(function () {
    fixtureSetup('');
  });

  it('returns an array or elements in the same context', function () {
    var fixture = fixtureSetup(
      '<b name="foo">1</b>' + 
      '<b name="foo">2</b>' + 
      '<b name="bar">3</b>' + 
      '<i name="foo">4</i>');

    assert.deepEqual(
      findElmsInContext({ elm: 'b', attr: 'name', value: 'foo', context: fixture }),
      Array.from( document.querySelectorAll('b[name=foo]') )
    );
  });

  (shadowSupport.v1 ? it : xit)('ignores elements inside shadow tree', function () {
    var node = document.createElement('div');
    node.innerHTML = '<b name="foo">1</b>';
    var shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<b name="foo">2</b> <slot></slot>';
    var fixture = fixtureSetup(node);

    var result = findElmsInContext({
      elm: 'b', attr: 'name', value: 'foo', context: fixture
    });
    assert.lengthOf(result, 1);
    assert.equal(result[0].innerText, '1');
  });

  (shadowSupport.v1 ? it : xit)('can search elements limited to the shadow tree', function () {
    var node = document.createElement('div');
    node.innerHTML = '<b name="foo">1</b>';
    var shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<b name="foo">2</b><slot></slot>';
    fixtureSetup(node);

    var result = findElmsInContext({
      elm: 'b', attr: 'name', value: 'foo', context: shadow
    });

    assert.lengthOf(result, 1);
    assert.equal(result[0].innerText, '2');
  });
});
