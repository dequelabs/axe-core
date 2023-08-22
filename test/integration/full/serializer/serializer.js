describe('serializer', () => {
  const { awaitNestedLoad, runPartialRecursive } = axe.testUtils;

  beforeEach(async () => {
    await new Promise(res => awaitNestedLoad(res));
  });

  const runOptions = { runOnly: 'html-lang-valid' };
  const expectedCustomNodeSources = [
    'level0',
    'frame1 > level1',
    'frame1 > frame2-a > level2-a',
    'frame1 > frame2-b > level2-b'
  ];

  it('applies serializer hooks with axe.runPartial/finishRun', async () => {
    const partialResults = await Promise.all(
      runPartialRecursive(document, runOptions)
    );
    const results = await axe.finishRun(partialResults, runOptions);
    const nodesHtml = results.violations[0].nodes.map(n => n.html);
    assert.deepStrictEqual(nodesHtml, expectedCustomNodeSources);
  });

  it('applies serializer hooks with axe.run', async () => {
    const results = await axe.run(document, runOptions);
    const nodesHtml = results.violations[0].nodes.map(n => n.html);
    assert.deepStrictEqual(nodesHtml, expectedCustomNodeSources);
  });

  it('still supports axe.run with options.elementRef', async () => {
    const results = await axe.run(document, {
      ...runOptions,
      elementRef: true
    });
    const nodeElements = results.violations[0].nodes.map(n => n.element);

    assert.deepStrictEqual(nodeElements, [
      document.querySelector('html'),
      // as usual, elementRef only works for the top frame
      undefined,
      undefined,
      undefined
    ]);
  });
});
