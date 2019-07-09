describe('text.nativeTextAlternative', function() {
	var text = axe.commons.text;
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var __nativeElementType = text.nativeElementType;
	var __nativeTextMethods = text.nativeTextMethods;
	var nativeTextAlternative = text.nativeTextAlternative;

	beforeEach(function() {
		text.nativeTextMethods = {
			returnFoo: function() {
				return 'foo';
			},
			returnBar: function() {
				return 'bar';
			},
			returnEmpty: function() {
				return '';
			}
		};
		text.nativeElementType = [
			{
				matches: '.foo',
				namingMethods: 'returnFoo'
			},
			{
				matches: '.foo.bar',
				namingMethods: ['returnEmpty', 'returnFoo', 'returnBar']
			},
			{
				matches: '.baz',
				namingMethods: ['returnEmpty']
			}
		];
	});

	after(function() {
		text.nativeElementType = __nativeElementType;
		text.nativeTextMethods = __nativeTextMethods;
	});

	it('runs accessible text methods specified for the native element', function() {
		fixtureSetup('<div class="foo"></div>');
		var div = axe.utils.querySelectorAll(axe._tree[0], '.foo')[0];
		assert.equal(nativeTextAlternative(div), 'foo');
	});

	it('returns the accessible text of the first method that returns something', function() {
		fixtureSetup('<div class="foo bar"></div>');
		var div = axe.utils.querySelectorAll(axe._tree[0], '.bar')[0];
		assert.equal(nativeTextAlternative(div), 'foo');
	});

	it('returns `` when no method matches', function() {
		fixtureSetup('<div class="fizz">baz</div>');
		var div = axe.utils.querySelectorAll(axe._tree[0], '.fizz')[0];
		assert.equal(nativeTextAlternative(div), '');
	});

	it('returns `` when no accessible text method returned something', function() {
		fixtureSetup('<div class="baz">baz</div>');
		var div = axe.utils.querySelectorAll(axe._tree[0], '.baz')[0];
		assert.equal(nativeTextAlternative(div), '');
	});

	it('returns `` when the node is not an element', function() {
		fixtureSetup('foo bar baz');
		var fixture = axe.utils.querySelectorAll(axe._tree[0], '#fixture')[0];
		assert.equal(fixture.children[0].actualNode.nodeType, 3);
		assert.equal(nativeTextAlternative(fixture.children[0]), '');
	});

	it('returns `` when the element has role=presentation', function() {
		fixtureSetup('<div class="foo" role="presentation"></div>');
		var div = axe.utils.querySelectorAll(axe._tree[0], '.foo')[0];
		assert.equal(nativeTextAlternative(div), '');
	});

	it('returns `` when the element has role=none', function() {
		fixtureSetup('<div class="foo" role="none"></div>');
		var div = axe.utils.querySelectorAll(axe._tree[0], '.foo')[0];
		assert.equal(nativeTextAlternative(div), '');
	});
});
