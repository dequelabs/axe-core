describe('axe.utils.getNodeAttributes', function() {
	'use strict';

	it('returns the list of attributes', function() {
		var node = document.createElement('div');
		node.innerHTML = '<div class="foo bar" id="123" aria-hidden="true"></div>';
		var actual = axe.utils.getNodeAttributes(node.firstChild);
		assert.isTrue(actual instanceof NamedNodeMap);
		assert.equal(actual.length, 3);
		assert.equal(actual[0].name, 'class');
		assert.equal(actual[1].name, 'id');
		assert.equal(actual[2].name, 'aria-hidden');
	});

	it('returns the list of attributes when the DOM is clobbered', function() {
		var node = document.createElement('form');
		node.setAttribute('id', '123');
		node.innerHTML = '<select name="attributes"></select>';

		assert.isFalse(node.attributes instanceof NamedNodeMap);

		var actual = axe.utils.getNodeAttributes(node);
		assert.isTrue(actual instanceof NamedNodeMap);
		assert.equal(actual.length, 1);
		assert.equal(actual[0].name, 'id');
	});
});
