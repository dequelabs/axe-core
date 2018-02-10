describe('aria-errormessage', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return false if aria-errormessage value is invalid', function () {
		var testHTML = '<div></div>';
		testHTML += '<div id="plain"></div>';
		fixture.innerHTML = testHTML;
		var target = fixture.children[0];
		target.setAttribute('aria-errormessage', 'plain');
		assert.isFalse(checks['aria-errormessage'].evaluate.call(checkContext, target));
	});

	it('should return true if aria-errormessage id is alert', function () {
		var testHTML = '<div></div>';
		testHTML += '<div id="alert" role="alert"></div>';
		fixture.innerHTML = testHTML;
		var target = fixture.children[0];
		target.setAttribute('aria-errormessage', 'alert');
		assert.isTrue(checks['aria-errormessage'].evaluate.call(checkContext, target));
	});

	it('should return true if aria-errormessage id is aria-live=assertive', function () {
		var testHTML = '<div></div>';
		testHTML += '<div id="live" aria-live="assertive"></div>';
		fixture.innerHTML = testHTML;
		var target = fixture.children[0];
		target.setAttribute('aria-errormessage', 'live');
		assert.isTrue(checks['aria-errormessage'].evaluate.call(checkContext, target));
	});

	it('should return true if aria-errormessage id is aria-describedby', function () {
		var testHTML = '<div></div>';
		testHTML += '<div id="plain"></div>';
		fixture.innerHTML = testHTML;
		var target = fixture.children[0];
		target.setAttribute('aria-errormessage', 'plain');
		target.setAttribute('aria-describedby', 'plain');
		assert.isTrue(checks['aria-errormessage'].evaluate.call(checkContext, target));
	});
});
