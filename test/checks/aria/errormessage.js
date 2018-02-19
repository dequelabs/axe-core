describe('aria-errormessage', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
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

	(shadowSupported ? it : xit)
	('should return false if aria-errormessage value crosses shadow boundary', function () {
		var params = shadowCheckSetup(
			'<div id="target" aria-errormessage="live"></div>',
			'<div id="live" aria-live="assertive"></div>'
		);
		assert.isFalse(checks['aria-errormessage'].evaluate.apply(checkContext, params));
	});

	(shadowSupported ? it : xit)
	('should return true if aria-errormessage and value are inside shadow dom', function () {
		var params = shadowCheckSetup(
			'<div></div>',
			'<div id="target" aria-errormessage="live"</div>' +
			'<div id="live" aria-live="assertive"></div>'
		);
		assert.isTrue(checks['aria-errormessage'].evaluate.apply(checkContext, params));
	});
});
