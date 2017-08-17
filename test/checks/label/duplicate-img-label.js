describe('duplicate-img-label', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var shadowSupport = axe.testUtils.shadowSupport;

	afterEach(function () {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('should return false if no img is present', function () {
		fixture.innerHTML = '<button id="target">Plain text</button>';
		var node = fixture.querySelector('#target');
		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		assert.isFalse(checks['duplicate-img-label'].evaluate(node, undefined, axe.utils.getNodeFromTree(tree[0], node)));
	});

	it('should return false if no text is present', function () {
		fixture.innerHTML = '<button id="target"><img alt="Plain text"></button>';
		var node = fixture.querySelector('#target');
		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		var result = checks['duplicate-img-label'].evaluate(node, undefined, axe.utils.getNodeFromTree(tree[0], node));
		assert.isFalse(result);
	});

	it('should return false if aria-label duplicates img alt', function () {
		fixture.innerHTML = '<button id="target" aria-label="Plain text"><img alt="Plain text"></button>';
		var node = fixture.querySelector('#target');
		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		assert.isFalse(checks['duplicate-img-label'].evaluate(node, undefined, axe.utils.getNodeFromTree(tree[0], node)));
	});

	it('should return false if img and text have different text', function () {
		fixture.innerHTML = '<button id="target"><img alt="Alt text">Plain text</button>';
		var node = fixture.querySelector('#target');
		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		assert.isFalse(checks['duplicate-img-label'].evaluate(node, undefined, axe.utils.getNodeFromTree(tree[0], node)));
	});

	it('should return true if img and text have the same text', function () {
		fixture.innerHTML = '<button id="target"><img alt="Plain text">Plain text</button>';
		var node = fixture.querySelector('#target');
		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		assert.isTrue(checks['duplicate-img-label'].evaluate(node, undefined, axe.utils.getNodeFromTree(tree[0], node)));
	});

	it('should return true if img has ARIA label with the same text', function () {
		fixture.innerHTML = '<button id="target"><img aria-label="Plain text">Plain text</button>';
		var node = fixture.querySelector('#target');
		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		assert.isTrue(checks['duplicate-img-label'].evaluate(node, undefined, axe.utils.getNodeFromTree(tree[0], node)));
	});

	it('should return false if img and text are both blank', function () {
		fixture.innerHTML = '<button id="target"><img alt=""></button>';
		var node = fixture.querySelector('#target');
		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		assert.isFalse(checks['duplicate-img-label'].evaluate(node, undefined, axe.utils.getNodeFromTree(tree[0], node)));
	});

	it('should return false if img and text have superset/subset text', function () {
		fixture.innerHTML = '<button id="target"><img alt="Plain text and more">Plain text</button>';
		var node = fixture.querySelector('#target');
		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		assert.isFalse(checks['duplicate-img-label'].evaluate(node, undefined, axe.utils.getNodeFromTree(tree[0], node)));
	});

	(shadowSupport.v1 ? it : xit)('should return true if the img is part of a shadow tree', function () {
		var button = document.createElement('div');
		button.setAttribute('role', 'button');
		button.innerHTML = 'My button';
		var shadow = button.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<slot></slot><img alt="My button">';
		var checkArgs = checkSetup(button);

		assert.isTrue(checks['duplicate-img-label'].evaluate.apply(null, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should return true if the img is a slotted element', function () {
		var button = document.createElement('div');
		button.setAttribute('role', 'button');
		button.innerHTML = '<img alt="My button">';
		var shadow = button.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<span>My button</span> <slot></slot>';
		var checkArgs = checkSetup(button);

		assert.isTrue(checks['duplicate-img-label'].evaluate.apply(null, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should return false if the shadow img has a different text', function () {
		var button = document.createElement('div');
		button.setAttribute('role', 'button');
		button.innerHTML = 'My button';
		var shadow = button.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<slot></slot><img alt="My image">';
		var checkArgs = checkSetup(button);

		assert.isFalse(checks['duplicate-img-label'].evaluate.apply(null, checkArgs));
	});

});
