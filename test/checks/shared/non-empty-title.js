describe('non-empty-title', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var checkEvaluate = axe.testUtils.getCheckEvaluate('non-empty-title');

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true if a title is present', function() {
		var params = checkSetup('<img id="target" title="woohoo" />');

		assert.isTrue(checkEvaluate.apply(null, params));
	});

	it('should return false if a title is not present', function() {
		var params = checkSetup('<img id="target" />');

		assert.isFalse(checkEvaluate.apply(null, params));
	});

	it('should return false if a title is present, but empty', function() {
		var params = checkSetup('<img id="target" title=" " />');

		assert.isFalse(checkEvaluate.apply(null, params));
	});

	it('should collapse whitespace', function() {
		var params = checkSetup(
			'<img id="target" title=" \t \n \r \t  \t\r\n " />'
		);

		assert.isFalse(checkEvaluate.apply(null, params));
	});
});
