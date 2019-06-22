describe('filename-is-valid-accessible-name tests', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var checkContext = axe.testUtils.MockCheckContext();
	var check = checks['filename-is-valid-accessible-name'];

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('returns undefined when <img> element has accessible name which contains image extension', function() {
		var vNode = queryFixture(
			'<img id="target" src="https://www.w3.org/WAI/demos/bad/img/w3c" alt="w3c.png" />'
		);
		var actual = check.evaluate.call(checkContext, vNode.actualNode);
		assert.isUndefined(actual);
	});

	it('returns undefined when <input type=image> element has accessible name which contains image extension', function() {
		var vNode = queryFixture(
			'<input id="target" type="image" src="https://www.w3.org/WAI/demos/bad/before/img/top_weather.gif" alt="top_weather.gif" />'
		);
		var actual = check.evaluate.call(checkContext, vNode.actualNode);
		assert.isUndefined(actual);
	});

	it('returns true when <img> element has accessible name which uses the filename which describes the image', function() {
		var vNode = queryFixture(
			'<img id="target" src="https://www.w3.org/WAI/demos/bad/img/w3c" alt="w3c" />'
		);
		var actual = check.evaluate.call(checkContext, vNode.actualNode);
		assert.isTrue(actual);
	});

	it('returns true when <input type="image"> element has accessible name which uses the filename which describes the image', function() {
		var vNode = queryFixture(
			'<input id="target" type="image" src="w3c.png" alt="Logo of w3c"/>'
		);
		var actual = check.evaluate.call(checkContext, vNode.actualNode);
		assert.isTrue(actual);
	});
});
