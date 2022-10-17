describe('standards.getAriaRolesSupportingNameFromContent', function () {
  var getAriaRolesSupportingNameFromContent =
    axe.commons.standards.getAriaRolesSupportingNameFromContent;

  it('should return a list of role names which are named from content', function () {
    // first remove all namedFromContent
    var roleNames = Object.keys(axe._audit.standards.ariaRoles);
    var ariaRoles = {};
    for (var i = 0; i < roleNames.length; i++) {
      ariaRoles[roleNames[i]] = { nameFromContent: false };
    }

    // then turn on a few specific roles
    ariaRoles.button = { nameFromContent: true };
    ariaRoles.cell = { nameFromContent: true };
    ariaRoles.checkbox = { nameFromContent: true };
    ariaRoles.columnheader = { nameFromContent: true };

    axe.configure({
      standards: {
        ariaRoles: ariaRoles
      }
    });

    var contentRoles = getAriaRolesSupportingNameFromContent();
    assert.deepEqual(contentRoles, [
      'button',
      'cell',
      'checkbox',
      'columnheader'
    ]);
  });

  it('should return configured roles', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          myRole: {
            nameFromContent: true
          }
        }
      }
    });

    var contentRoles = getAriaRolesSupportingNameFromContent();
    assert.include(contentRoles, 'myRole');
  });

  it('should not return role that is configured to not be of the type', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          button: {
            nameFromContent: false
          }
        }
      }
    });

    var contentRoles = getAriaRolesSupportingNameFromContent();
    assert.notInclude(contentRoles, 'button');
  });
});
