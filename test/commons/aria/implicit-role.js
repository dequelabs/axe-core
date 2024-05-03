describe('aria.implicitRole', function () {
  'use strict';
  let implicitRole = axe.commons.aria.implicitRole;
  let flatTreeSetup = axe.testUtils.flatTreeSetup;
  let fixture = document.querySelector('#fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  // test string role (don't need to test all of them just that
  // one works)
  it('should return button for button', function () {
    fixture.innerHTML = '<button id="target"></button>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should error if element is not in the tree', function () {
    fixture.innerHTML = '<button id="target"></button>';
    let node = fixture.querySelector('#target');
    assert.throws(function () {
      implicitRole(node);
    });
  });

  it('should return null if there is no implicit role', function () {
    fixture.innerHTML = '<div id="target"></div>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null if there is no implicit role when not considering chromium', function () {
    fixture.innerHTML = '<canvas id="target" aria-label="hello"></canvas>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return the chromium implicit role for elements that have one', function () {
    fixture.innerHTML = '<canvas id="target" aria-label="hello"></canvas>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node, { chromium: true }), 'Canvas');
  });

  it('should return link for "a[href]"', function () {
    fixture.innerHTML = '<a id="target" href>link</a>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'link');
  });

  it('should return null for "a:not([href])"', function () {
    fixture.innerHTML = '<a id="target">link</a>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return link for "area[href]"', function () {
    fixture.innerHTML = '<area id="target" href>link</area>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'link');
  });

  it('should return null for "area:not([href])"', function () {
    fixture.innerHTML = '<area id="target">link</area>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return contentinfo for "body footer"', function () {
    fixture.innerHTML = '<footer id="target"></footer>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'contentinfo');
  });

  it('should return null for footer with sectioning parent', function () {
    let nodes = ['article', 'aside', 'main', 'nav', 'section'];
    let roles = ['article', 'complementary', 'main', 'navigation', 'region'];

    for (let i = 0; i < nodes.length; i++) {
      fixture.innerHTML =
        '<' + nodes[i] + '><footer id="target"></footer></' + nodes[i] + '>';
      let node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), nodes[i] + ' not null');
    }

    for (let i = 0; i < roles.length; i++) {
      fixture.innerHTML =
        '<div role="' + roles[i] + '"><footer id="target"></footer></div>';
      let node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), '[' + roles[i] + '] not null');
    }
  });

  it('should return form for form with accessible name aria-label', function () {
    fixture.innerHTML = '<form id="target" aria-label="foo"></form>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'form');
  });

  it('should return form for form with accessible name aria-labelledby', function () {
    fixture.innerHTML =
      '<div id="foo">foo</div><form id="target" aria-labelledby="foo"></form>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'form');
  });

  it('should return null for form with accessible name title', function () {
    fixture.innerHTML = '<form id="target" title="foo"></form>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for form without accessible name', function () {
    fixture.innerHTML = '<form id="target"></form>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return banner for "body header"', function () {
    fixture.innerHTML = '<header id="target"></header>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'banner');
  });

  it('should return null for header with sectioning parent', function () {
    let nodes = ['article', 'aside', 'main', 'nav', 'section'];
    let roles = ['article', 'complementary', 'main', 'navigation', 'region'];

    for (let i = 0; i < nodes.length; i++) {
      fixture.innerHTML =
        '<' + nodes[i] + '><header id="target"></header></' + nodes[i] + '>';
      let node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), nodes[i] + ' not null');
    }

    for (let i = 0; i < roles.length; i++) {
      fixture.innerHTML =
        '<div role="' + roles[i] + '"><header id="target"></header></div>';
      let node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), '[' + roles[i] + '] not null');
    }
  });

  it('should return img for "img[alt]"', function () {
    fixture.innerHTML = '<img id="target" alt="value"></img>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'img');
  });

  it('should return img for "img:not([alt])"', function () {
    fixture.innerHTML = '<img id="target"></img>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'img');
  });

  it('should return presentation for "img" with empty alt', function () {
    fixture.innerHTML = '<img id="target" alt=""></img>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'presentation');
  });

  it('should return img for "img" with empty alt and global aria attribute', function () {
    fixture.innerHTML = '<img id="target" alt="" aria-label></img>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'img');
  });

  it('should return img for "img" with empty alt and focusable', function () {
    fixture.innerHTML = '<img id="target" alt="" tabindex="0"></img>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'img');
  });

  it('should return button for "input[type=button]"', function () {
    fixture.innerHTML = '<input id="target" type="button"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should return button for "input[type=image]"', function () {
    fixture.innerHTML = '<input id="target" type="image"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should return button for "input[type=reset]"', function () {
    fixture.innerHTML = '<input id="target" type="reset"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should return button for "input[type=submit]"', function () {
    fixture.innerHTML = '<input id="target" type="submit"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should return checkbox for "input[type=checkbox]"', function () {
    fixture.innerHTML = '<input id="target" type="checkbox"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'checkbox');
  });

  it('should return textbox for "input[type=email]"', function () {
    fixture.innerHTML = '<input id="target" type="email"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=tel]"', function () {
    fixture.innerHTML = '<input id="target" type="tel"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=text]"', function () {
    fixture.innerHTML = '<input id="target" type="text"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=url]"', function () {
    fixture.innerHTML = '<input id="target" type="url"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=password]"', function () {
    fixture.innerHTML = '<input id="target" type="password"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=time]"', function () {
    fixture.innerHTML = '<input id="target" type="time"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=date]"', function () {
    fixture.innerHTML = '<input id="target" type="date"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input:not([type])"', function () {
    fixture.innerHTML = '<input id="target"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return combobox for "input[list]" that points to a datalist', function () {
    fixture.innerHTML =
      '<input id="target" list="list"/><datalist id="list"></datalist>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'combobox');
  });

  it('should return textbox for "input[list]" that does not point to a datalist', function () {
    fixture.innerHTML = '<input id="target" list="list"/><div id="list"></div>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=password][list]"', function () {
    fixture.innerHTML =
      '<input id="target" type="password" list="list"/>' +
      '<datalist id="list"></datalist>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return spinbutton for "input[type=number]"', function () {
    fixture.innerHTML = '<input id="target" type="number"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'spinbutton');
  });

  it('should return radio for "input[type=radio]"', function () {
    fixture.innerHTML = '<input id="target" type="radio"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'radio');
  });

  it('should return slider for "input[type=range]"', function () {
    fixture.innerHTML = '<input id="target" type="range"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'slider');
  });

  it('should return searchbox for "input[type=search]"', function () {
    fixture.innerHTML = '<input id="target" type="search"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'searchbox');
  });

  it('should return combobox for "input[type=search][list]"', function () {
    fixture.innerHTML =
      '<input id="target" type="search" list="list"/><datalist id="list"></datalist>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'combobox');
  });

  it('should return textbox for "input[type=invalid]"', function () {
    fixture.innerHTML = '<input id="target" type="invalid"/>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return region for "section" with accessible name aria-label', function () {
    fixture.innerHTML = '<section id="target" aria-label="foo"></section>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'region');
  });

  it('should return region for section with accessible name aria-labelledby', function () {
    fixture.innerHTML =
      '<div id="foo">foo</div><section id="target" aria-labelledby="foo"></section>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'region');
  });

  it('should return null for section with accessible name title', function () {
    fixture.innerHTML = '<section id="target" title="foo"></section>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for "section" without accessible name', function () {
    fixture.innerHTML = '<section id="target"></section>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for "section" with empty aria-label', function () {
    fixture.innerHTML = '<section id="target" aria-label=" "></section>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for "section" with empty aria-labelledby', function () {
    fixture.innerHTML =
      '<div id="foo"> </div><section id="target" aria-labelledby="foo"></section>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for "section" with empty title', function () {
    fixture.innerHTML = '<section id="target" title=" "></section>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return listbox for "select[multiple]"', function () {
    fixture.innerHTML = '<select id="target" multiple></select>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'listbox');
  });

  it('should return listbox for "select[size]" > 1', function () {
    fixture.innerHTML = '<select id="target" size="3"></select>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'listbox');
  });

  it('should return combobox for "select[size]" <= 1', function () {
    fixture.innerHTML = '<select id="target" size="1"></select>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'combobox');
  });

  it('should return combobox for "select"', function () {
    fixture.innerHTML = '<select id="target"></select>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'combobox');
  });

  it('should return cell for "td"', function () {
    fixture.innerHTML = '<table><td id="target"></td></table>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'cell');
  });

  it('should return gridcell for "td" with grid parent', function () {
    fixture.innerHTML = '<table role="grid"><td id="target"></td></table>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'gridcell');
  });

  it('should return gridcell for "td" with treegrid parent', function () {
    fixture.innerHTML = '<table role="treegrid"><td id="target"></td></table>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'gridcell');
  });

  it('should return rowheader for "th[scope=row]"', function () {
    fixture.innerHTML = '<table><th id="target" scope="row"></th></table>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'rowheader');
  });

  it('should return columnheader for "th[scope=col]"', function () {
    fixture.innerHTML = '<table><th id="target" scope="col"></th></table>';
    let node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'columnheader');
  });
});
