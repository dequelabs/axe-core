describe('axe.commons', () => {
  it('should export public api', () => {
    assert.exists(axe.commons.aria);
    assert.exists(axe.commons.color);
    assert.exists(axe.commons.dom);
    assert.exists(axe.commons.forms);
    assert.exists(axe.commons.matches);
    assert.exists(axe.commons.standards);
    assert.exists(axe.commons.table);
    assert.exists(axe.commons.text);
    assert.exists(axe.commons.utils);
  });
});
