describe('p-as-heading', function () {
	'use strict';
	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;

	var checkContext = axe.testUtils.MockCheckContext();
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;

	var testOptions = {
		margins: [
			{ weight: 100 },
			{ italic: true },
			{ size: 1.2 }
		]
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
		axe._tree = undefined;
	});

	it('returns true if the styles are identical', function () {
		var params = checkSetup('<p id="target">elm 1</p> <p>elm 2</p>', testOptions);
		assert.isTrue(checks['p-as-heading'].evaluate.apply(checkContext, params));
	});

	it('returns true if there is no p element following it', function () {
		var params = checkSetup('<p id="target">lone elm</p>', testOptions);
		assert.isTrue(checks['p-as-heading'].evaluate.apply(checkContext, params));
	});

	it('returns false if the font-weight is heavier', function () {
		var params = checkSetup(
			'<p id="target" style="font-weight:bold">elm 1</p>' +
			'<p>elm 2</p>',
			testOptions
		);
		assert.isFalse(checks['p-as-heading'].evaluate.apply(checkContext, params));
	});

	it('returns false if the font-size is bigger', function () {
		var params = checkSetup('<p id="target" style="font-size:150%">elm 1</p> <p>elm 2</p>', testOptions);
		assert.isFalse(checks['p-as-heading'].evaluate.apply(checkContext, params));
	});

	it('returns false if the fake heading is italic and the text is not', function () {
		var params = checkSetup('<p id="target" style="font-style:italic">elm 1</p> <p>elm 2</p>', testOptions);
		assert.isFalse(checks['p-as-heading'].evaluate.apply(checkContext, params));
	});

	it('returns true if both texts are bold, italic and larger', function () {
		var params = checkSetup(
			'<p id="target" style="font-weight:bold; font-size:120%; font-style:italic">elm 1</p>' +
			'<p style="font: italic bold 120% bold">elm 2</p>',
			testOptions
		);
		assert.isTrue(checks['p-as-heading'].evaluate.apply(checkContext, params));
	});

	it('considers styles of elements inside the paragraph', function () {
		var params = checkSetup('<p id="target"><b>elm 1</b></p> <p>elm 2</p>', testOptions);
		assert.isFalse(checks['p-as-heading'].evaluate.apply(checkContext, params));
	});

	it('ignores empty child element for style', function () {
		var params = checkSetup('<p id="target"><span> </span><b>elm 1</b></p> <p>elm 2</p>', testOptions);
		assert.isFalse(checks['p-as-heading'].evaluate.apply(checkContext, params));
	});

	it('considers styles of elements that do not contain all the text', function () {
		var params = checkSetup('<p id="target"><b>elm</b> 1</p> <p>elm 2</p>', testOptions);
		assert.isTrue(checks['p-as-heading'].evaluate.apply(checkContext, params));
	});

	it('returns undefined instead of false if the element is inside a blockquote', function () {
		var params = checkSetup('<blockquote>' +
			'<p style="font-weight:bold" id="target">elm 1</p> <p>elm 2</p>' +
		'</blockquote>', testOptions);
		assert.isUndefined(checks['p-as-heading'].evaluate.apply(checkContext, params));
	});

	it('returns true over undefined from within a blockquote', function () {
		var params = checkSetup('<blockquote>' +
			'<p id="target">elm 1</p> <p>elm 2</p>' +
		'</blockquote>', testOptions);
		assert.isTrue(checks['p-as-heading'].evaluate.apply(checkContext, params));
	});

	it('returns undefined if a previous sibling has a similar font-weight', function () {
		var params = checkSetup('<p><b>elm 1</b></p>'+
		'<p id="target"><b>elm 2</b></p>'+
		'<p>elm 3</p>', testOptions);
		assert.isUndefined(checks['p-as-heading'].evaluate.apply(checkContext, params));
	});

	describe('option.margin', function () {

		it('passes if no margins are set', function () {
			var options = {};

			var params = checkSetup('<p id="target"><b>elm 1</b></p> <p>elm 2</p>', options);
			assert.isTrue(checks['p-as-heading'].evaluate.apply(checkContext, params));
		});

		it('takes an array of margins', function () {
			var options = {
				margins: [{ size: 1.2 }]
			};

			var params = checkSetup('<p id="target"><b>elm 1</b></p> <p>elm 2</p>', options);
			assert.isTrue(checks['p-as-heading'].evaluate.apply(checkContext, params));
		});

		it('returns false if all values in the margin are passed', function () {
			var options = {
				margins: [{ size: 1.2, weight: 100 }]
			};

			var params = checkSetup(
				'<p id="target" style="font-size:1.5em; font-weight:bold">elm 1</p>' +
				'<p>elm 2</p>',
				options
			);
			assert.isFalse(checks['p-as-heading'].evaluate.apply(checkContext, params));
		});

		it('returns true if any of the values is not passed', function () {
			var options = {
				margins: [{ size: 1.2, weight: 100 }]
			};

			var params = checkSetup(
				'<p id="target" style="font-weight:bold">elm 1</p>' +
				'<p>elm 2</p>',
				options
			);
			assert.isTrue(checks['p-as-heading'].evaluate.apply(checkContext, params));
		});

		it('returns false if any of the margins is passed', function () {
			var options = {
				margins: [
					{ size: 1.2, weight: 100 },
					{ size: 1.5 },
					{ italic: true }
				],
			};

			var params = checkSetup(
				'<p id="target" style="font-style:italic">elm 1</p>' +
				'<p>elm 2</p>',
				options
			);
			assert.isFalse(checks['p-as-heading'].evaluate.apply(checkContext, params));
		});

		it('returns true if none of the set margins is passed', function () {
			var options = {
				margins: [
					{ size: 1.2, weight: 100 },
					{ size: 1.5 },
					{ size: 1.2, italic: true }
				]
			};

			var params = checkSetup('<p id="target" style="font-size:1.5em">elm 1</p>' +
				'<p>elm 2</p>',
				options
			);
			assert.isTrue(checks['p-as-heading'].evaluate.apply(checkContext, params));
		});
	});

	(shadowSupported ? it : xit)
	('returns undefined instead of false if the element is inside a blockquote in light dom', function () {
		var params = shadowCheckSetup('<blockquote></blockquote>',
			'<p style="font-weight:bold" id="target">elm 1</p> <p>elm 2</p>',
			testOptions);
		assert.isUndefined(checks['p-as-heading'].evaluate.apply(checkContext, params));
	});

	(shadowSupported ? it : xit)
	('returns true over undefined from within a blockquote in light dom', function () {
		var params = shadowCheckSetup('<blockquote></blockquote>',
			'<p id="target">elm 1</p> <p>elm 2</p>',
			testOptions);
		assert.isTrue(checks['p-as-heading'].evaluate.apply(checkContext, params));
	});
});