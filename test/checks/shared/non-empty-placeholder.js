describe('non-empty-placeholder', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var checkEvaluate = axe.testUtils.getCheckEvaluate('non-empty-placeholder');

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true if a placeholder is present', function() {
		var params = checkSetup('<input id="target" placeholder="woohoo" />');

		assert.isTrue(checkEvaluate.apply(null, params));
	});

	it('should return false if a placeholder is not present', function() {
		var params = checkSetup('<input id="target" />');

		assert.isFalse(checkEvaluate.apply(null, params));
	});

	it('should return false if a placeholder is present, but empty', function() {
		var params = checkSetup('<input id="target" placeholder=" " />');

		assert.isFalse(checkEvaluate.apply(null, params));
	});

	it('should collapse whitespace', function() {
		var params = checkSetup(
			'<input id="target" placeholder=" \t \n \r \t  \t\r\n " />'
		);

		assert.isFalse(checkEvaluate.apply(null, params));
	});
});
