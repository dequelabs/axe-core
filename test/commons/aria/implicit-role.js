describe('aria.implicitRole', function () {
  'use strict';
  var implicitRole = axe.commons.aria.implicitRole;
  var flatTreeSetup = axe.testUtils.flatTreeSetup;
  var fixture = document.querySelector('#fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  // test string role (don't need to test all of them just that
  // one works)
  it('should return button for button', function () {
    fixture.innerHTML = '<button id="target"></button>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should error if element is not in the tree', function () {
    fixture.innerHTML = '<button id="target"></button>';
    var node = fixture.querySelector('#target');
    assert.throws(function () {
      implicitRole(node);
    });
  });

  it('should return null if there is no implicit role', function () {
    fixture.innerHTML = '<div id="target"></div>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null if there is no implicit role when not considering chromium', function () {
    fixture.innerHTML = '<canvas id="target" aria-label="hello"></canvas>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return the chromium implicit role for elements that have one', function () {
    fixture.innerHTML = '<canvas id="target" aria-label="hello"></canvas>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node, { chromium: true }), 'Canvas');
  });

  it('should return link for "a[href]"', function () {
    fixture.innerHTML = '<a id="target" href>link</a>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'link');
  });

  it('should return null for "a:not([href])"', function () {
    fixture.innerHTML = '<a id="target">link</a>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return link for "area[href]"', function () {
    fixture.innerHTML = '<area id="target" href>link</area>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'link');
  });

  it('should return null for "area:not([href])"', function () {
    fixture.innerHTML = '<area id="target">link</area>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return contentinfo for "body footer"', function () {
    fixture.innerHTML = '<footer id="target"></footer>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'contentinfo');
  });

  it('should return null for footer with sectioning or main parent', function () {
    var nodes = ['article', 'aside', 'main', 'nav', 'section'];
    var roles = ['article', 'complementary', 'main', 'navigation', 'region'];

    for (var i = 0; i < nodes.length; i++) {
      fixture.innerHTML =
        '<' + nodes[i] + '><footer id="target"></footer></' + nodes[i] + '>';
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), nodes[i] + ' not null');
    }

    for (var i = 0; i < roles.length; i++) {
      fixture.innerHTML =
        '<div role="' + roles[i] + '"><footer id="target"></footer></div>';
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), '[' + roles[i] + '] not null');
    }
  });

  it('should return form for form with accessible name aria-label', function () {
    fixture.innerHTML = '<form id="target" aria-label="foo"></form>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'form');
  });

  it('should return form for form with accessible name aria-labelledby', function () {
    fixture.innerHTML =
      '<div id="foo">foo</div><form id="target" aria-labelledby="foo"></form>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'form');
  });

  it('should return null for form with accessible name title', function () {
    fixture.innerHTML = '<form id="target" title="foo"></form>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for form without accessible name', function () {
    fixture.innerHTML = '<form id="target"></form>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return complementary for aside scoped to body', function () {
    fixture.innerHTML = '<aside id="target"></aside>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'complementary');
  });

  it('should return complementary for aside scoped to main', function () {
    fixture.innerHTML = '<main><aside id="target"></aside></main>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'complementary');
  });

  it('should return complementary for aside scoped to element with role=main', function () {
    fixture.innerHTML =
      '<article role="main"><aside id="target"></aside></article>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'complementary');
  });

  it('should return null for aside with sectioning parent', function () {
    var nodes = ['article', 'aside', 'nav', 'section'];
    var roles = ['article', 'complementary', 'navigation', 'region'];

    for (var i = 0; i < nodes.length; i++) {
      fixture.innerHTML =
        '<' + nodes[i] + '><header id="target"></header></' + nodes[i] + '>';
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), nodes[i] + ' not null');
    }

    for (var i = 0; i < roles.length; i++) {
      fixture.innerHTML =
        '<div role="' + roles[i] + '"><header id="target"></header></div>';
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), '[' + roles[i] + '] not null');
    }
  });

  it('should return complementary for aside with sectioning parent if aside has aria-label', function () {
    var nodes = ['article', 'aside', 'nav', 'section'];
    var roles = ['article', 'complementary', 'navigation', 'region'];

    for (var i = 0; i < nodes.length; i++) {
      fixture.innerHTML =
        '<' +
        nodes[i] +
        '><aside id="target" aria-label="test label"></aside></' +
        nodes[i] +
        '>';
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.equal(implicitRole(node), 'complementary');
    }

    for (var i = 0; i < roles.length; i++) {
      fixture.innerHTML =
        '<div role="' +
        roles[i] +
        '"><aside id="target" aria-label="test label"></aside></div>';
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.equal(implicitRole(node), 'complementary');
    }
  });

  it('should return null for sectioned aside with empty aria-label', function () {
    fixture.innerHTML =
      '<section><aside id="target" aria-label=" "></aside></section>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return complementary for sectioned aside with title', function () {
    fixture.innerHTML =
      '<section><aside id="target" title="test title"></aside></section>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'complementary');
  });

  it('should return null for sectioned aside with empty title', function () {
    fixture.innerHTML =
      '<section><aside id="target" title=" "></aside></section>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return banner for "body header"', function () {
    fixture.innerHTML = '<header id="target"></header>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'banner');
  });

  it('should return null for header with sectioning or main parent', function () {
    var nodes = ['article', 'aside', 'main', 'nav', 'section'];
    var roles = ['article', 'complementary', 'main', 'navigation', 'region'];

    for (var i = 0; i < nodes.length; i++) {
      fixture.innerHTML =
        '<' + nodes[i] + '><header id="target"></header></' + nodes[i] + '>';
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), nodes[i] + ' not null');
    }

    for (var i = 0; i < roles.length; i++) {
      fixture.innerHTML =
        '<div role="' + roles[i] + '"><header id="target"></header></div>';
      var node = fixture.querySelector('#target');
      flatTreeSetup(fixture);
      assert.isNull(implicitRole(node), '[' + roles[i] + '] not null');
    }
  });

  it('should return img for "img[alt]"', function () {
    fixture.innerHTML = '<img id="target" alt="value"></img>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'img');
  });

  it('should return img for "img:not([alt])"', function () {
    fixture.innerHTML = '<img id="target"></img>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'img');
  });

  it('should return presentation for "img" with empty alt', function () {
    fixture.innerHTML = '<img id="target" alt=""></img>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'presentation');
  });

  it('should return img for "img" with empty alt and global aria attribute', function () {
    fixture.innerHTML = '<img id="target" alt="" aria-label></img>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'img');
  });

  it('should return img for "img" with empty alt and focusable', function () {
    fixture.innerHTML = '<img id="target" alt="" tabindex="0"></img>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'img');
  });

  it('should return button for "input[type=button]"', function () {
    fixture.innerHTML = '<input id="target" type="button"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should return button for "input[type=image]"', function () {
    fixture.innerHTML = '<input id="target" type="image"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should return button for "input[type=reset]"', function () {
    fixture.innerHTML = '<input id="target" type="reset"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should return button for "input[type=submit]"', function () {
    fixture.innerHTML = '<input id="target" type="submit"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'button');
  });

  it('should return checkbox for "input[type=checkbox]"', function () {
    fixture.innerHTML = '<input id="target" type="checkbox"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'checkbox');
  });

  it('should return textbox for "input[type=email]"', function () {
    fixture.innerHTML = '<input id="target" type="email"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=tel]"', function () {
    fixture.innerHTML = '<input id="target" type="tel"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=text]"', function () {
    fixture.innerHTML = '<input id="target" type="text"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=url]"', function () {
    fixture.innerHTML = '<input id="target" type="url"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=password]"', function () {
    fixture.innerHTML = '<input id="target" type="password"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=time]"', function () {
    fixture.innerHTML = '<input id="target" type="time"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=date]"', function () {
    fixture.innerHTML = '<input id="target" type="date"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input:not([type])"', function () {
    fixture.innerHTML = '<input id="target"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return combobox for "input[list]" that points to a datalist', function () {
    fixture.innerHTML =
      '<input id="target" list="list"/><datalist id="list"></datalist>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'combobox');
  });

  it('should return textbox for "input[list]" that does not point to a datalist', function () {
    fixture.innerHTML = '<input id="target" list="list"/><div id="list"></div>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return textbox for "input[type=password][list]"', function () {
    fixture.innerHTML =
      '<input id="target" type="password" list="list"/>' +
      '<datalist id="list"></datalist>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return spinbutton for "input[type=number]"', function () {
    fixture.innerHTML = '<input id="target" type="number"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'spinbutton');
  });

  it('should return radio for "input[type=radio]"', function () {
    fixture.innerHTML = '<input id="target" type="radio"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'radio');
  });

  it('should return slider for "input[type=range]"', function () {
    fixture.innerHTML = '<input id="target" type="range"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'slider');
  });

  it('should return searchbox for "input[type=search]"', function () {
    fixture.innerHTML = '<input id="target" type="search"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'searchbox');
  });

  it('should return combobox for "input[type=search][list]"', function () {
    fixture.innerHTML =
      '<input id="target" type="search" list="list"/><datalist id="list"></datalist>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'combobox');
  });

  it('should return textbox for "input[type=invalid]"', function () {
    fixture.innerHTML = '<input id="target" type="invalid"/>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'textbox');
  });

  it('should return region for "section" with accessible name aria-label', function () {
    fixture.innerHTML = '<section id="target" aria-label="foo"></section>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'region');
  });

  it('should return region for section with accessible name aria-labelledby', function () {
    fixture.innerHTML =
      '<div id="foo">foo</div><section id="target" aria-labelledby="foo"></section>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'region');
  });

  it('should return null for section with accessible name title', function () {
    fixture.innerHTML = '<section id="target" title="foo"></section>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for "section" without accessible name', function () {
    fixture.innerHTML = '<section id="target"></section>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for "section" with empty aria-label', function () {
    fixture.innerHTML = '<section id="target" aria-label=" "></section>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for "section" with empty aria-labelledby', function () {
    fixture.innerHTML =
      '<div id="foo"> </div><section id="target" aria-labelledby="foo"></section>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return null for "section" with empty title', function () {
    fixture.innerHTML = '<section id="target" title=" "></section>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.isNull(implicitRole(node));
  });

  it('should return listbox for "select[multiple]"', function () {
    fixture.innerHTML = '<select id="target" multiple></select>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'listbox');
  });

  it('should return listbox for "select[size]" > 1', function () {
    fixture.innerHTML = '<select id="target" size="3"></select>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'listbox');
  });

  it('should return combobox for "select[size]" <= 1', function () {
    fixture.innerHTML = '<select id="target" size="1"></select>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'combobox');
  });

  it('should return combobox for "select"', function () {
    fixture.innerHTML = '<select id="target"></select>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'combobox');
  });

  it('should return cell for "td"', function () {
    fixture.innerHTML = '<table><td id="target"></td></table>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'cell');
  });

  it('should return gridcell for "td" with grid parent', function () {
    fixture.innerHTML = '<table role="grid"><td id="target"></td></table>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'gridcell');
  });

  it('should return gridcell for "td" with treegrid parent', function () {
    fixture.innerHTML = '<table role="treegrid"><td id="target"></td></table>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'gridcell');
  });

  it('should return rowheader for "th[scope=row]"', function () {
    fixture.innerHTML = '<table><th id="target" scope="row"></th></table>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'rowheader');
  });

  it('should return columnheader for "th[scope=col]"', function () {
    fixture.innerHTML = '<table><th id="target" scope="col"></th></table>';
    var node = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    assert.equal(implicitRole(node), 'columnheader');
  });
});
