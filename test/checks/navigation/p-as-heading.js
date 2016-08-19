describe('p-as-heading', function () {
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

	it('returns true if the styles are identical', function () {
		fixture.innerHTML = '<p>elm 1</p> <p>elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node));
	});

	it('returns false if the font-weight is heavier', function () {
		fixture.innerHTML = '<p style="font-weight:bold">elm 1</p> <p>elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node));
	});

	it('returns false if the font-size is bigger', function () {
		fixture.innerHTML = '<p style="font-size:120%">elm 1</p> <p>elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node));
	});

	it('returns false if the fake heading is italic and the text is not', function () {
		fixture.innerHTML = '<p style="font-style:italic">elm 1</p> <p>elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node));
	});

	it('returns true if both texts are bold, italic and larger', function () {
		fixture.innerHTML = 
			'<p style="font-weight:bold; font-size:120%; font-style:italic">elm 1</p>' + 
			'<p style="font: italic bold 120% bold">elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node));
	});

	it('considers styles of elements inside the paragraph', function () {
		fixture.innerHTML = '<p><b>elm 1</b></p> <p>elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node));
	});

	it('ignores empty child element for style', function () {
		fixture.innerHTML = '<p><span> </span><b>elm 1</b></p> <p>elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node));
	});

	it('considers styles of elements that do not contain all the text', function () {
		fixture.innerHTML = '<p><b>elm</b> 1</p> <p>elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node));
	});

	it('returns undefined instead of false if the element is inside a blockquote', function () {
		fixture.innerHTML = '<blockquote>' +
			'<p style="font-weight:bold">elm 1</p> <p>elm 2</p>' +
		'</blockquote>';
		var node = fixture.querySelector('p');
		assert.isUndefined(checks['p-as-heading'].evaluate.call(checkContext, node));
	});

	it('returns true over undefined from within a blockquote', function () {
		fixture.innerHTML = '<blockquote>' +
			'<p>elm 1</p> <p>elm 2</p>' +
		'</blockquote>';
		var node = fixture.querySelector('p');
		assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node));
	});

	it('returns undefined if a previous sibling has a similar font-weight', function () {
		fixture.innerHTML = 
		'<p><b>elm 1</b></p>'+
		'<p id="target"><b>elm 2</b></p>'+
		'<p>elm 3</p>';
		var node = fixture.querySelector('#target');
		assert.isUndefined(checks['p-as-heading'].evaluate.call(checkContext, node));
	});

});