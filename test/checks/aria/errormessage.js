describe('aria-errormessage', function() {
  'use strict';

  var fixture = document.getElementById('fixture');
  var shadowSupported = axe.testUtils.shadowSupport.v1;
  var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function() {
    fixture.innerHTML = '';
    checkContext.reset();
    axe.reset();
  });

  it('should return false if aria-errormessage value is invalid', function() {
    fixture.innerHTML =
      '<div aria-errormessage="plain" aria-invalid="true">' +
      '<div id="plain"></div>';
    var target = fixture.children[0];
    target.setAttribute('aria-errormessage', 'plain');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, target)
    );
  });

  it('should return undefined if aria-errormessage references an element that does not exist', function() {
    fixture.innerHTML =
      '<div aria-errormessage="plain" aria-invalid="true">' + '<div></div>';
    var target = fixture.children[0];
    target.setAttribute('aria-errormessage', 'plain');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, target)
    );
  });

  it('should return true if aria-errormessage id is alert', function() {
    fixture.innerHTML =
      '<div aria-errormessage="alert" aria-invalid="true">' +
      '<div id="alert" role="alert"></div>';
    var target = fixture.children[0];
    target.setAttribute('aria-errormessage', 'alert');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, target)
    );
  });

  it('should return true if aria-errormessage id is aria-live=assertive', function() {
    fixture.innerHTML =
      '<div aria-errormessage="live" aria-invalid="true">' +
      '<div id="live" aria-live="assertive"></div>';
    var target = fixture.children[0];
    target.setAttribute('aria-errormessage', 'live');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, target)
    );
  });

  it('should return true if aria-errormessage id is aria-describedby', function() {
    fixture.innerHTML =
      '<div aria-errormessage="plain" aria-describedby="plain" aria-invalid="true">' +
      '<div id="plain"></div>';
    var target = fixture.children[0];
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, target)
    );
  });

  it('sets an array of IDs in data', function() {
    fixture.innerHTML =
      '<div aria-errormessage=" foo  bar \tbaz  " aria-invalid="true">' +
      '<div id="plain"></div>';
    var target = fixture.children[0];
    axe.testUtils
      .getCheckEvaluate('aria-errormessage')
      .call(checkContext, target);
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
    fixture.innerHTML = '<div aria-errormessage=" " aria-invalid="true"></div>';
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, fixture.children[0])
    );
  });

  it('should return true when aria-invalid is not set', function() {
    fixture.innerHTML =
      '<div aria-errormessage="plain">' + '<div id="plain"></div>';
    var target = fixture.children[0];
    target.setAttribute('aria-errormessage', 'plain');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, target)
    );
  });

  it('should return true when aria-invalid=false', function() {
    fixture.innerHTML =
      '<div aria-errormessage="plain" aria-invalid="false">' +
      '<div id="plain"></div>';
    var target = fixture.children[0];
    target.setAttribute('aria-errormessage', 'plain');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, target)
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
    fixture.innerHTML = '<div aria-errormessage=" " aria-invalid="true"></div>';
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, fixture.children[0])
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
});
