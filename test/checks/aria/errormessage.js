describe('aria-errormessage', function() {
  'use strict';

  var queryFixture = axe.testUtils.queryFixture;
  var shadowSupported = axe.testUtils.shadowSupport.v1;
  var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function() {
    checkContext.reset();
  });

  it('should return false if aria-errormessage value is invalid', function() {
    var vNode = queryFixture(
      '<div id="target" aria-errormessage="plain" aria-invalid="true">' +
        '<div id="plain"></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return undefined if aria-errormessage references an element that does not exist', function() {
    var vNode = queryFixture(
      '<div id="target" aria-errormessage="plain" aria-invalid="true">' +
        '<div></div>'
    );
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true if aria-errormessage id is alert', function() {
    var vNode = queryFixture(
      '<div id="target" aria-errormessage="alert" aria-invalid="true">' +
        '<div id="alert" role="alert"></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true if aria-errormessage id is aria-live=assertive', function() {
    var vNode = queryFixture(
      '<div id="target" aria-errormessage="live" aria-invalid="true">' +
        '<div id="live" aria-live="assertive"></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true if aria-errormessage id is aria-describedby', function() {
    var vNode = queryFixture(
      '<div id="target" aria-errormessage="plain" aria-describedby="plain" aria-invalid="true">' +
        '<div id="plain"></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('sets an array of IDs in data', function() {
    var vNode = queryFixture(
      '<div id="target" aria-errormessage=" foo  bar \tbaz  " aria-invalid="true">' +
        '<div id="plain"></div>'
    );
    axe.testUtils
      .getCheckEvaluate('aria-errormessage')
      .call(checkContext, null, null, vNode);
    assert.deepEqual(checkContext._data, ['foo', 'bar', 'baz']);
  });

  it('returns true when aria-errormessage is empty, if that is allowed', function() {
    axe.configure({
      standards: {
        ariaAttrs: {
          'aria-errormessage': {
            allowEmpty: true
          }
        }
      }
    });
    var vNode = queryFixture(
      '<div id="target" aria-errormessage=" " aria-invalid="true"></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true when aria-invalid is not set', function() {
    var vNode = queryFixture(
      '<div id="target" aria-errormessage="plain">' + '<div id="plain"></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true when aria-invalid=false', function() {
    var vNode = queryFixture(
      '<div id="target" aria-errormessage="plain" aria-invalid="false">' +
        '<div id="plain"></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns false when aria-errormessage is empty, if that is not allowed', function() {
    axe.configure({
      standards: {
        ariaAttrs: {
          'aria-errormessage': {
            allowEmpty: false
          }
        }
      }
    });
    var vNode = queryFixture(
      '<div id="target" aria-errormessage=" " aria-invalid="true"></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  (shadowSupported ? it : xit)(
    'should return undefined if aria-errormessage value crosses shadow boundary',
    function() {
      var params = shadowCheckSetup(
        '<div id="target" aria-errormessage="live" aria-invalid="true"></div>',
        '<div id="live" aria-live="assertive"></div>'
      );
      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('aria-errormessage')
          .apply(checkContext, params)
      );
    }
  );

  (shadowSupported ? it : xit)(
    'should return false if aria-errormessage and invalid reference are both inside shadow dom',
    function() {
      var params = shadowCheckSetup(
        '<div></div>',
        '<div id="target" aria-errormessage="live" aria-invalid="true"></div>' +
          '<div id="live"></div>'
      );
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-errormessage')
          .apply(checkContext, params)
      );
    }
  );

  (shadowSupported ? it : xit)(
    'should return true if aria-errormessage and valid reference are both inside shadow dom',
    function() {
      var params = shadowCheckSetup(
        '<div></div>',
        '<div id="target" aria-errormessage="live" aria-invalid="true"></div>' +
          '<div id="live" aria-live="assertive"></div>'
      );
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-errormessage')
          .apply(checkContext, params)
      );
    }
  );

  describe('SerialVirtualNode', function() {
    it('should return undefined', function() {
      var vNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-invalid': 'true',
          'aria-errormessage': 'test'
        }
      });
      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('aria-errormessage')
          .call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'idrefs',
        values: ['test']
      });
    });
  });
});
