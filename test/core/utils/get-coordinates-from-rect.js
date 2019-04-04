describe('axe.utils.getCoordinatesFromRect', function() {
	'use strict';

	var isPhantom = window.PHANTOMJS ? true : false;
	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('returns `undefined` when element is placed outside of viewport (left position > window dimension)', function() {
		var vNode = queryFixture(
			'<button id="target" type="button" style="position:absolute; left:9999px;">Click Here</button>'
		);
		var node = vNode.actualNode;
		var rect = node.getBoundingClientRect();
		var actual = axe.utils.getCoordinatesFromRect(rect);

		assert.isUndefined(actual);
	});

	it('returns `undefined` when element is placed outside of viewport (top position is negative)', function() {
		var vNode = queryFixture(
			'<button id="target" type="button" style="position:fixed; top:-9999px;">Click Here</button>'
		);
		var node = vNode.actualNode;
		var rect = node.getBoundingClientRect();
		var actual = axe.utils.getCoordinatesFromRect(rect);

		assert.isUndefined(actual);
	});

	/**
	 * Note:
	 * Believe in PhantomJs run, the button which is relatively positioned,
	 * ends up out of bounds of viewport, and thus returns `undefined`.
	 */
	isPhantom
		? it.skip
		: it('returns `{x,y}` when element is with in viewport', function() {
				var vNode = queryFixture(
					'<button id="target" type="button">Click Here</button>'
				);
				var node = vNode.actualNode;
				var rect = node.getBoundingClientRect();
				var actual = axe.utils.getCoordinatesFromRect(rect);

				assert.isDefined(actual);
				assert.hasAllKeys(actual, ['x', 'y']);
		  });

	it('returns `{x,y}` when element is with in viewport (check returned coordinate values)', function() {
		var vNode = queryFixture(
			'<button id="target" type="button" style="position: absolute; width: 250px; height: 250px; left: 100px; top: 100px;">Click Here</button>'
		);
		var node = vNode.actualNode;
		var rect = node.getBoundingClientRect();
		var actual = axe.utils.getCoordinatesFromRect(rect);

		assert.isDefined(actual);
		assert.hasAllKeys(actual, ['x', 'y']);
		assert.equal(actual.x, 225);
		assert.equal(actual.y, 225);
	});
});
