describe('dqre.run', function () {
	'use strict';

	function createFrames(num, callback) {
		var frame,
			loaded = 0;

		function onLoad() {
			loaded++;
			if (loaded >= num) {
				callback();
			}
		}

		for (var i = 0; i < num-1; i++) {
			frame = document.createElement('frame');
			frame.src = '../mock/frames/e2e.html';

			frame.addEventListener('load', onLoad);
			fixture.appendChild(frame);

		}
		frame = document.createElement('frame');
		frame.src = '../mock/frames/nocode.html';
		frame.addEventListener('load', onLoad);
		fixture.appendChild(frame);
	}

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
		dqre.audit = null;
	});

	it('should throw if no audit is configured', function () {

		assert.throws(function () {
			dqre.run(document);
		}, Error, /^No audit configured/);
	});

	it('should work', function (done) {
		dqre.configure(window.mockAudit);

		createFrames(2, function () {
			dqre.run(document, function (result) {
				console.log(result);
				done();
			});

		});
	});
});