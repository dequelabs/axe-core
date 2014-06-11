describe('labelledby', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if the radio element has no name', function () {
		fixture.innerHTML = '<input type="radio" id="target">Choice one</input>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['radio-labelledby'].evaluate(node, 'radio'));
	});

	it('should return false if there is only one radio element with the same name', function () {
		fixture.innerHTML = '<input type="radio" id="target" name="uniqueradioname">Choice one</input><input type="radio" name="differentname">Choice 1a</input>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['radio-labelledby'].evaluate(node, 'radio'));
	});

	it('should return false if there are two ungrouped radio elements with the same name', function () {
		fixture.innerHTML = '<input type="radio" id="target" name="uniqueradioname">Choice one</input><input type="radio" name="uniqueradioname">Choice 1a</input>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['radio-labelledby'].evaluate(node, 'radio'));
	});

	it('should return false if there are ungrouped radio elements with the same name and without shared labelledby', function () {
		fixture.innerHTML = '<input type="radio" id="target" aria-labelledby="unique one" name="uniqueradioname">Choice one</input><input type="radio" aria-labelledby="notshared two" name="uniqueradioname">Choice 1a</input><input type="radio" aria-labelledby="different three" name="uniqueradioname">Choice 1b</input>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['radio-labelledby'].evaluate(node, 'radio'));
	});

	it('should return false if there are ungrouped radio elements with the same name and with shared labelledby pointing to no real node', function () {
		fixture.innerHTML = '<input type="radio" id="target" aria-labelledby="shared one" name="uniqueradioname">Choice one</input><input type="radio" aria-labelledby="shared two" name="uniqueradioname">Choice 1a</input><input type="radio" aria-labelledby="shared three" name="uniqueradioname">Choice 1b</input>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['radio-labelledby'].evaluate(node, 'radio'));
	});

	it('should return false if there are ungrouped radio elements with the same name and with shared labelledby pointing to an empty node', function () {
		fixture.innerHTML = '<p id="shared"></p><input type="radio" id="target" aria-labelledby="shared one" name="uniqueradioname">Choice one</input><input type="radio" aria-labelledby="shared two" name="uniqueradioname">Choice 1a</input><input type="radio" aria-labelledby="shared three" name="uniqueradioname">Choice 1b</input>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['radio-labelledby'].evaluate(node, 'radio'));
	});

	it('should return true if there are ungrouped radio elements with the same name and with shared labelledby pointing to a node with text content', function () {
		fixture.innerHTML = '<p id="shared">Label</p><input type="radio" id="target" aria-labelledby="shared one" name="uniqueradioname">Choice one</input><input type="radio" aria-labelledby="shared two" name="uniqueradioname">Choice 1a</input><input type="radio" aria-labelledby="shared three" name="uniqueradioname">Choice 1b</input>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['radio-labelledby'].evaluate(node, 'radio'));
	});

});
