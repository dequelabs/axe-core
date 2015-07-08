describe('heading-order', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = {
		_data: null,
		data: function (d) {
			this._data = d;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._data = null;
	});

	it('should store the correct header level for aria-level and return true', function () {
		fixture.innerHTML = '<div role="aria-heading" aria-level="1" id="target">One</h1><h3>Three</h3>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['heading-order'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, 1);

	});

	it('should store the header level as a number', function () {
		fixture.innerHTML = '<h1 id="target">One</h1><h3>Three</h3>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['heading-order'].evaluate.call(checkContext, node));
		assert.isNumber(checkContext._data);

	});

	it('should store the correct header level for hn tags and return true', function () {
		fixture.innerHTML = '<h1 id="target">One</h1><h3>Three</h3>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['heading-order'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, 1);

	});

	it('should return true and put nothing in data for non-headers', function () {
		fixture.innerHTML = '<div id="target">One</div><h3>Three</h3>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['heading-order'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, null);
	});

	it('should return false when header level increases by 2', function () {
		var results = [{data: 1, result: true}, {data: 3, result: true}];
		assert.isFalse(checks['heading-order'].after(results)[1].result);
	});

	it('should return true when header level decreases by 1', function () {
		var results = [{data: 2, result: true}, {data: 1, result: true}];
		assert.isTrue(checks['heading-order'].after(results)[1].result);
	});

	it('should return true when header level decreases by 2', function () {
		var results = [{data: 3, result: true}, {data: 1, result: true}];
		assert.isTrue(checks['heading-order'].after(results)[1].result);
	});

	it('should return true when there is only one header', function () {
		var results = [{data: 1, result: true}];
		assert.isTrue(checks['heading-order'].after(results)[0].result);
	});

	it('should return true when header level increases by 1', function () {
		var results = [{data: 1, result: true}, {data: 2, result: true}];
		assert.isTrue(checks['heading-order'].after(results)[1].result);
	});

});
