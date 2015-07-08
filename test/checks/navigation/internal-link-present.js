describe('internal-link-present', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true when an internal link is found', function () {
		fixture.innerHTML = '<a href="#haha">hi</a>';
		assert.isTrue(checks['internal-link-present'].evaluate(fixture));
	});

	it('should otherwise return false', function () {
		fixture.innerHTML = '<a href="http://www.deque.com/#haha">hi</a>';
		assert.isFalse(checks['internal-link-present'].evaluate(fixture));
	});

});
