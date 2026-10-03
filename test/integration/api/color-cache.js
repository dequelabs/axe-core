describe('parsed color caching through axe.run', () => {
  it('should preserve contrast results and clear colors between runs in shadow DOM', async () => {
    const target = axe.testUtils.queryShadowFixture(
      '<div id="shadow"></div>',
      '<p id="target" style="color:#aaa;background:white">A known contrast failure.</p>'
    ).actualNode;
    const fixture = document.getElementById('fixture');
    const options = { runOnly: ['color-contrast'] };

    const first = await axe.run(fixture, options);
    assert.lengthOf(first.violations, 1);
    assert.deepEqual(first.violations[0].nodes[0].target, [
      ['#shadow', '#target']
    ]);
    assert.isUndefined(axe._cache.get('parsedColors'));

    target.style.color = '#000';
    const second = await axe.run(fixture, options);
    assert.isEmpty(second.violations);
    assert.lengthOf(second.passes, 1);
    assert.deepEqual(second.passes[0].nodes[0].target, [
      ['#shadow', '#target']
    ]);
    assert.isUndefined(axe._cache.get('parsedColors'));
  });
});
