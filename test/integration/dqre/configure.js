
describe('dqre.configure', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	describe('example asserts', function () {

		var rules;
		before(function (done) {
			dqre.configure(mockAudit);

			var frame = document.createElement('iframe');
			frame.addEventListener('load', function () {
				dqre.run(document, function (datas) {
					rules = datas;
					done();
				});
			}, false);
			frame.src = '../mock/frames/e2e.html';
			fixture.appendChild(frame);
		});

		it('should be accessible', function () {

			rules.forEach(function (rule) {
					rule.details.forEach(function (check) {
								assert.ok(false, rule.id);

					});
			});

		});
	});
});