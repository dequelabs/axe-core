describe('only-dlitems', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	var checkContext = {
		_relatedNodes: [],
		relatedNodes: function (rn) {
			this._relatedNodes = rn;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._relatedNodes = [];
	});

	it('should return false if the list has no contents', function () {
		fixture.innerHTML = '<dl id="target"></dl>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-dlitems'].evaluate(node));


	});

	it('should return true if the list has non-dd/dt contents', function () {
		fixture.innerHTML = '<dl id="target"><p>Not a list</p></dl>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['only-dlitems'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [node.querySelector('p')]);


	});

	it('should return false if the list has only a dd', function () {
		fixture.innerHTML = '<dl id="target"><dd>A list</dd></dl>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-dlitems'].evaluate(node));


	});

	it('should return false if the list has only a dt', function () {
		fixture.innerHTML = '<dl id="target"><dt>A list</dt></dl>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-dlitems'].evaluate(node));


	});

	it('should return false if the list has dt and dd with child content', function () {
		fixture.innerHTML = '<dl id="target"><dt><p>An item</p></dt><dd>A list</dd></dl>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-dlitems'].evaluate(node));


	});

	it('should return false if the list has dt and dd', function () {
		fixture.innerHTML = '<dl id="target"><dt>An item</dt><dd>A list</dd></dl>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-dlitems'].evaluate(node));


	});

	it('should return false if the list has dt, dd and a comment', function () {
		fixture.innerHTML = '<dl id="target"><dt>An item</dt><dd>A list</dd><!-- foo --></dl>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-dlitems'].evaluate(node));


	});

	it('should return true if the list has a dt and dd with other content', function () {
		fixture.innerHTML = '<dl id="target"><dt>Item one</dt><dd>Description</dd><p>Not a list</p></dl>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['only-dlitems'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [node.querySelector('p')]);


	});

	it('should return true if the list has a textNode as a child', function () {
		fixture.innerHTML = '<dl id="target"><!--hi--><dt>hi</dt>hello<dd>hi</dd></dl>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['only-dlitems'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, []);
	});


	it('should return false if <link> is used along side dt', function () {
		fixture.innerHTML = '<dl id="target"><link rel="stylesheet" href="theme.css"><dt>A list</dt></dl>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['only-dlitems'].evaluate.call(checkContext, node));
	});

	it('should return false if <meta> is used along side dt', function () {
		fixture.innerHTML = '<dl id="target"><meta name="description" content=""><dt>A list</dt></dl>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['only-dlitems'].evaluate.call(checkContext, node));
	});

	it('should return false if <script> is used along side dt', function () {
		fixture.innerHTML = '<dl id="target"><script src="script.js"></script><dt>A list</dt></dl>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['only-dlitems'].evaluate.call(checkContext, node));
	});

	it('should return false if <style> is used along side dt', function () {
		fixture.innerHTML = '<dl id="target"><style></style><dt>A list</dt></dl>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['only-dlitems'].evaluate.call(checkContext, node));
	});

	it('should return false if <template> is used along side dt', function () {
		fixture.innerHTML = '<dl id="target"><template></template><dt>A list</dt></dl>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['only-dlitems'].evaluate.call(checkContext, node));
	});
});
