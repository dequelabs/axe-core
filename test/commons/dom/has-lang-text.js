describe('dom.hasLangText', () => {
  const html = axe.testUtils.html;
  const hasLangText = axe.commons.dom.hasLangText;
  const fixture = document.getElementById('fixture');
  let tree;

  it('returns true when the element has a non-empty text node as its content', () => {
    fixture.innerHTML = '<div id="target">  text  </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    const target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isTrue(hasLangText(target));
  });

  it('returns true when the element has nested text node as its content', () => {
    fixture.innerHTML = '<div id="target"> <span> text </span> </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    const target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isTrue(hasLangText(target));
  });

  it('returns false when the element has nested text is hidden', () => {
    fixture.innerHTML = '<div id="target"> <span hidden> text </span> </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    const target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isFalse(hasLangText(target));
  });

  it('returns true when the element has nested text is aria-hidden', () => {
    fixture.innerHTML =
      '<div id="target"> <span aria-hidden="true"> text </span> </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    const target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isTrue(hasLangText(target));
  });

  it('returns true when the element has nested text is off screen', () => {
    fixture.innerHTML = html`
      <div id="target">
        <span style="position: absolute; top:-99em;"> text </span>
      </div>
    `;
    tree = axe.utils.getFlattenedTree(fixture);
    const target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isTrue(hasLangText(target));
  });

  it('returns false when the element has an empty text node as its content', () => {
    fixture.innerHTML = '<div id="target">  <!-- comment -->  </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    const target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isFalse(hasLangText(target));
  });

  it('returns false if all text is in a child with a lang attribute', () => {
    fixture.innerHTML = '<div id="target"><span lang="en"> text </span></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    const target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isFalse(hasLangText(target));
  });

  it('does not skip if lang is on the starting node', () => {
    fixture.innerHTML = '<div id="target" lang="en"><span> text </span></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    const target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isTrue(hasLangText(target));
  });

  it('ignores empty lang attributes', () => {
    fixture.innerHTML = '<div id="target"><span lang=""> text </span></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    const target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isTrue(hasLangText(target));
  });

  it('ignores null lang attributes', () => {
    fixture.innerHTML = '<div id="target"><span lang> text </span></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    const target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isTrue(hasLangText(target));
  });

  it('true for non-text content with an accessible name', () => {
    fixture.innerHTML = '<div id="target"><img alt="foo"></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    const target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isTrue(hasLangText(target));
  });

  it('false for non-text content without accessible name', () => {
    fixture.innerHTML = '<div id="target"><img alt=""></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    const target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isFalse(hasLangText(target));
  });

  it('returns false for non-text content with a lang attr', () => {
    fixture.innerHTML = '<div id="target"><img alt="foo" lang="en"></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    const target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isFalse(hasLangText(target));
  });
});
