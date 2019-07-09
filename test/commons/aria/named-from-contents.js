describe('aria.namedFromContents', function() {
	var aria = axe.commons.aria;
	var namedFromContents = aria.namedFromContents;
	var fixture = document.querySelector('#fixture');

	beforeEach(function() {
		aria.foo = { nameFrom: ['author', 'contents'] };
		aria.bar = { nameFrom: ['author'] };
	});

	afterEach(function() {
		fixture.innerHTML = '';
		delete aria.lookupTable.role.foo;
		delete aria.lookupTable.role.bar;
	});

	it('returns true when the element has an explicit role named from content', function() {
		fixture.innerHTML = '<div role="foo"></div>';
		assert.isTrue(namedFromContents(fixture.firstChild));
	});

	it('works on virtual nodes', function() {
		fixture.innerHTML = '<div role="foo"></div>';
		assert.isTrue(namedFromContents({ actualNode: fixture.firstChild }));
	});

	it('returns true when the element has an implicit role named from content', function() {
		fixture.innerHTML = '<h1>foo</h1>';
		// Varify h1 is named from contents:
		assert.equal(aria.getRole(fixture.firstChild), 'heading');
		assert.include(aria.lookupTable.role.heading.nameFrom, 'contents');

		assert.isTrue(namedFromContents(fixture.firstChild));
	});

	it('returns false when the element has a role not named from content', function() {
		fixture.innerHTML = '<main role="main"></main>';
		// Varify main is not named from contents:
		assert.equal(aria.getRole(fixture.firstChild), 'main');
		assert.notInclude(aria.lookupTable.role.main.nameFrom, 'contents');

		assert.isFalse(namedFromContents(fixture.firstChild));
	});

	it('returns false node is not a DOM element', function() {
		fixture.innerHTML = 'text node';
		assert.isFalse(namedFromContents(fixture.firstChild));
	});

	describe('{ strict: false }', function() {
		it('returns true when the element has no role named from content', function() {
			fixture.innerHTML = '<div>foo</div>';
			assert.isNull(aria.getRole(fixture.firstChild));
			assert.isTrue(namedFromContents(fixture.firstChild, { strict: false }));
		});

		it('is default for aria.namedFromContents', function() {
			fixture.innerHTML = '<div>foo</div>';
			assert.isNull(aria.getRole(fixture.firstChild));
			assert.isTrue(namedFromContents(fixture.firstChild));
		});

		it('returns true when the element has role=presentation', function() {
			fixture.innerHTML = '<div role="presentation">foo</div>';
			assert.isTrue(namedFromContents(fixture.firstChild, { strict: false }));
		});

		it('returns true when the element has role=none', function() {
			fixture.innerHTML = '<div role="none">foo</div>';
			assert.isTrue(namedFromContents(fixture.firstChild, { strict: false }));
		});

		it('returns true when the implicit role is null', function() {
			fixture.innerHTML = '<div role="bar">foo</div>';
			assert.isTrue(namedFromContents(fixture.firstChild, { strict: false }));
		});
	});

	describe('{ strict: true }', function() {
		it('returns false when the element has no role named from content', function() {
			fixture.innerHTML = '<div>foo</div>';
			assert.isNull(aria.getRole(fixture.firstChild));
			assert.isFalse(namedFromContents(fixture.firstChild, { strict: true }));
		});

		it('returns false when the element has role=presentation', function() {
			fixture.innerHTML = '<div role="presentation">foo</div>';
			assert.isFalse(namedFromContents(fixture.firstChild, { strict: true }));
		});

		it('returns false when the element has role=none', function() {
			fixture.innerHTML = '<div role="none">foo</div>';
			assert.isFalse(namedFromContents(fixture.firstChild, { strict: true }));
		});
	});
});
