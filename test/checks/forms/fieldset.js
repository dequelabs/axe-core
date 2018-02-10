describe('fieldset', function () {
	'use strict';
	var fixture = document.getElementById('fixture');
	var shadowSupport = axe.testUtils.shadowSupport.v1;
	var fixtureSetup = axe.testUtils.fixtureSetup;

	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	function tests(type) {

		it('should return true if there is only one ' + type + ' element with the same name', function () {
			fixtureSetup('<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="differentname">');

			var node = fixture.querySelector('#target');
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
		});

		it('should return false if there are two ungrouped ' + type + ' elements with the same name', function () {
			fixtureSetup('<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname">');

			var node = fixture.querySelector('#target');
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
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
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
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
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
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
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
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
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
		});

		it('should return false if an unlabelled ARIA group contains only the right elements', function () {
			fixtureSetup('<div role="group">' +
				'<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></div>');

			var node = fixture.querySelector('#target');
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
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
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
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
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
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
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
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
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));

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
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
		});

		it('should ignore hidden inputs', function () {
			fixtureSetup('<fieldset><legend>Legendary</legend>' +
				'<input type="' + type + '" id="target" name="uniqueyname">' +
				'<input type="' + type + '" name="uniqueyname"></div>' +
				'<input type="hidden" name="things"></fieldset>');
			var node = fixture.querySelector('#target');
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
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
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
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
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
		});

		(shadowSupport ? it : xit)('should find fieldsets outside a shadow tree', function () {
			var fieldset = document.createElement('fieldset');
			fieldset.innerHTML = '<legend>Legendary</legend> <div></div>';

			var div = fieldset.querySelector('div');
			var shadow = div.attachShadow({ mode: 'open' });
			shadow.innerHTML = 
				'<input type="' + type + '" id="target" name="sharedname">' +
				'<input type="' + type + '" name="sharedname">';
			fixtureSetup(fieldset);

			var node = shadow.querySelector('#target');
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
		});

		(shadowSupport ? it : xit)('should find fieldsets inside a shadow tree', function () {
			var div = document.createElement('div');
			div.innerHTML = 
				'<input type="' + type + '" id="target" name="sharedname">' +
				'<input type="' + type + '" name="sharedname">';

			var shadow = div.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<fieldset><legend>Legendary</legend>' +
				'<slot></slot></fieldset>';
			fixtureSetup(div);

			var node = div.querySelector('#target');
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
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
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
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
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isFalse(checks.fieldset.evaluate.call(checkContext, node, {}, virtualNode));
		});
	});

});
