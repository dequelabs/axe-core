describe('explicit-label', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var shadowSupport = axe.testUtils.shadowSupport;

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

	(shadowSupport.v1 ? it : xit)('should return true if input and label are in the same shadow root', function () {
		var root = document.createElement('div');
		var shadow = root.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<label for="target">American band</label><input id="target">';
		fixtureSetup(root);

		var node = shadow.querySelector('#target');
		assert.isTrue(checks['explicit-label'].evaluate(node));
	});

	(shadowSupport.v1 ? it : xit)('should return true if label content is slotted', function () {
		var root = document.createElement('div');
		root.innerHTML = 'American band';
		var shadow = root.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<label for="target"><slot></slot></label><input id="target">';
		fixtureSetup(root);

		var node = shadow.querySelector('#target');
		assert.isTrue(checks['explicit-label'].evaluate(node));
	});

	(shadowSupport.v1 ? it : xit)('should return false if input is inside shadow DOM and the label is not', function () {
		var root = document.createElement('div');
		root.innerHTML = '<label for="target">American band</label>';
		var shadow = root.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<slot></slot><input id="target">';
		fixtureSetup(root);

		var node = shadow.querySelector('#target');
		assert.isFalse(checks['explicit-label'].evaluate(node));
	});

	(shadowSupport.v1 ? it : xit)('should return false if label is inside shadow DOM and the input is not', function () {
		var root = document.createElement('div');
		root.innerHTML = '<input id="target">';
		var shadow = root.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<label for="target">American band</label><slot></slot>';
		fixtureSetup(root);

		var node = root.querySelector('#target');
		assert.isFalse(checks['explicit-label'].evaluate(node));
	});

});
