describe('matches.nodeName', function() {
	var matchNodeName = axe.commons.matches.nodeName;
	var fixture = document.querySelector('#fixture');
	beforeEach(function() {
		fixture.innerHTML = '';
	});

	it('returns true if the nodeName is the same as the matcher', function() {
		fixture.innerHTML = '<h1>foo</h1>';
		assert.isTrue(matchNodeName(fixture.firstChild, 'h1'));
	});

	it('returns true if the nodename is included in an array', function() {
		fixture.innerHTML = '<h1>foo</h1>';
		assert.isTrue(matchNodeName(fixture.firstChild, ['h3', 'h2', 'h1']));
	});

	it('returns true if the nodeName matches a regexp', function() {
		fixture.innerHTML = '<h1>foo</h1>';
		assert.isTrue(matchNodeName(fixture.firstChild, /^h[0-6]$/));
	});

	it('returns true if the nodeName matches with a function', function() {
		fixture.innerHTML = '<h1>foo</h1>';
		assert.isTrue(
			matchNodeName(fixture.firstChild, function(nodeName) {
				return nodeName === 'h1';
			})
		);
	});

	it('returns false if the nodeName does not match', function() {
		fixture.innerHTML = '<div>foo</div>';
		assert.isFalse(matchNodeName(fixture.firstChild, 'h1'));
		assert.isFalse(matchNodeName(fixture.firstChild, ['h3', 'h2', 'h1']));
		assert.isFalse(matchNodeName(fixture.firstChild, /^h[0-6]$/));
		assert.isFalse(
			matchNodeName(fixture.firstChild, function(nodeName) {
				return nodeName === 'h1';
			})
		);
	});

	it('is case sensitive for XHTML', function() {
		var elm = {
			// Mock DOM node
			nodeName: 'H1',
			ownerDocument: document
		};
		assert.isFalse(matchNodeName(elm, 'h1', { isXHTML: true }));
	});

	it('is case insensitive for HTML, but not for XHTML', function() {
		var elm = {
			// Mock DOM node
			nodeName: 'H1',
			ownerDocument: document
		};
		assert.isTrue(matchNodeName(elm, 'h1', { isXHTML: false }));
	});

	it('works with virtual nodes', function() {
		fixture.innerHTML = '<h1>foo</h1>';
		const virtualNode = { actualNode: fixture.firstChild };
		assert.isTrue(matchNodeName(virtualNode, 'h1'));
		assert.isFalse(matchNodeName(virtualNode, 'div'));
	});
});
