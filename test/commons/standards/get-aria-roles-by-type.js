describe('standards.getAriaRolesByType', () => {
  const getAriaRolesByType = axe.commons.standards.getAriaRolesByType;

  it('should return a list of role names by type', () => {
    // first remove all role types
    const roleNames = Object.keys(axe._audit.standards.ariaRoles);
    const ariaRoles = {};
    for (var i = 0; i < roleNames.length; i++) {
      ariaRoles[roleNames[i]] = { type: 'off' };
    }

    // then turn on a few specific roles
    ariaRoles.article = { type: 'structure' };
    ariaRoles.blockquote = { type: 'structure' };
    ariaRoles.caption = { type: 'structure' };
    ariaRoles.cell = { type: 'structure' };

    axe.configure({
      standards: {
        ariaRoles: ariaRoles
      }
    });

    const structureRoles = getAriaRolesByType('structure');
    assert.deepEqual(structureRoles, [
      'article',
      'blockquote',
      'caption',
      'cell'
    ]);
  });

  it('should return configured roles', () => {
    axe.configure({
      standards: {
        ariaRoles: {
          myRole: {
            type: 'structure'
          }
        }
      }
    });

    const structureRoles = getAriaRolesByType('structure');
    assert.include(structureRoles, 'myRole');
  });

  it('should not return role that is configured to not be of the type', () => {
    axe.configure({
      standards: {
        ariaRoles: {
          article: {
            type: 'notstructure'
          }
        }
      }
    });

    const structureRoles = getAriaRolesByType('structure');
    assert.notInclude(structureRoles, 'article');
  });
});
