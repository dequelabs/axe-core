describe('p-as-heading', function () {
	'use strict';
	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;

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
		axe._tree = undefined;
	});

	it('returns true if the styles are identical', function () {
		fixtureSetup('<p>elm 1</p> <p>elm 2</p>');
		var node = fixture.querySelector('p');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions, virtualNode));
	});

	it('returns true if there is no p element following it', function () {
		fixtureSetup('<p>lone elm</p>');
		var node = fixture.querySelector('p');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions, virtualNode));
	});

	it('returns false if the font-weight is heavier', function () {
		fixtureSetup('<p style="font-weight:bold">elm 1</p> <p>elm 2</p>');
		var node = fixture.querySelector('p');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions, virtualNode));
	});

	it('returns false if the font-size is bigger', function () {
		fixtureSetup('<p style="font-size:150%">elm 1</p> <p>elm 2</p>');
		var node = fixture.querySelector('p');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions, virtualNode));
	});

	it('returns false if the fake heading is italic and the text is not', function () {
		fixtureSetup('<p style="font-style:italic">elm 1</p> <p>elm 2</p>');
		var node = fixture.querySelector('p');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions, virtualNode));
	});

	it('returns true if both texts are bold, italic and larger', function () {
		fixtureSetup('<p style="font-weight:bold; font-size:120%; font-style:italic">elm 1</p>' +
			'<p style="font: italic bold 120% bold">elm 2</p>');
		var node = fixture.querySelector('p');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions, virtualNode));
	});

	it('considers styles of elements inside the paragraph', function () {
		fixtureSetup('<p><b>elm 1</b></p> <p>elm 2</p>');
		var node = fixture.querySelector('p');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions, virtualNode));
	});

	it('ignores empty child element for style', function () {
		fixtureSetup('<p><span> </span><b>elm 1</b></p> <p>elm 2</p>');
		var node = fixture.querySelector('p');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions, virtualNode));
	});

	it('considers styles of elements that do not contain all the text', function () {
		fixtureSetup('<p><b>elm</b> 1</p> <p>elm 2</p>');
		var node = fixture.querySelector('p');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions, virtualNode));
	});

	it('returns undefined instead of false if the element is inside a blockquote', function () {
		fixtureSetup('<blockquote>' +
			'<p style="font-weight:bold">elm 1</p> <p>elm 2</p>' +
		'</blockquote>');
		var node = fixture.querySelector('p');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isUndefined(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions, virtualNode));
	});

	it('returns true over undefined from within a blockquote', function () {
		fixtureSetup('<blockquote>' +
			'<p>elm 1</p> <p>elm 2</p>' +
		'</blockquote>');
		var node = fixture.querySelector('p');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions, virtualNode));
	});

	it('returns undefined if a previous sibling has a similar font-weight', function () {
		fixtureSetup('<p><b>elm 1</b></p>'+
		'<p id="target"><b>elm 2</b></p>'+
		'<p>elm 3</p>');
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isUndefined(checks['p-as-heading'].evaluate.call(checkContext, node, testOptions, virtualNode));
	});

	describe('option.margin', function () {

		it('passes if no margins are set', function () {
			var options = {};

			fixtureSetup('<p><b>elm 1</b></p> <p>elm 2</p>');
			var node = fixture.querySelector('p');
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, options, virtualNode));
		});

		it('takes an array of margins', function () {
			var options = {
				margins: [{ size: 1.2 }]
			};

			fixtureSetup('<p><b>elm 1</b></p> <p>elm 2</p>');
			var node = fixture.querySelector('p');
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, options, virtualNode));
		});

		it('returns false if all values in the margin are passed', function () {
			var options = {
				margins: [{ size: 1.2, weight: 100 }]
			};

			fixtureSetup('<p style="font-size:1.5em; font-weight:bold">elm 1</p> <p>elm 2</p>');
			var node = fixture.querySelector('p');
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node, options, virtualNode));
		});

		it('returns true if any of the values is not passed', function () {
			var options = {
				margins: [{ size: 1.2, weight: 100 }]
			};

			fixtureSetup('<p style="font-weight:bold">elm 1</p> <p>elm 2</p>');
			var node = fixture.querySelector('p');
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, options, virtualNode));
		});

		it('returns false if any of the margins is passed', function () {
			var options = {
				margins: [
					{ size: 1.2, weight: 100 },
					{ size: 1.5 },
					{ italic: true }
				],
			};

			fixtureSetup('<p style="font-style:italic">elm 1</p> <p>elm 2</p>');
			var node = fixture.querySelector('p');
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isFalse(checks['p-as-heading'].evaluate.call(checkContext, node, options, virtualNode));
		});

		it('returns true if none of the set margins is passed', function () {
			var options = {
				margins: [
					{ size: 1.2, weight: 100 },
					{ size: 1.5 },
					{ size: 1.2, italic: true }
				]
			};

			fixtureSetup('<p style="font-size:1.5em">elm 1</p> <p>elm 2</p>');
			var node = fixture.querySelector('p');
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			assert.isTrue(checks['p-as-heading'].evaluate.call(checkContext, node, options, virtualNode));
		});
	});

});