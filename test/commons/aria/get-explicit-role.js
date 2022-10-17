describe('aria.getExplicitRole', function () {
  'use strict';
  var aria = axe.commons.aria;
  var roleDefinitions = aria.lookupTable.role;
  var flatTreeSetup = axe.testUtils.flatTreeSetup;

  it('returns valid roles', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'button');
    var vNode = flatTreeSetup(node)[0];
    assert.equal(aria.getExplicitRole(vNode), 'button');
  });

  it('handles case sensitivity', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'BUTTON');
    var vNode = flatTreeSetup(node)[0];
    assert.equal(aria.getExplicitRole(vNode), 'button');
  });

  it('handles whitespacing', function () {
    var node = document.createElement('div');
    node.setAttribute('role', ' button  ');
    var vNode = flatTreeSetup(node)[0];
    assert.equal(aria.getExplicitRole(vNode), 'button');
  });

  it('returns null when there is no role', function () {
    var node = document.createElement('div');
    var vNode = flatTreeSetup(node)[0];
    assert.isNull(aria.getExplicitRole(vNode));
  });

  it('returns the explicit role if it is valid and non-abstract', function () {
    var node = document.createElement('li');
    node.setAttribute('role', 'menuitem');
    var vNode = flatTreeSetup(node)[0];
    assert.equal(aria.getExplicitRole(vNode), 'menuitem');
  });

  it('ignores fallback roles by default', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'spinbutton button');
    var vNode = flatTreeSetup(node)[0];
    assert.isNull(aria.getExplicitRole(vNode));
  });

  it('returns null if the node is not an element', function () {
    var node = document.createTextNode('foo bar baz');
    var vNode = flatTreeSetup(node)[0];
    assert.isNull(aria.getExplicitRole(vNode));
  });

  describe('abstracts', function () {
    it('ignores abstract roles by default', function () {
      var node = document.createElement('li');
      node.setAttribute('role', 'section');
      var vNode = flatTreeSetup(node)[0];
      assert.equal(roleDefinitions.section.type, 'abstract');
      assert.isNull(aria.getExplicitRole(vNode));
    });

    it('returns abstract roles with `abstracts: true`', function () {
      var node = document.createElement('li');
      node.setAttribute('role', 'section');
      var vNode = flatTreeSetup(node)[0];
      assert.equal(roleDefinitions.section.type, 'abstract');
      assert.equal(aria.getExplicitRole(vNode, { abstracts: true }), 'section');
    });

    it('does not returns abstract roles with `abstracts: false`', function () {
      var node = document.createElement('li');
      node.setAttribute('role', 'section');
      var vNode = flatTreeSetup(node)[0];
      assert.equal(roleDefinitions.section.type, 'abstract');
      assert.isNull(aria.getExplicitRole(vNode, { abstracts: false }));
    });
  });

  describe('dpub', function () {
    it('ignores DPUB roles by default', function () {
      var node = document.createElement('section');
      node.setAttribute('role', 'doc-chapter');
      var vNode = flatTreeSetup(node)[0];
      assert.isNull(aria.getExplicitRole(vNode));
    });

    it('returns DPUB roles with `dpub: true`', function () {
      var node = document.createElement('section');
      node.setAttribute('role', 'doc-chapter');
      var vNode = flatTreeSetup(node)[0];
      assert.equal(aria.getExplicitRole(vNode, { dpub: true }), 'doc-chapter');
    });

    it('does not returns DPUB roles with `dpub: false`', function () {
      var node = document.createElement('section');
      node.setAttribute('role', 'doc-chapter');
      var vNode = flatTreeSetup(node)[0];
      assert.isNull(aria.getExplicitRole(vNode, { dpub: false }));
    });
  });

  describe('fallback', function () {
    it('returns the first valid item in the list', function () {
      var node = document.createElement('div');
      node.setAttribute('role', 'link button');
      var vNode = flatTreeSetup(node)[0];
      assert.equal(aria.getExplicitRole(vNode, { fallback: true }), 'link');
    });

    it('skips over invalid roles', function () {
      var node = document.createElement('div');
      node.setAttribute('role', 'foobar button');
      var vNode = flatTreeSetup(node)[0];
      assert.equal(aria.getExplicitRole(vNode, { fallback: true }), 'button');
    });

    it('returns the null if all roles are invalid and there is no implicit role', function () {
      var node = document.createElement('div');
      node.setAttribute('role', 'foo bar baz');
      var vNode = flatTreeSetup(node)[0];
      assert.isNull(aria.getExplicitRole(vNode, { fallback: true }));
    });

    it('respect the `abstracts` option', function () {
      var node = document.createElement('li');
      node.setAttribute('role', 'doc-chapter section');
      var vNode = flatTreeSetup(node)[0];
      assert.equal(
        aria.getExplicitRole(vNode, { fallback: true, abstracts: true }),
        'section'
      );
    });

    it('respect the `dpub` option', function () {
      var node = document.createElement('li');
      node.setAttribute('role', 'doc-chapter section');
      var vNode = flatTreeSetup(node)[0];
      assert.equal(
        aria.getExplicitRole(vNode, { fallback: true, dpub: true }),
        'doc-chapter'
      );
    });
  });
});
