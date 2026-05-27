describe('axe.utils.getSelector', () => {
  before(() => {
    axe.setup();
  });
  it('should work on namespaced elements', () => {
    const fixture = document.querySelector('#fixture');
    const node = fixture.firstElementChild;
    const sel = axe.utils.getSelector(node);
    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });
});
