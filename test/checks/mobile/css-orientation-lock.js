describe('css-orientation-lock tests', function() {
	'use strict';

	var checkContext = axe.testUtils.MockCheckContext();
	var origCheck = checks['css-orientation-lock'];
	var dynamicDoc = document.implementation.createHTMLDocument();

	afterEach(function() {
		checks['css-orientation-lock'] = origCheck;
		checkContext.reset();
	});

	var SHEET_DATA = {
		BODY_STYLE: 'body { color: inherit; }',
		MEDIA_STYLE_NON_ORIENTATION:
			'@media (min-width: 400px) { background-color: red; }',
		MEDIA_STYLE_ORIENTATION_EMPTY:
			'@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) {  }',
		MEDIA_STYLE_ORIENTATION_WITHOUT_TRANSFORM:
			'@media screen and (min-width: 1px) and (max-width: 2000px) and (orientation: portrait) { #mocha { color: red; } }',
		MEDIA_STYLE_ORIENTATION_WITH_TRANSFORM_NOT_ROTATE:
			'@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { #mocha { transform: translateX(10px); } }',
		MEDIA_STYLE_ORIENTATION_WITH_TRANSFORM_ROTATE_180:
			'@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { body { transform: rotate(180deg); } }',
		MEDIA_STYLE_ORIENTATION_WITH_TRANSFORM_ROTATE_90:
			'@media screen and (min-width: 1px) and (max-width: 3000px) and (orientation: landscape) { #mocha { transform: rotate(270deg); } }'
	};

	function getSheet(data) {
		const style = dynamicDoc.createElement('style');
		style.type = 'text/css';
		style.appendChild(dynamicDoc.createTextNode(data));
		dynamicDoc.head.appendChild(style);
		return style.sheet;
	}

	it('ensure that the check "css-orientation-lock" is invoked', function() {
		checks['css-orientation-lock'] = {
			evaluate: function() {
				return 'invoked';
			}
		};
		var actual = checks['css-orientation-lock'].evaluate.call(
			checkContext,
			document
		);
		assert.equal(actual, 'invoked');
	});

	it('returns undefined if context of check does not have CSSOM property', function() {
		var actual = checks['css-orientation-lock'].evaluate.call(
			checkContext,
			document
		);
		assert.isUndefined(actual);
	});

	it('returns undefined if CSSOM does not have any sheets', function() {
		// pass context with cssom as empty
		var actual = checks['css-orientation-lock'].evaluate.call(
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

	it('returns true if CSSOM does not have sheet or rule(s) in the sheet(s)', function() {
		// pass context with cssom but empty or no sheet
		var actual = checks['css-orientation-lock'].evaluate.call(
			checkContext,
			document,
			{},
			undefined,
			{
				cssom: [
					{
						shadowId: 'a',
						sheet: {} // empty sheet
					},
					{
						shadowId: 'a'
						// NO SHEET -> this should never happen, but testing for iteration exit in check
					}
				]
			}
		);
		assert.isTrue(actual);
	});

	it('returns true if there are no MEDIA rule(s) in the CSSOM stylesheets', function() {
		var sheet = getSheet(SHEET_DATA.BODY_STYLE);
		var actual = checks['css-orientation-lock'].evaluate.call(
			checkContext,
			document,
			{},
			undefined,
			{
				cssom: [
					{
						shadowId: 'a',
						sheet: sheet
					}
				]
			}
		);
		assert.isTrue(actual);
	});

	it('returns true if there are no ORIENTATION rule(s) within MEDIA rules in CSSOM stylesheets', function() {
		var actual = checks['css-orientation-lock'].evaluate.call(
			checkContext,
			document,
			{},
			undefined,
			{
				cssom: [
					{
						shadowId: undefined,
						sheet: getSheet(SHEET_DATA.BODY_STYLE)
					},
					{
						shadowId: 'a',
						sheet: getSheet(SHEET_DATA.MEDIA_STYLE_NON_ORIENTATION)
					}
				]
			}
		);
		assert.isTrue(actual);
	});

	it('returns true if no styles within any of the ORIENTATION rule(s)', function() {
		var actual = checks['css-orientation-lock'].evaluate.call(
			checkContext,
			document,
			{},
			undefined,
			{
				cssom: [
					{
						shadowId: undefined,
						sheet: getSheet(SHEET_DATA.BODY_STYLE)
					},
					{
						shadowId: 'a',
						sheet: getSheet(SHEET_DATA.MEDIA_STYLE_ORIENTATION_EMPTY)
					}
				]
			}
		);
		assert.isTrue(actual);
	});

	it('returns true if there is no TRANSFORM style within any of the ORIENTATION rule(s)', function() {
		var actual = checks['css-orientation-lock'].evaluate.call(
			checkContext,
			document,
			{},
			undefined,
			{
				cssom: [
					{
						shadowId: 'a',
						sheet: getSheet(
							SHEET_DATA.MEDIA_STYLE_ORIENTATION_WITHOUT_TRANSFORM
						)
					}
				]
			}
		);
		assert.isTrue(actual);
	});

	it('returns true if TRANSFORM style applied is not ROTATE', function() {
		var actual = checks['css-orientation-lock'].evaluate.call(
			checkContext,
			document,
			{},
			undefined,
			{
				cssom: [
					{
						shadowId: undefined,
						sheet: getSheet(
							SHEET_DATA.MEDIA_STYLE_ORIENTATION_WITH_TRANSFORM_NOT_ROTATE
						)
					}
				]
			}
		);
		assert.isTrue(actual);
	});

	it('returns true if TRANSFORM style applied is ROTATE, but is divisible by 180', function() {
		var actual = checks['css-orientation-lock'].evaluate.call(
			checkContext,
			document,
			{},
			undefined,
			{
				cssom: [
					{
						shadowId: 'a',
						root: document,
						sheet: getSheet(
							SHEET_DATA.MEDIA_STYLE_ORIENTATION_WITH_TRANSFORM_ROTATE_180
						)
					}
				]
			}
		);
		assert.isTrue(actual);
	});

	it('returns false if TRANSFORM style applied is ROTATE, and is divisible by 90 and not divisible by 180', function() {
		var actual = checks['css-orientation-lock'].evaluate.call(
			checkContext,
			document,
			{},
			undefined,
			{
				cssom: [
					{
						shadowId: undefined,
						root: document,
						sheet: getSheet(
							SHEET_DATA.MEDIA_STYLE_ORIENTATION_WITH_TRANSFORM_ROTATE_90
						)
					}
				]
			}
		);
		assert.isFalse(actual);
	});

	// Note:
	// external stylesheets is tested in integration tests
	// shadow DOM is tested in integration tests
});
