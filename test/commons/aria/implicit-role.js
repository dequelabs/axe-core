describe('aria.implicitRole', () => {
  const implicitRole = axe.commons.aria.implicitRole;
  const { fixture, flatTreeSetup, queryFixture } = axe.testUtils;

  // test string role (don't need to test all of them just that
  // one works)
  it('returns button for button', () => {
    const vNode = queryFixture('<button id="target"></button>');
    assert.equal(implicitRole(vNode), 'button');
  });

  it('should error if element is not in the tree', () => {
    fixture.innerHTML = '<button id="target"></button>';
    const node = document.querySelector('#target');
    assert.throws(() => {
      implicitRole(node);
    });
  });

  it('should accept an HTML element', () => {
    fixture.innerHTML = '<button id="target"></button>';
    flatTreeSetup(fixture);
    const node = document.querySelector('#target');
    assert.equal(implicitRole(node), 'button');
  });

  it('returns null if there is no implicit role', () => {
    const vNode = queryFixture('<div id="target"></div>');
    assert.isNull(implicitRole(vNode));
  });

  it('returns null if there is no implicit role when not considering chromium', () => {
    const vNode = queryFixture(
      '<canvas id="target" aria-label="hello"></canvas>'
    );
    assert.isNull(implicitRole(vNode));
  });

  it('returns the chromium implicit role for elements that have one', () => {
    const vNode = queryFixture(
      '<canvas id="target" aria-label="hello"></canvas>'
    );
    assert.equal(implicitRole(vNode, { chromium: true }), 'Canvas');
  });

  it('returns link for "a[href]"', () => {
    const vNode = queryFixture('<a id="target" href>link</a>');
    assert.equal(implicitRole(vNode), 'link');
  });

  it('returns null for "a:not([href])"', () => {
    const vNode = queryFixture('<a id="target">link</a>');
    assert.isNull(implicitRole(vNode));
  });

  it('returns link for "area[href]"', () => {
    const vNode = queryFixture('<area id="target" href>link</area>');
    assert.equal(implicitRole(vNode), 'link');
  });

  it('returns null for "area:not([href])"', () => {
    const vNode = queryFixture('<area id="target">link</area>');
    assert.isNull(implicitRole(vNode));
  });

  it('returns contentinfo for "body footer"', () => {
    const vNode = queryFixture('<footer id="target"></footer>');
    assert.equal(implicitRole(vNode), 'contentinfo');
  });

  it('returns null for footer with sectioning or main parent', () => {
    var nodes = ['article', 'aside', 'main', 'nav', 'section'];
    var roles = ['article', 'complementary', 'main', 'navigation', 'region'];

    for (var i = 0; i < nodes.length; i++) {
      const vNode = queryFixture(
        '<' + nodes[i] + '><footer id="target"></footer></' + nodes[i] + '>'
      );
      assert.isNull(implicitRole(vNode), nodes[i] + ' not null');
    }

    for (var i = 0; i < roles.length; i++) {
      const vNode = queryFixture(
        '<div role="' + roles[i] + '"><footer id="target"></footer></div>'
      );
      assert.isNull(implicitRole(vNode), '[' + roles[i] + '] not null');
    }
  });

  it('returns form for form with accessible name aria-label', () => {
    const vNode = queryFixture('<form id="target" aria-label="foo"></form>');
    assert.equal(implicitRole(vNode), 'form');
  });

  it('returns form for form with accessible name aria-labelledby', () => {
    const vNode = queryFixture(
      '<div id="foo">foo</div><form id="target" aria-labelledby="foo"></form>'
    );
    assert.equal(implicitRole(vNode), 'form');
  });

  it('returns null for form with accessible name title', () => {
    const vNode = queryFixture('<form id="target" title="foo"></form>');
    assert.isNull(implicitRole(vNode));
  });

  it('returns null for form without accessible name', () => {
    const vNode = queryFixture('<form id="target"></form>');
    assert.isNull(implicitRole(vNode));
  });

  it('returns complementary for aside scoped to body', () => {
    const vNode = queryFixture('<aside id="target"></aside>');
    assert.equal(implicitRole(vNode), 'complementary');
  });

  it('returns complementary for aside scoped to main', () => {
    const vNode = queryFixture('<main><aside id="target"></aside></main>');
    assert.equal(implicitRole(vNode), 'complementary');
  });

  it('returns complementary for aside scoped to element with role=main', () => {
    const vNode = queryFixture(
      '<article role="main"><aside id="target"></aside></article>'
    );
    assert.equal(implicitRole(vNode), 'complementary');
  });

  it('returns null for aside with sectioning parent', () => {
    var nodes = ['article', 'aside', 'nav', 'section'];
    var roles = ['article', 'complementary', 'navigation', 'region'];

    for (var i = 0; i < nodes.length; i++) {
      const vNode = queryFixture(
        '<' + nodes[i] + '><header id="target"></header></' + nodes[i] + '>'
      );
      assert.isNull(implicitRole(vNode), nodes[i] + ' not null');
    }

    for (var i = 0; i < roles.length; i++) {
      const vNode = queryFixture(
        '<div role="' + roles[i] + '"><header id="target"></header></div>'
      );
      assert.isNull(implicitRole(vNode), '[' + roles[i] + '] not null');
    }
  });

  it('returns complementary for aside with sectioning parent if aside has aria-label', () => {
    var nodes = ['article', 'aside', 'nav', 'section'];
    var roles = ['article', 'complementary', 'navigation', 'region'];

    for (var i = 0; i < nodes.length; i++) {
      const vNode = queryFixture(
        '<' +
          nodes[i] +
          '><aside id="target" aria-label="test label"></aside></' +
          nodes[i] +
          '>'
      );
      assert.equal(implicitRole(vNode), 'complementary');
    }

    for (var i = 0; i < roles.length; i++) {
      const vNode = queryFixture(
        '<div role="' +
          roles[i] +
          '"><aside id="target" aria-label="test label"></aside></div>'
      );
      assert.equal(implicitRole(vNode), 'complementary');
    }
  });

  it('returns null for sectioned aside with empty aria-label', () => {
    const vNode = queryFixture(
      '<section><aside id="target" aria-label=" "></aside></section>'
    );
    assert.isNull(implicitRole(vNode));
  });

  it('returns complementary for sectioned aside with title', () => {
    const vNode = queryFixture(
      '<section><aside id="target" title="test title"></aside></section>'
    );
    assert.equal(implicitRole(vNode), 'complementary');
  });

  it('returns null for sectioned aside with empty title', () => {
    const vNode = queryFixture(
      '<section><aside id="target" title=" "></aside></section>'
    );
    assert.isNull(implicitRole(vNode));
  });

  it('returns banner for "body header"', () => {
    const vNode = queryFixture('<header id="target"></header>');
    assert.equal(implicitRole(vNode), 'banner');
  });

  it('returns null for header with sectioning or main parent', () => {
    var nodes = ['article', 'aside', 'main', 'nav', 'section'];
    var roles = ['article', 'complementary', 'main', 'navigation', 'region'];

    for (var i = 0; i < nodes.length; i++) {
      const vNode = queryFixture(
        '<' + nodes[i] + '><header id="target"></header></' + nodes[i] + '>'
      );
      assert.isNull(implicitRole(vNode), nodes[i] + ' not null');
    }

    for (var i = 0; i < roles.length; i++) {
      const vNode = queryFixture(
        '<div role="' + roles[i] + '"><header id="target"></header></div>'
      );
      assert.isNull(implicitRole(vNode), '[' + roles[i] + '] not null');
    }
  });

  it('returns img for "img[alt]"', () => {
    const vNode = queryFixture('<img id="target" alt="value"></img>');
    assert.equal(implicitRole(vNode), 'img');
  });

  it('returns img for "img:not([alt])"', () => {
    const vNode = queryFixture('<img id="target"></img>');
    assert.equal(implicitRole(vNode), 'img');
  });

  it('returns presentation for "img" with empty alt', () => {
    const vNode = queryFixture('<img id="target" alt=""></img>');
    assert.equal(implicitRole(vNode), 'presentation');
  });

  it('returns img for "img" with empty alt and global aria attribute', () => {
    const vNode = queryFixture('<img id="target" alt="" aria-label></img>');
    assert.equal(implicitRole(vNode), 'img');
  });

  it('returns img for "img" with empty alt and focusable', () => {
    const vNode = queryFixture('<img id="target" alt="" tabindex="0"></img>');
    assert.equal(implicitRole(vNode), 'img');
  });

  it('returns button for "input[type=button]"', () => {
    const vNode = queryFixture('<input id="target" type="button"/>');
    assert.equal(implicitRole(vNode), 'button');
  });

  it('returns button for "input[type=image]"', () => {
    const vNode = queryFixture('<input id="target" type="image"/>');
    assert.equal(implicitRole(vNode), 'button');
  });

  it('returns button for "input[type=reset]"', () => {
    const vNode = queryFixture('<input id="target" type="reset"/>');
    assert.equal(implicitRole(vNode), 'button');
  });

  it('returns button for "input[type=submit]"', () => {
    const vNode = queryFixture('<input id="target" type="submit"/>');
    assert.equal(implicitRole(vNode), 'button');
  });

  it('returns checkbox for "input[type=checkbox]"', () => {
    const vNode = queryFixture('<input id="target" type="checkbox"/>');
    assert.equal(implicitRole(vNode), 'checkbox');
  });

  it('returns textbox for "input[type=email]"', () => {
    const vNode = queryFixture('<input id="target" type="email"/>');
    assert.equal(implicitRole(vNode), 'textbox');
  });

  it('returns textbox for "input[type=tel]"', () => {
    const vNode = queryFixture('<input id="target" type="tel"/>');
    assert.equal(implicitRole(vNode), 'textbox');
  });

  it('returns textbox for "input[type=text]"', () => {
    const vNode = queryFixture('<input id="target" type="text"/>');
    assert.equal(implicitRole(vNode), 'textbox');
  });

  it('returns textbox for "input[type=url]"', () => {
    const vNode = queryFixture('<input id="target" type="url"/>');
    assert.equal(implicitRole(vNode), 'textbox');
  });

  it('returns textbox for "input[type=password]"', () => {
    const vNode = queryFixture('<input id="target" type="password"/>');
    assert.equal(implicitRole(vNode), 'textbox');
  });

  it('returns textbox for "input[type=time]"', () => {
    const vNode = queryFixture('<input id="target" type="time"/>');
    assert.equal(implicitRole(vNode), 'textbox');
  });

  it('returns textbox for "input[type=date]"', () => {
    const vNode = queryFixture('<input id="target" type="date"/>');
    assert.equal(implicitRole(vNode), 'textbox');
  });

  it('returns textbox for "input:not([type])"', () => {
    const vNode = queryFixture('<input id="target"/>');
    assert.equal(implicitRole(vNode), 'textbox');
  });

  it('returns combobox for "input[list]" that points to a datalist', () => {
    const vNode = queryFixture(
      '<input id="target" list="list"/><datalist id="list"></datalist>'
    );
    assert.equal(implicitRole(vNode), 'combobox');
  });

  it('returns textbox for "input[list]" that does not point to a datalist', () => {
    const vNode = queryFixture(
      '<input id="target" list="list"/><div id="list"></div>'
    );
    assert.equal(implicitRole(vNode), 'textbox');
  });

  it('returns textbox for "input[type=password][list]"', () => {
    const vNode = queryFixture(
      '<input id="target" type="password" list="list"/>' +
        '<datalist id="list"></datalist>'
    );
    assert.equal(implicitRole(vNode), 'textbox');
  });

  it('returns spinbutton for "input[type=number]"', () => {
    const vNode = queryFixture('<input id="target" type="number"/>');
    assert.equal(implicitRole(vNode), 'spinbutton');
  });

  it('returns radio for "input[type=radio]"', () => {
    const vNode = queryFixture('<input id="target" type="radio"/>');
    assert.equal(implicitRole(vNode), 'radio');
  });

  it('returns slider for "input[type=range]"', () => {
    const vNode = queryFixture('<input id="target" type="range"/>');
    assert.equal(implicitRole(vNode), 'slider');
  });

  it('returns searchbox for "input[type=search]"', () => {
    const vNode = queryFixture('<input id="target" type="search"/>');
    assert.equal(implicitRole(vNode), 'searchbox');
  });

  it('returns combobox for "input[type=search][list]"', () => {
    const vNode = queryFixture(
      '<input id="target" type="search" list="list"/><datalist id="list"></datalist>'
    );
    assert.equal(implicitRole(vNode), 'combobox');
  });

  it('returns textbox for "input[type=invalid]"', () => {
    const vNode = queryFixture('<input id="target" type="invalid"/>');
    assert.equal(implicitRole(vNode), 'textbox');
  });

  it('returns region for "section" with accessible name aria-label', () => {
    const vNode = queryFixture(
      '<section id="target" aria-label="foo"></section>'
    );
    assert.equal(implicitRole(vNode), 'region');
  });

  it('returns region for section with accessible name aria-labelledby', () => {
    const vNode = queryFixture(
      '<div id="foo">foo</div><section id="target" aria-labelledby="foo"></section>'
    );
    assert.equal(implicitRole(vNode), 'region');
  });

  it('returns null for section with accessible name title', () => {
    const vNode = queryFixture('<section id="target" title="foo"></section>');
    assert.isNull(implicitRole(vNode));
  });

  it('returns null for "section" without accessible name', () => {
    const vNode = queryFixture('<section id="target"></section>');
    assert.isNull(implicitRole(vNode));
  });

  it('returns null for "section" with empty aria-label', () => {
    const vNode = queryFixture(
      '<section id="target" aria-label=" "></section>'
    );
    assert.isNull(implicitRole(vNode));
  });

  it('returns null for "section" with empty aria-labelledby', () => {
    const vNode = queryFixture(
      '<div id="foo"> </div><section id="target" aria-labelledby="foo"></section>'
    );
    assert.isNull(implicitRole(vNode));
  });

  it('returns null for "section" with empty title', () => {
    const vNode = queryFixture('<section id="target" title=" "></section>');
    assert.isNull(implicitRole(vNode));
  });

  it('returns listbox for "select[multiple]"', () => {
    const vNode = queryFixture('<select id="target" multiple></select>');
    assert.equal(implicitRole(vNode), 'listbox');
  });

  it('returns listbox for "select[size]" > 1', () => {
    const vNode = queryFixture('<select id="target" size="3"></select>');
    assert.equal(implicitRole(vNode), 'listbox');
  });

  it('returns combobox for "select[size]" <= 1', () => {
    const vNode = queryFixture('<select id="target" size="1"></select>');
    assert.equal(implicitRole(vNode), 'combobox');
  });

  it('returns combobox for "select"', () => {
    const vNode = queryFixture('<select id="target"></select>');
    assert.equal(implicitRole(vNode), 'combobox');
  });

  it('returns cell for "td"', () => {
    const vNode = queryFixture('<table><td id="target"></td></table>');
    assert.equal(implicitRole(vNode), 'cell');
  });

  it('returns gridcell for "td" with grid parent', () => {
    const vNode = queryFixture(
      '<table role="grid"><td id="target"></td></table>'
    );
    assert.equal(implicitRole(vNode), 'gridcell');
  });

  it('returns gridcell for "td" with treegrid parent', () => {
    const vNode = queryFixture(
      '<table role="treegrid"><td id="target"></td></table>'
    );
    assert.equal(implicitRole(vNode), 'gridcell');
  });

  it('returns rowheader for "th[scope=row]"', () => {
    const vNode = queryFixture(
      '<table><th id="target" scope="row"></th></table>'
    );
    assert.equal(implicitRole(vNode), 'rowheader');
  });

  it('returns columnheader for "th[scope=col]"', () => {
    const vNode = queryFixture(
      '<table><th id="target" scope="col"></th></table>'
    );
    assert.equal(implicitRole(vNode), 'columnheader');
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
