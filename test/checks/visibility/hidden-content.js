describe('hidden content', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	var checkContext = {
		_data: null,
		data: function (d) {
			this._data = d;
		}
	};

	function checkSetup (html, options, target) {
		fixture.innerHTML = html;
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector(target || '#target');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		return [node, options, virtualNode];
	}

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._data = null;
		axe._tree = undefined;
	});

	it('should return undefined with display:none and children', function () {
		var params = checkSetup('<div id="target" style="display: none;"><p>Some paragraph text.</p></div>');
		assert.isUndefined(checks['hidden-content'].evaluate.apply(checkContext, params));
	});

	it('should return undefined with visibility:hidden and children', function () {
		var params = checkSetup('<div id="target" style="visibility: hidden;"><p>Some paragraph text.</p></div>');
		assert.isUndefined(checks['hidden-content'].evaluate.apply(checkContext, params));
	});

	it('should return true with visibility:hidden and parent with visibility:hidden', function () {
		var params = checkSetup('<div style="visibility: hidden;"><p id="target" style="visibility: hidden;">Some paragraph text.</p></div>');
		assert.isTrue(checks['hidden-content'].evaluate.apply(checkContext, params));
	});

	it('should return true with aria-hidden and no content', function () {
		var params = checkSetup('<span id="target" class="icon" aria-hidden="true"></span>');
		assert.isTrue(checks['hidden-content'].evaluate.apply(checkContext, params));
	});

	it('should skip whitelisted elements', function () {
		var node = document.querySelector('head');
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isTrue(checks['hidden-content'].evaluate.call(checkContext, node, undefined, virtualNode));
	});
});
