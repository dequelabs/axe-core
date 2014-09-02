describe('fieldset', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if the radio element has no name', function () {
		fixture.innerHTML = '<input type="radio" id="target">Choice one';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.fieldset.evaluate(node, 'radio'));
	});

	it('should return false if there is only one radio element with the same name', function () {
		fixture.innerHTML = '<input type="radio" id="target" name="uniqueradioname">Choice one<input type="radio" name="differentname">Choice 1a';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.fieldset.evaluate(node, 'radio'));
	});

	it('should return false if there are two ungrouped radio elements with the same name', function () {
		fixture.innerHTML = '<input type="radio" id="target" name="uniqueradioname">Choice one<input type="radio" name="uniqueradioname">Choice 1a';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.fieldset.evaluate(node, 'radio'));
	});

	it('should return false if the group has no legend element', function () {
		fixture.innerHTML = '<fieldset><input type="radio" id="target" name="uniqueradioname">Choice one<input type="radio" name="uniqueradioname">Choice 1a</fieldset>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.fieldset.evaluate(node, 'radio'));
	});

	it('should return false if the group has no legend text', function () {
		fixture.innerHTML = '<fieldset><legend></legend><input type="radio" id="target" name="uniqueradioname">Choice one<input type="radio" name="uniqueradioname">Choice 1a</fieldset>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.fieldset.evaluate(node, 'radio'));
	});

	it('should return false if the group contains extra elements', function () {
		fixture.innerHTML = '<fieldset><legend>Legendary</legend><input type="text" id="random"><input type="radio" id="target" name="uniqueradioname">Choice one' +
			'<input type="radio" name="uniqueradioname">Choice 1a</fieldset>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.fieldset.evaluate(node, 'radio'));
	});

	it('should return false if the group does not contain all elements', function () {
		fixture.innerHTML = '<input type="radio" id="target" name="uniqueradioname">Choice one<fieldset><legend>legendary</legend>' +
			'<input type="radio" name="uniqueradioname">Choice 1a</fieldset>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.fieldset.evaluate(node, 'radio'));
	});

	it('should return true if the group contains only the right elements and has legend', function () {
		fixture.innerHTML = '<fieldset><legend>Legendary</legend><input type="radio" id="target" name="uniqueradioname">Choice one' +
			'<input type="radio" name="uniqueradioname">Choice 1a</fieldset>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks.fieldset.evaluate(node, 'radio'));
	});

	it('should return false if an unlabelled ARIA group contains only the right elements', function () {
		fixture.innerHTML = '<div role="group"><input type="radio" id="target" name="uniqueradioname">Choice one<input type="radio" name="uniqueradioname">Choice 1a</div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.fieldset.evaluate(node, 'radio'));
	});

	it('should return false if an improperly labelled-by ARIA group contains only the right elements', function () {
		fixture.innerHTML = '<div id="grouplabel"></div><div role="group" aria-labelledby="grouplabel">' +
			'<input type="radio" id="target" name="uniqueradioname">Choice one<input type="radio" name="uniqueradioname">Choice 1a</div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.fieldset.evaluate(node, 'radio'));
	});


	it('should return true if a properly labelled-by ARIA group contains only the right elements', function () {
		fixture.innerHTML = '<div id="grouplabel">Label</div><div role="group" aria-labelledby="grouplabel">' +
			'<input type="radio" id="target" name="uniqueradioname">Choice one<input type="radio" name="uniqueradioname">Choice 1a</div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks.fieldset.evaluate(node, 'radio'));
	});


	it('should return true if a properly labelled-by ARIA group contains only the right elements - special characters', function () {
		fixture.innerHTML = '<div id="grouplabel">Label</div><div role="group" aria-labelledby="grouplabel">' +
			'<input type="radio" id="target" name="s.%$#n">Choice one<input type="radio" name="s.%$#n">Choice 1a</div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks.fieldset.evaluate(node, 'radio'));
	});

	it('should return true if a properly labelled ARIA group contains only the right elements', function () {
		fixture.innerHTML = '<div role="group" aria-label="group label"><input type="radio" id="target" name="uniqueradioname">' +
			'Choice one<input type="radio" name="uniqueradioname">Choice 1a</div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks.fieldset.evaluate(node, 'radio'));
	});
});
