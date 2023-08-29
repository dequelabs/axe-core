describe('dom.isNativelyFocusable', () => {
  const fixture = document.getElementById('fixture');
  const isNativelyFocusable = axe.commons.dom.isNativelyFocusable;
  const { flatTreeSetup } = axe.testUtils;

  function hideByClipping(el) {
    el.style.cssText =
      'position: absolute !important;' +
      ' clip: rect(0px 0px 0px 0px); /* IE6, IE7 */' +
      ' clip: rect(0px, 0px, 0px, 0px);';
  }

  function hideByMovingOffScreen(el) {
    el.style.cssText =
      'position:absolute;' +
      ' left:-10000px;' +
      ' top:auto;' +
      ' width:1px;' +
      ' height:1px;' +
      ' overflow:hidden;';
  }

  it('should return true for buttons with redundant tabindex', () => {
    fixture.innerHTML = '<button tabindex="0" id="target"></button>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(isNativelyFocusable(el));
  });

  it('should return true for buttons with tabindex -1', () => {
    fixture.innerHTML = '<button tabindex="-1" id="target"></button>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(isNativelyFocusable(el));
  });

  it('should return true for visible, enabled textareas', () => {
    fixture.innerHTML = '<textarea id="target"></textarea>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(isNativelyFocusable(el));
  });

  it('should return true for visible, enabled selects', () => {
    fixture.innerHTML = '<select id="target"></select>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(isNativelyFocusable(el));
  });

  it('should return true for visible, enabled buttons', () => {
    fixture.innerHTML = '<button id="target"></button>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(isNativelyFocusable(el));
  });

  it('should return true for visible, enabled, non-hidden inputs', () => {
    fixture.innerHTML = '<input type="text" id="target">';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(isNativelyFocusable(el));
  });

  it('should return false for disabled elements', () => {
    fixture.innerHTML = '<input type="text" id="target" disabled>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(isNativelyFocusable(el));
  });

  it('should return false for hidden inputs', () => {
    fixture.innerHTML = '<input type="hidden" id="target">';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(isNativelyFocusable(el));
  });

  it('should return false for elements hidden with display:none', () => {
    fixture.innerHTML =
      '<button id="target" style="display: none">button</button>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(isNativelyFocusable(el));
  });

  it('should return false for elements hidden with visibility:hidden', () => {
    fixture.innerHTML =
      '<button id="target" style="visibility: hidden">button</button>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(isNativelyFocusable(el));
  });

  it('should return false for elements collapsed with visibility:collapse', () => {
    fixture.innerHTML =
      '<button id="target" style="visibility: collapse">button</button>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(isNativelyFocusable(el));
  });

  it('should return true for clipped elements', () => {
    fixture.innerHTML = '<button id="target">button</button>';
    const el = document.getElementById('target');
    hideByClipping(el);
    flatTreeSetup(fixture);

    assert.isTrue(isNativelyFocusable(el));
  });

  it('should return true for elements positioned off screen', () => {
    fixture.innerHTML = '<button id="target">button</button>';
    const el = document.getElementById('target');
    hideByMovingOffScreen(el);
    flatTreeSetup(fixture);

    assert.isTrue(isNativelyFocusable(el));
  });

  it('should return false for elements hidden with display:none on an ancestor', () => {
    fixture.innerHTML =
      '<div id="parent" style="display:none"><button id="target">button</button></div>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(isNativelyFocusable(el));
  });

  it('should return false for elements hidden with visibility:hidden on an ancestor', () => {
    fixture.innerHTML =
      '<div id="parent" style="visibility: hidden"><button id="target">button</button></div>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(isNativelyFocusable(el));
  });

  it('should return false for elements collapsed with visibility:collapse on an ancestor', () => {
    fixture.innerHTML =
      '<div id="parent" style="visibility: collapse"><button id="target">button</button></div>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(isNativelyFocusable(el));
  });

  it('should return true for elements with a clipped ancestor', () => {
    fixture.innerHTML =
      '<div id="parent"><button id="target">button</button></div>';
    hideByClipping(document.getElementById('parent'));
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(isNativelyFocusable(el));
  });

  it('should return true for elements off-screened by an ancestor', () => {
    fixture.innerHTML =
      '<div id="parent"><button id="target">button</button></div>';
    hideByMovingOffScreen(document.getElementById('parent'));
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(isNativelyFocusable(el));
  });

  it('should return false for hidden inputs with tabindex', () => {
    fixture.innerHTML = '<input type="hidden" tabindex="1" id="target">';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(axe.commons.dom.isFocusable(el));
  });

  it('should return false for disabled inputs with tabindex', () => {
    fixture.innerHTML = '<input tabindex="1" id="target" disabled>';
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

  it('should return true for an anchor with an href', () => {
    fixture.innerHTML = '<a href="something.html" id="target"></a>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isTrue(isNativelyFocusable(el));
  });

  it('should return false for an anchor with no href', () => {
    fixture.innerHTML = '<a name="anchor" id="target"></a>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(isNativelyFocusable(el));
  });

  it('should return false for a div with a tabindex with spaces', () => {
    fixture.innerHTML = '<div id="target" tabindex="    0     "></div>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(isNativelyFocusable(el));
  });

  it('should return false for a div with a tabindex', () => {
    fixture.innerHTML = '<div id="target" tabindex="0"></div>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(isNativelyFocusable(el));
  });

  it('should return false for a div with a non-numeric tabindex', () => {
    fixture.innerHTML = '<div id="target" tabindex="x"></div>';
    const el = document.getElementById('target');
    flatTreeSetup(fixture);

    assert.isFalse(isNativelyFocusable(el));
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

    assert.isFalse(isNativelyFocusable(el));
  });
});
