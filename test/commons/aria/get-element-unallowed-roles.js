describe('aria.getElementUnallowedRoles', function () {
  var flatTreeSetup = axe.testUtils.flatTreeSetup;
  var getElementUnallowedRoles = axe.commons.aria.getElementUnallowedRoles;

  it('returns unallowed role=application when used on a input elm', function () {
    var node = document.createElement('input');
    var role = 'application';
    node.setAttribute('type', '');
    node.setAttribute('aria-pressed', '');
    node.setAttribute('role', role);
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node);
    assert.isNotEmpty(actual);
    assert.include(actual, role);
  });

  it('returns empty on type=checkbox and aria-pressed attr on input elm', function () {
    var node = document.createElement('input');
    node.setAttribute('type', 'checkbox');
    node.setAttribute('aria-pressed', '');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node);
    assert.isEmpty(actual);
  });

  it('returns unallowed role=menubar when used on a li elm', function () {
    var node = document.createElement('li');
    var role = 'menubar';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node);
    assert.isNotEmpty(actual, role);
  });

  it('returns empty on role=menuitemcheckbox with type=button on input elm', function () {
    var node = document.createElement('input');
    var role = 'menuitemcheckbox';
    node.setAttribute('role', role);
    node.setAttribute('type', 'button');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node);
    assert.isEmpty(actual);
  });

  it('returns unallowed role=option when used on section elm', function () {
    var node = document.createElement('section');
    var role = 'option';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node);
    assert.isNotEmpty(actual);
    assert.include(actual, role);
  });

  it('returns empty on role=menuitemradio and type=radio on input elm', function () {
    var node = document.createElement('input');
    var role = 'menuitemradio';
    node.setAttribute('role', role);
    node.setAttribute('type', 'radio');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node);
    assert.isEmpty(actual);
  });

  it('returns unallowed role=textbox on a input elm and  allowImplicit is true (default)', function () {
    var node = document.createElement('input');
    var role = 'textbox';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node, true);
    assert.isEmpty(actual, role);
  });

  it('returns empty on role=button on div elm when role is not implicit and allowImplicit: false', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'button');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node, false);
    assert.isEmpty(actual);
  });

  it('returns unallowed role=contentinfo on footer elm and allowImplicit: false', function () {
    var node = document.createElement('footer');
    node.setAttribute('role', 'contentinfo');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node, false);
    assert.isNotEmpty(actual, 'contentinfo');
  });

  it('returns unallowed role=banner on header elm and allowImplicit:false', function () {
    var node = document.createElement('header');
    node.setAttribute('role', 'banner');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node, false);
    assert.isNotEmpty(actual, 'banner');
  });

  it('returns empty on role=contentinfo on footer elm when allowImplicit:true', function () {
    var node = document.createElement('footer');
    node.setAttribute('role', 'contentinfo');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node);
    assert.isEmpty(actual);
  });

  it('returns empty on role=banner on header elm when allowImplicit:true', function () {
    var node = document.createElement('header');
    node.setAttribute('role', 'banner');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node);
    assert.isEmpty(actual);
  });

  it('returns empty role=doc-backlink on anchor elm and allowImplicit:false', function () {
    var node = document.createElement('a');
    node.setAttribute('href', '#');
    node.setAttribute('role', 'doc-backlink');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node, false);
    assert.isEmpty(actual);
  });

  it('returns empty on role=doc-backlink on anchor elm when allowImplicit:true', function () {
    var node = document.createElement('a');
    node.setAttribute('href', '#');
    node.setAttribute('role', 'doc-backlink');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node);
    assert.isEmpty(actual);
  });

  it('returns unallowed role=doc-backlink on anchor elm without href attr and allowImplicit:false', function () {
    var node = document.createElement('a');
    node.setAttribute('role', 'doc-backlink');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node, false);
    assert.isNotEmpty(actual, 'doc-backlink');
  });

  it('returns unallowed role=doc-backlink on anchor elm without href attr and allowImplicit:true', function () {
    var node = document.createElement('a');
    node.setAttribute('role', 'doc-backlink');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node);
    assert.isNotEmpty(actual, 'doc-backlink');
  });

  it('returns empty role=banner on header elm when using axe.configure and allowImplicit:false', function () {
    axe.configure({
      standards: {
        htmlElms: {
          header: {
            contentTypes: 'flow',
            allowedRoles: ['banner']
          }
        }
      }
    });
    var node = document.createElement('header');
    node.setAttribute('role', 'banner');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node, false);
    assert.isEmpty(actual);
  });

  it('returns empty role=contentinfo on footer elm when using axe.configure and allowImplicit:false', function () {
    axe.configure({
      standards: {
        htmlElms: {
          footer: {
            contentTypes: 'flow',
            allowedRoles: ['contentinfo']
          }
        }
      }
    });
    var node = document.createElement('footer');
    node.setAttribute('role', 'contentinfo');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node, false);
    assert.isEmpty(actual);
  });

  it('returns unallowed role=row when when used on TR element and allowImplicit:false', function () {
    var node = document.createElement('tr');
    node.setAttribute('role', 'row');
    flatTreeSetup(node);
    var actual = getElementUnallowedRoles(node, false);
    assert.isNotEmpty(actual, 'row');
  });

  it('returns empty on type=checkbox and aria-pressed attr on SerialVirtualNode with a input elm', function () {
    var vNode = new axe.SerialVirtualNode({
      nodeName: 'input',
      attributes: {
        type: 'checkbox',
        'aria-pressed': ''
      }
    });
    var actual = getElementUnallowedRoles(vNode);
    assert.isEmpty(actual);
  });

  it('returns unallowed role=application for a SerialVirtualNode with a input elm', function () {
    var vNode = new axe.SerialVirtualNode({
      nodeName: 'input',
      attributes: {
        role: 'application',
        type: '',
        'aria-pressed': ''
      }
    });
    var actual = getElementUnallowedRoles(vNode);
    assert.isNotEmpty(actual);
    assert.include(actual, 'application');
  });
});
