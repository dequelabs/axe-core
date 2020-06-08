describe('aria.getRole', function() {
	'use strict';
	var aria = axe.commons.aria;
	var roleDefinitions = aria.lookupTable.role;
	var flatTreeSetup = axe.testUtils.flatTreeSetup;
	var fixture = document.querySelector('#fixture');

	var orig;
	beforeEach(function() {
		orig = axe.commons.aria.lookupTable.role;
	});

	afterEach(function() {
		fixture.innerHTML = '';
		axe.commons.aria.lookupTable.role = orig;
	});

	it('returns valid roles', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'button');
		flatTreeSetup(node);
		assert.equal(aria.getRole(node), 'button');
	});

	it('handles case sensitivity', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'BUTTON');
		flatTreeSetup(node);
		assert.equal(aria.getRole(node), 'button');
	});

	it('handles whitespacing', function() {
		var node = document.createElement('div');
		node.setAttribute('role', ' button  ');
		flatTreeSetup(node);
		assert.equal(aria.getRole(node), 'button');
	});

	it('returns null when there is no role', function() {
		var node = document.createElement('div');
		flatTreeSetup(node);
		assert.isNull(aria.getRole(node));
	});

	it('returns the explit role if it is valid and non-abstract', function() {
		var node = document.createElement('li');
		node.setAttribute('role', 'menuitem');
		flatTreeSetup(node);
		assert.equal(aria.getRole(node), 'menuitem');
	});

	it('returns the implicit role if the explicit is invalid', function() {
		var node = document.createElement('li');
		node.setAttribute('role', 'foobar');
		flatTreeSetup(node);
		assert.equal(aria.getRole(node), 'listitem');
	});

	it('ignores fallback roles by default', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'spinbutton button');
		flatTreeSetup(node);
		assert.isNull(aria.getRole(node));
	});

	it('accepts virtualNode objects', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'button');
		flatTreeSetup(node);
		assert.equal(aria.getRole({ actualNode: node }), 'button');
	});

	it('returns null if the node is not an element', function() {
		var node = document.createTextNode('foo bar baz');
		flatTreeSetup(node);
		assert.isNull(aria.getRole(node));
	});

	it('runs role resolution with role=none', function() {
		var node = document.createElement('li');
		node.setAttribute('role', 'none');
		node.setAttribute('aria-label', 'foo');
		flatTreeSetup(node);
		assert.equal(aria.getRole(node), 'listitem');
	});

	it('runs role resolution with role=presentation', function() {
		var node = document.createElement('li');
		node.setAttribute('role', 'presentation');
		node.setAttribute('aria-label', 'foo');
		flatTreeSetup(node);
		assert.equal(aria.getRole(node), 'listitem');
	});

	it('returns <img alt=""> with global attribute as img', function() {
		var node = document.createElement('img');
		node.setAttribute('alt', '');
		node.setAttribute('aria-label', 'foo');
		flatTreeSetup(node);
		assert.equal(aria.getRole(node), 'img');
	});

	it('returns <img role="presentation"> with global attribute as img', function() {
		var node = document.createElement('img');
		node.setAttribute('role', 'presentation');
		node.setAttribute('aria-label', 'foo');
		flatTreeSetup(node);
		assert.equal(aria.getRole(node), 'img');
	});

	it('returns <img role="none"> with global attribute as img', function() {
		var node = document.createElement('img');
		node.setAttribute('role', 'none');
		node.setAttribute('aria-label', 'foo');
		flatTreeSetup(node);
		assert.equal(aria.getRole(node), 'img');
	});

	it('handles focusable element with role="none"', function() {
		var node = document.createElement('button');
		node.setAttribute('role', 'none');
		flatTreeSetup(node);
		assert.equal(aria.getRole(node), 'button');
	});

	it('handles presentation role inheritance for ul', function() {
		fixture.innerHTML = '<ul role="presentation"><li id="target">foo</li></ul>';
		flatTreeSetup(fixture);
		var node = fixture.querySelector('#target');
		assert.equal(aria.getRole(node), 'presentation');
	});

	it('handles presentation role inheritance for ol', function() {
		fixture.innerHTML = '<ol role="presentation"><li id="target">foo</li></ol>';
		flatTreeSetup(fixture);
		var node = fixture.querySelector('#target');
		assert.equal(aria.getRole(node), 'presentation');
	});

	it('handles presentation role inheritance for dt', function() {
		fixture.innerHTML =
			'<dl role="presentation"><dt id="target">foo</dt><dd>bar></dd></dl>';
		flatTreeSetup(fixture);
		var node = fixture.querySelector('#target');
		assert.equal(aria.getRole(node), 'presentation');
	});

	it('handles presentation role inheritance for dd', function() {
		fixture.innerHTML =
			'<dl role="presentation"><dt>foo</dt><dd id="target">bar></dd></dl>';
		flatTreeSetup(fixture);
		var node = fixture.querySelector('#target');
		assert.equal(aria.getRole(node), 'presentation');
	});

	it('handles presentation role inheritance for thead', function() {
		fixture.innerHTML =
			'<table role="presentation"><thead id="target"><tr><th>hi</th><th>goodbye</th></tr></thead><tbody><tr><th>hi</th><td>foo</td></tr></tbody></table>';
		flatTreeSetup(fixture);
		var node = fixture.querySelector('#target');
		assert.equal(aria.getRole(node), 'presentation');
	});

	it('handles presentation role inheritance for td', function() {
		fixture.innerHTML =
			'<table role="presentation"><thead><tr><th>hi</th><th>goodbye</th></tr></thead><tbody><tr><th>hi</th><td id="target">foo</td></tr></tbody></table>';
		flatTreeSetup(fixture);
		var node = fixture.querySelector('#target');
		assert.equal(aria.getRole(node), 'presentation');
	});

	it('handles presentation role inheritance for th', function() {
		fixture.innerHTML =
			'<table role="presentation"><thead><tr><th>hi</th><th>goodbye</th></tr></thead><tbody><tr><th id="target">hi</th><td>foo</td></tr></tbody></table>';
		flatTreeSetup(fixture);
		var node = fixture.querySelector('#target');
		assert.equal(aria.getRole(node), 'presentation');
	});

	it('handles presentation role inheritance for thead', function() {
		fixture.innerHTML =
			'<table role="presentation"><thead id="target"><tr><th>hi</th><th>goodbye</th></tr></thead><tbody><tr><th>hi</th><td>foo</td></tr></tbody></table>';
		flatTreeSetup(fixture);
		var node = fixture.querySelector('#target');
		assert.equal(aria.getRole(node), 'presentation');
	});

	it('handles presentation role inheritance for tr', function() {
		fixture.innerHTML =
			'<table role="presentation"><thead><tr id="target"><th>hi</th><th>goodbye</th></tr></thead><tbody><tr><th>hi</th><td>foo</td></tr></tbody></table>';
		flatTreeSetup(fixture);
		var node = fixture.querySelector('#target');
		assert.equal(aria.getRole(node), 'presentation');
	});

	it('returns implicit role for presentation role inheritance if ancestor is not the required ancestor', function() {
		fixture.innerHTML =
			'<table role="presentation"><tr><td><ul><li id="target">foo</li></ul></td></tr></table>';
		flatTreeSetup(fixture);
		var node = fixture.querySelector('#target');
		assert.equal(aria.getRole(node), 'listitem');
	});

	it('does not override explicit role with presentation role inheritance', function() {
		fixture.innerHTML =
			'<ul role="presentation"><li id="target" role="listitem">foo</li></ul>';
		flatTreeSetup(fixture);
		var node = fixture.querySelector('#target');
		assert.equal(aria.getRole(node), 'listitem');
	});

	describe('noImplicit', function() {
		it('returns the implicit role by default', function() {
			var node = document.createElement('li');
			flatTreeSetup(node);
			assert.equal(aria.getRole(node), 'listitem');
		});

		it('returns null rather than the implicit role with `noImplicit: true`', function() {
			var node = document.createElement('li');
			flatTreeSetup(node);
			assert.isNull(aria.getRole(node, { noImplicit: true }));
		});

		it('does not do role resolution if noImplicit: true', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'none');
			node.setAttribute('aria-label', 'foo');
			flatTreeSetup(node);
			assert.equal(aria.getRole(node, { noImplicit: true }), 'none');
		});

		it('still returns the explicit role', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'button');
			flatTreeSetup(node);
			assert.equal(aria.getRole(node, { noImplicit: true }), 'button');
		});

		it('returns the implicit role with `noImplicit: false`', function() {
			var node = document.createElement('li');
			flatTreeSetup(node);
			assert.equal(aria.getRole(node, { noImplicit: false }), 'listitem');
		});
	});

	describe('abstracts', function() {
		it('ignores abstract roles by default', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'section');
			flatTreeSetup(node);
			assert.equal(roleDefinitions.section.type, 'abstract');
			assert.equal(aria.getRole(node), 'listitem');
		});

		it('returns abstract roles with `abstracts: true`', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'section');
			flatTreeSetup(node);
			assert.equal(roleDefinitions.section.type, 'abstract');
			assert.equal(aria.getRole(node, { abstracts: true }), 'section');
		});

		it('does not returns abstract roles with `abstracts: false`', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'section');
			flatTreeSetup(node);
			assert.equal(roleDefinitions.section.type, 'abstract');
			assert.equal(aria.getRole(node, { abstracts: false }), 'listitem');
		});
	});

	describe('dpub', function() {
		it('ignores DPUB roles by default', function() {
			var node = document.createElement('section');
			node.setAttribute('role', 'doc-chapter');
			flatTreeSetup(node);
			assert.isNull(aria.getRole(node));
		});

		it('returns DPUB roles with `dpub: true`', function() {
			var node = document.createElement('section');
			node.setAttribute('role', 'doc-chapter');
			flatTreeSetup(node);
			assert.equal(aria.getRole(node, { dpub: true }), 'doc-chapter');
		});

		it('does not returns DPUB roles with `dpub: false`', function() {
			var node = document.createElement('section');
			node.setAttribute('role', 'doc-chapter');
			flatTreeSetup(node);
			assert.isNull(aria.getRole(node, { dpub: false }));
		});
	});

	describe('fallback', function() {
		it('returns the first valid item in the list', function() {
			var node = document.createElement('div');
			node.setAttribute('role', 'link button');
			flatTreeSetup(node);
			assert.equal(aria.getRole(node, { fallback: true }), 'link');
		});

		it('skips over invalid roles', function() {
			var node = document.createElement('div');
			node.setAttribute('role', 'foobar button');
			flatTreeSetup(node);
			assert.equal(aria.getRole(node, { fallback: true }), 'button');
		});

		it('returns the null if all roles are invalid and there is no implicit role', function() {
			var node = document.createElement('div');
			node.setAttribute('role', 'foo bar baz');
			flatTreeSetup(node);
			assert.isNull(aria.getRole(node, { fallback: true }));
		});

		it('respects the defaults', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'doc-chapter section');
			flatTreeSetup(node);
			assert.equal(aria.getRole(node, { fallback: true }), 'listitem');
		});

		it('respect the `noImplicit` option', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'doc-chapter section');
			flatTreeSetup(node);
			assert.isNull(aria.getRole(node, { fallback: true, noImplicit: true }));
		});

		it('respect the `abstracts` option', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'doc-chapter section');
			flatTreeSetup(node);
			assert.equal(
				aria.getRole(node, { fallback: true, abstracts: true }),
				'section'
			);
		});

		it('respect the `dpub` option', function() {
			var node = document.createElement('li');
			node.setAttribute('role', 'doc-chapter section');
			flatTreeSetup(node);
			assert.equal(
				aria.getRole(node, { fallback: true, dpub: true }),
				'doc-chapter'
			);
		});
	});
});
