describe('presentational-role', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var checkEvaluate = axe.testUtils.getCheckEvaluate('presentational-role');
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should detect role="none" on the element', function () {
    var vNode = queryFixture('<div id="target" role="none"></div>');

    assert.isTrue(checkEvaluate.call(checkContext, null, null, vNode));
    assert.deepEqual(checkContext._data.role, 'none');
  });

  it('should detect role="presentation" on the element', function () {
    var vNode = queryFixture('<div id="target" role="presentation"></div>');

    assert.isTrue(checkEvaluate.call(checkContext, null, null, vNode));
    assert.deepEqual(checkContext._data.role, 'presentation');
  });

  it('should return false when role !== none', function () {
    var vNode = queryFixture('<div id="target" role="cats"></div>');

    assert.isFalse(checkEvaluate.call(checkContext, null, null, vNode));
  });

  it('should return false when there is no role attribute', function () {
    var vNode = queryFixture('<div id="target"></div>');

    assert.isFalse(checkEvaluate.call(checkContext, null, null, vNode));
  });

  it('should return false when the element is focusable', function () {
    var vNode = queryFixture(
      '<button id="target" role="none">Still a button</button>'
    );

    assert.isFalse(checkEvaluate.call(checkContext, null, null, vNode));
    assert.deepEqual(checkContext._data.messageKey, 'focusable');
  });

  it('should return false when the element has global aria attributes', function () {
    var vNode = queryFixture(
      '<img id="target" role="none" aria-live="assertive" />'
    );

    assert.isFalse(checkEvaluate.call(checkContext, null, null, vNode));
    assert.deepEqual(checkContext._data.messageKey, 'globalAria');
  });

  it('should return false when the element has global aria attributes and is focusable', function () {
    var vNode = queryFixture(
      '<button id="target" role="none" aria-live="assertive">Still a button</button>'
    );

    assert.isFalse(checkEvaluate.call(checkContext, null, null, vNode));
    assert.deepEqual(checkContext._data.messageKey, 'both');
  });

  it('should return false for iframe element with role=none and title', function () {
    var vNode = queryFixture(
      '<iframe id="target" role="none" title="  "></iframe>'
    );

    assert.isFalse(checkEvaluate.call(checkContext, null, null, vNode));
    assert.deepEqual(checkContext._data, {
      messageKey: 'iframe',
      nodeName: 'iframe'
    });
  });

  it('should return false for iframe element with role=presentation and title', function () {
    var vNode = queryFixture(
      '<iframe id="target" role="presentation" title=""></iframe>'
    );

    assert.isFalse(checkEvaluate.call(checkContext, null, null, vNode));
    assert.deepEqual(checkContext._data, {
      messageKey: 'iframe',
      nodeName: 'iframe'
    });
  });
});
