describe('axe.utils.getStyleSheetFactory', function () {
  'use strict';

  let dynamicDoc = document.implementation.createHTMLDocument(
    'Dynamic document for testing axe.utils.getStyleSheetFactory'
  );

  it('throws if there is no argument of dynamicDocument', function () {
    assert.throws(function () {
      axe.utils.getStyleSheetFactory();
    });
  });

  it('returns a function when passed argument of dynamicDocument', function () {
    let actual = axe.utils.getStyleSheetFactory(dynamicDoc);
    assert.isFunction(actual);
  });

  it('returns a CSSOM stylesheet, when invoked with data (text)', function () {
    let stylesheetFactory = axe.utils.getStyleSheetFactory(dynamicDoc);
    let actual = stylesheetFactory({
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
