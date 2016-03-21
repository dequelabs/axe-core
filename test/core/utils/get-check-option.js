
describe('axe.utils.getCheckOption', function () {
	'use strict';

	it('should prefer options from rules', function () {
		assert.deepEqual(axe.utils.getCheckOption({
				id: 'bananas',
				enabled: 'fail',
				options: 'fail'
			}, 'monkeys', {
				rules: {
					monkeys: {
						checks: {
							bananas: {
								enabled: 'yes',
								options: 'please'
							}
						}
					}
				},
				checks: {
					bananas: {
						enabled: 'nope',
						options: 'jerk'
					}
				}
			}), {
				enabled: 'yes',
				options: 'please'
			});
	});
	it('should fallback to global check options if not defined on the rule', function () {
		assert.deepEqual(axe.utils.getCheckOption({
				id: 'bananas',
				enabled: 'fail',
				options: 'fail'
			}, 'monkeys', {
				rules: {
					monkeys: {
						checks: {
							bananas: {
								enabled: 'yes'
							}
						}
					}
				},
				checks: {
					bananas: {
						enabled: 'nope',
						options: 'please'
					}
				}
			}), {
				enabled: 'yes',
				options: 'please'
			});
	});

	it('should prefer fallback to global check options if not defined on the rule', function () {
		assert.deepEqual(axe.utils.getCheckOption({
				id: 'bananas',
				enabled: 'fail',
				options: 'fail'
			}, 'monkeys', {
				checks: {
					bananas: {
						enabled: 'yes',
						options: 'please'
					}
				}
			}), {
				enabled: 'yes',
				options: 'please'
			});
	});

	it('should otherwise use the check', function () {
		assert.deepEqual(axe.utils.getCheckOption({
				id: 'bananas',
				enabled: 'yes',
				options: 'please'
			}, 'monkeys', {}), {
				enabled: 'yes',
				options: 'please'
			});
	});

});