describe('hidden-explicit-label', function () {
  'use strict';

  var shadowSupport = axe.testUtils.shadowSupport;
  var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;
  var check = checks['hidden-explicit-label'];

  afterEach(function () {
    checkContext.reset();
  });

  it('should return true if a hidden non-empty label is present', function () {
    var args = checkSetup(
      '<label for="target" style="display:none">Text</label><input type="text" id="target">',
      {},
      '#target'
    );
    assert.isTrue(check.evaluate.apply(check, args));
  });

  it('should return false if a visible non-empty label is present', function () {
    var args = checkSetup(
      '<label for="target">Label</label><input type="text" id="target">'
    );
    assert.isFalse(check.evaluate.apply(check, args));
  });

  it('should return true if an invisible empty label is present', function () {
    var args = checkSetup(
      '<label for="target" style="display: none;"></label><input type="text" id="target">'
    );
    assert.isTrue(check.evaluate.apply(check, args));
  });

  (shadowSupport.v1 ? it : xit)(
    'should return true if content is inside of shadow DOM',
    function () {
      var params = shadowCheckSetup(
        '<div></div>',
        '<label for="target" style="display:none">Text</label><input type="text" id="target">'
      );

      assert.isTrue(check.evaluate.apply(shadowCheckSetup, params));
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should return false if part of the pairing is inside of shadow DOM',
    function () {
      var params = shadowCheckSetup(
        '<div><label for="target" style="display:none">Text</label></div>',
        '<input type="text" id="target">'
      );

      assert.isFalse(check.evaluate.apply(shadowCheckSetup, params));
    }
  );

  it('should fail when the label has aria-hidden=true', function () {
    var html = '';
    html += '<div>';
    html += '  <label for="target" aria-hidden="true">';
    html += '    Hello world';
    html += '  </label>';
    html += '  <input id="target">';
    html += '</div>';
    var args = checkSetup(html, {}, '#target');
    assert.isTrue(check.evaluate.apply(check, args));
  });

  describe('if the label is hidden', function () {
    describe('and the element has an accessible name', function () {
      it('should not fail', function () {
        var html = '';

        html += '<div>';
        html += '  <label for="target" style="display:none">';
        html += '    Hello world';
        html += '  </label>';
        html += '  <input id="target" title="Hi">';
        html += '</div>';

        var args = checkSetup(html, {}, '#target');
        assert.isFalse(check.evaluate.apply(check, args));
      });
    });
  });

  describe('SerialVirtualNode', function () {
    it('should return false if no id', function () {
      var vNode = new axe.SerialVirtualNode({
        nodeName: 'input',
        attributes: {
          type: 'text'
        }
      });
      assert.isFalse(
        axe.testUtils.getCheckEvaluate('hidden-explicit-label')(null, {}, vNode)
      );
    });

    it('should return undefined if it has id', function () {
      var vNode = new axe.SerialVirtualNode({
        nodeName: 'input',
        attributes: {
          type: 'text',
          id: 'foobar'
        }
      });
      assert.isUndefined(
        axe.testUtils.getCheckEvaluate('hidden-explicit-label')(null, {}, vNode)
      );
    });
  });
});
