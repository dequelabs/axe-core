describe('aria.validateNodeAndAttributes', function() {
	/**
	 * @description Convenience method to create a node with supplied attributes and role
	 * @param {String} tag element tag to construct as node
	 * @param {Array<Object>} attrs list of attributes to add to the created node
	 * @param {String} role role to add to created node
	 */
	function getNode(tag, attrs, role) {
		var node = document.createElement(tag);
		if (attrs) {
			Object.keys(attrs).forEach(function(key) {
				node.setAttribute(key, attrs[key]);
			});
		}
		if (role) {
			node.setAttribute('role', role);
		}
		return node;
	}

	// Tests for elements that can have No Role:
	// defined in axe.commons.aria.lookupTable.elementsAllowedNoRole
	describe('validate elements that can have no role (elementsAllowedNoRole)', function() {
		var constraints;

		beforeEach(function() {
			constraints = axe.commons.aria.lookupTable.elementsAllowedNoRole;
		});

		afterEach(function() {
			axe.commons.aria.lookupTable.elementsAllowedNoRole = constraints;
		});

		it('ensure that the lookupTable.elementsAllowedNoRole is invoked', function() {
			var overrideInvoked = false;
			axe.commons.aria.lookupTable.elementsAllowedNoRole = [
				'MOOSE',
				{
					tagName: 'BEAR',
					condition: function(node) {
						overrideInvoked = true;
						assert.isDefined(node);
						return true;
					}
				}
			];

			var nodeMoose = getNode('moose');
			var actualMoose = axe.commons.aria.validateNodeAndAttributes(
				nodeMoose,
				axe.commons.aria.lookupTable.elementsAllowedNoRole
			);
			assert.isTrue(actualMoose);

			var nodeBear = getNode('bear');
			var actualBear = axe.commons.aria.validateNodeAndAttributes(
				nodeBear,
				axe.commons.aria.lookupTable.elementsAllowedNoRole
			);
			assert.isTrue(overrideInvoked);
			assert.isTrue(actualBear);
		});

		// verify tags that are strings
		it("returns true for elements ['BASE', 'BODY', 'DATALIST', 'DD', 'CLIPPATH',	'CURSOR',	'META', 'METER',	'PICTURE', 'PROGRESS']", function(done) {
			const elTags = [
				'BASE',
				'BODY',
				'DATALIST',
				'DD',
				'CLIPPATH',
				'CURSOR',
				'META',
				'METER',
				'PICTURE',
				'PROGRESS'
			];
			elTags.forEach(function(el, index) {
				var node = getNode(el);
				var actual = axe.commons.aria.validateNodeAndAttributes(
					node,
					constraints
				);
				assert.isTrue(actual);
				//exit
				if (index >= elTags.length - 1) {
					done();
				}
			});
		});

		// Verify tags which have object
		it('returns true for element AREA with href', function() {
			var attrs = {
				HREF: '#some-awesome-link'
			};
			var node = getNode('area', attrs);
			var actual = axe.commons.aria.validateNodeAndAttributes(
				node,
				constraints
			);
			assert.isTrue(actual);
		});

		it('returns false for element AREA with no href', function() {
			var node = getNode('area');
			var actual = axe.commons.aria.validateNodeAndAttributes(
				node,
				constraints
			);
			assert.isFalse(actual);
		});

		it('returns true for element INPUT with type COLOR', function() {
			var attrs = {
				TYPE: 'COLOR'
			};
			var node = getNode('input', attrs);
			var actual = axe.commons.aria.validateNodeAndAttributes(
				node,
				constraints
			);
			assert.isTrue(actual);
		});

		it('returns true for element INPUT with type DATETIME', function() {
			var attrs = {
				TYPE: 'DATETIME'
			};
			var node = getNode('input', attrs);
			var actual = axe.commons.aria.validateNodeAndAttributes(
				node,
				constraints
			);
			assert.isTrue(actual);
		});

		it('returns false for element INPUT with type EMAIL but has LIST attribute', function() {
			var attrs = {
				TYPE: 'EMAIL',
				LIST: 'SOME_VALUE'
			};
			var node = getNode('input', attrs);
			var actual = axe.commons.aria.validateNodeAndAttributes(
				node,
				constraints
			);
			assert.isFalse(actual);
		});

		it('returns true for element INPUT with type EMAIL and no LIST attribute', function() {
			var attrs = {
				TYPE: 'EMAIL'
			};
			var node = getNode('input', attrs);
			var actual = axe.commons.aria.validateNodeAndAttributes(
				node,
				constraints
			);
			assert.isTrue(actual);
		});

		it('returns false for custom element that is not included in elementsAllowedNoRole', function() {
			var attrs = {
				DATA: 'YO'
			};
			var node = getNode('myElement', attrs);
			var actual = axe.commons.aria.validateNodeAndAttributes(
				node,
				constraints
			);
			assert.isFalse(actual);
		});

		it('returns false for element SELECT with type MULTIPLE and SIZE 1', function() {
			var attrs = {
				TYPE: 'MULTIPLE',
				SIZE: 1
			};
			var node = getNode('select', attrs);
			var actual = axe.commons.aria.validateNodeAndAttributes(
				node,
				constraints
			);
			assert.isFalse(actual);
		});

		it('returns true for element SELECT with type MULTIPLE and SIZE 5', function() {
			var attrs = {
				TYPE: 'MULTIPLE',
				SIZE: 5
			};
			var node = getNode('select', attrs);
			var actual = axe.commons.aria.validateNodeAndAttributes(
				node,
				constraints
			);
			assert.isTrue(actual);
		});
	});

	// Tests for elements that can have No Role:
	// defined in axe.commons.aria.lookupTable.elementsAllowedAnyRole
	describe('validate elements that can have any role (elementsAllowedAnyRole)', function() {
		var constraints = axe.commons.aria.lookupTable.elementsAllowedAnyRole;

		beforeEach(function() {
			constraints = axe.commons.aria.lookupTable.elementsAllowedAnyRole;
		});

		afterEach(function() {
			axe.commons.aria.lookupTable.elementsAllowedAnyRole = constraints;
		});

		it('ensure that the lookupTable.elementsAllowedAnyRole is invoked', function() {
			var overrideInvoked = false;
			axe.commons.aria.lookupTable.elementsAllowedAnyRole = [
				'LION',
				{
					tagName: 'TIGER',
					condition: function(node) {
						overrideInvoked = true;
						assert.isDefined(node);
						return false;
					}
				}
			];

			var nodeLion = getNode('lion');
			var actualLion = axe.commons.aria.validateNodeAndAttributes(
				nodeLion,
				axe.commons.aria.lookupTable.elementsAllowedAnyRole
			);
			assert.isTrue(actualLion);

			var nodeTiger = getNode('tiger');
			var actualTiger = axe.commons.aria.validateNodeAndAttributes(
				nodeTiger,
				axe.commons.aria.lookupTable.elementsAllowedAnyRole
			);
			assert.isTrue(overrideInvoked);
			assert.isFalse(actualTiger);
		});

		// verify tags that are strings
		it("returns true for elements ['ABBR', 'CANVAS', 'DIV', 'PRE', 'DEL',	'Q',	'SUB', 'WBR']", function(done) {
			const elTags = ['ABBR', 'CANVAS', 'DIV', 'PRE', 'DEL', 'Q', 'SUB', 'WBR'];
			elTags.forEach(function(el, index) {
				var node = getNode(el);
				var actual = axe.commons.aria.validateNodeAndAttributes(
					node,
					constraints
				);
				assert.isTrue(actual);
				//exit
				if (index >= elTags.length - 1) {
					done();
				}
			});
		});

		// Verify tags which have object
		it('returns false for element A with href', function() {
			var attrs = {
				HREF: '#i-cannot-have-a-link'
			};
			var node = getNode('a', attrs);
			var actual = axe.commons.aria.validateNodeAndAttributes(
				node,
				constraints
			);
			assert.isFalse(actual);
		});

		it('returns true for element A without href', function() {
			var node = getNode('a');
			var actual = axe.commons.aria.validateNodeAndAttributes(
				node,
				constraints
			);
			assert.isTrue(actual);
		});

		it('returns false for element BODY', function() {
			var node = getNode('body');
			var actual = axe.commons.aria.validateNodeAndAttributes(
				node,
				constraints
			);
			assert.isFalse(actual);
		});
	});

	// Tests for elements that are alowed for a given role.
	// these elements are defined as attribute allowedElements in role hash
	describe('validate allowedElements for a given role in lookupTable.role', function() {
		// There are not a lot of tests here as most of the allowedElemets
		// are covered in other encapsulating sets like isAriaAllowedOnElement
		// The below tests aim to by-pass the isAriaAllowedOnElement method
		// and test the validateNodeAndAttributes function
		it('returns true for element SECTION with role alert', function() {
			var allowedElements = ['SECTION'];
			var role = 'alert';
			var node = getNode('section', undefined, role);
			var actual = axe.commons.aria.validateNodeAndAttributes(
				node,
				allowedElements
			);
			assert.isTrue(actual);
		});

		it('retutn true for INPUT of type image with role menuitem', function() {
			var allowedElements = [
				{
					tagName: 'INPUT',
					attributes: {
						TYPE: 'IMAGE'
					}
				}
			];
			var attrs = {
				TYPE: 'IMAGE'
			};
			var role = 'menuitem';
			var node = getNode('input', attrs, role);
			var actual = axe.commons.aria.validateNodeAndAttributes(
				node,
				allowedElements
			);
			assert.isTrue(actual);
		});
	});
});
