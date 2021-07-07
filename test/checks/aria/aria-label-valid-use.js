describe('aria-label-valid-use tests', function() {
  'use strict';

  var fixture = document.querySelector('#fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var ariaLabelValid = axe.testUtils.getCheckEvaluate('aria-label-valid-use');

  afterEach(function() {
    fixture.innerHTML = '';
  });

  it('should return true when used on a focusable element', function() {
    var vNode = queryFixture('<button id="target" aria-label="foo"></button>');
    assert.isTrue(ariaLabelValid(null, null, vNode));

    vNode = queryFixture('<a href="#" id="target" aria-label="foo"></a>');
    assert.isTrue(ariaLabelValid(null, null, vNode));

    vNode = queryFixture('<input id="target" aria-label="foo" />');
    assert.isTrue(ariaLabelValid(null, null, vNode));
  });

  it('should return true when used on a landmark role', function() {
    var vNode = queryFixture('<main id="target" aria-label="foo"></main>');
    assert.isTrue(ariaLabelValid(null, null, vNode));

    vNode = queryFixture(
      '<div id="target" role="main" aria-label="foo"></div>'
    );
    assert.isTrue(ariaLabelValid(null, null, vNode));

    vNode = queryFixture('<form id="target" aria-label="foo"></form>');
    assert.isTrue(ariaLabelValid(null, null, vNode));
  });

  it('should return true when used on a widget role', function() {
    var vNode = queryFixture(
      '<div id="target" role="button" aria-label="foo"></div>'
    );
    assert.isTrue(ariaLabelValid(null, null, vNode));

    vNode = queryFixture(
      '<div id="target" role="slider" aria-label="foo"></div>'
    );
    assert.isTrue(ariaLabelValid(null, null, vNode));
  });

  it('should return true when used on a composite role', function() {
    var vNode = queryFixture(
      '<div id="target" role="combobox" aria-label="foo"></div>'
    );
    assert.isTrue(ariaLabelValid(null, null, vNode));

    vNode = queryFixture(
      '<div id="target" role="tablist" aria-label="foo"></div>'
    );
    assert.isTrue(ariaLabelValid(null, null, vNode));
  });

  it('should return true when used on image and iframe', function() {
    var vNode = queryFixture('<img id="target" aria-label="foo"></img>');
    assert.isTrue(ariaLabelValid(null, null, vNode));

    vNode = queryFixture('<iframe id="target" aria-label="foo"></iframe>');
    assert.isTrue(ariaLabelValid(null, null, vNode));
  });

  it('should return false if used on static elements', function() {
    var vNode = queryFixture('<p id="target" aria-label="foo"></p>');
    assert.isFalse(ariaLabelValid(null, null, vNode));

    vNode = queryFixture('<div id="target" aria-label="foo"></div>');
    assert.isFalse(ariaLabelValid(null, null, vNode));

    vNode = queryFixture('<i id="target" aria-label="foo"></i>');
    assert.isFalse(ariaLabelValid(null, null, vNode));

    vNode = queryFixture('<span id="target" aria-label="foo"></span>');
    assert.isFalse(ariaLabelValid(null, null, vNode));

    vNode = queryFixture(
      '<div id="target" role="term" aria-label="foo"></div>'
    );
    assert.isFalse(ariaLabelValid(null, null, vNode));
  });
});
