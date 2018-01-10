describe('banner-is-top-level', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	var checkSetup = axe.testUtils.checkSetup;
	var shadowSupported = axe.testUtils.shadowSupport.v1;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if banner landmark is in main element', function() {
		var main = document.createElement('main');
		var banner = document.createElement('div');
		banner.setAttribute('role','banner');
		main.appendChild(banner);
		fixture.appendChild(main);
		assert.isFalse(checks['banner-is-top-level'].evaluate(banner));
	});

	it('should return false if banner landmark is in main element', function () {
		var main = document.createElement('main');
		var banner = document.createElement('div');
		banner.setAttribute('role','banner');
		main.appendChild(banner);
		fixture.appendChild(main);
		assert.isFalse(checks['banner-is-top-level'].evaluate(banner));
	});

	it('should return false if banner landmark is in div with role main', function () {
		var main = document.createElement('div');
		main.setAttribute('role','main');
		var banner = document.createElement('div');
		banner.setAttribute('role','banner');
		main.appendChild(banner);
		fixture.appendChild(main);
		assert.isFalse(checks['banner-is-top-level'].evaluate(banner));
	});

	it('should return false if header is not sectioning element and in div with role search', function () {
		var search = document.createElement('div');
		search.setAttribute('role','search');
		var banner = document.createElement('header');
		search.appendChild(banner);
		fixture.appendChild(search);
		assert.isFalse(checks['banner-is-top-level'].evaluate(banner));
	});


	it('should return true if banner landmark is not contained in another landmark', function () {
		var banner = document.createElement('div');
		banner.setAttribute('role','banner');
		fixture.appendChild(banner);
		assert.isTrue(checks['banner-is-top-level'].evaluate(banner));
	});

	it('should return true if header element is not sectioning element and not contained in landmark', function () {
		var header = document.createElement('header');
		fixture.appendChild(header);
		assert.isTrue(checks['banner-is-top-level'].evaluate(header));
	});

	it('should return true if header element is in sectioning element', function () {
		var header = document.createElement('header');
		var article = document.createElement('div');
		article.setAttribute('role', 'main');
		article.appendChild(header);
		fixture.appendChild(article);
		assert.isTrue(checks['banner-is-top-level'].evaluate(header));
	});

	(shadowSupported ? it : xit)('should test if banner in shadow DOM is top level', function () {
		var div = document.createElement('div');
		var shadow = div.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<div role="banner">Banner landmark</div>';
		var checkArgs = checkSetup(shadow.querySelector('[role=banner], header'));
		assert.isTrue(checks['banner-is-top-level'].evaluate.apply(null, checkArgs));
	});

	(shadowSupported ? it : xit)('should test if header in shadow DOM is top level', function () {
		var div = document.createElement('div');
		var shadow = div.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<header>Banner landmark</header>';
		var checkArgs = checkSetup(shadow.querySelector('[role=banner], header'));
		assert.isTrue(checks['banner-is-top-level'].evaluate.apply(null, checkArgs));
	});

});
