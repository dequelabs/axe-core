describe('no-implicit-explicit-label', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var check = checks['no-implicit-explicit-label'];
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('returns false when there is no label text or accessible text', function () {
    var vNode = queryFixture(
      '<div id="target" role="searchbox" contenteditable="true"></div>'
    );
    var actual = check.evaluate.call(checkContext, null, {}, vNode);
    assert.isFalse(actual);
  });

  it('returns undefined when there is no accessible text', function () {
    var vNode = queryFixture(
      '<label for="target">Choose currency:</label><div id="target" role="searchbox" contenteditable="true"></div>'
    );
    var actual = check.evaluate.call(checkContext, null, {}, vNode);
    assert.isUndefined(actual);
  });

  it('returns undefined when accessible text does not contain label text', function () {
    var vNode = queryFixture(
      '<label for="target">Choose country:</label><div id="target" aria-label="country" role="combobox">England</div>'
    );
    var actual = check.evaluate.call(checkContext, null, {}, vNode);
    assert.isUndefined(actual);
  });

  it('returns false when accessible text contains label text', function () {
    var vNode = queryFixture(
      '<label for="target">Country</label><div id="target" aria-label="Choose country" role="combobox">England</div>'
    );
    var actual = check.evaluate.call(checkContext, null, {}, vNode);
    assert.isFalse(actual);
  });

  describe('SerialVirtualNode', function () {
    it('should return false if there is no parent', function () {
      var serialNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'combobox',
          'aria-label': 'woohoo'
        }
      });
      serialNode.parent = null;

      var actual = check.evaluate.call(checkContext, null, {}, serialNode);
      assert.isFalse(actual);
    });

    it('should return undefined if incomplete tree', function () {
      var serialNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'combobox',
          'aria-label': 'woohoo'
        }
      });

      var actual = check.evaluate.call(checkContext, null, {}, serialNode);
      assert.isUndefined(actual);
    });
  });
});
