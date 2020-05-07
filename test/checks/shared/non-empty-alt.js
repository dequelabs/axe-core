describe('non-empty-alt', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true if an alt is present', function() {
		var params = checkSetup('<img id="target" alt="woohoo" />', {
			attribute: 'alt'
		});
		assert.isTrue(checks['non-empty-alt'].evaluate.apply(null, params));
	});

	it('should return false if an alt is not present', function() {
		var params = checkSetup('<img id="target" />', { attribute: 'alt' });
		assert.isFalse(checks['non-empty-alt'].evaluate.apply(null, params));
	});

	it('should return false if an alt is present, but empty', function() {
		var params = checkSetup('<img id="target" alt=" " />', {
			attribute: 'alt'
		});
		assert.isFalse(checks['non-empty-alt'].evaluate.apply(null, params));
	});

	it('should collapse whitespace', function() {
		var params = checkSetup('<img id="target" alt=" \t \n \r \t  \t\r\n " />', {
			attribute: 'alt'
		});
		assert.isFalse(checks['non-empty-alt'].evaluate.apply(null, params));
	});
});
