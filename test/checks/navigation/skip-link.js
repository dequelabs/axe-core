describe('skip-link', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');

  it('should return true if the href points to an element with an ID', () => {
    fixture.innerHTML =
      '<a href="#target">Click Here</a><h1 id="target">Introduction</h1>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    const node = fixture.querySelector('a');
    assert.isTrue(axe.testUtils.getCheckEvaluate('skip-link')(node));
  });

  it('should return true if the href points to an element with an name', () => {
    fixture.innerHTML = '<a href="#target">Click Here</a><a name="target"></a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    const node = fixture.querySelector('a');
    assert.isTrue(axe.testUtils.getCheckEvaluate('skip-link')(node));
  });

  it('should return false if the href points to a non-existent element', () => {
    fixture.innerHTML =
      '<a href="#spacecamp">Click Here</a><h1 id="mainheader">Introduction</h1>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    const node = fixture.querySelector('a');
    assert.isFalse(axe.testUtils.getCheckEvaluate('skip-link')(node));
  });

  it('should return undefined if the target has display:none', () => {
    fixture.innerHTML = html`
      <a href="#target">Click Here</a>
      <h1 id="target" style="display:none">Introduction</h1>
    `;
    axe._tree = axe.utils.getFlattenedTree(fixture);
    const node = fixture.querySelector('a');
    assert.isUndefined(axe.testUtils.getCheckEvaluate('skip-link')(node));
  });

  it('should return undefined if the target has aria-hidden=true', () => {
    fixture.innerHTML = html`
      <a href="#target">Click Here</a>
      <h1 id="target" aria-hidden="true">Introduction</h1>
    `;
    axe._tree = axe.utils.getFlattenedTree(fixture);
    const node = fixture.querySelector('a');
    assert.isUndefined(axe.testUtils.getCheckEvaluate('skip-link')(node));
  });
});
