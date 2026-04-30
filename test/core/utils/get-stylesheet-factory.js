describe('axe.utils.getStyleSheetFactory', () => {
  const dynamicDoc = document.implementation.createHTMLDocument(
    'Dynamic document for testing axe.utils.getStyleSheetFactory'
  );

  it('throws if there is no argument of dynamicDocument', () => {
    assert.throws(() => {
      axe.utils.getStyleSheetFactory();
    });
  });

  it('returns a function when passed argument of dynamicDocument', () => {
    const actual = axe.utils.getStyleSheetFactory(dynamicDoc);
    assert.isFunction(actual);
  });

  it('returns a CSSOM stylesheet, when invoked with data (text)', () => {
    const stylesheetFactory = axe.utils.getStyleSheetFactory(dynamicDoc);
    const actual = stylesheetFactory({
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
