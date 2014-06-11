describe('noname', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if the radio element has no name', function () {
		fixture.innerHTML = '<input type="radio" id="target">Choice one</input>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks.noname.evaluate(node));
	});

	it('should return false if the radio element has a name', function () {
		fixture.innerHTML = '<input type="radio" id="target" name="uniqueradioname">Choice one</input><input type="radio" name="differentname">Choice 1a</input>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.noname.evaluate(node));
	});
});
