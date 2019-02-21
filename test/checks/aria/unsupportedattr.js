describe('unsupportedattr', function() {
	'use strict';

	var checkContext = axe.testUtils.MockCheckContext();
	var checkSetup = axe.testUtils.checkSetup;
	var check = checks['aria-unsupported-attr'];

	afterEach(function() {
		checkContext.reset();
	});

	it('should return true if applied to an unsupported attribute', function() {
		axe.commons.aria.lookupTable.attributes['aria-mccheddarton'] = {
			unsupported: true
		};
		var params = checkSetup(
			'<div id="target" aria-mccheddarton="true">Contents</div>'
		);
		assert.isTrue(check.evaluate.apply(checkContext, params));
	});

	it('should return true with multiple unsupported and supported attributes', function() {
		axe.commons.aria.lookupTable.attributes['aria-mccheddarton'] = {
			unsupported: true
		};
		axe.commons.aria.lookupTable.attributes['aria-bagleypants'] = {
			unsupported: true
		};
		var params = checkSetup(
			'<div id="target" aria-mccheddarton="true" aria-bagleypants="false" aria-label="Nope">Contents</div>'
		);
		assert.isTrue(check.evaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._data, [
			'aria-mccheddarton',
			'aria-bagleypants'
		]);
	});

	it('should return false if applied to a supported attribute', function() {
		var params = checkSetup(
			'<div id="target" aria-label="This is fine">Contents</div>'
		);
		assert.isFalse(check.evaluate.apply(checkContext, params));
	});

	it('should return false if all ARIA attributes are supported', function() {
		var params = checkSetup(
			'<div id="target" aria-label="This is fine" aria-haspopup="true">Contents</div>'
		);
		assert.isFalse(check.evaluate.apply(checkContext, params));
	});
});
