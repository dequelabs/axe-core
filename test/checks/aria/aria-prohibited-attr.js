describe('aria-prohibited-attr', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;
  var checkEvaluate = axe.testUtils.getCheckEvaluate('aria-prohibited-attr');

  afterEach(function () {
    checkContext.reset();
  });

  it('should return true for prohibited attributes and no content', function () {
    var params = checkSetup(
      '<div id="target" role="code" aria-hidden="false" aria-label="foo"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: 'code',
      messageKey: 'hasRoleSingular',
      prohibited: ['aria-label']
    });
  });

  it('should return undefined for prohibited attributes and content', function () {
    var params = checkSetup(
      '<div id="target" role="code" aria-hidden="false" aria-label="foo">Contents</div>'
    );
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: 'code',
      messageKey: 'hasRoleSingular',
      prohibited: ['aria-label']
    });
  });

  it('should return true for multiple prohibited attributes', function () {
    var params = checkSetup(
      '<div id="target" role="code" aria-hidden="false"  aria-label="foo" aria-labelledby="foo"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: 'code',
      messageKey: 'hasRolePlural',
      // attribute order not important
      prohibited: ['aria-label', 'aria-labelledby']
    });
  });

  it('should return undefined if element has no role and has text content (singular)', function () {
    var params = checkSetup('<div id="target" aria-label="foo">Contents</div>');
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: null,
      messageKey: 'noRoleSingular',
      prohibited: ['aria-label']
    });
  });

  it('should return undefined if element has no role and has text content (plural)', function () {
    var params = checkSetup(
      '<div id="target" aria-label="foo" aria-labelledby="foo">Contents</div>'
    );
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: null,
      messageKey: 'noRolePlural',
      prohibited: ['aria-label', 'aria-labelledby']
    });
  });

  it('should return true if element has no role and no text content (singular)', function () {
    var params = checkSetup('<div id="target" aria-label="foo"></div>');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: null,
      messageKey: 'noRoleSingular',
      prohibited: ['aria-label']
    });
  });

  it('should return true if element has no role and no text content (plural)', function () {
    var params = checkSetup(
      '<div id="target" aria-label="foo" aria-labelledby="foo"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: null,
      messageKey: 'noRolePlural',
      prohibited: ['aria-label', 'aria-labelledby']
    });
  });

  it('should return false if all attributes are allowed', function () {
    var params = checkSetup(
      '<div id="target" role="button" aria-label="foo" aria-labelledby="foo">Contents</div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should return false if no prohibited attributes are used', function () {
    var params = checkSetup(
      '<div id="target" role="code" aria-selected="true">Contents</div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should return false if prohibited attributes have no value', function () {
    var params = checkSetup(
      '<div id="target" role="code" aria-label="  " aria-labelledby="  ">Contents</div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should allow `elementsAllowedAriaLabel` nodes to have aria-label', function () {
    var params = checkSetup(
      '<div id="target" aria-label="hello world"></div>',
      { elementsAllowedAriaLabel: ['div'] }
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should not allow `elementsAllowedAriaLabel` nodes with a prohibited role', function () {
    var params = checkSetup(
      '<div id="target" role="code" aria-label="hello world"></div>',
      { elementsAllowedAriaLabel: ['div'] }
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should allow elements that have an implicit role in chromium', function () {
    var params = checkSetup('<svg id="target" aria-label="hello world"></svg>');
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });
});
