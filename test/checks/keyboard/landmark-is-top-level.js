describe('landmark-is-top-level', function() {
	'use strict';

	var fixture = document.getElementById('fixture');

	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var checkSetup = axe.testUtils.checkSetup;
	var check = checks['landmark-is-top-level'];
	var checkContext = new axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return false if the landmark is in another landmark', function() {
		var mainLandmark = document.createElement('main');
		var bannerDiv = document.createElement('div');
		bannerDiv.setAttribute('role', 'banner');
		bannerDiv.appendChild(mainLandmark);
		fixture.appendChild(bannerDiv);
		assert.isFalse(check.evaluate.call(checkContext, mainLandmark));
		assert.deepEqual(checkContext._data, { role: 'main' });
	});

	it('should return false if div with role set to main is in another landmark', function() {
		var mainDiv = document.createElement('div');
		mainDiv.setAttribute('role', 'main');
		var navDiv = document.createElement('div');
		navDiv.setAttribute('role', 'navigation');
		navDiv.appendChild(mainDiv);
		fixture.appendChild(navDiv);
		assert.isFalse(check.evaluate.call(checkContext, mainDiv));
		assert.deepEqual(checkContext._data, { role: 'main' });
	});

	it('should return true if the landmark is not in another landmark', function() {
		var footerLandmark = document.createElement('footer');
		var bannerDiv = document.createElement('div');
		bannerDiv.setAttribute('role', 'banner');
		fixture.appendChild(bannerDiv);
		fixture.appendChild(footerLandmark);
		assert.isTrue(check.evaluate.call(checkContext, footerLandmark));
		assert.deepEqual(checkContext._data, { role: 'contentinfo' });
	});

	it('should return true if div with role set to main is not in another landmark', function() {
		var mainDiv = document.createElement('div');
		mainDiv.setAttribute('role', 'main');
		var navDiv = document.createElement('div');
		navDiv.setAttribute('role', 'navigation');
		fixture.appendChild(navDiv);
		fixture.appendChild(mainDiv);
		assert.isTrue(check.evaluate.call(checkContext, mainDiv));
		assert.deepEqual(checkContext._data, { role: 'main' });
	});

	it('should return true if the landmark is in form landmark', function() {
		var bannerDiv = document.createElement('div');
		bannerDiv.setAttribute('role', 'banner');
		var formDiv = document.createElement('div');
		formDiv.setAttribute('role', 'form');
		fixture.appendChild(formDiv);
		fixture.appendChild(bannerDiv);
		assert.isTrue(check.evaluate.call(checkContext, bannerDiv));
		assert.deepEqual(checkContext._data, { role: 'banner' });
	});

	(shadowSupported ? it : xit)(
		'should test if the landmark in shadow DOM is top level',
		function() {
			var div = document.createElement('div');
			var shadow = div.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<main>Main content</main>';
			var checkArgs = checkSetup(shadow.querySelector('main'));
			assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
			assert.deepEqual(checkContext._data, { role: 'main' });
		}
	);
});
