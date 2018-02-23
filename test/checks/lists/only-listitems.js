describe('only-listitems', function () {
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
		var checkArgs = checkSetup('<ol id="target"></ol>');

		assert.isFalse(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if the list has whitespace', function () {
		var checkArgs = checkSetup('<ol id="target"><li>Item</li>    </ol>');

		assert.isFalse(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if the list has non-li comments', function () {
		var checkArgs = checkSetup('<ol id="target"><li>Item</li><!--comment--></ol>');

		assert.isFalse(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return true if the list has non-li text contents', function () {
		var checkArgs = checkSetup('<ol id="target"><li>Item</li>Not an item</ol>');

		assert.isTrue(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return true if the list has non-li contents', function () {
		var checkArgs = checkSetup('<ol id="target"><p>Not a list</p></ol>');

		assert.isTrue(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
		assert.deepEqual(checkContext._relatedNodes, [fixture.querySelector('p')]);
	});

	it('should return false if the list has only an li with child content', function () {
		var checkArgs = checkSetup('<ol id="target"><li>A <i>list</i></li></ol>');

		assert.isFalse(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if the list has only an li', function () {
		var checkArgs = checkSetup('<ol id="target"><li>A list</li></ol>');

		assert.isFalse(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return true if the list has an li with other content', function () {
		var checkArgs = checkSetup('<ol id="target"><li>A list</li><p>Not a list</p></ol>');

		assert.isTrue(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
		assert.deepEqual(checkContext._relatedNodes, [fixture.querySelector('p')]);
	});

	it('should return false if <link> is used along side li', function () {
		var checkArgs = checkSetup('<ol id="target"><link rel="stylesheet" href="theme.css"><li>A list</li></ol>');

		assert.isFalse(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if <meta> is used along side li', function () {
		var checkArgs = checkSetup('<ol id="target"><meta name="description" content=""><li>A list</li></ol>');

		assert.isFalse(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if <script> is used along side li', function () {
		var checkArgs = checkSetup('<ol id="target"><script src="script.js"></script><li>A list</li></ol>');

		assert.isFalse(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if <style> is used along side li', function () {
		var checkArgs = checkSetup('<ol id="target"><style></style><li>A list</li></ol>');

		assert.isFalse(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return false if <template> is used along side li', function () {
		var checkArgs = checkSetup('<ol id="target"><template></template><li>A list</li></ol>');

		assert.isFalse(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should return false in a shadow DOM pass', function () {
		var node = document.createElement('div');
		node.innerHTML = '<li>My list item </li>';
		var shadow = node.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<ul><slot></slot></ul>';

		var checkArgs = checkSetup(node, 'ul');
		assert.isFalse(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should return true in a shadow DOM fail', function () {
		var node = document.createElement('div');
		node.innerHTML = '<p>Not a list item</p>';
		var shadow = node.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<ul><slot></slot></ul>';

		var checkArgs = checkSetup(node, 'ul');
		assert.isTrue(checks['only-listitems'].evaluate.apply(checkContext, checkArgs));
	});

});
