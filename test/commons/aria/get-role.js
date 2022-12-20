describe('aria.getRole', function () {
  'use strict';
  var aria = axe.commons.aria;
  var flatTreeSetup = axe.testUtils.flatTreeSetup;
  var fixture = document.querySelector('#fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns valid roles', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'button');
    flatTreeSetup(node);
    assert.equal(aria.getRole(node), 'button');
  });

  it('handles case sensitivity', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'BUTTON');
    flatTreeSetup(node);
    assert.equal(aria.getRole(node), 'button');
  });

  it('handles whitespacing', function () {
    var node = document.createElement('div');
    node.setAttribute('role', ' button  ');
    flatTreeSetup(node);
    assert.equal(aria.getRole(node), 'button');
  });

  it('returns null when there is no role', function () {
    var node = document.createElement('div');
    flatTreeSetup(node);
    assert.isNull(aria.getRole(node));
  });

  it('returns the explit role if it is valid and non-abstract', function () {
    var node = document.createElement('li');
    node.setAttribute('role', 'menuitem');
    flatTreeSetup(node);
    assert.equal(aria.getRole(node), 'menuitem');
  });

  it('returns the implicit role if the explicit is invalid', function () {
    fixture.innerHTML = '<ul><li id="target" role="foobar"></li></ul>';
    flatTreeSetup(fixture);
    var node = fixture.querySelector('#target');
    assert.equal(aria.getRole(node), 'listitem');
  });

  it('ignores fallback roles by default', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'spinbutton button');
    flatTreeSetup(node);
    assert.isNull(aria.getRole(node));
  });

  it('accepts virtualNode objects', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'button');
    var vNode = flatTreeSetup(node)[0];
    assert.equal(aria.getRole(vNode), 'button');
  });

  it('returns null if the node is not an element', function () {
    var node = document.createTextNode('foo bar baz');
    flatTreeSetup(node);
    assert.isNull(aria.getRole(node));
  });

  it('runs role resolution with role=none', function () {
    fixture.innerHTML =
      '<ul><li id="target" role="none" aria-label="foo"></li></ul>';
    flatTreeSetup(fixture);
    var node = fixture.querySelector('#target');
    assert.equal(aria.getRole(node), 'listitem');
  });

  it('runs role resolution with role=presentation', function () {
    fixture.innerHTML =
      '<ul><li id="target" role="presentation" aria-label="foo"></li></ul>';
    flatTreeSetup(fixture);
    var node = fixture.querySelector('#target');
    assert.equal(aria.getRole(node), 'listitem');
  });

  it('handles focusable element with role="none"', function () {
    fixture.innerHTML = '<button id="target" role="none"></button>';
    flatTreeSetup(fixture);
    var node = fixture.querySelector('#target');
    assert.equal(aria.getRole(node), 'button');
  });

  describe('presentational role inheritance', function () {
    it('handles presentation role inheritance for ul', function () {
      fixture.innerHTML =
        '<ul role="presentation"><li id="target">foo</li></ul>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'presentation');
    });

    it('handles presentation role inheritance for ol', function () {
      fixture.innerHTML =
        '<ol role="presentation"><li id="target">foo</li></ol>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'presentation');
    });

    it('handles presentation role inheritance for dt', function () {
      fixture.innerHTML =
        '<dl role="presentation"><dt id="target">foo</dt><dd>bar></dd></dl>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'presentation');
    });

    it('handles presentation role inheritance for dd', function () {
      fixture.innerHTML =
        '<dl role="presentation"><dt>foo</dt><dd id="target">bar></dd></dl>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'presentation');
    });

    it('handles presentation role inheritance for dt with div wrapper', function () {
      fixture.innerHTML =
        '<dl role="presentation"><div><dt id="target">foo</dt><dd>bar></dd></div></dl>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'presentation');
    });

    it('handles presentation role inheritance for dd with div wrapper', function () {
      fixture.innerHTML =
        '<dl role="presentation"><div><dt>foo</dt><dd id="target">bar></dd></div></dl>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'presentation');
    });

    it('handles presentation role inheritance for thead', function () {
      fixture.innerHTML =
        '<table role="presentation"><thead id="target"><tr><th>hi</th><th>goodbye</th></tr></thead><tbody><tr><th>hi</th><td>foo</td></tr></tbody></table>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'presentation');
    });

    it('handles presentation role inheritance for td', function () {
      fixture.innerHTML =
        '<table role="presentation"><thead><tr><th>hi</th><th>goodbye</th></tr></thead><tbody><tr><th>hi</th><td id="target">foo</td></tr></tbody></table>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'presentation');
    });

    it('handles presentation role inheritance for th', function () {
      fixture.innerHTML =
        '<table role="presentation"><thead><tr><th>hi</th><th>goodbye</th></tr></thead><tbody><tr><th id="target">hi</th><td>foo</td></tr></tbody></table>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'presentation');
    });

    it('handles presentation role inheritance for tbody', function () {
      fixture.innerHTML =
        '<table role="presentation"><thead><tr><th>hi</th><th>goodbye</th></tr></thead><tbody id="target"><tr><th>hi</th><td>foo</td></tr></tbody></table>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'presentation');
    });

    it('handles presentation role inheritance for tr', function () {
      fixture.innerHTML =
        '<table role="presentation"><thead><tr id="target"><th>hi</th><th>goodbye</th></tr></thead><tbody><tr><th>hi</th><td>foo</td></tr></tbody></table>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'presentation');
    });

    it('handles presentation role inheritance for tfoot', function () {
      fixture.innerHTML =
        '<table role="presentation"><thead><tr><th>hi</th><th>goodbye</th></tr></thead><tfoot id="target"><tr><th>hi</th><td>foo</td></tr></tfoot></table>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'presentation');
    });

    it('returns implicit role for presentation role inheritance if ancestor is not the required ancestor', function () {
      fixture.innerHTML =
        '<table role="presentation"><tr><td><ul><li id="target">foo</li></ul></td></tr></table>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'listitem');
    });

    it('does not override explicit role with presentation role inheritance', function () {
      fixture.innerHTML =
        '<ul role="presentation"><li id="target" role="listitem">foo</li></ul>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'listitem');
    });

    it('does not continue presentation role with explicit role in between', function () {
      fixture.innerHTML =
        '<table role="presentation"><tr role="row"><td id="target">foo</td></tr></table>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'cell');
    });

    it('handles presentation role inheritance with invalid role in between', function () {
      fixture.innerHTML =
        '<table role="presentation"><tr role="tablerow"><td id="target">foo</td></tr></table>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'presentation');
    });

    it('does not continue presentation role through nested layers', function () {
      fixture.innerHTML =
        '<ul role="presentation"><li><ul><li id="target">foo</li></ul></li></ul>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'listitem');
    });

    it('throws an error if the tree is incomplete', function () {
      fixture.innerHTML =
        '<ul role="presentation"><li id="target">foo</li></ul>';
      var node = fixture.querySelector('#target');
      flatTreeSetup(node);
      assert.throws(function () {
        aria.getRole(node);
      });
    });
  });

  describe('noImplicit', function () {
    it('returns the implicit role by default', function () {
      fixture.innerHTML = '<ul><li id="target"></li></ul>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'listitem');
    });

    it('returns null rather than the implicit role with `noImplicit: true`', function () {
      var node = document.createElement('li');
      flatTreeSetup(node);
      assert.isNull(aria.getRole(node, { noImplicit: true }));
    });

    it('does not do role resolution if noImplicit: true', function () {
      var node = document.createElement('li');
      node.setAttribute('role', 'none');
      node.setAttribute('aria-label', 'foo');
      flatTreeSetup(node);
      assert.equal(aria.getRole(node, { noImplicit: true }), null);
    });

    it('still returns the explicit role', function () {
      var node = document.createElement('li');
      node.setAttribute('role', 'button');
      flatTreeSetup(node);
      assert.equal(aria.getRole(node, { noImplicit: true }), 'button');
    });

    it('returns the implicit role with `noImplicit: false`', function () {
      fixture.innerHTML = '<ul><li id="target"></li></ul>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node, { noImplicit: false }), 'listitem');
    });
  });

  describe('abstracts', function () {
    it('ignores abstract roles by default', function () {
      fixture.innerHTML = '<ul><li id="target" role="section"></li></ul>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node), 'listitem');
    });

    it('returns abstract roles with `abstracts: true`', function () {
      var node = document.createElement('li');
      node.setAttribute('role', 'section');
      flatTreeSetup(node);
      assert.equal(aria.getRole(node, { abstracts: true }), 'section');
    });

    it('does not returns abstract roles with `abstracts: false`', function () {
      fixture.innerHTML = '<ul><li id="target" role="section"></li></ul>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node, { abstracts: false }), 'listitem');
    });
  });

  describe('dpub', function () {
    it('ignores DPUB roles by default', function () {
      var node = document.createElement('section');
      node.setAttribute('role', 'doc-chapter');
      flatTreeSetup(node);
      assert.isNull(aria.getRole(node));
    });

    it('returns DPUB roles with `dpub: true`', function () {
      var node = document.createElement('section');
      node.setAttribute('role', 'doc-chapter');
      flatTreeSetup(node);
      assert.equal(aria.getRole(node, { dpub: true }), 'doc-chapter');
    });

    it('does not returns DPUB roles with `dpub: false`', function () {
      var node = document.createElement('section');
      node.setAttribute('role', 'doc-chapter');
      flatTreeSetup(node);
      assert.isNull(aria.getRole(node, { dpub: false }));
    });
  });

  describe('fallback', function () {
    it('returns the first valid item in the list', function () {
      var node = document.createElement('div');
      node.setAttribute('role', 'link button');
      flatTreeSetup(node);
      assert.equal(aria.getRole(node, { fallback: true }), 'link');
    });

    it('skips over invalid roles', function () {
      var node = document.createElement('div');
      node.setAttribute('role', 'foobar button');
      flatTreeSetup(node);
      assert.equal(aria.getRole(node, { fallback: true }), 'button');
    });

    it('returns the null if all roles are invalid and there is no implicit role', function () {
      var node = document.createElement('div');
      node.setAttribute('role', 'foo bar baz');
      flatTreeSetup(node);
      assert.isNull(aria.getRole(node, { fallback: true }));
    });

    it('respects the defaults', function () {
      fixture.innerHTML =
        '<ul><li id="target" role="doc-chapter section"></li></ul>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.equal(aria.getRole(node, { fallback: true }), 'listitem');
    });

    it('respect the `noImplicit` option', function () {
      var node = document.createElement('li');
      node.setAttribute('role', 'doc-chapter section');
      flatTreeSetup(node);
      assert.isNull(aria.getRole(node, { fallback: true, noImplicit: true }));
    });

    it('respect the `abstracts` option', function () {
      var node = document.createElement('li');
      node.setAttribute('role', 'doc-chapter section');
      flatTreeSetup(node);
      assert.equal(
        aria.getRole(node, { fallback: true, abstracts: true }),
        'section'
      );
    });

    it('respect the `dpub` option', function () {
      var node = document.createElement('li');
      node.setAttribute('role', 'doc-chapter section');
      flatTreeSetup(node);
      assert.equal(
        aria.getRole(node, { fallback: true, dpub: true }),
        'doc-chapter'
      );
    });
  });

  describe('noPresentational is honored', function () {
    it('handles no inheritance role = presentation', function () {
      fixture.innerHTML =
        '<ul role="presentation" id="target"><li>foo</li></ul>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.isNull(aria.getRole(node, { noPresentational: true }));
    });

    it('handles inheritance role = presentation', function () {
      fixture.innerHTML =
        '<ul role="presentation"><li id="target">foo</li></ul>';
      flatTreeSetup(fixture);
      var node = fixture.querySelector('#target');
      assert.isNull(aria.getRole(node, { noPresentational: true }));
    });

    it('handles implicit role', function () {
      var node = document.createElement('img');
      node.setAttribute('alt', '');
      flatTreeSetup(node);
      assert.isNull(aria.getRole(node, { noPresentational: true }));
    });

    it('handles role = none', function () {
      var node = document.createElement('div');
      node.setAttribute('role', 'none');
      flatTreeSetup(node);
      assert.isNull(aria.getRole(node, { noPresentational: true }));
    });
  });

  describe('SerialVirtualNode', function () {
    it('works with the SerialVirtualNode', function () {
      var vNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'button'
        }
      });
      assert.equal(aria.getRole(vNode), 'button');
    });

    it('does not throw for missing parent in presentational role inheritance', function () {
      var vNode = new axe.SerialVirtualNode({
        nodeName: 'li'
      });

      assert.doesNotThrow(function () {
        assert.equal(aria.getRole(vNode), 'listitem');
      });
    });
  });
});
