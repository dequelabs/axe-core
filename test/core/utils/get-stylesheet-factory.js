describe('axe.utils.getStyleSheetFactory', function () {
  'use strict';

  var dynamicDoc = document.implementation.createHTMLDocument(
    'Dynamic document for testing axe.utils.getStyleSheetFactory'
  );

  it('throws if there is no argument of dynamicDocument', function () {
    assert.throws(function () {
      axe.utils.getStyleSheetFactory();
    });
  });

  it('returns a function when passed argument of dynamicDocument', function () {
    var actual = axe.utils.getStyleSheetFactory(dynamicDoc);
    assert.isFunction(actual);
  });

  it('returns a CSSOM stylesheet, when invoked with data (text)', function () {
    var stylesheetFactory = axe.utils.getStyleSheetFactory(dynamicDoc);
    var actual = stylesheetFactory({
      data: '.someStyle{background-color:red;}',
      root: document,
      priority: [1, 0]
    });

    assert.isDefined(actual);
    assert.hasAllKeys(actual, [
      'sheet',
      'isCrossOrigin',
      'shadowId',
      'root',
      'priority'
    ]);
    assert.deepEqual(actual.priority, [1, 0]);
    axe.testUtils.assertStylesheet(
      actual.sheet,
      '.someStyle',
      '.someStyle{background-color:red;}'
    );
  });
});
