describe('aria.getRole', function() {
	'use strict';
	var aria = axe.commons.aria;
	var roleDefinitions = aria.lookupTable.role;

	var orig;
	beforeEach(function() {
		orig = axe.commons.aria.lookupTable.role;
	});

	afterEach(function() {
		axe.commons.aria.lookupTable.role = orig;
	});

	it('returns valid roles', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'button');
		assert.equal(aria.getRole(node), 'button');
	});

	it('handles case sensitivity', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'BUTTON');
		assert.equal(aria.getRole(node), 'button');
	});

	it('handles whitespacing', function() {
		var node = document.createElement('div');
		node.setAttribute('role', ' button  ');
		assert.equal(aria.getRole(node), 'button');
	});

	it('returns null when there is no role', function() {
		var node = document.createElement('div');
		assert.isNull(aria.getRole(node));
	});

	it('returns the explit role if it is valid and non-abstract', function() {
		var node = document.createElement('li');
		node.setAttribute('role', 'menuitem');
		assert.equal(aria.getRole(node), 'menuitem');
	});

	it('returns the implicit role if the explicit is invalid', function() {
		var node = document.createElement('li');
		node.setAttribute('role', 'foobar');
		assert.equal(aria.getRole(node), 'listitem');
	});

	it('ignores fallback roles by default', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'spinbutton button');
		assert.isNull(aria.getRole(node));
	});

	describe('noImplicit', function() {
		it('returns the implicit role by default', function() {
			var node = document.createElement('li');
			assert.equal(aria.getRole(node), 'listitem');
		});

		it('returns null rather than the implicit role with `noImplicit: true`', function() {
			var node = document.createElement('li');
			assert.isNull(aria.getRole(node, { noImplicit: true }));
		});

		it('still returns the explicit role', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'button');
			assert.equal(aria.getRole(node, { noImplicit: true }), 'button');
		});

		it('returns the implicit role with `noImplicit: false`', function() {
			var node = document.createElement('li');
			assert.equal(aria.getRole(node, { noImplicit: false }), 'listitem');
		});
	});

	describe('abstracts', function() {
		it('ignores abstract roles by default', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'section');
			assert.equal(roleDefinitions.section.type, 'abstract');
			assert.equal(aria.getRole(node), 'listitem');
		});

		it('returns abstract roles with `abstracts: true`', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'section');
			assert.equal(roleDefinitions.section.type, 'abstract');
			assert.equal(aria.getRole(node, { abstracts: true }), 'section');
		});

		it('does not returns abstract roles with `abstracts: false`', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'section');
			assert.equal(roleDefinitions.section.type, 'abstract');
			assert.equal(aria.getRole(node, { abstracts: false }), 'listitem');
		});
	});

	describe('dpub', function() {
		it('ignores DPUB roles by default', function() {
			var node = document.createElement('section');
			node.setAttribute('role', 'doc-chapter');
			assert.isNull(aria.getRole(node));
		});

		it('returns DPUB roles with `dpub: true`', function() {
			var node = document.createElement('section');
			node.setAttribute('role', 'doc-chapter');
			assert.equal(aria.getRole(node, { dpub: true }), 'doc-chapter');
		});

		it('does not returns DPUB roles with `dpub: false`', function() {
			var node = document.createElement('section');
			node.setAttribute('role', 'doc-chapter');
			assert.isNull(aria.getRole(node, { dpub: false }));
		});
	});

	describe('fallback', function() {
		it('returns the first valid item in the list', function() {
			var node = document.createElement('div');
			node.setAttribute('role', 'link button');
			assert.equal(aria.getRole(node, { fallback: true }), 'link');
		});

		it('skips over invalid roles', function() {
			var node = document.createElement('div');
			node.setAttribute('role', 'foobar button');
			assert.equal(aria.getRole(node, { fallback: true }), 'button');
		});

		it('returns the null if all roles are invalid and there is no implicit role', function() {
			var node = document.createElement('div');
			node.setAttribute('role', 'foo bar baz');
			assert.isNull(aria.getRole(node, { fallback: true }));
		});

		it('respects the defaults', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'doc-chapter section');
			assert.equal(aria.getRole(node, { fallback: true }), 'listitem');
		});

		it('respect the `noImplicit` option', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'doc-chapter section');
			assert.isNull(aria.getRole(node, { fallback: true, noImplicit: true }));
		});

		it('respect the `abstracts` option', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'doc-chapter section');
			assert.equal(
				aria.getRole(node, { fallback: true, abstracts: true }),
				'section'
			);
		});

		it('respect the `dpub` option', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'doc-chapter section');
			assert.equal(
				aria.getRole(node, { fallback: true, dpub: true }),
				'doc-chapter'
			);
		});
	});
});
