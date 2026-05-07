describe('aria.implicitRole', () => {
  const html = axe.testUtils.html;
  const implicitRole = axe.commons.aria.implicitRole;
  const flatTreeSetup = axe.testUtils.flatTreeSetup;
  const fixture = document.querySelector('#fixture');
  const queryFixture = axe.testUtils.queryFixture;

  // test string role (don't need to test all of them just that
  // one works)
  it('should return button for button', () => {
    fixture.innerHTML = '<button id="target"></button>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should error if element is not in the tree', () => {
    fixture.innerHTML = '<button id="target"></button>';
    const node = fixture.querySelector('#target');
    assert.throws(() => {
      implicitRole(node);
    });
  });

  it('should return null if there is no implicit role', () => {
    fixture.innerHTML = '<div id="target"></div>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null if there is no implicit role when not considering chromium', () => {
    fixture.innerHTML = '<canvas id="target" aria-label="hello"></canvas>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return the chromium implicit role for elements that have one', () => {
    fixture.innerHTML = '<canvas id="target" aria-label="hello"></canvas>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node, { chromium: true }), 'Canvas');
  });

  it('should return link for "a[href]"', () => {
    fixture.innerHTML = '<a id="target" href>link</a>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'link');
  });

  it('should return null for "a:not([href])"', () => {
    fixture.innerHTML = '<a id="target">link</a>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return link for "area[href]"', () => {
    fixture.innerHTML = '<area id="target" href>link</area>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'link');
  });

  it('should return null for "area:not([href])"', () => {
    fixture.innerHTML = '<area id="target">link</area>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return contentinfo for "body footer"', () => {
    fixture.innerHTML = '<footer id="target"></footer>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'contentinfo');
  });

  it('should return null for footer with sectioning or main parent', () => {
    const nodes = ['article', 'aside', 'main', 'nav', 'section'];
    const roles = ['article', 'complementary', 'main', 'navigation', 'region'];

    for (var i = 0; i < nodes.length; i++) {
      fixture.innerHTML = html`<${nodes[i]}><footer id="target"></footer></${nodes[i]}>`;
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), `${nodes[i]} not null`);
    }

    for (var i = 0; i < roles.length; i++) {
      fixture.innerHTML = html`<div role="${roles[i]}">
        <footer id="target"></footer>
      </div>`;
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), `[${roles[i]}] not null`);
    }
  });

  it('should return form for form with accessible name aria-label', () => {
    fixture.innerHTML = '<form id="target" aria-label="foo"></form>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'form');
  });

  it('should return form for form with accessible name aria-labelledby', () => {
    fixture.innerHTML =
      '<div id="foo">foo</div><form id="target" aria-labelledby="foo"></form>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'form');
  });

  it('should return null for form with accessible name title', () => {
    fixture.innerHTML = '<form id="target" title="foo"></form>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for form without accessible name', () => {
    fixture.innerHTML = '<form id="target"></form>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return complementary for aside scoped to body', () => {
    fixture.innerHTML = '<aside id="target"></aside>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'complementary');
  });

  it('should return complementary for aside scoped to main', () => {
    fixture.innerHTML = '<main><aside id="target"></aside></main>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'complementary');
  });

  it('should return complementary for aside scoped to element with role=main', () => {
    fixture.innerHTML =
      '<article role="main"><aside id="target"></aside></article>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'complementary');
  });

  it('should return null for aside with sectioning parent', () => {
    const nodes = ['article', 'aside', 'nav', 'section'];
    const roles = ['article', 'complementary', 'navigation', 'region'];

    for (var i = 0; i < nodes.length; i++) {
      fixture.innerHTML = html`<${nodes[i]}><header id="target"></header></${nodes[i]}>`;
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), `${nodes[i]} not null`);
    }

    for (var i = 0; i < roles.length; i++) {
      fixture.innerHTML = html`<div role="${roles[i]}">
        <header id="target"></header>
      </div>`;
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), `[${roles[i]}] not null`);
    }
  });

  it('should return complementary for aside with sectioning parent if aside has aria-label', () => {
    const nodes = ['article', 'aside', 'nav', 'section'];
    const roles = ['article', 'complementary', 'navigation', 'region'];

    for (var i = 0; i < nodes.length; i++) {
      fixture.innerHTML = html`<${nodes[i]}><aside id="target" aria-label="test label"></aside></${nodes[i]}>`;
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.equal(implicitRole(node), 'complementary');
    }

    for (var i = 0; i < roles.length; i++) {
      fixture.innerHTML = html`<div role="${roles[i]}">
        <aside id="target" aria-label="test label"></aside>
      </div>`;
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.equal(implicitRole(node), 'complementary');
    }
  });

  it('should return null for sectioned aside with empty aria-label', () => {
    fixture.innerHTML =
      '<section><aside id="target" aria-label=" "></aside></section>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return complementary for sectioned aside with title', () => {
    fixture.innerHTML =
      '<section><aside id="target" title="test title"></aside></section>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'complementary');
  });

  it('should return null for sectioned aside with empty title', () => {
    fixture.innerHTML =
      '<section><aside id="target" title=" "></aside></section>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return banner for "body header"', () => {
    fixture.innerHTML = '<header id="target"></header>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'banner');
  });

  it('should return null for header with sectioning or main parent', () => {
    const nodes = ['article', 'aside', 'main', 'nav', 'section'];
    const roles = ['article', 'complementary', 'main', 'navigation', 'region'];

    for (var i = 0; i < nodes.length; i++) {
      fixture.innerHTML = html`<${nodes[i]}><header id="target"></header></${nodes[i]}>`;
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), `${nodes[i]} not null`);
    }

    for (var i = 0; i < roles.length; i++) {
      fixture.innerHTML = html`<div role="${roles[i]}">
        <header id="target"></header>
      </div>`;
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), `[${roles[i]}] not null`);
    }
  });

  it('should return img for "img[alt]"', () => {
    fixture.innerHTML = '<img id="target" alt="value"></img>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'img');
  });

  it('should return img for "img:not([alt])"', () => {
    fixture.innerHTML = '<img id="target"></img>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'img');
  });

  it('should return presentation for "img" with empty alt', () => {
    fixture.innerHTML = '<img id="target" alt=""></img>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'presentation');
  });

  it('should return img for "img" with empty alt and global aria attribute', () => {
    fixture.innerHTML = '<img id="target" alt="" aria-label></img>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'img');
  });

  it('should return img for "img" with empty alt and focusable', () => {
    fixture.innerHTML = '<img id="target" alt="" tabindex="0"></img>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'img');
  });

  it('should return button for "input[type=button]"', () => {
    fixture.innerHTML = '<input id="target" type="button"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should return button for "input[type=image]"', () => {
    fixture.innerHTML = '<input id="target" type="image"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should return button for "input[type=reset]"', () => {
    fixture.innerHTML = '<input id="target" type="reset"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should return button for "input[type=submit]"', () => {
    fixture.innerHTML = '<input id="target" type="submit"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should return checkbox for "input[type=checkbox]"', () => {
    fixture.innerHTML = '<input id="target" type="checkbox"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'checkbox');
  });

  it('should return textbox for "input[type=email]"', () => {
    fixture.innerHTML = '<input id="target" type="email"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=tel]"', () => {
    fixture.innerHTML = '<input id="target" type="tel"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=text]"', () => {
    fixture.innerHTML = '<input id="target" type="text"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=url]"', () => {
    fixture.innerHTML = '<input id="target" type="url"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=password]"', () => {
    fixture.innerHTML = '<input id="target" type="password"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=time]"', () => {
    fixture.innerHTML = '<input id="target" type="time"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=date]"', () => {
    fixture.innerHTML = '<input id="target" type="date"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input:not([type])"', () => {
    fixture.innerHTML = '<input id="target"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return combobox for "input[list]" that points to a datalist', () => {
    fixture.innerHTML =
      '<input id="target" list="list"/><datalist id="list"></datalist>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'combobox');
  });

  it('should return textbox for "input[list]" that does not point to a datalist', () => {
    fixture.innerHTML = '<input id="target" list="list"/><div id="list"></div>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=password][list]"', () => {
    fixture.innerHTML = html`
      <input id="target" type="password" list="list" />
      <datalist id="list"></datalist>
    `;
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return spinbutton for "input[type=number]"', () => {
    fixture.innerHTML = '<input id="target" type="number"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'spinbutton');
  });

  it('should return radio for "input[type=radio]"', () => {
    fixture.innerHTML = '<input id="target" type="radio"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'radio');
  });

  it('should return slider for "input[type=range]"', () => {
    fixture.innerHTML = '<input id="target" type="range"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'slider');
  });

  it('should return searchbox for "input[type=search]"', () => {
    fixture.innerHTML = '<input id="target" type="search"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'searchbox');
  });

  it('should return combobox for "input[type=search][list]"', () => {
    fixture.innerHTML =
      '<input id="target" type="search" list="list"/><datalist id="list"></datalist>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'combobox');
  });

  it('should return textbox for "input[type=invalid]"', () => {
    fixture.innerHTML = '<input id="target" type="invalid"/>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return region for "section" with accessible name aria-label', () => {
    fixture.innerHTML = '<section id="target" aria-label="foo"></section>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'region');
  });

  it('should return region for section with accessible name aria-labelledby', () => {
    fixture.innerHTML =
      '<div id="foo">foo</div><section id="target" aria-labelledby="foo"></section>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'region');
  });

  it('should return null for section with accessible name title', () => {
    fixture.innerHTML = '<section id="target" title="foo"></section>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for "section" without accessible name', () => {
    fixture.innerHTML = '<section id="target"></section>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for "section" with empty aria-label', () => {
    fixture.innerHTML = '<section id="target" aria-label=" "></section>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for "section" with empty aria-labelledby', () => {
    fixture.innerHTML =
      '<div id="foo"> </div><section id="target" aria-labelledby="foo"></section>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for "section" with empty title', () => {
    fixture.innerHTML = '<section id="target" title=" "></section>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return listbox for "select[multiple]"', () => {
    fixture.innerHTML = '<select id="target" multiple></select>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'listbox');
  });

  it('should return listbox for "select[size]" > 1', () => {
    fixture.innerHTML = '<select id="target" size="3"></select>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'listbox');
  });

  it('should return combobox for "select[size]" <= 1', () => {
    fixture.innerHTML = '<select id="target" size="1"></select>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'combobox');
  });

  it('should return combobox for "select"', () => {
    fixture.innerHTML = '<select id="target"></select>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'combobox');
  });

  it('should return cell for "td"', () => {
    fixture.innerHTML = '<table><td id="target"></td></table>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'cell');
  });

  it('should return gridcell for "td" with grid parent', () => {
    fixture.innerHTML = '<table role="grid"><td id="target"></td></table>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'gridcell');
  });

  it('should return gridcell for "td" with treegrid parent', () => {
    fixture.innerHTML = '<table role="treegrid"><td id="target"></td></table>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'gridcell');
  });

  it('should return rowheader for "th[scope=row]"', () => {
    fixture.innerHTML = '<table><th id="target" scope="row"></th></table>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'rowheader');
  });

  it('should return columnheader for "th[scope=col]"', () => {
    fixture.innerHTML = '<table><th id="target" scope="col"></th></table>';
    const node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'columnheader');
  });

  describe('ElementInternals', () => {
    it('returns element internals role', () => {
      const vNode = queryFixture(
        '<testutils-element id="target"></testutils-element>'
      );
      assert.equal(implicitRole(vNode), 'button');
    });

    it('returns null for element without internals', () => {
      const vNode = queryFixture(
        '<testutils-element id="target"></testutils-element>'
      );
      delete vNode.actualNode._internals;
      assert.isNull(implicitRole(vNode));
    });

    it('returns null for element without internals role', () => {
      const vNode = queryFixture(
        '<testutils-element id="target"></testutils-element>'
      );
      vNode.actualNode._internals.role = undefined;
      assert.isNull(implicitRole(vNode));
    });

    // no test is needed for returning internals role over implicit html role since only custom-elements can have element internals
  });
});
