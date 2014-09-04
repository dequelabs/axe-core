describe('fieldset', function () {
	'use strict';
	var fixture = document.getElementById('fixture');

	var checkContext = {
		_data: null,
		data: function (d) {
			this._data = d;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._data = null;
	});

	function tests(type) {
		return function () {


			it('should return true if there is only one ' + type + ' element with the same name', function () {
				fixture.innerHTML = '<input type="' + type + '" id="target" name="uniqueyname">' +
					'<input type="' + type + '" name="differentname">';

				var node = fixture.querySelector('#target');
				assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));
			});

			it('should return false if there are two ungrouped ' + type + ' elements with the same name', function () {
				fixture.innerHTML = '<input type="' + type + '" id="target" name="uniqueyname">' +
					'<input type="' + type + '" name="uniqueyname">';

				var node = fixture.querySelector('#target');
				assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
				assert.deepEqual(checkContext._data, {
					type: type,
					name: 'uniqueyname'
				});
			});

			it('should return false if the group has no legend element', function () {
				fixture.innerHTML = '<fieldset><input type="' + type + '" id="target" name="uniqueyname">' +
					'<input type="' + type + '" name="uniqueyname"></fieldset>';
				var node = fixture.querySelector('#target');
				assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
				assert.deepEqual(checkContext._data, {
					type: type,
					name: 'uniqueyname'
				});
			});

			it('should return false if the group has no legend text', function () {
				fixture.innerHTML = '<fieldset><legend></legend>' +
					'<input type="' + type + '" id="target" name="uniqueyname">' +
					'<input type="' + type + '" name="uniqueyname"></fieldset>';
				var node = fixture.querySelector('#target');
				assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
				assert.deepEqual(checkContext._data, {
					type: type,
					name: 'uniqueyname'
				});
			});

			it('should return false if the group contains extra elements', function () {
				fixture.innerHTML = '<fieldset><legend>Legendary</legend>' +
					'<input type="text" id="random">' +
					'<input type="' + type + '" id="target" name="uniqueyname">' +
					'<input type="' + type + '" name="uniqueyname"></fieldset>';
				var node = fixture.querySelector('#target');
				assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
				assert.deepEqual(checkContext._data, {
					type: type,
					name: 'uniqueyname'
				});
			});

			it('should return false if the group does not contain all elements', function () {
				fixture.innerHTML = '<input type="' + type + '" id="target" name="uniqueyname">' +
					'<fieldset><legend>legendary</legend>' +
					'<input type="' + type + '" name="uniqueyname"></fieldset>';
				var node = fixture.querySelector('#target');
				assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
				assert.deepEqual(checkContext._data, {
					type: type,
					name: 'uniqueyname'
				});
			});

			it('should return true if the group contains only the right elements and has legend', function () {
				fixture.innerHTML = '<fieldset><legend>Legendary</legend>' +
					'<input type="' + type + '" id="target" name="uniqueyname">' +
					'<input type="' + type + '" name="uniqueyname"></fieldset>';
				var node = fixture.querySelector('#target');
				assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));
			});

			it('should return false if an unlabelled ARIA group contains only the right elements', function () {
				fixture.innerHTML = '<div role="group">' +
					'<input type="' + type + '" id="target" name="uniqueyname">' +
					'<input type="' + type + '" name="uniqueyname"></div>';

				var node = fixture.querySelector('#target');
				assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
				assert.deepEqual(checkContext._data, {
					type: type,
					name: 'uniqueyname'
				});
			});

			it('should return false if an improperly labelled-by ARIA group contains only the right elements', function () {
				fixture.innerHTML = '<div id="grouplabel"></div>' +
					'<div role="group" aria-labelledby="grouplabel">' +
					'<input type="' + type + '" id="target" name="uniqueyname">' +
					'<input type="' + type + '" name="uniqueyname"></div>';

				var node = fixture.querySelector('#target');
				assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
				assert.deepEqual(checkContext._data, {
					type: type,
					name: 'uniqueyname'
				});
			});


			it('should return true if a properly labelled-by ARIA group contains only the right elements', function () {
				fixture.innerHTML = '<div id="grouplabel">Label</div>' +
					'<div role="group" aria-labelledby="grouplabel">' +
					'<input type="' + type + '" id="target" name="uniqueyname">' +
					'<input type="' + type + '" name="uniqueyname"></div>';

				var node = fixture.querySelector('#target');
				assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));
				assert.deepEqual(checkContext._data, {
					type: type,
					name: 'uniqueyname'
				});
			});


			it('should return true if a properly labelled-by ARIA group contains only the right elements - special characters', function () {
				fixture.innerHTML = '<div id="grouplabel">Label</div>' +
					'<div role="group" aria-labelledby="grouplabel">' +
					'<input type="' + type + '" id="target" name="s.%$#n">' +
					'<input type="' + type + '" name="s.%$#n"></div>';

				var node = fixture.querySelector('#target');
				assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));

				assert.deepEqual(checkContext._data, {
					type: type,
					name: 's.%$#n'
				});
			});

			it('should return true if a properly labelled ARIA group contains only the right elements', function () {
				fixture.innerHTML = '<div role="group" aria-label="group label">' +
					'<input type="' + type + '" id="target" name="uniqueyname">' +
					'<input type="' + type + '" name="uniqueyname"></div>';
				var node = fixture.querySelector('#target');
				assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));
			});


			it('should ignore hidden inputs', function () {
				fixture.innerHTML = '<fieldset><legend>Legendary</legend>' +
					'<input type="' + type + '" id="target" name="uniqueyname">' +
					'<input type="' + type + '" name="uniqueyname"></div>' +
					'<input type="hidden" name="things"></fieldset>';
				var node = fixture.querySelector('#target');
				assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));

			});
		};
	}


	describe('radio', tests('radio'));
	describe('checkbox', tests('checkbox'));
});
