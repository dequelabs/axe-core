describe('dom.isFocusable', () => {
  const flatTreeSetup = axe.testUtils.flatTreeSetup;
  const fixture = document.getElementById('fixture');

  it('should return true for visible, enabled textareas', () => {
    fixture.innerHTML = '<textarea id="target"></textarea>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(axe.commons.dom.isFocusable(el));
  });

  it('should return true for visible, enabled selects', () => {
    fixture.innerHTML = '<select id="target"></select>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(axe.commons.dom.isFocusable(el));
  });

  it('should return true for visible, enabled buttons', () => {
    fixture.innerHTML = '<button id="target"></button>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(axe.commons.dom.isFocusable(el));
  });

  it('should return true for visible, enabled, non-hidden inputs', () => {
    fixture.innerHTML = '<input type="text" id="target">';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(axe.commons.dom.isFocusable(el));
  });

  it('should return false for non-element nodes', () => {
    fixture.innerHTML = '<span id="target">Hello World</span>';
    flatTreeSetup(fixture);
    const el = document.getElementById('target').childNodes[0];

    assert.isFalse(axe.commons.dom.isFocusable(el));
  });

  it('should return false for disabled elements', () => {
    fixture.innerHTML = '<input type="text" id="target" disabled>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(axe.commons.dom.isFocusable(el));
  });

  it('should return false for hidden inputs', () => {
    fixture.innerHTML = '<input type="hidden" id="target">';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(axe.commons.dom.isFocusable(el));
  });

  it('should return false for hidden inputs with tabindex', () => {
    fixture.innerHTML = '<input type="hidden" tabindex="1" id="target">';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(axe.commons.dom.isFocusable(el));
  });

  it('should return false for hidden buttons with tabindex', () => {
    fixture.innerHTML =
      '<button style="visibility:hidden" tabindex="0" id="target"></button>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(axe.commons.dom.isFocusable(el));
  });

  it('should return false for disabled buttons with tabindex', () => {
    fixture.innerHTML = '<button tabindex="0" id="target" disabled></button>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(axe.commons.dom.isFocusable(el));
  });

  it('should return false for non-visible elements', () => {
    fixture.innerHTML = '<input type="text" id="target" style="display: none">';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(axe.commons.dom.isFocusable(el));
  });

  it('should return true for an anchor with an href', () => {
    fixture.innerHTML = '<a href="something.html" id="target"></a>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(axe.commons.dom.isFocusable(el));
  });

  it('should return false for an anchor with no href', () => {
    fixture.innerHTML = '<a name="anchor" id="target"></a>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(axe.commons.dom.isFocusable(el));
  });

  it('should return true for a div with a tabindex with spaces', () => {
    fixture.innerHTML = '<div id="target" tabindex="	  0   "></div>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(axe.commons.dom.isFocusable(el));
  });

  it('should return true for a div with a tabindex', () => {
    fixture.innerHTML = '<div id="target" tabindex="0"></div>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(axe.commons.dom.isFocusable(el));
  });

  it('should return true for a div with a negative tabindex', () => {
    fixture.innerHTML = '<div id="target" tabindex="-1"></div>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(axe.commons.dom.isFocusable(el));
  });

  it('should return false for a div with a non-numeric tabindex', () => {
    fixture.innerHTML = '<div id="target" tabindex="x"></div>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(axe.commons.dom.isFocusable(el));
  });

  it('should return true for a summary element', () => {
    fixture.innerHTML =
      '<details><summary id="target">Summary</summary><p>Detail</p></details>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(axe.commons.dom.isFocusable(el));
  });

  it('should return true for a details element without a summary element', () => {
    fixture.innerHTML = '<details id="target"><p>Detail</p></details>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(axe.commons.dom.isFocusable(el));
  });

  it('should return false for a details element with a summary element', () => {
    fixture.innerHTML =
      '<details id="target"><summary>Summary</summary><p>Detail</p></details>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(axe.commons.dom.isFocusable(el));
  });

  it('should return false for a div with no tabindex', () => {
    fixture.innerHTML = '<div id="target"></div>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(axe.commons.dom.isFocusable(el));
  });
});
