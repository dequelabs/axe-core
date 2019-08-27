describe('unique-frame-title', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
	var queryFixture = axe.testUtils.queryFixture;
	var check = checks['unique-frame-title'];
	var checkContext = axe.testUtils.MockCheckContext();
	var options = {};

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
		axe._tree = undefined;
	});

	afterEach(function() {
		checkContext.reset();
	});

	it('returns undefined for `iframe` with no accessible name (no name after unicode and space characters are removed)', function() {
		var vNode = queryFixture(
			'<iframe id="target" title=" ☀️ " src="../integration/rules/frame-title-unique/frames/page-one.html"> </iframe>'
		);
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isUndefined(actual);
		assert.isNull(checkContext._data);
	});

	it('returns true and sets `after` data when `iframe` has accessible name', function() {
		var vNode = queryFixture(
			'<iframe id="target" title="I am unique" src="../integration/rules/frame-title-unique/frames/page-one.html"> </iframe>'
		);
		var actual = check.evaluate.call(
			checkContext,
			vNode.actualNode,
			options,
			vNode
		);
		assert.isTrue(actual);
		assert.hasAllKeys(checkContext._data, [
			'name',
			'parsedResource',
			'resourceFrameTitle'
		]);
		assert.equal(checkContext._data.name, 'i am unique'.toLowerCase());
		assert.equal(checkContext._data.parsedResource.pathname, 'page-one.html');
	});

	(shadowSupported ? it : xit)(
		'returns true and sets `after` data when `iframe` has accessible name (in shadowDOM)',
		function() {
			var params = shadowCheckSetup(
				'<div id="shadow"></div>',
				'<iframe id="target" aria-label="I am inside shadowDOM" src="../integration/rules/frame-title-unique/frames/page-one.html"> </iframe>'
			);
			var actual = check.evaluate.apply(checkContext, params);
			assert.isTrue(actual);
			assert.hasAllKeys(checkContext._data, [
				'name',
				'parsedResource',
				'resourceFrameTitle'
			]);
			assert.equal(
				checkContext._data.name,
				'i am inside shadowdom'.toLowerCase()
			);
			assert.equal(checkContext._data.parsedResource.pathname, 'page-one.html');
		}
	);
});
