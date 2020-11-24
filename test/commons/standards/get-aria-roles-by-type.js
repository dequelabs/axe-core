describe('standards.getAriaRolesByType', function() {
  var getAriaRolesByType = axe.commons.standards.getAriaRolesByType;

  before(function() {
    axe._load({});
  });

  after(function() {
    axe.reset();
  });

  it('should return a list of role names by type', function() {
    // Source: https://www.w3.org/TR/wai-aria-1.1/#document_structure_roles
    var structureRoles = getAriaRolesByType('structure');
    assert.deepEqual(structureRoles, [
      'article',
      'blockquote',
      'caption',
      'cell',
      'code',
      'columnheader',
      'definition',
      'deletion',
      'directory',
      'document',
      'emphasis',
      'feed',
      'figure',
      'group',
      'heading',
      'img',
      'insertion',
      'list',
      'listitem',
      'math',
      'meter',
      'none',
      'note',
      'paragraph',
      'presentation',
      'row',
      'rowgroup',
      'rowheader',
      'separator',
      'strong',
      'subscript',
      'superscript',
      'table',
      'term',
      'time',
      'toolbar',
      'tooltip'
    ]);
  });

  it('should return configured roles', function() {
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

  it('should not return role that is configured to not be of the type', function() {
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
