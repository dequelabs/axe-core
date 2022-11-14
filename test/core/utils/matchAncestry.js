describe('axe.utils.matchAncestry', function () {
  'use strict';
  var fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should be a function', function () {
    assert.isFunction(axe.utils.matchAncestry);
  });

  it('should match when ancestry is the same and one level', function () {
    var result = axe.utils.matchAncestry(
      ['html > body > div:nth-child(1)'],
      ['html > body > div:nth-child(1)']
    );
    assert.isTrue(result);
  });

  it('should not match when ancestry is different and one level', function () {
    var result = axe.utils.matchAncestry(
      ['html > body > div:nth-child(3)'],
      ['html > body > div:nth-child(1)']
    );
    assert.isFalse(result);
  });

  it('should not match when ancestries have different numbers of elements', function () {
    var result = axe.utils.matchAncestry(
      ['iframe', 'html > body > div:nth-child(1)'],
      ['html > body > div:nth-child(1)']
    );
    assert.isFalse(result);
  });

  it('should not match when first level is different and second level is the same', function () {
    var result = axe.utils.matchAncestry(
      ['iframe', 'html > body > div:nth-child(1)'],
      ['otherIframe', 'html > body > div:nth-child(1)']
    );
    assert.isFalse(result);
  });

  it('should not match when second level is different and first level is the same', function () {
    var result = axe.utils.matchAncestry(
      ['iframe', 'html > body > div:nth-child(1)'],
      ['iframe', 'html > body > div:nth-child(2)']
    );
    assert.isFalse(result);
  });

  it('should match when all levels are the same', function () {
    var result = axe.utils.matchAncestry(
      ['iframe', 'iframe2', 'html > body > div:nth-child(1)'],
      ['iframe', 'iframe2', 'html > body > div:nth-child(1)']
    );
    assert.isTrue(result);
  });
});
