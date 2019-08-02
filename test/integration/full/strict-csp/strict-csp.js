// phantomjs requires running in non-strict csp
(window.PHANTOMJS ? describe.skip : describe)('strict-csp', function() {
	'use strict';

	it('should parse without errors', function() {
		assert.isDefined(window.axe), 'axe is not defined';
		assert.isDefined(window.axe.run, 'axe.run is not defined');
	});

	it('should run without errors', function(done) {
		axe.run('#fixture', function() {
			done();
		});
	});
});
