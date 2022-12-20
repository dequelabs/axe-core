describe('html5-scope', function () {
  'use strict';

  var fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true on THs', function () {
    fixture.innerHTML = '<table><tr><th scope="col"></th></tr></table>';
    var node = fixture.querySelector('th');

    assert.isTrue(axe.testUtils.getCheckEvaluate('html5-scope')(node));
  });

  it('should return false on TDs', function () {
    fixture.innerHTML = '<table><tr><td scope="col"></td></tr></table>';
    var node = fixture.querySelector('td');

    assert.isFalse(axe.testUtils.getCheckEvaluate('html5-scope')(node));
  });

  it('should return true on non-HTML5 documents', function () {
    var origPublicId = document.publicId;
    fixture.innerHTML = '<table><tr><th scope="col"></th></tr></table>';
    var node = fixture.querySelector('th');

    assert.isTrue(axe.testUtils.getCheckEvaluate('html5-scope')(node));
    document.publicId = origPublicId;
  });
});
