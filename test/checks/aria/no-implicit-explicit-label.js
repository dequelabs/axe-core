describe('no-implicit-explicit-label', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let check = checks['no-implicit-explicit-label'];
  let checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('returns false when there is no label text or accessible text', function () {
    let vNode = queryFixture(
      '<div id="target" role="searchbox" contenteditable="true"></div>'
    );
    let actual = check.evaluate.call(checkContext, null, {}, vNode);
    assert.isFalse(actual);
  });

  it('returns undefined when there is no accessible text', function () {
    let vNode = queryFixture(
      '<label for="target">Choose currency:</label><div id="target" role="searchbox" contenteditable="true"></div>'
    );
    let actual = check.evaluate.call(checkContext, null, {}, vNode);
    assert.isUndefined(actual);
  });

  it('returns undefined when accessible text does not contain label text', function () {
    let vNode = queryFixture(
      '<label for="target">Choose country:</label><div id="target" aria-label="country" role="combobox">England</div>'
    );
    let actual = check.evaluate.call(checkContext, null, {}, vNode);
    assert.isUndefined(actual);
  });

  it('returns false when accessible text contains label text', function () {
    let vNode = queryFixture(
      '<label for="target">Country</label><div id="target" aria-label="Choose country" role="combobox">England</div>'
    );
    let actual = check.evaluate.call(checkContext, null, {}, vNode);
    assert.isFalse(actual);
  });

  describe('SerialVirtualNode', function () {
    it('should return false if there is no parent', function () {
      let serialNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'combobox',
          'aria-label': 'woohoo'
        }
      });
      serialNode.parent = null;

      let actual = check.evaluate.call(checkContext, null, {}, serialNode);
      assert.isFalse(actual);
    });

    it('should return undefined if incomplete tree', function () {
      let serialNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'combobox',
          'aria-label': 'woohoo'
        }
      });

      let actual = check.evaluate.call(checkContext, null, {}, serialNode);
      assert.isUndefined(actual);
    });
  });
});
