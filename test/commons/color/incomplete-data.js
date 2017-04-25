describe('axe.commons.color.incompleteData', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should be an object', function () {
		assert.isObject(axe.commons.color.incompleteData);
	});

	it('should store an object with a key for the incomplete check', function () {
		var node = document.createElement('div');
		fixture.appendChild(node);
		axe.commons.color.incompleteData.set('fgColor', {
			node: node,
			reason: 'bgImage'
		});

		assert.equal(axe.commons.color.incompleteData.get('fgColor').node, node);
	});

	it('should throw an error if key is not a string', function () {
		assert.throws(function () {
			axe.commons.color.incompleteData.set({
				node: {}
			});
		}, /key must be a string/);
	});

	it('should store a reason that matches a list of possibilities', function () {
		axe.commons.color.incompleteData.set('bgColor', {
			node: {},
			reason: 'bgImage'
		});
		assert.equal(axe.commons.color.incompleteData.get('bgColor').reason, 'bgImage');
	});

	it('should clear the data object on request', function () {
		axe.commons.color.incompleteData.set('fgColor', {
			node: {},
			reason: 'bgOverlap'
		});
		axe.commons.color.incompleteData.clear();
		assert.isUndefined(axe.commons.color.incompleteData.get('fgColor'), 'bgOverlap');
	});
});