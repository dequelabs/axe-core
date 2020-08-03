describe('standards.getAriaRolesSupportingNameFromContent', function() {
	var getAriaRolesSupportingNameFromContent =
		axe.commons.standards.getAriaRolesSupportingNameFromContent;

	before(function() {
		axe._load({});
	});

	after(function() {
		axe.reset();
	});

	it('should return a list of role names which are named from content', function() {
		// Source: https://www.w3.org/TR/wai-aria-1.1/#namefromcontent
		// Source: https://www.w3.org/TR/dpub-aria-1.0/
		// Note: we have added roles in our spec. also note that
		// although "tree" is listed as supporting name from content
		// it's role definition does not list contents in the name from
		// section (it was removed from the list in WAI ARIA 1.2)
		var contentRoles = getAriaRolesSupportingNameFromContent();
		assert.deepEqual(contentRoles, [
			'button',
			'cell',
			'checkbox',
			'columnheader',
			'directory',
			'figure',
			'gridcell',
			'heading',
			'link',
			'listitem',
			'menuitem',
			'menuitemcheckbox',
			'menuitemradio',
			'option',
			'radio',
			'row',
			'rowgroup',
			'rowheader',
			'section',
			'sectionhead',
			'switch',
			'tab',
			'table',
			'term',
			'tooltip',
			'treeitem',
			'doc-backlink',
			'doc-biblioref',
			'doc-glossref',
			'doc-noteref'
		]);
	});

	it('should return configured roles', function() {
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

	it('should not return role that is configured to not be of the type', function() {
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
