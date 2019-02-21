describe('landmark-unique', function() {
	'use strict';
	var rule;

	beforeEach(function() {
		rule = axe._audit.rules.find(function(rule) {
			return rule.id === 'landmark-uqique';
		});
	});

	it('should not match because not a landmark', () => {
		const node = document.createElement('h1');
		assert.isFalse(rule.matches(node, null));
	});

	it('should pass because is a landmark', () => {
		const node = document.createElement('div');
		node.setAttribute('role', 'banner');
		assert.isTrue(rule.matches(node, null));
	});

	it('should not match because landmark is hidden', () => {
		const node = document.createElement('div');
		node.setAttribute('role', 'banner');
		node.style.display = 'none';
		assert.isTrue(rule.matches(node, null));
	});
});
