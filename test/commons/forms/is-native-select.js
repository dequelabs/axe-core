describe('forms.isNativeSelect', function() {
	'use strict';
	var isNativeSelect = axe.commons.forms.isNativeSelect;

	it('returns true for a select element', function() {
		var node = document.createElement('select');
		assert.isTrue(isNativeSelect(node));
	});

	it('returns false for non-select elements', function() {
		var nonSelectElements = ['a', 'h1', 'div', 'span', 'main'];
		nonSelectElements.forEach(function(nodeName) {
			var node = document.createElement(nodeName);
			assert.isFalse(
				isNativeSelect(node),
				'<' + nodeName + '> is not a native select element'
			);
		});
	});
});
