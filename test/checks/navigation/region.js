describe('region', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	var checkContext = {
		_relatedNodes: [],
		_data: null,
		data: function (d) {
			this._data = d;
		},
		relatedNodes: function (rn) {
			this._relatedNodes = rn;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._relatedNodes = [];
		checkContext._data = null;
	});

	it('should return true when all content is inside the region', function () {
		fixture.innerHTML = '<div id="target" role="main"><a href="#mainheader">Click Here</a><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks.region.evaluate.call(checkContext, node));
		assert.equal(checkContext._relatedNodes.length, 0);
	});

	it('should return true when invisible content is outside the region', function () {
		fixture.innerHTML = '<div id="target"><p style="display: none">Click Here</p><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks.region.evaluate.call(checkContext, node));
		assert.equal(checkContext._relatedNodes.length, 0);
	});

	it('should return true when there is a skiplink', function () {
		fixture.innerHTML = '<div id="target"><a href="#mainheader">Click Here</a><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks.region.evaluate.call(checkContext, node));
		assert.equal(checkContext._relatedNodes.length, 0);
	});

	it('should return false when there is a non-region element', function () {
		fixture.innerHTML = '<div id="target"><div>This is random content.</div><div role="main"><h1 id="mainheader">Introduction</h1></div></div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.region.evaluate.call(checkContext, node));
		assert.equal(checkContext._relatedNodes.length, 1);
	});

	it('should return the first item when after is called', function () {
		assert.equal(checks.region.after([2, 3, 1]), 2);
	});

	it('should return false when there is a non-skiplink', function () {
		fixture.innerHTML = '<div id="target"><a href="something.html#mainheader">Click Here</a><div role="main"><h1 id="mainheader">Introduction</h1></div></div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.region.evaluate.call(checkContext, node));
		assert.equal(checkContext._relatedNodes.length, 1);
	});
});
