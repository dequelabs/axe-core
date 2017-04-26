describe('dom.hasContent', function () {
  'use strict';
  var hasContent = axe.commons.dom.hasContent;
  var fixture = document.getElementById('fixture');

  it('returns false if there is no content', function () {
    fixture.innerHTML = '<div id="target">  </div>';
    assert.isFalse(
      hasContent(document.getElementById('target'))
    );
  });

  it('returns false if there are non-visual elements', function () {
    fixture.innerHTML = '<div id="target"> <span></span> </div>';
    assert.isFalse(
      hasContent(document.getElementById('target'))
    );
  });

  it('is true if the element has non-empty text', function () {
    fixture.innerHTML = '<div id="target"> text </div>';
    assert.isTrue(
      hasContent(document.getElementById('target'))
    );
  });

  it('is true if the element has an aria label', function () {
    fixture.innerHTML = '<div id="target" aria-label="my-label">  </div>';
    assert.isTrue(
      hasContent(document.getElementById('target'))
    );
  });

  it('is true if the element contains visual content', function () {
    fixture.innerHTML = '<div id="target"> <img src=""> </div>';
    assert.isTrue(
      hasContent(document.getElementById('target'))
    );
  });

  it('is true if the element contains a node with a aria-label', function () {
    fixture.innerHTML = '<div id="target"> <span aria-label="my-label"></span> </div>';
    assert.isTrue(
      hasContent(document.getElementById('target'))
    );
  });
});
