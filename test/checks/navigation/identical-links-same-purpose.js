describe('identical-links-same-purpose tests', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var check = checks['identical-links-same-purpose'];
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('returns undefined when element does not have a resource (empty href)', function() {
		var vNode = queryFixture('<a id="target" href="">Go to google.com</a>');
		var actual = check.evaluate.call(checkContext, vNode.actualNode);
		assert.isUndefined(actual);
		assert.isNull(checkContext._data);
	});

	it('returns undefined when element does not have a resource (onclick does not change location)', function() {
		var vNode = queryFixture(
			'<span id="target" role="link" tabindex="0" onclick="return false;">Link text</span>'
		);
		var actual = check.evaluate.call(checkContext, vNode.actualNode);
		assert.isUndefined(actual);
		assert.isNull(checkContext._data);
	});

	it('returns true when element has location resource', function() {
		var vNode = queryFixture(
			'<a id="target" href="http://facebook.com">Follow us</a>'
		);
		var actual = check.evaluate.call(checkContext, vNode.actualNode);
		assert.isTrue(actual);
		assert.hasAllKeys(checkContext._data, ['accessibleText', 'linkResource']);
	});

	it('returns true when element has location resource', function() {
		var vNode = queryFixture(
			'<span id="target" role="link" tabindex="0" onclick="location=\'/pages/index.html\'">Link text</span>'
		);
		var actual = check.evaluate.call(checkContext, vNode.actualNode);
		assert.isTrue(actual);
		assert.hasAllKeys(checkContext._data, ['accessibleText', 'linkResource']);
	});

	describe('after', function() {
		it('sets results of check result to `undefined` if links do not serve identical purpose', function() {
			var checkResults = [
				{
					data: {
						accessibleText: 'follow us',
						linkResource: 'http://facebook.com'
					},
					result: true
				},
				{
					data: {
						accessibleText: 'follow us',
						linkResource: 'http://instagram.com'
					},
					result: true
				}
			];
			var results = check.after(checkResults);

			assert.lengthOf(results, 2);
			assert.isUndefined(results[0].result);
			assert.isUndefined(results[1].result);
		});

		it('sets results of check result to `true` if links serve identical purpose', function() {
			var checkResults = [
				{
					data: {
						accessibleText: 'follow us',
						linkResource: 'http://instagram.com/axe'
					},
					result: true
				},
				{
					data: {
						accessibleText: 'follow us',
						linkResource: 'http://instagram.com/axe'
					},
					result: true
				}
			];
			var results = check.after(checkResults);

			assert.lengthOf(results, 2);
			assert.isTrue(results[0].result);
			assert.isTrue(results[1].result);
		});
	});
});
