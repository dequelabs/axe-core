describe('doc-has-title', function () {
  'use strict';

  var fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return false if title is empty', function () {
    var orig = document.title;
    document.title = '';
    assert.isFalse(axe.testUtils.getCheckEvaluate('doc-has-title')(fixture));
    document.title = orig;
  });

  it('should return false if title contains only whitespace', function () {
    var orig = document.title;
    document.title = ' \t\r\n \n   \r \n\t';
    assert.isFalse(axe.testUtils.getCheckEvaluate('doc-has-title')(fixture));
    document.title = orig;
  });

  it('should return true if title is non-empty', function () {
    var orig = document.title;
    document.title = 'Bananas';

    assert.isTrue(axe.testUtils.getCheckEvaluate('doc-has-title')(fixture));
    document.title = orig;
  });
});
