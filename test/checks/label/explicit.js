describe('explicit-label', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if an empty label is present', function () {
		fixtureSetup('<label for="target"></label><input type="text" id="target">');
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['explicit-label'].evaluate(node));
	});

	it('should return false if an invisible non-empty label is present', function () {
		fixtureSetup('<label for="target" style="display: none">Label</label><input type="text" id="target">');
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['explicit-label'].evaluate(node));
	});

	it('should return true if a non-empty label is present', function () {
		fixtureSetup('<label for="target">Text</label><input type="text" id="target">');
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['explicit-label'].evaluate(node));
	});

	it('should return false if a label is not present', function () {
		var node = document.createElement('input');
		node.type = 'text';
		fixtureSetup(node);

		assert.isFalse(checks['explicit-label'].evaluate(node));
	});

});
