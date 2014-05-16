//@todo better coverage
describe('dom.getElementCoordinates', function () {
	'use strict';

	function iframeReady(iframe, cb) {
		var doc = iframe.contentDocument;
		if (!doc || (doc && doc.readyState !== 'complete')) {
			iframe.addEventListener('load', function () {
				cb(this.contentWindow);
			});
		} else {
			cb(iframe.contentWindow);
		}
	}

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should calculate bounding box based on element position', function () {
		var el, coords;

		fixture.innerHTML = '<div id="div" style="position: absolute; top: -1px; left: -1px;">' +
			'<span id="coords0" style="position:absolute; top: -999px; left: -999px; width: 1000px; height: 1000px;">' +
				'Absolute</span>' +
			'</div>';

		el = document.getElementById('coords0');
		coords = kslib.dom.getElementCoordinates(el);
		assert.equal(coords.left, -1000);
		assert.equal(coords.top, -1000);
		assert.equal(coords.width, 1000);
		assert.equal(coords.height, 1000);
		assert.equal(coords.right, 0);
		assert.equal(coords.bottom, 0);

		el = document.getElementById('div');
		coords = kslib.dom.getElementCoordinates(el);
		assert.equal(Math.floor(coords.left), -1);
		assert.equal(Math.floor(coords.top), -1);
	});

	it('should take into account scroll offsets', function () {
		var el, coords,
			offset = kslib.dom.getScrollOffset(window.document);

		fixture.innerHTML = '<div id="div" style="position: absolute; top: -1px; left: -1px;">' +
			'<span id="coords0" style="position:absolute; top: -999px; left: -999px; width: 1000px; height: 1000px;">' +
				'Absolute</span>' +
			'</div>';

		el = document.getElementById('coords0');
		coords = kslib.dom.getElementCoordinates(el);
		assert.equal(coords.left, -1000);
		assert.equal(coords.top, -1000);
		assert.equal(coords.width, 1000);
		assert.equal(coords.height, 1000);
		assert.equal(coords.right, 0);
		assert.equal(coords.bottom, 0);

		window.scrollTo(0, 150);
		coords = kslib.dom.getElementCoordinates(el);
		assert.equal(coords.left, -1000);
		assert.equal(coords.top, -1000);
		assert.equal(coords.width, 1000);
		assert.equal(coords.height, 1000);
		assert.equal(coords.right, 0);
		assert.equal(coords.bottom, 0);

		window.scrollTo(offset.left, offset.top);

	});

	describe('iframes', function () {
		it('should include frame\'s offset', function (done) {
			var iframe = document.createElement('iframe');
			iframe.src = '../fixtures/iframe1.html';

			// set absolute position so we can properly calculate offsets
			iframe.style.position = 'absolute';
			iframe.style.top = 0;
			iframe.style.left = 0;
			iframe.style.height = '50px';
			iframe.style.width = '150px';

			iframeReady(iframe, function (win) {
				var nestedIframe = win.document.getElementsByTagName('iframe')[0];
				iframeReady(nestedIframe, function (win2) {
					var target = win2.document.getElementById('target'),
						result = kslib.dom.getElementCoordinates(target, true);

					assert.equal(result.top, 20);
					assert.equal(result.left, 20);
					assert.equal(result.bottom, 40);
					assert.equal(result.right, 120);
					assert.equal(result.width, 100);
					assert.equal(result.height, 20);
					done();
				});
			});

			fixture.appendChild(iframe);

		});

		it('should calculate the frame\'s scrollOffset', function (done) {
			var iframe = document.createElement('iframe');

			iframe.src = '../fixtures/iframe1.html';

			// set absolute position so we can properly calculate offsets
			iframe.style.position = 'absolute';
			iframe.style.top = 0;
			iframe.style.left = 0;
			iframe.style.height = '50px';
			iframe.style.width = '150px';

			iframeReady(iframe, function (win) {
				win.scrollTo(0, 100);

				var nestedIframe = win.document.getElementsByTagName('iframe')[0];
				iframeReady(nestedIframe, function (win2) {

					win2.scrollTo(0, 150);

					var target = win2.document.getElementById('target'),
						result = kslib.dom.getElementCoordinates(target, true);

					assert.equal(result.top, 20);
					assert.equal(result.left, 20);
					assert.equal(result.bottom, 40);
					assert.equal(result.right, 120);
					assert.equal(result.width, 100);
					assert.equal(result.height, 20);

					done();
				});
			});

			fixture.appendChild(iframe);

		});
	});
});
