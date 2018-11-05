describe('link-text', function() {
  'use strict';

  var fixture = document.getElementById('fixture');
  var shadowSupport = axe.testUtils.shadowSupport.v1;
  var checkSetup = axe.testUtils.checkSetup;

  afterEach(function() {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('should return true if title text is different then other "a" tag and link text is same', function() {
    checkSetup('<a id="testElem" title="woohoo" href="#1">some text</a>' +
               '<a title="woohoo2" href="#2">some text</a>',
               '#fixture');
    var testElem = document.getElementById('testElem');
    assert.isTrue(checks['link-text'].evaluate(testElem));
  });

  it('should return true if both links have the same href', function() {
    checkSetup('<a id="testElem" title="woohoo" href="#1">some text</a>' +
               '<a title="woohoo" href="#1">some text</a>',
               '#fixture');
    var testElem = document.getElementById('testElem');
    assert.isTrue(checks['link-text'].evaluate(testElem));
  });

  it('should return true if link text different then other "a" tag and title text is same', function() {
    checkSetup('<a id="testElem" title="woohoo" href="#1">some text</a>' +
               '<a title="woohoo2" href="#2">some text1</a>',
               '#fixture');
    var testElem = document.getElementById('testElem');
    assert.isTrue(checks['link-text'].evaluate(testElem));
  });

  it('should return true if link text is the same but description text is different', function() {
    checkSetup('<a id="testElem" aria-describedby="descriptionText" title="woohoo" href="#1">some text</a>' +
               '<a title="woohoo" href="#2">some text</a>' +
               '<div id="descriptionText">This description</div>',
               '#fixture');
    var testElem = document.getElementById('testElem');
    assert.isTrue(checks['link-text'].evaluate(testElem));
  });

  it('should return false if link text and description text is the same', function() {
    checkSetup('<a id="testElem" aria-describedby="descriptionText" title="woohoo" href="#1">some text</a>' +
               '<a title="woohoo" aria-describedby="descriptionText" href="#2">some text</a>' +
               '<div id="descriptionText">This description</div>',
               '#fixture');
    var testElem = document.getElementById('testElem');
    assert.isFalse(checks['link-text'].evaluate(testElem));
  });

  it('should return false if both link and title text is the same as other "a" tag', function() {
    checkSetup('<a id="testElem" title="woohoo" href="#1">some text</a>' +
               '<a title="woohoo" href="#2">some text</a>',
               '#fixture');
    var testElem = document.getElementById('testElem');
    assert.isFalse(checks['link-text'].evaluate(testElem));
  });

  (shadowSupport ? it : xit)('works on elements in a shadow DOM', function() {
    checkSetup('<div id="shadow"> <a id="anchor1" href="#1" title="1">some text</a> </div>',
               '#fixture');
    var shadowRoot = document
      .getElementById('shadow')
      .attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<slot></slot><a id="anchor2" href="#2" title="1">some text</a>' +
                           '<a id="anchor3" href="#3" title="2">some text</a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);

    var anchor1 = document.querySelector('#anchor1');
    assert.isFalse(
      checks['link-text'].evaluate(anchor1)
    );

    var anchor2 = shadowRoot.querySelector('#anchor2');
    assert.isFalse(
      checks['link-text'].evaluate(anchor2)
    );

    var anchor3 = shadowRoot.querySelector('#anchor3');
    assert.isTrue(
      checks['link-text'].evaluate(anchor3)
    );
  });
});
