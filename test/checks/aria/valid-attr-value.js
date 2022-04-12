describe('aria-valid-attr-value', function() {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var checkContext = axe.testUtils.MockCheckContext();
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  var shadowSupported = axe.testUtils.shadowSupport.v1;

  afterEach(function() {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should not check the validity of attribute names', function() {
    var vNode = queryFixture(
      '<div id="target" aria-cats="true" aria-selected="true"></div>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });

  it('should return true if all values are valid', function() {
    var vNode = queryFixture(
      '<div id="target" aria-selected="true" aria-checked="true" aria-relevant="additions removals"></div>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });

  it('should return true if idref(s) values are valid', function() {
    var vNode = queryFixture(
      '<div id="target" aria-owns="test_tgt1 test_tgt2" aria-activedescendant="test_tgt1"></div>' +
        '<div id="test_tgt1"></div>' +
        '<div id="test_tgt2"></div>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });

  it('should return false if any values are invalid', function() {
    var vNode = queryFixture(
      '<div id="target" aria-live="polite" aria-selected="0"></div>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['aria-selected="0"']);
  });

  it('should allow empty strings rather than idref', function() {
    var tree = fixtureSetup(
      '<button aria-controls="">Button</button>' +
        '<div aria-activedescendant=""></div>'
    );
    var passing1 = tree.children[0];
    var passing2 = tree.children[1];
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, passing1)
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, passing2)
    );
  });

  it('should allow empty strings rather than idrefs', function() {
    var tree = fixtureSetup(
      '<button aria-labelledby="">Button</button>' + '<div aria-owns=""></div>'
    );
    var passing1 = tree.children[0];
    var passing2 = tree.children[1];
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, passing1)
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, passing2)
    );
  });

  it('should pass on aria-controls and aria-expanded=false when the element is not in the DOM', function() {
    var vNode = queryFixture(
      '<button id="target" aria-controls="test" aria-expanded="false">Button</button>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should pass on aria-controls and aria-selected=false when the element is not in the DOM', function() {
    var vNode = queryFixture(
      '<button id="target" aria-controls="test" aria-selected="false">Button</button>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should fail on aria-controls and aria-expanded=true when the element is not in the DOM', function() {
    var vNode = queryFixture(
      '<button id="target" aria-controls="test" aria-expanded="true">Button</button>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should fail on aria-controls and aria-selected=true when the element is not in the DOM', function() {
    var vNode = queryFixture(
      '<button id="target" aria-controls="test" aria-selected="true">Button</button>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should fail on aria-controls when the element is not in the DOM', function() {
    var vNode = queryFixture(
      '<button id="target" aria-controls="test">Button</button>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should pass on aria-owns and aria-expanded=false when the element is not in the DOM', function() {
    var vNode = queryFixture(
      '<button id="target" aria-owns="test" aria-expanded="false">Button</button>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should fail on aria-owns and aria-expanded=true when the element is not in the DOM', function() {
    var vNode = queryFixture(
      '<button id="target" aria-owns="test" aria-expanded="true">Button</button>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should fail on aria-owns when the element is not in the DOM', function() {
    var vNode = queryFixture(
      '<button id="target" aria-owns="test">Button</button>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should fail on aria-level when the value is less than 1', function() {
    var vNode = queryFixture(
      '<div id="target" role="heading" aria-level="0">Heading</div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return undefined on aria-describedby when the element is not in the DOM', function() {
    var vNode = queryFixture(
      '<button id="target" aria-describedby="test">Button</button>'
    );
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'noId',
      needsReview: 'aria-describedby="test"'
    });
  });

  (shadowSupported ? it : xit)(
    'should return undefined on aria-describedby when the element is in a different shadow tree',
    function() {
      var params = shadowCheckSetup(
        '<div></div>',
        '<button id="target" aria-describedby="test">Button</button>'
      );
      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('aria-valid-attr-value')
          .apply(checkContext, params)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'noIdShadow',
        needsReview: 'aria-describedby="test"'
      });
    }
  );

  it('should return undefined on aria-labelledby when the element is not in the DOM', function() {
    var vNode = queryFixture(
      '<button id="target" aria-labelledby="test">Button</button>'
    );
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'noId',
      needsReview: 'aria-labelledby="test"'
    });
  });

  (shadowSupported ? it : xit)(
    'should return undefined on aria-labelledby when the element is in a different shadow tree',
    function() {
      var params = shadowCheckSetup(
        '<div></div>',
        '<button id="target" aria-labelledby="test">Button</button>'
      );
      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('aria-valid-attr-value')
          .apply(checkContext, params)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'noIdShadow',
        needsReview: 'aria-labelledby="test"'
      });
    }
  );

  it('should return undefined on aria-current with invalid value', function() {
    var vNode = queryFixture(
      '<button id="target" aria-current="test">Button</button>'
    );
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true on valid aria-labelledby value within img elm', function() {
    var vNode = queryFixture(
      '<div id="foo">hello world</div>' +
        '<img id="target" role="button" aria-labelledby="foo"/>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return undefined on invalid aria-labelledby value within img elm', function() {
    var vNode = queryFixture(
      '<div id="foo">hello world</div>' +
        '<img id="target" role="button" aria-labelledby="hazaar"/>'
    );
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr-value')
        .call(checkContext, null, null, vNode)
    );
  });

  describe('options', function() {
    it('should exclude supplied attributes', function() {
      var vNode = queryFixture(
        '<div id="target" aria-live="nope" aria-describedby="no exist k thx"></div>'
      );
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-valid-attr-value')
          .call(checkContext, null, ['aria-live', 'aria-describedby'], vNode)
      );
    });
  });

  describe('SerialVirtualNode', function() {
    it('should return undefined for idref attribute', function() {
      var vNode = new axe.SerialVirtualNode({
        nodeName: 'button',
        attributes: {
          'aria-owns': 'test'
        }
      });
      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('aria-valid-attr-value')
          .call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'idrefs',
        needsReview: 'aria-owns="test"'
      });
    });

    it('should return true for empty idref attribute', function() {
      var vNode = new axe.SerialVirtualNode({
        nodeName: 'button',
        attributes: {
          'aria-owns': ''
        }
      });
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-valid-attr-value')
          .call(checkContext, null, null, vNode)
      );
    });
  });
});
