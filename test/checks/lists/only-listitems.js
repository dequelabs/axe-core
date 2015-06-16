describe('only-listitems', function () {
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
		fixture.innerHTML = '<ol id="target"></ol>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-listitems'].evaluate(node));


	});

	it('should return false if the list has whitespace', function () {
		fixture.innerHTML = '<ol id="target"><li>Item</li>    </ol>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-listitems'].evaluate(node));


	});

	it('should return false if the list has non-li comments', function () {
		fixture.innerHTML = '<ol id="target"><li>Item</li><!--comment--></ol>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-listitems'].evaluate(node));


	});

	it('should return true if the list has non-li text contents', function () {
		fixture.innerHTML = '<ol id="target"><li>Item</li>Not an item</ol>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['only-listitems'].evaluate(node));


	});

	it('should return true if the list has non-li contents', function () {
		fixture.innerHTML = '<ol id="target"><p>Not a list</p></ol>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['only-listitems'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [node.querySelector('p')]);


	});

	it('should return false if the list has only an li with child content', function () {
		fixture.innerHTML = '<ol id="target"><li>A <i>list</i></li></ol>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-listitems'].evaluate(node));


	});

	it('should return false if the list has only an li', function () {
		fixture.innerHTML = '<ol id="target"><li>A list</li></ol>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-listitems'].evaluate(node));


	});

	it('should return true if the list has an li with other content', function () {
		fixture.innerHTML = '<ol id="target"><li>A list</li><p>Not a list</p></ol>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['only-listitems'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [node.querySelector('p')]);


	});

});
