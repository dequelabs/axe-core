describe('nogroup', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if there is only one radio element with the same name', function () {
		fixture.innerHTML = '<input type="radio" id="target" name="uniqueradioname">Choice one<input type="radio" name="differentname">Choice 1a';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks.nogroup.evaluate(node, 'radio'));
	});

	it('should return false if there is no name on the selected element', function () {
		fixture.innerHTML = '<input type="radio" id="target">Choice one<input type="radio" name="uniqueradioname">Choice 1a';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.nogroup.evaluate(node, 'radio'));
	});

	it('should return false if there are two ungrouped radio elements with the same name', function () {
		fixture.innerHTML = '<input type="radio" id="target" name="uniqueradioname">Choice one<input type="radio" name="uniqueradioname">Choice 1a';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.nogroup.evaluate(node, 'radio'));
	});

	it('should work with elements that have special characters in name', function () {

		fixture.innerHTML = '<input type="radio" id="target" name="s.3@$#">Choice one<input type="radio" name="s.3@$#">Choice 1a';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.nogroup.evaluate(node, 'radio'));
	});

});
