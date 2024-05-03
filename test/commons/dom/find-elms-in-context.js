describe('dom.findElmsInContext', function () {
  'use strict';

  let shadowSupport = axe.testUtils.shadowSupport;
  let fixtureSetup = axe.testUtils.fixtureSetup;
  let findElmsInContext = axe.commons.dom.findElmsInContext;

  it('returns an array or elements in the same context', function () {
    let rootNode = fixtureSetup(
      '<b name="foo">1</b>' +
        '<b name="foo">2</b>' +
        '<b name="bar">3</b>' +
        '<i name="foo">4</i>'
    );

    assert.deepEqual(
      findElmsInContext({
        elm: 'b',
        attr: 'name',
        value: 'foo',
        context: rootNode.actualNode
      }),
      Array.from(document.querySelectorAll('b[name=foo]'))
    );
  });

  (shadowSupport.v1 ? it : xit)(
    'ignores elements inside shadow tree',
    function () {
      let node = document.createElement('div');
      node.innerHTML = '<b name="foo">1</b>';
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<b name="foo">2</b> <slot></slot>';
      let rootNode = fixtureSetup(node);

      let result = findElmsInContext({
        elm: 'b',
        attr: 'name',
        value: 'foo',
        context: rootNode.actualNode
      });
      assert.lengthOf(result, 1);
      assert.equal(result[0].innerText, '1');
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'can search elements limited to the shadow tree',
    function () {
      let node = document.createElement('div');
      node.innerHTML = '<b name="foo">1</b>';
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<b name="foo">2</b><slot></slot>';
      fixtureSetup(node);

      let result = findElmsInContext({
        elm: 'b',
        attr: 'name',
        value: 'foo',
        context: shadow
      });

      assert.lengthOf(result, 1);
      assert.equal(result[0].innerText, '2');
    }
  );
});
