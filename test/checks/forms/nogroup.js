describe('nogroup', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if there is only one radio element with the same name', function () {
		fixture.innerHTML = '<input type="radio" id="target" name="uniqueradioname">Choice one</input><input type="radio" name="differentname">Choice 1a</input>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['radio-nogroup'].evaluate(node, 'radio'));
	});

	it('should return false if there are two ungrouped radio elements with the same name', function () {
		fixture.innerHTML = '<input type="radio" id="target" name="uniqueradioname">Choice one</input><input type="radio" name="uniqueradioname">Choice 1a</input>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['radio-nogroup'].evaluate(node, 'radio'));
	});

});
