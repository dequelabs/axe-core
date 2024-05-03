describe('standards.getAriaRolesByType', function () {
  let getAriaRolesByType = axe.commons.standards.getAriaRolesByType;

  it('should return a list of role names by type', function () {
    // first remove all role types
    let roleNames = Object.keys(axe._audit.standards.ariaRoles);
    let ariaRoles = {};
    for (let i = 0; i < roleNames.length; i++) {
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

    let structureRoles = getAriaRolesByType('structure');
    assert.deepEqual(structureRoles, [
      'article',
      'blockquote',
      'caption',
      'cell'
    ]);
  });

  it('should return configured roles', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          myRole: {
            type: 'structure'
          }
        }
      }
    });

    let structureRoles = getAriaRolesByType('structure');
    assert.include(structureRoles, 'myRole');
  });

  it('should not return role that is configured to not be of the type', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          article: {
            type: 'notstructure'
          }
        }
      }
    });

    let structureRoles = getAriaRolesByType('structure');
    assert.notInclude(structureRoles, 'article');
  });
});
