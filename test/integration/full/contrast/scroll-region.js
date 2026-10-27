describe('color-contrast with a scrolling body', () => {
  it('should find the absolute background behind the text', async () => {
    const results = await axe.run('#target', {
      runOnly: ['color-contrast']
    });

    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
    assert.lengthOf(results.passes, 1);
    assert.deepEqual(results.passes[0].nodes[0].target, ['#target']);
  });
});
