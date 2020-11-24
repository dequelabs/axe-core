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
    var testHTML = '<div></div>';
    testHTML += '<div id="plain"></div>';
    fixture.innerHTML = testHTML;
    var target = fixture.children[0];
    target.setAttribute('aria-errormessage', 'plain');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, target)
    );
  });

  it('should return undefined if aria-errormessage references an element that does not exist', function() {
    var testHTML = '<div></div>';
    fixture.innerHTML = testHTML;
    var target = fixture.children[0];
    target.setAttribute('aria-errormessage', 'plain');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, target)
    );
  });

  it('should return true if aria-errormessage id is alert', function() {
    var testHTML = '<div></div>';
    testHTML += '<div id="alert" role="alert"></div>';
    fixture.innerHTML = testHTML;
    var target = fixture.children[0];
    target.setAttribute('aria-errormessage', 'alert');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, target)
    );
  });

  it('should return true if aria-errormessage id is aria-live=assertive', function() {
    var testHTML = '<div></div>';
    testHTML += '<div id="live" aria-live="assertive"></div>';
    fixture.innerHTML = testHTML;
    var target = fixture.children[0];
    target.setAttribute('aria-errormessage', 'live');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, target)
    );
  });

  it('should return true if aria-errormessage id is aria-describedby', function() {
    var testHTML = '<div></div>';
    testHTML += '<div id="plain"></div>';
    fixture.innerHTML = testHTML;
    var target = fixture.children[0];
    target.setAttribute('aria-errormessage', 'plain');
    target.setAttribute('aria-describedby', 'plain');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, target)
    );
  });

  it('sets an array of IDs in data', function() {
    var testHTML = '<div></div>';
    testHTML += '<div id="plain"></div>';
    fixture.innerHTML = testHTML;
    var target = fixture.children[0];
    target.setAttribute('aria-errormessage', ' foo  bar \tbaz  ');
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
    fixture.innerHTML = '<div aria-errormessage=" "></div>';
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, fixture.children[0])
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
    fixture.innerHTML = '<div aria-errormessage=" "></div>';
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
        '<div id="target" aria-errormessage="live"></div>',
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
        '<div id="target" aria-errormessage="live"</div>' +
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
        '<div id="target" aria-errormessage="live"</div>' +
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
