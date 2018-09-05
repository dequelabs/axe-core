describe('aria.getRoleSegments', function() {
	'use strict';

	var aria = axe.commons.aria;

	it('returns a list of roles', function() {
		var node = document.createElement('div');
		var roles = ['presentation', 'button', 'contentinfo'];
		node.setAttribute('role', roles.join(' '));
		var actual = aria.getRoleSegments(node);
		assert.deepEqual(actual, roles);
	});

	it('returns a list of roles excluding invalid roles', function() {
		var node = document.createElement('button');
		var roles = ['link', 'button', 'anhcor'];
		var expected = ['link', 'button'];
		node.setAttribute('role', roles.join(' '));
		var actual = aria.getRoleSegments(node);
		assert.deepEqual(actual, expected);
	});

	it('handles case sensitivity and returns a list of roles', function() {
		var node = document.createElement('div');
		var roles = ['PreSENTATION', 'button', 'ARTICLE'];
		var expected = roles.map(function(r) {
			return r.toLowerCase();
		});
		node.setAttribute('role', roles.join(' '));
		var actual = aria.getRoleSegments(node);
		assert.deepEqual(actual, expected);
	});

	it('returns empty array when there is no role', function() {
		var node = document.createElement('section');
		node.setAttribute('role', '');
		var actual = aria.getRoleSegments(node);
		assert.deepEqual(actual, []);
	});

	it('handles white spaces in role(s) supplied', function() {
		var node = document.createElement('section');
		node.setAttribute('role', '     contentinfo      ');
		var actual = aria.getRoleSegments(node);
		assert.deepEqual(actual, ['contentinfo']);
	});
});
