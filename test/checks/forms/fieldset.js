describe('fieldset', function () {
	'use strict';
	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var checkContext = {
		_data: null,
		data: function (d) {
			this._data = d;
		},
		relatedNodes: function (nodes) {
			this._relatedNodes = Array.isArray(nodes) ? nodes : [nodes];
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._data = null;
	});

	function tests(type) {

		it('should return true if there is only one ' + type + ' element with the same name', function () {
			fixtureSetup('<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="differentname">');

			var node = fixture.querySelector('#target');
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));
		});

		it('should return false if there are two ungrouped ' + type + ' elements with the same name', function () {
			fixtureSetup('<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname">');

			var node = fixture.querySelector('#target');
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
			assert.deepEqual(checkContext._data, {
				failureCode: 'no-group',
				type: type,
				name: 'uniqueyname'
			});
			assert.lengthOf(checkContext._relatedNodes, 1);
			assert.equal(checkContext._relatedNodes[0], fixture.querySelectorAll('input')[1]);
		});

		it('should return false if the group has no legend element', function () {
			fixtureSetup('<fieldset><input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></fieldset>');
			var node = fixture.querySelector('#target');
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
			assert.deepEqual(checkContext._data, {
				failureCode: 'no-legend',
				type: type,
				name: 'uniqueyname'
			});
			assert.lengthOf(checkContext._relatedNodes, 1);
			assert.equal(checkContext._relatedNodes[0], fixture.querySelector('fieldset'));
		});

		it('should return false if the group has no legend text', function () {
			fixtureSetup('<fieldset><legend></legend>' +
				'<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></fieldset>');
			var node = fixture.querySelector('#target');
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
			assert.deepEqual(checkContext._data, {
				failureCode: 'empty-legend',
				type: type,
				name: 'uniqueyname'
			});
			assert.lengthOf(checkContext._relatedNodes, 1);
			assert.equal(checkContext._relatedNodes[0], fixture.querySelector('legend'));
		});

		it('should return false if the group contains extra elements', function () {
			fixtureSetup('<fieldset><legend>Legendary</legend>' +
				'<input type="text" id="random">' +
				'<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></fieldset>');
			var node = fixture.querySelector('#target');
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
			assert.deepEqual(checkContext._data, {
				failureCode: 'mixed-inputs',
				type: type,
				name: 'uniqueyname'
			});
			assert.lengthOf(checkContext._relatedNodes, 1);
			assert.equal(checkContext._relatedNodes[0], fixture.querySelector('#random'));
		});

		it('should return true if the group contains only the right elements and has legend', function () {
			fixtureSetup('<fieldset><legend>Legendary</legend>' +
				'<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></fieldset>');
			var node = fixture.querySelector('#target');
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));
		});

		it('should return false if an unlabelled ARIA group contains only the right elements', function () {
			fixtureSetup('<div role="group">' +
				'<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></div>');

			var node = fixture.querySelector('#target');
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
			assert.deepEqual(checkContext._data, {
				failureCode: 'no-group-label',
				type: type,
				name: 'uniqueyname'
			});
			assert.lengthOf(checkContext._relatedNodes, 1);
			assert.equal(checkContext._relatedNodes[0], fixture.querySelector('div'));
		});

		it('should return false if an improperly labelled-by ARIA group contains only the right elements', function () {
			fixtureSetup('<div id="grouplabel"></div>' +
				'<div role="group" aria-labelledby="grouplabel">' +
				'<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></div>');

			var node = fixture.querySelector('#target');
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
			assert.deepEqual(checkContext._data, {
				failureCode: 'no-group-label',
				type: type,
				name: 'uniqueyname'
			});
			assert.lengthOf(checkContext._relatedNodes, 1);
			assert.equal(checkContext._relatedNodes[0], fixture.querySelector('[role=group]'));
		});

		it('should return false if the group contains extra elements', function () {
			fixtureSetup('<div role="group" aria-labelledby="g1"><div id="g1">Legendary</div>' +
				'<input type="text" id="random">' +
				'<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></div>');
			var node = fixture.querySelector('#target');
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
			assert.deepEqual(checkContext._data, {
				failureCode: 'group-mixed-inputs',
				type: type,
				name: 'uniqueyname'
			});
			assert.lengthOf(checkContext._relatedNodes, 1);
			assert.equal(checkContext._relatedNodes[0], fixture.querySelector('#random'));
		});

		it('should return true if a properly labelled-by ARIA group contains only the right elements', function () {
			fixtureSetup('<div id="grouplabel">Label</div>' +
				'<div role="group" aria-labelledby="grouplabel">' +
				'<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></div>');

			var node = fixture.querySelector('#target');
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));
			assert.deepEqual(checkContext._data, {
				type: type,
				name: 'uniqueyname'
			});
		});


		it('should return true if a properly labelled-by ARIA group contains only the right elements - special characters', function () {
			fixtureSetup('<div id="grouplabel">Label</div>' +
				'<div role="group" aria-labelledby="grouplabel">' +
				'<input type="' + type + '" id="target" name="s.%$#n">' +
				'<input type="' + type + '" name="s.%$#n"></div>');

			var node = fixture.querySelector('#target');
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));

			assert.deepEqual(checkContext._data, {
				type: type,
				name: 's.%$#n'
			});
		});

		it('should return true if a properly labelled ARIA group contains only the right elements', function () {
			fixtureSetup('<div role="group" aria-label="group label">' +
				'<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></div>');
			var node = fixture.querySelector('#target');
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));
		});


		it('should ignore hidden inputs', function () {
			fixtureSetup('<fieldset><legend>Legendary</legend>' +
				'<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></div>' +
				'<input type="hidden" name="things"></fieldset>');
			var node = fixture.querySelector('#target');
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));

		});

		it('should allow elements to be contained in 2 or more fieldsets', function () {
			fixtureSetup('<fieldset><legend>Legendary</legend>' +
				'<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></div>' +
				'</fieldset>' +
				'<fieldset><legend>Also Legendary</legend>' +
				'<input type="' + type + '" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></div>' +
				'</fieldset>');
			var node = fixture.querySelector('#target');
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));
		});

		it('should allow elements to be contained in 2 or more groups', function () {
			fixtureSetup('<div role="group" aria-labelledby="g1"><div id="g1">Legendary</div>' +
				'<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></div>' +
				'</div>' +
				'<div role="group" aria-labelledby="g2"><div id="g2">Also Legendary</div>' +
				'<input type="' + type + '" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></div>' +
				'</fieldset>');
			var node = fixture.querySelector('#target');
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));
		});
	}


	describe('radio', function () {
		var type = 'radio';
		tests(type);

		it('should allow radiogroup role', function () {
			fixtureSetup('<div id="grouplabel">Label</div>' +
				'<div role="radiogroup" aria-labelledby="grouplabel">' +
				'<input type="' + type + '" id="target" name="s.%$#n">' +
				'<input type="' + type + '" name="s.%$#n"></div>');

			var node = fixture.querySelector('#target');
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node));
		});
	});

	describe('checkbox', function () {
		var type = 'checkbox';
		tests(type);

		it('should NOT allow radiogroup role', function () {
			fixtureSetup('<div id="grouplabel">Label</div>' +
				'<div role="radiogroup" aria-labelledby="grouplabel">' +
				'<input type="' + type + '" id="target" name="s.%$#n">' +
				'<input type="' + type + '" name="s.%$#n"></div>');
			var node = fixture.querySelector('#target');
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node));
		});
	});
});
