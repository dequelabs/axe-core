describe('non-empty-alt', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true if an alt is present', function() {
		var params = checkSetup('<img id="target" alt="woohoo" />');
		assert.isTrue(
			axe.testUtils.getCheckEvaluate('non-empty-alt').apply(null, params)
		);
	});

	it('should return false if an alt is not present', function() {
		var params = checkSetup('<img id="target" />');
		assert.isFalse(
			axe.testUtils.getCheckEvaluate('non-empty-alt').apply(null, params)
		);
	});

	it('should return false if an alt is present, but empty', function() {
		var params = checkSetup('<img id="target" alt=" " />');
		assert.isFalse(
			axe.testUtils.getCheckEvaluate('non-empty-alt').apply(null, params)
		);
	});

	it('should collapse whitespace', function() {
		var params = checkSetup('<img id="target" alt=" \t \n \r \t  \t\r\n " />');
		assert.isFalse(
			axe.testUtils.getCheckEvaluate('non-empty-alt').apply(null, params)
		);
	});
});
