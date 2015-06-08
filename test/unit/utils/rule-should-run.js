
describe('utils.ruleShouldRun', function () {
	'use strict';

	it('should return false if rule.pageOnly and !context.page', function () {
		assert.isFalse(utils.ruleShouldRun({
			pageLevel: true
		}, {
			page: false
		}, {}));
	});

	it('should return false if rule.enabled is false, option.enabled is false and ruleID is not present runOnly', function () {
		assert.isFalse(utils.ruleShouldRun({
			id: 'bananas',
			enabled: false
		}, {}, {
			rules: {
				bananas: {
					enabled: false
				}
			},
			runOnly: {
				type: 'rule',
				values: ['apples']
			}
		}));
	});

	it('should return true if rule.enabled is false, option.enabled is false and ruleID is present in runOnly', function () {
		assert.isTrue(utils.ruleShouldRun({
			id: 'bananas',
			enabled: false
		}, {}, {
			rules: {
				bananas: {
					enabled: false
				}
			},
			runOnly: {
				type: 'rule',
				values: ['bananas']
			}
		}));
	});

	it('should return true if rule.enabled is false, option is undefined and ruleID is present in runOnly', function () {
		assert.isTrue(utils.ruleShouldRun({
			id: 'bananas',
			enabled: false
		}, {}, {
			runOnly: {
				type: 'rule',
				values: ['bananas']
			}
		}));
	});

	it('should return false even if enabled is set to true if ruleID is not present in runOnly', function () {
		assert.isFalse(utils.ruleShouldRun({
			id: 'bananas',
			enabled: true
		}, {}, {
			runOnly: {
				type: 'rule',
				values: ['apples']
			}
		}));
	});

	it('should return true if runOnly tags are present in rule definition', function () {
		assert.isTrue(utils.ruleShouldRun({
			id: 'bananas',
			enabled: false,
			tags: ['fruit']
		}, {}, {
			runOnly: {
				type: 'tag',
				values: ['fruit']
			}
		}));

	});

	it('should return false if runOnly tags are not present in rule definition', function () {
		assert.isFalse(utils.ruleShouldRun({
			id: 'bananas',
			enabled: true,
			tags: ['fruit']
		}, {}, {
			runOnly: {
				type: 'tag',
				values: ['meat']
			}
		}));

	});

	it('should return false if rule.enabled is false', function () {
		assert.isFalse(utils.ruleShouldRun({
			id: 'bananas',
			enabled: false,
			tags: ['fruit']
		}, {}, {}));

	});

	it('should return true if rule.enabled is true', function () {
		assert.isTrue(utils.ruleShouldRun({
			id: 'bananas',
			enabled: true,
			tags: ['fruit']
		}, {}, {}));

	});

	it('should return true if option is set to true but rule is set to false', function () {
		assert.isTrue(utils.ruleShouldRun({
			id: 'bananas',
			enabled: false
		}, {}, {
			rules: {
				bananas: {
					enabled: true
				}
			}
		}));

	});


	it('should return false if option is set to false but rule is set to true', function () {
		assert.isFalse(utils.ruleShouldRun({
			id: 'bananas',
			enabled: true
		}, {}, {
			rules: {
				bananas: {
					enabled: false
				}
			}
		}));

	});

});