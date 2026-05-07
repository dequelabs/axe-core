describe('standards.getAriaRolesSupportingNameFromContent', () => {
  const getAriaRolesSupportingNameFromContent =
    axe.commons.standards.getAriaRolesSupportingNameFromContent;

  it('should return a list of role names which are named from content', () => {
    // first remove all namedFromContent
    const roleNames = Object.keys(axe._audit.standards.ariaRoles);
    const ariaRoles = {};
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

    const contentRoles = getAriaRolesSupportingNameFromContent();
    assert.deepEqual(contentRoles, [
      'button',
      'cell',
      'checkbox',
      'columnheader'
    ]);
  });

  it('should return configured roles', () => {
    axe.configure({
      standards: {
        ariaRoles: {
          myRole: {
            nameFromContent: true
          }
        }
      }
    });

    const contentRoles = getAriaRolesSupportingNameFromContent();
    assert.include(contentRoles, 'myRole');
  });

  it('should not return role that is configured to not be of the type', () => {
    axe.configure({
      standards: {
        ariaRoles: {
          button: {
            nameFromContent: false
          }
        }
      }
    });

    const contentRoles = getAriaRolesSupportingNameFromContent();
    assert.notInclude(contentRoles, 'button');
  });
});
