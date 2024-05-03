describe('aria.getElementUnallowedRoles', function () {
  let flatTreeSetup = axe.testUtils.flatTreeSetup;
  let getElementUnallowedRoles = axe.commons.aria.getElementUnallowedRoles;

  it('returns unallowed role=application when used on a input elm', function () {
    let node = document.createElement('input');
    let role = 'application';
    node.setAttribute('type', '');
    node.setAttribute('aria-pressed', '');
    node.setAttribute('role', role);
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node);
    assert.isNotEmpty(actual);
    assert.include(actual, role);
  });

  it('returns empty on type=checkbox and aria-pressed attr on input elm', function () {
    let node = document.createElement('input');
    node.setAttribute('type', 'checkbox');
    node.setAttribute('aria-pressed', '');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node);
    assert.isEmpty(actual);
  });

  it('returns unallowed role=menubar when used on a li elm', function () {
    let node = document.createElement('li');
    let role = 'menubar';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node);
    assert.isNotEmpty(actual, role);
  });

  it('returns empty on role=menuitemcheckbox with type=button on input elm', function () {
    let node = document.createElement('input');
    let role = 'menuitemcheckbox';
    node.setAttribute('role', role);
    node.setAttribute('type', 'button');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node);
    assert.isEmpty(actual);
  });

  it('returns unallowed role=option when used on section elm', function () {
    let node = document.createElement('section');
    let role = 'option';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node);
    assert.isNotEmpty(actual);
    assert.include(actual, role);
  });

  it('returns empty on role=menuitemradio and type=radio on input elm', function () {
    let node = document.createElement('input');
    let role = 'menuitemradio';
    node.setAttribute('role', role);
    node.setAttribute('type', 'radio');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node);
    assert.isEmpty(actual);
  });

  it('returns unallowed role=textbox on a input elm and  allowImplicit is true (default)', function () {
    let node = document.createElement('input');
    let role = 'textbox';
    node.setAttribute('role', role);
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node, true);
    assert.isEmpty(actual, role);
  });

  it('returns empty on role=button on div elm when role is not implicit and allowImplicit: false', function () {
    let node = document.createElement('div');
    node.setAttribute('role', 'button');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node, false);
    assert.isEmpty(actual);
  });

  it('returns unallowed role=contentinfo on footer elm and allowImplicit: false', function () {
    let node = document.createElement('footer');
    node.setAttribute('role', 'contentinfo');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node, false);
    assert.isNotEmpty(actual, 'contentinfo');
  });

  it('returns unallowed role=banner on header elm and allowImplicit:false', function () {
    let node = document.createElement('header');
    node.setAttribute('role', 'banner');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node, false);
    assert.isNotEmpty(actual, 'banner');
  });

  it('returns empty on role=contentinfo on footer elm when allowImplicit:true', function () {
    let node = document.createElement('footer');
    node.setAttribute('role', 'contentinfo');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node);
    assert.isEmpty(actual);
  });

  it('returns empty on role=banner on header elm when allowImplicit:true', function () {
    let node = document.createElement('header');
    node.setAttribute('role', 'banner');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node);
    assert.isEmpty(actual);
  });

  it('returns empty role=doc-backlink on anchor elm and allowImplicit:false', function () {
    let node = document.createElement('a');
    node.setAttribute('href', '#');
    node.setAttribute('role', 'doc-backlink');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node, false);
    assert.isEmpty(actual);
  });

  it('returns empty on role=doc-backlink on anchor elm when allowImplicit:true', function () {
    let node = document.createElement('a');
    node.setAttribute('href', '#');
    node.setAttribute('role', 'doc-backlink');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node);
    assert.isEmpty(actual);
  });

  it('returns unallowed role=doc-backlink on anchor elm without href attr and allowImplicit:false', function () {
    let node = document.createElement('a');
    node.setAttribute('role', 'doc-backlink');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node, false);
    assert.isNotEmpty(actual, 'doc-backlink');
  });

  it('returns unallowed role=doc-backlink on anchor elm without href attr and allowImplicit:true', function () {
    let node = document.createElement('a');
    node.setAttribute('role', 'doc-backlink');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node);
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
    let node = document.createElement('header');
    node.setAttribute('role', 'banner');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node, false);
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
    let node = document.createElement('footer');
    node.setAttribute('role', 'contentinfo');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node, false);
    assert.isEmpty(actual);
  });

  it('returns unallowed role=row when when used on TR element and allowImplicit:false', function () {
    let node = document.createElement('tr');
    node.setAttribute('role', 'row');
    flatTreeSetup(node);
    let actual = getElementUnallowedRoles(node, false);
    assert.isNotEmpty(actual, 'row');
  });

  it('returns empty on type=checkbox and aria-pressed attr on SerialVirtualNode with a input elm', function () {
    let vNode = new axe.SerialVirtualNode({
      nodeName: 'input',
      attributes: {
        type: 'checkbox',
        'aria-pressed': ''
      }
    });
    let actual = getElementUnallowedRoles(vNode);
    assert.isEmpty(actual);
  });

  it('returns unallowed role=application for a SerialVirtualNode with a input elm', function () {
    let vNode = new axe.SerialVirtualNode({
      nodeName: 'input',
      attributes: {
        role: 'application',
        type: '',
        'aria-pressed': ''
      }
    });
    let actual = getElementUnallowedRoles(vNode);
    assert.isNotEmpty(actual);
    assert.include(actual, 'application');
  });
});
