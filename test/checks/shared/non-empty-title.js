describe('non-empty-title', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true if a title is present', function() {
		var params = checkSetup('<img id="target" title="woohoo" />', {
			attribute: 'title'
		});

		assert.isTrue(checks['non-empty-title'].evaluate.apply(null, params));
	});

	it('should return false if a title is not present', function() {
		var params = checkSetup('<img id="target" />', { attribute: 'title' });

		assert.isFalse(checks['non-empty-title'].evaluate.apply(null, params));
	});

	it('should return false if a title is present, but empty', function() {
		var params = checkSetup('<img id="target" title=" " />', {
			attribute: 'title'
		});

		assert.isFalse(checks['non-empty-title'].evaluate.apply(null, params));
	});

	it('should collapse whitespace', function() {
		var params = checkSetup(
			'<img id="target" title=" \t \n \r \t  \t\r\n " />',
			{ attribute: 'title' }
		);

		assert.isFalse(checks['non-empty-title'].evaluate.apply(null, params));
	});
});
