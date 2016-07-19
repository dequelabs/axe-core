
describe('helpers.failureSummary', function() {
	'use strict';
	before(function() {
		axe._load({
			messages: {},
			rules: [],
			data: {
				failureSummaries: {
					none: {
						failureMessage: function anonymous(it) {
							var out = 'Fix all of the following: \n';
							var arr1 = it;
							if (arr1) {
								var value, i1 = -1,
									l1 = arr1.length - 1;
								while (i1 < l1) {
									value = arr1[i1 += 1];
									out += ' ' + value + '\n';
								}
							}
							return out;
						}
					},
					all: {
						failureMessage: function anonymous() {
							throw new Error('shouldnt be executed');
						}
					},
					any: {
						failureMessage: function anonymous(it) {
							var out = 'Fix any of the following: \n';
							var arr1 = it;
							if (arr1) {
								var value, i1 = -1,
									l1 = arr1.length - 1;
								while (i1 < l1) {
									value = arr1[i1 += 1];
									out += ' ' + value + '\n';
								}
							}
							return out;
						}
					}
				}
			}
		});
	});

	it('should concatenate none and all', function() {
		var summary = helpers.failureSummary({
			result: 'failed',
			any: [],
			all: [{
				id: '3',
				message: '3'
			}],
			none: [{
				id: '1',
				message: '1'
			}, {
				id: '2',
				message: '2'
			}]
		});

		assert.equal(summary, 'Fix all of the following: \n 1\n 2\n 3\n');
	});

	it('should return a list of ANYs if none return true', function() {
		var summary = helpers.failureSummary({
			result: 'failed',
			any: [{
				id: '1',
				message: '1'
			}, {
				id: '2',
				message: '2'
			}, {
				id: '3',
				message: '3'
			}],
			none: [],
			all: []
		});

		assert.equal(summary, 'Fix any of the following: \n 1\n 2\n 3\n');
	});

	it('should concatenate anys', function() {
		var summary = helpers.failureSummary({
			result: 'failed',
			any: [{
				id: '1',
				message: '1'
			}, {
				id: '2',
				message: '2'
			}, {
				id: '3',
				message: '3'
			}],
			all: [],
			none: [{
				id: '4',
				message: '4'
			}]
		});

		assert.equal(summary, 'Fix all of the following: \n 4\n\n\nFix any of the following: \n 1\n 2\n 3\n');

	});


});
