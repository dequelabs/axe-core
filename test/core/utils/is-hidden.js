function createContentHidden() {
  const group = document.createElement('div');
  group.innerHTML =
    '<label id="mylabel">Label</label><input aria-labelledby="mylabel" type="text" />';
  return group;
}

function makeShadowTreeHidden(node) {
  const root = node.attachShadow({ mode: 'open' });
  const div = document.createElement('div');
  div.className = 'parent';
  root.appendChild(div);
  div.appendChild(createContentHidden());
}

describe('axe.utils.isHidden', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should be a function', () => {
    assert.isFunction(axe.utils.isHidden);
  });

  it('should return false on detached elements', () => {
    const el = document.createElement('div');
    el.innerHTML = 'I am not visible because I am detached!';

    assert.isTrue(axe.utils.isHidden(el));
  });

  it('should return false on a document', () => {
    assert.isFalse(axe.utils.isHidden(document));
  });

  it('should return true if `aria-hidden` is set', () => {
    fixture.innerHTML =
      '<div id="target" aria-hidden="true">Hidden from screen readers</div>';

    const el = document.getElementById('target');
    assert.isTrue(axe.utils.isHidden(el));
  });

  it('should return true if `display: none` is set', () => {
    fixture.innerHTML =
      '<div id="target" style="display: none">Hidden from screen readers</div>';

    const el = document.getElementById('target');
    assert.isTrue(axe.utils.isHidden(el));
  });

  it('should return true if `aria-hidden` is set on parent', () => {
    fixture.innerHTML =
      '<div aria-hidden="true"><div id="target">Hidden from screen readers</div></div>';

    const el = document.getElementById('target');
    assert.isTrue(axe.utils.isHidden(el));
  });

  it('should know how `visibility` works', () => {
    fixture.innerHTML = html`
      <div style="visibility: hidden;">
        <div id="target" style="visibility: visible;">Hi</div>
      </div>
    `;

    const el = document.getElementById('target');
    assert.isFalse(axe.utils.isHidden(el));
  });

  it('not hidden: should work when the element is inside shadow DOM', () => {
    let tree, node;
    // shadow DOM v1 - note: v0 is compatible with this code, so no need
    // to specifically test this
    fixture.innerHTML = '<div></div>';
    makeShadowTreeHidden(fixture.firstChild);
    tree = axe.utils.getFlattenedTree(fixture.firstChild);
    node = axe.utils.querySelectorAll(tree, 'input')[0];
    assert.isFalse(axe.utils.isHidden(node.actualNode));
  });

  it('hidden: should work when the element is inside shadow DOM', () => {
    let tree, node;
    // shadow DOM v1 - note: v0 is compatible with this code, so no need
    // to specifically test this
    fixture.innerHTML = '<div style="display:none"></div>';
    makeShadowTreeHidden(fixture.firstChild);
    tree = axe.utils.getFlattenedTree(fixture.firstChild);
    node = axe.utils.querySelectorAll(tree, 'input')[0];
    assert.isTrue(axe.utils.isHidden(node.actualNode));
  });

  it('should work with hidden slotted elements', () => {
    function createContentSlotted() {
      const group = document.createElement('div');
      group.innerHTML =
        '<div id="target" style="display:none;">Stuff<slot></slot></div>';
      return group;
    }
    function makeShadowTree(node) {
      const root = node.attachShadow({ mode: 'open' });
      const div = document.createElement('div');
      root.appendChild(div);
      div.appendChild(createContentSlotted());
    }
    fixture.innerHTML = '<div><p><a>hello</a></p></div>';
    makeShadowTree(fixture.firstChild);
    const tree = axe.utils.getFlattenedTree(fixture.firstChild);
    const el = axe.utils.querySelectorAll(tree, 'a')[0];
    assert.isTrue(axe.utils.isHidden(el.actualNode));
  });
});
