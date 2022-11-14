describe('valid-lang', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var checkSetup = axe.testUtils.checkSetup;
  var checkContext = axe.testUtils.MockCheckContext();
  var validLangEvaluate = axe.testUtils.getCheckEvaluate('valid-lang');

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return false if a lang attribute is present in options', function () {
    var params = checkSetup('<div id="target" lang="woohoo">text</div>', {
      value: ['blah', 'blah', 'woohoo']
    });

    assert.isFalse(validLangEvaluate.apply(checkContext, params));
  });

  it('should lowercase options and attribute first', function () {
    var params = checkSetup('<div id="target" lang="wooHOo">text</div>', {
      value: ['blah', 'blah', 'wOohoo']
    });

    assert.isFalse(validLangEvaluate.apply(checkContext, params));
  });

  it('should return true if a lang attribute is not present in options', function () {
    var params = checkSetup('<div id="target" lang="FOO">text</div>');

    assert.isTrue(validLangEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['lang="FOO"']);
  });

  it('should return false (and not throw) when given no present in options', function () {
    var params = checkSetup('<div id="target" lang="en">text</div>');

    assert.isFalse(validLangEvaluate.apply(checkContext, params));
  });

  it('should return true if the language is badly formatted', function () {
    var params = checkSetup('<div id="target" lang="en_US">text</div>');

    assert.isTrue(validLangEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['lang="en_US"']);
  });

  it('should return false if it matches a substring proceeded by -', function () {
    var params = checkSetup('<div id="target" lang="en-LOL">text</div>');

    assert.isFalse(validLangEvaluate.apply(checkContext, params));
  });

  it('should work with xml:lang', function () {
    var params = checkSetup('<div id="target" xml:lang="en-LOL">text</div>');

    assert.isFalse(validLangEvaluate.apply(checkContext, params));
  });

  it('should accept options.attributes', function () {
    var params = checkSetup('<div id="target" custom-lang="en_US">text</div>', {
      attributes: ['custom-lang']
    });

    assert.isTrue(validLangEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['custom-lang="en_US"']);
  });

  it('should return true if lang value is just whitespace', function () {
    var params = checkSetup('<div id="target" lang="  ">text</div>');

    assert.isTrue(validLangEvaluate.apply(checkContext, params));
  });

  it('should return false if a lang attribute element has no content', function () {
    var params = checkSetup('<div id="target" lang="FOO"></div>');

    assert.isFalse(validLangEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, null);
  });
});
