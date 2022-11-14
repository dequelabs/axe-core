describe('standards.getAriaRolesByType', function () {
  var getAriaRolesByType = axe.commons.standards.getAriaRolesByType;

  it('should return a list of role names by type', function () {
    // first remove all role types
    var roleNames = Object.keys(axe._audit.standards.ariaRoles);
    var ariaRoles = {};
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

    var structureRoles = getAriaRolesByType('structure');
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

    var structureRoles = getAriaRolesByType('structure');
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

    var structureRoles = getAriaRolesByType('structure');
    assert.notInclude(structureRoles, 'article');
  });
});
