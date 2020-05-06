describe('non-empty-value', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true if an value is present', function() {
		var params = checkSetup('<input id="target" value="woohoo" />', {
			attribute: 'value'
		});

		assert.isTrue(checks['non-empty-value'].evaluate.apply(null, params));
	});

	it('should return false if an value is not present', function() {
		var params = checkSetup('<input id="target" />', { attribute: 'value' });

		assert.isFalse(checks['non-empty-value'].evaluate.apply(null, params));
	});

	it('should return false if an value is present, but empty', function() {
		var params = checkSetup('<input id="target" value=" " />', {
			attribute: 'value'
		});

		assert.isFalse(checks['non-empty-value'].evaluate.apply(null, params));
	});

	it('should collapse whitespace', function() {
		var params = checkSetup(
			'<input id="target" value=" \t \n \r \t  \t\r\n " />',
			{ attribute: 'value' }
		);

		assert.isFalse(checks['non-empty-value'].evaluate.apply(null, params));
	});
});
