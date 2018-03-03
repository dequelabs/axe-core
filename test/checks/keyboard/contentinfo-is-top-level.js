describe('contentinfo-is-top-level', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	var checkSetup = axe.testUtils.checkSetup;
	var shadowSupported = axe.testUtils.shadowSupport.v1;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if contentinfo landmark is in main element', function() {
		var main = document.createElement('main');
		var contentinfo = document.createElement('div');
		contentinfo.setAttribute('role','contentinfo');
		main.appendChild(contentinfo);
		fixture.appendChild(main);
		assert.isFalse(checks['contentinfo-is-top-level'].evaluate(contentinfo));
	});

	it('should return false if contentinfo landmark is in main element', function () {
		var main = document.createElement('main');
		var contentinfo = document.createElement('div');
		contentinfo.setAttribute('role','contentinfo');
		main.appendChild(contentinfo);
		fixture.appendChild(main);
		assert.isFalse(checks['contentinfo-is-top-level'].evaluate(contentinfo));
	});

	it('should return false if contentinfo landmark is in div with role main', function () {
		var main = document.createElement('div');
		main.setAttribute('role','main');
		var contentinfo = document.createElement('div');
		contentinfo.setAttribute('role','contentinfo');
		main.appendChild(contentinfo);
		fixture.appendChild(main);
		assert.isFalse(checks['contentinfo-is-top-level'].evaluate(contentinfo));
	});

	it('should return false if footer is not sectioning element and in div with role search', function () {
		var search = document.createElement('div');
		search.setAttribute('role','search');
		var contentinfo = document.createElement('footer');
		search.appendChild(contentinfo);
		fixture.appendChild(search);
		assert.isFalse(checks['contentinfo-is-top-level'].evaluate(contentinfo));
	});


	it('should return true if contentinfo landmark is not contained in another landmark', function () {
		var contentinfo = document.createElement('div');
		contentinfo.setAttribute('role','contentinfo');
		fixture.appendChild(contentinfo);
		assert.isTrue(checks['contentinfo-is-top-level'].evaluate(contentinfo));
	});

	it('should return true if footer element is not sectioning element and not contained in landmark', function () {
		var footer = document.createElement('footer');
		fixture.appendChild(footer);
		assert.isTrue(checks['contentinfo-is-top-level'].evaluate(footer));
	});

	it('should return true if footer element is in sectioning element', function () {
		var footer = document.createElement('footer');
		var article = document.createElement('div');
		article.setAttribute('role', 'main');
		article.appendChild(footer);
		fixture.appendChild(article);
		assert.isTrue(checks['contentinfo-is-top-level'].evaluate(footer));
	});

	(shadowSupported ? it : xit)('should test if contentinfo in shadow DOM is top level', function () {
		var div = document.createElement('div');
		var shadow = div.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<div role="contentinfo">contentinfo landmark</div>';
		var checkArgs = checkSetup(shadow.querySelector('[role=contentinfo], footer'));
		assert.isTrue(checks['contentinfo-is-top-level'].evaluate.apply(null, checkArgs));
	});

	(shadowSupported ? it : xit)('should test if footer in shadow DOM is top level', function () {
		var div = document.createElement('div');
		var shadow = div.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<footer>contentinfo landmark</footer>';
		var checkArgs = checkSetup(shadow.querySelector('[role=contentinfo], footer'));
		assert.isTrue(checks['contentinfo-is-top-level'].evaluate.apply(null, checkArgs));
	});

});
