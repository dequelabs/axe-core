describe('non-empty-title', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var flatTreeSetup = axe.testUtils.flatTreeSetup;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true if a title is present', function() {
		var node = document.createElement('img');
		node.setAttribute('title', 'woohoo');
		fixture.appendChild(node);
		flatTreeSetup(fixture);

		assert.isTrue(checks['non-empty-title'].evaluate(node));
	});

	it('should return false if a title is not present', function() {
		var node = document.createElement('img');
		fixture.appendChild(node);
		flatTreeSetup(fixture);

		assert.isFalse(checks['non-empty-title'].evaluate(node));
	});

	it('should return false if a title is present, but empty', function() {
		var node = document.createElement('img');
		node.setAttribute('title', ' ');
		fixture.appendChild(node);
		flatTreeSetup(fixture);

		assert.isFalse(checks['non-empty-title'].evaluate(node));
	});

	it('should collapse whitespace', function() {
		var node = document.createElement('div');
		node.setAttribute('title', ' \t \n \r \t  \t\r\n ');
		fixture.appendChild(node);
		flatTreeSetup(fixture);

		assert.isFalse(checks['non-empty-title'].evaluate(node));
	});
});
