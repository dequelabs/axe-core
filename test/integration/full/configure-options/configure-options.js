describe('Check Configure Options', function() {
	'use strict';

	var target = document.querySelector('#target');

	describe('aria-allowed-attr', function() {
		it('should allow an attribute supplied in options', function(done) {
			target.setAttribute('role', 'separator');
			target.setAttribute('aria-valuenow', '0');

			axe.configure({
				checks: [{
					id: 'aria-allowed-attr',
					options: {'separator': ['aria-valuenow']}
				}]
			});
			axe.run(target, {
				runOnly: {
			    type: 'rule',
			    values: [ 'aria-allowed-attr' ]
			  }
			}, function(error, results) {
				assert.lengthOf(results.violations, 0, 'violations');
				done();
			});
		});
	});

	describe('aria-required-attr', function() {
		it('should report unique attributes when supplied from options', function(done) {
			target.setAttribute('role', 'slider');
			axe.configure({
				checks: [{
					id: 'aria-required-attr',
					options: {slider: ['aria-snuggles']}
				}]
			});
			axe.run('#target',  {
				runOnly: {
			    type: 'rule',
			    values: [ 'aria-required-attr' ]
			  }
			}, function(error, results) {
				assert.lengthOf(results.violations, 1, 'violations');
				assert.sameMembers(results.violations[0].nodes[0].any[0].data, ['aria-valuemax', 'aria-valuemin', 'aria-snuggles']);
				done();
			});
		});
	});
});
