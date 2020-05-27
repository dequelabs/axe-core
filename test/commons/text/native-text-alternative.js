describe('text.nativeTextAlternative', function() {
	var text = axe.commons.text;
	var queryFixture = axe.testUtils.queryFixture;
	var nativeTextAlternative = text.nativeTextAlternative;

	it('runs accessible text methods specified for the native element', function() {
		var vNode = queryFixture('<button id="target">foo</button>');
		assert.equal(nativeTextAlternative(vNode), 'foo');
	});

	it('returns the accessible text of the first method that returns something', function() {
		var vNode = queryFixture(
			'<input id="target" type="image" alt="foo" value="bar" title="baz">'
		);
		assert.equal(nativeTextAlternative(vNode), 'foo');
	});

	it('returns `` when no method matches', function() {
		var vNode = queryFixture('<div id="target">baz</div>');
		assert.equal(nativeTextAlternative(vNode), '');
	});

	it('returns `` when no accessible text method returned something', function() {
		queryFixture('<div class="baz">baz</div>');
		var div = axe.utils.querySelectorAll(axe._tree[0], '.baz')[0];
		assert.equal(nativeTextAlternative(div), '');
	});

	it('returns `` when the node is not an element', function() {
		queryFixture('foo bar baz');
		var fixture = axe.utils.querySelectorAll(axe._tree[0], '#fixture')[0];
		assert.equal(fixture.children[0].actualNode.nodeType, 3);
		assert.equal(nativeTextAlternative(fixture.children[0]), '');
	});

	it('returns `` when the element has role=presentation', function() {
		var vNode = queryFixture(
			'<button id="target" role="presentation">foo</button>'
		);
		assert.equal(nativeTextAlternative(vNode), '');
	});

	it('returns `` when the element has role=none', function() {
		var vNode = queryFixture('<button id="target" role="none">foo</button>');
		assert.equal(nativeTextAlternative(vNode), '');
	});
});
