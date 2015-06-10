describe('group-labelledby', function () {
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
			var check = checks['group-labelledby'];

			it('should return true if there is only one ' + type + ' element with the same name', function () {
				fixture.innerHTML = '<input type="' + type + '" id="target" name="uniqueyname">' +
					'<input type="' + type + '" name="differentname">';

				var node = fixture.querySelector('#target');
				assert.isTrue(check.evaluate.call(checkContext, node));
			});

			it('should return false if there are two ungrouped ' + type + ' elements with the same name', function () {
				fixture.innerHTML = '<input type="' + type + '" id="target" name="uniqueyname">' +
					'<input type="' + type + '" name="uniqueyname">';

				var node = fixture.querySelector('#target');
				assert.isFalse(check.evaluate.call(checkContext, node));
				assert.deepEqual(checkContext._data, {
					name: 'uniqueyname',
					type: type
				});
			});

			it('should return false if there are ungrouped ' + type + ' elements with the same name and without shared labelledby', function () {
				fixture.innerHTML = '<input type="' + type + '" id="target" aria-labelledby="unique one" name="uniqueyname">' +
					'<input type="' + type + '" aria-labelledby="notshared two" name="uniqueyname">' +
					'<input type="' + type + '" aria-labelledby="different three" name="uniqueyname">';
				var node = fixture.querySelector('#target');
				assert.isFalse(check.evaluate.call(checkContext, node));
				assert.deepEqual(checkContext._data, {
					name: 'uniqueyname',
					type: type
				});
			});

			it('should return false if there are ungrouped ' + type + ' elements with the same name and with shared labelledby ' +
				'pointing to no real node', function () {

				fixture.innerHTML = '<input type="' + type + '" id="target" aria-labelledby="shared one" name="uniqueyname">' +
					'<input type="' + type + '" aria-labelledby="shared two" name="uniqueyname">' +
					'<input type="' + type + '" aria-labelledby="shared three" name="uniqueyname">';

				var node = fixture.querySelector('#target');
				assert.isFalse(check.evaluate.call(checkContext, node));
				assert.deepEqual(checkContext._data, {
					name: 'uniqueyname',
					type: type
				});
			});

			it('should return false if there are ungrouped ' + type + ' elements with the same name and with shared labelledby ' +
				'pointing to an empty node', function () {
				fixture.innerHTML = '<p id="shared"></p>' +
					'<input type="' + type + '" id="target" aria-labelledby="shared one" name="uniqueyname">' +
					'<input type="' + type + '" aria-labelledby="shared two" name="uniqueyname">' +
					'<input type="' + type + '" aria-labelledby="shared three" name="uniqueyname">';

				var node = fixture.querySelector('#target');
				assert.isFalse(check.evaluate.call(checkContext, node));
				assert.deepEqual(checkContext._data, {
					name: 'uniqueyname',
					type: type
				});
			});

			it('should return true if there are ungrouped ' + type + ' elements with the same name and with shared labelledby' +
				'pointing to a node with text content', function () {

				fixture.innerHTML = '<p id="shared">Label</p>' +
					'<input type="' + type + '" id="target" aria-labelledby="shared one" name="uniqueyname">' +
					'<input type="' + type + '" aria-labelledby="shared two" name="uniqueyname">' +
					'<input type="' + type + '" aria-labelledby="shared three" name="uniqueyname">';

				var node = fixture.querySelector('#target');
				assert.isTrue(check.evaluate.call(checkContext, node));
				assert.deepEqual(checkContext._data, {
					name: 'uniqueyname',
					type: type
				});
			});

			it('should return true if there are ungrouped ' + type + ' elements with the same name and with shared labelledby ' +
				'pointing to a node with text content - SPECIAL CHARACTERS', function () {

				fixture.innerHTML = '<p id="shared">Label</p>' +
					'<input type="' + type + '" id="target" aria-labelledby="shared one" name="s$.#0">' +
					'<input type="' + type + '" aria-labelledby="shared two" name="s$.#0">' +
					'<input type="' + type + '" aria-labelledby="shared three" name="s$.#0">';

				var node = fixture.querySelector('#target');
				assert.isTrue(check.evaluate.call(checkContext, node));
				assert.deepEqual(checkContext._data, {
					name: 's$.#0',
					type: type
				});
			});

		};

	}

	describe('radio', tests('radio'));
	describe('checkbox', tests('checkbox'));

});
