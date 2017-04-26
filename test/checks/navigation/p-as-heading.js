describe('p-as-heading', function () {
	'use strict';
	var fixture = document.getElementById('fixture');
	var checkContext = {
		_data: null,
		data: function (d) {
			this._data = d;
		}
	};

	var testOptions = {
		margins: [
			{ weight: 100 },
			{ italic: true },
			{ size: 1.2 }
		]
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._data = null;
	});

	it('returns true if the styles are identical', function () {
		fixture.innerHTML = '<p>elm 1</p> <p>elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions));
	});

	it('returns true if there is no p element following it', function () {
		fixture.innerHTML = '<p>lone elm</p>';
		var node = fixture.querySelector('p');
		assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions));
	});

	it('returns false if the font-weight is heavier', function () {
		fixture.innerHTML = '<p style="font-weight:bold">elm 1</p> <p>elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions));
	});

	it('returns false if the font-size is bigger', function () {
		fixture.innerHTML = '<p style="font-size:150%">elm 1</p> <p>elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions));
	});

	it('returns false if the fake heading is italic and the text is not', function () {
		fixture.innerHTML = '<p style="font-style:italic">elm 1</p> <p>elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions));
	});

	it('returns true if both texts are bold, italic and larger', function () {
		fixture.innerHTML =
			'<p style="font-weight:bold; font-size:120%; font-style:italic">elm 1</p>' +
			'<p style="font: italic bold 120% bold">elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions));
	});

	it('considers styles of elements inside the paragraph', function () {
		fixture.innerHTML = '<p><b>elm 1</b></p> <p>elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions));
	});

	it('ignores empty child element for style', function () {
		fixture.innerHTML = '<p><span> </span><b>elm 1</b></p> <p>elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions));
	});

	it('considers styles of elements that do not contain all the text', function () {
		fixture.innerHTML = '<p><b>elm</b> 1</p> <p>elm 2</p>';
		var node = fixture.querySelector('p');
		assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions));
	});

	it('returns undefined instead of false if the element is inside a blockquote', function () {
		fixture.innerHTML = '<blockquote>' +
			'<p style="font-weight:bold">elm 1</p> <p>elm 2</p>' +
		'</blockquote>';
		var node = fixture.querySelector('p');
		assert.isUndefined(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions));
	});

	it('returns true over undefined from within a blockquote', function () {
		fixture.innerHTML = '<blockquote>' +
			'<p>elm 1</p> <p>elm 2</p>' +
		'</blockquote>';
		var node = fixture.querySelector('p');
		assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions));
	});

	it('returns undefined if a previous sibling has a similar font-weight', function () {
		fixture.innerHTML =
		'<p><b>elm 1</b></p>'+
		'<p id="target"><b>elm 2</b></p>'+
		'<p>elm 3</p>';
		var node = fixture.querySelector('#target');
		assert.isUndefined(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions));
	});

	describe('option.margin', function () {

		it('passes if no margins are set', function () {
			var options = {};

			fixture.innerHTML = '<p><b>elm 1</b></p> <p>elm 2</p>';
			var node = fixture.querySelector('p');
			assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, options));
		});

		it('takes an array of margins', function () {
			var options = {
				margins: [{ size: 1.2 }]
			};

			fixture.innerHTML = '<p><b>elm 1</b></p> <p>elm 2</p>';
			var node = fixture.querySelector('p');
			assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, options));
		});

		it('returns false if all values in the margin are passed', function () {
			var options = {
				margins: [{ size: 1.2, weight: 100 }]
			};

			fixture.innerHTML = '<p style="font-size:1.5em; font-weight:bold">elm 1</p> <p>elm 2</p>';
			var node = fixture.querySelector('p');
			assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node, options));
		});

		it('returns true if any of the values is not passed', function () {
			var options = {
				margins: [{ size: 1.2, weight: 100 }]
			};

			fixture.innerHTML = '<p style="font-weight:bold">elm 1</p> <p>elm 2</p>';
			var node = fixture.querySelector('p');
			assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, options));
		});

		it('returns false if any of the margins is passed', function () {
			var options = {
				margins: [
					{ size: 1.2, weight: 100 },
					{ size: 1.5 },
					{ italic: true }
				],
			};

			fixture.innerHTML = '<p style="font-style:italic">elm 1</p> <p>elm 2</p>';
			var node = fixture.querySelector('p');
			assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node, options));
		});

		it('returns true if none of the set margins is passed', function () {
			var options = {
				margins: [
					{ size: 1.2, weight: 100 },
					{ size: 1.5 },
					{ size: 1.2, italic: true }
				]
			};

			fixture.innerHTML = '<p style="font-size:1.5em">elm 1</p> <p>elm 2</p>';
			var node = fixture.querySelector('p');
			assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, options));
		});
	});

});