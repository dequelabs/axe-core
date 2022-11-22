describe('unique-frame-title', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var queryFixture = axe.testUtils.queryFixture;

  afterEach(function () {
    checkContext.reset();
  });

  it('should log title to data and return true', function () {
    var vNode = queryFixture('<iframe id="target" title="bananas"></iframe>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('unique-frame-title')
        .call(checkContext, null, {}, vNode)
    );
    assert.equal(checkContext._data, 'bananas');
  });

  it('should convert text to lower case', function () {
    var vNode = queryFixture(
      '<iframe id="target" title="\t  app\t \n \rle  "></iframe>'
    );
    axe.testUtils
      .getCheckEvaluate('unique-frame-title')
      .call(checkContext, null, {}, vNode);
    assert.equal(checkContext._data, 'app le');
  });

  it('should take out space differences', function () {
    var vNode = queryFixture('<iframe id="target" title="APPLE"></iframe>');
    axe.testUtils
      .getCheckEvaluate('unique-frame-title')
      .call(checkContext, null, {}, vNode);
    assert.equal(checkContext._data, 'apple');
  });
});
