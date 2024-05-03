describe('same-caption-summary', function () {
  'use strict';

  let checkSetup = axe.testUtils.checkSetup;
  let shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  let shadowSupport = axe.testUtils.shadowSupport;

  let checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    checkContext.reset();
    axe._tree = undefined;
  });

  it('should return false there is no caption', function () {
    let params = checkSetup(
      '<table summary="hi" id="target"><tr><td></td></tr></table>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('same-caption-summary')
        .apply(checkContext, params)
    );
  });

  it('should return false there is no summary', function () {
    let params = checkSetup(
      '<table id="target"><caption>Hi</caption><tr><td></td></tr></table>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('same-caption-summary')
        .apply(checkContext, params)
    );
  });

  it('should return false if summary and caption are different', function () {
    let params = checkSetup(
      '<table summary="bye" id="target"><caption>Hi</caption><tr><td></td></tr></table>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('same-caption-summary')
        .apply(checkContext, params)
    );
  });

  it('should return true if summary and caption are the same', function () {
    let params = checkSetup(
      '<table summary="Hi" id="target"><caption>Hi</caption><tr><td></td></tr></table>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('same-caption-summary')
        .apply(checkContext, params)
    );
  });

  it('should return true if summary and caption are the same with mixed casing', function () {
    let params = checkSetup(
      '<table summary="My Table" id="target">' +
        '<caption> my table </caption>' +
        '<thead>' +
        '<tr><th scope="col">Head</th></tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr><td>Data</td></tr>' +
        '</tbody>' +
        '</table>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('same-caption-summary')
        .apply(checkContext, params)
    );
  });

  (shadowSupport.v1 ? it : xit)(
    'should match slotted caption elements',
    function () {
      let params = shadowCheckSetup(
        '<div>' +
          '<span slot="caption">Caption</span>' +
          '<span slot="one">Data element 1</span>' +
          '<span slot="two">Data element 2</span>' +
          '</div>',
        '<table summary="Caption" id="target">' +
          '<caption><slot name="caption"></slot></caption>' +
          '<tr><td><slot name="one"></slot></td><td><slot name="two"></slot></td></tr>' +
          '</table>'
      );

      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('same-caption-summary')
          .apply(checkContext, params)
      );
    }
  );
});
