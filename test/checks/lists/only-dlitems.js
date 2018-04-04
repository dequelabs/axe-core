describe('only-dlitems', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var shadowSupport = axe.testUtils.shadowSupport;

	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return false if the list has no contents', function () {
		var checkArgs = checkSetup('<dl id="target"></dl>');

		assert.isFalse(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return true if the list has non-dd/dt contents', function () {
		var checkArgs = checkSetup('<dl id="target"><p>Not a list</p></dl>');

		assert.isTrue(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
		assert.deepEqual(checkContext._relatedNodes, [fixture.querySelector('p')]);
	});

	it('should return false if the list has only a dd', function () {
		var checkArgs = checkSetup('<dl id="target"><dd>A list</dd></dl>');

		assert.isFalse(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if the list has only a dt', function () {
		var checkArgs = checkSetup('<dl id="target"><dt>A list</dt></dl>');

		assert.isFalse(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if the list has dt and dd with child content', function () {
		var checkArgs = checkSetup('<dl id="target"><dt><p>An item</p></dt><dd>A list</dd></dl>');

		assert.isFalse(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if the list has dt and dd', function () {
		var checkArgs = checkSetup('<dl id="target"><dt>An item</dt><dd>A list</dd></dl>');

		assert.isFalse(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if the list has dt, dd and a comment', function () {
		var checkArgs = checkSetup('<dl id="target"><dt>An item</dt><dd>A list</dd><!-- foo --></dl>');

		assert.isFalse(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return true if the list has a dt and dd with other content', function () {
		var checkArgs = checkSetup('<dl id="target"><dt>Item one</dt><dd>Description</dd><p>Not a list</p></dl>');

		assert.isTrue(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
		assert.deepEqual(checkContext._relatedNodes, [fixture.querySelector('p')]);
	});

	it('should return true if the list has a textNode as a child', function () {
		var checkArgs = checkSetup('<dl id="target"><!--hi--><dt>hi</dt>hello<dd>hi</dd></dl>');

		assert.isTrue(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
		assert.deepEqual(checkContext._relatedNodes, []);
	});

	it('should return false if <link> is used along side dt', function () {
		var checkArgs = checkSetup('<dl id="target"><link rel="stylesheet" href="theme.css"><dt>A list</dt></dl>');

		assert.isFalse(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if <meta> is used along side dt', function () {
		var checkArgs = checkSetup('<dl id="target"><meta name="description" content=""><dt>A list</dt></dl>');

		assert.isFalse(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if <script> is used along side dt', function () {
		var checkArgs = checkSetup('<dl id="target"><script src="script.js"></script><dt>A list</dt></dl>');

		assert.isFalse(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if <style> is used along side dt', function () {
		var checkArgs = checkSetup('<dl id="target"><style></style><dt>A list</dt></dl>');

		assert.isFalse(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if <template> is used along side dt', function () {
		var checkArgs = checkSetup('<dl id="target"><template></template><dt>A list</dt></dl>');

		assert.isFalse(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should return false in a shadow DOM pass', function () {
		var node = document.createElement('div');
		node.innerHTML = '<dt>My list item </dt>';
		var shadow = node.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<dl><slot></slot></dl>';

		var checkArgs = checkSetup(node, 'dl');
		assert.isFalse(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should return true in a shadow DOM fail', function () {
		var node = document.createElement('div');
		node.innerHTML = '<p>Not a list</p>';
		var shadow = node.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<dl><slot></slot></dl>';

		var checkArgs = checkSetup(node, 'dl');
		assert.isTrue(checks['only-dlitems'].evaluate.apply(checkContext, checkArgs));
	});
});
