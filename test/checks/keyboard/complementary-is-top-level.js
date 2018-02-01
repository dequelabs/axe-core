describe('complementary-is-top-level', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var checkSetup = axe.testUtils.checkSetup;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if complementary landmark is in another landmark', function () {
		var complementary = document.createElement('aside');
		var bannerDiv = document.createElement('div');
		bannerDiv.setAttribute('role','banner');
		bannerDiv.appendChild(complementary);
		fixture.appendChild(bannerDiv);
		assert.isFalse(checks['complementary-is-top-level'].evaluate(complementary));
	});

	it('should return false if div with role set to complementary is in another landmark', function () {
		var complementary = document.createElement('div');
		complementary.setAttribute('role','complementary');
		var navDiv = document.createElement('div');
		navDiv.setAttribute('role','navigation');
		navDiv.appendChild(complementary);
		fixture.appendChild(navDiv);
		assert.isFalse(checks['complementary-is-top-level'].evaluate(complementary));
	});

	it('should return true if complementary landmark is not in another landmark', function () {
		var complementary = document.createElement('aside');
		var bannerDiv = document.createElement('div');
		bannerDiv.setAttribute('role','banner');
		fixture.appendChild(bannerDiv);
		fixture.appendChild(complementary);
		assert.isTrue(checks['complementary-is-top-level'].evaluate(complementary));
	});

	it('should return true if div with role set to main is not in another landmark', function () {
		var complementary = document.createElement('div');
		complementary.setAttribute('role','complementary');
		var navDiv = document.createElement('div');
		navDiv.setAttribute('role','navigation');
		fixture.appendChild(navDiv);
		fixture.appendChild(complementary);
		assert.isTrue(checks['complementary-is-top-level'].evaluate(complementary));
	});

	(shadowSupported ? it : xit)('should test if complementary in shadow DOM is top level', function () {
		var div = document.createElement('div');
		var shadow = div.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<div role="complementary">complementary content</div>';
		var checkArgs = checkSetup(shadow.querySelector('[role=complementary]'));
		assert.isTrue(checks['complementary-is-top-level'].evaluate.apply(null, checkArgs));
	});

});
