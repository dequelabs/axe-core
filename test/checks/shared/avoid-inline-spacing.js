describe('avoid-inline-spacing tests', function() {
	'use strict';

	var checkContext = axe.testUtils.MockCheckContext();
	var origCheck = checks['avoid-inline-spacing'];
	var dynamicDoc = document.implementation.createHTMLDocument('ie is dumb');

	afterEach(function() {
		checks['avoid-inline-spacing'] = origCheck;
		checkContext.reset();
	});

	var stylesheetData = {
		hasNoSpacingStyles: 'body { font-size: inherit; }',
		hasSpacingStyleThatDoNotOverride: 'html { word-spacing: 1.5 }',
		hasSpacingStyleThatOverride: 'body { letter-spacing: 10px !important;  }',
		hasOneOfManySpacingStyleThatOverride:
			'body { line-height: 1.2; letter-spacing: 10px !important; }'
	};

	function getSheet(data) {
		const style = dynamicDoc.createElement('style');
		style.type = 'text/css';
		style.appendChild(dynamicDoc.createTextNode(data));
		dynamicDoc.head.appendChild(style);
		return style.sheet;
	}

	it('returns `invoked` to ensure the check `avoid-inline-spacing` is called ', function() {
		checks['avoid-inline-spacing'] = {
			evaluate: function() {
				return 'invoked';
			}
		};
		var actual = checks['avoid-inline-spacing'].evaluate.call(
			checkContext,
			document
		);
		assert.equal(actual, 'invoked');
	});

	it('returns undefined (NEEDS REVIEW) if CSSOM is not passed to check context', function() {
		var actual = checks['avoid-inline-spacing'].evaluate.call(
			checkContext,
			document
		);
		assert.isUndefined(actual);
	});

	it('returns undefined if CSSOM is empty', function() {
		var actual = checks['avoid-inline-spacing'].evaluate.call(
			checkContext,
			document,
			{},
			undefined,
			{
				cssom: []
			}
		);
		assert.isUndefined(actual);
	});

	it('returns true if CSSOM has no inline spacing styles', function() {
		var context = {
			cssom: [
				{
					shadowId: 'a1b2c3',
					sheet: getSheet(stylesheetData.hasNoSpacingStyles)
				}
			]
		};
		var actual = checks['avoid-inline-spacing'].evaluate.call(
			checkContext,
			document,
			{},
			undefined,
			context
		);
		assert.isTrue(actual);
	});

	it('returns true if CSSOM has inline spacing styles that do not override', function() {
		var context = {
			cssom: [
				{
					shadowId: 'a1b2c3',
					sheet: getSheet(stylesheetData.hasSpacingStyleThatDoNotOverride)
				}
			]
		};
		var actual = checks['avoid-inline-spacing'].evaluate.call(
			checkContext,
			document,
			{},
			undefined,
			context
		);
		assert.isTrue(actual);
	});

	it('returns false if CSSOM has inline spacing styles that override', function() {
		var context = {
			cssom: [
				{
					shadowId: 'a1b2c3',
					sheet: getSheet(stylesheetData.hasSpacingStyleThatOverride)
				}
			]
		};
		var actual = checks['avoid-inline-spacing'].evaluate.call(
			checkContext,
			document,
			{},
			undefined,
			context
		);
		assert.isFalse(actual);
	});

	it('returns false if CSSOM has multiple inline spacing styles that override', function() {
		var context = {
			cssom: [
				{
					shadowId: 'a1b2c3',
					sheet: getSheet(stylesheetData.hasOneOfManySpacingStyleThatOverride)
				}
			]
		};
		var actual = checks['avoid-inline-spacing'].evaluate.call(
			checkContext,
			document,
			{},
			undefined,
			context
		);
		assert.isFalse(actual);
	});
});
