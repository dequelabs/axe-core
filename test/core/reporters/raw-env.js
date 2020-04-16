describe('reporters - raw-env', function() {
	'use strict';

	var fixture = document.getElementById('fixture');

	function createDqElement() {
		var node = document.createElement('div');
		fixture.appendChild(node);
		return new axe.utils.DqElement(node);
	}

	var mockResults;
	var orig;
	var rawResults;

	before(function() {
		mockResults = [
			{
				id: 'gimmeLabel',
				helpUrl: 'things',
				description: 'something nifty',
				tags: ['tag1'],
				result: 'passed',
				violations: [],
				passes: [
					{
						result: 'passed',
						any: [
							{
								result: true,
								data: 'minkey'
							}
						],
						all: [],
						none: [],
						node: createDqElement()
					}
				]
			},
			{
				id: 'idkStuff',
				description: 'something more nifty',
				pageLevel: true,
				result: 'failed',
				impact: 'cats',
				tags: ['tag2'],
				passes: [],
				violations: [
					{
						result: 'failed',
						all: [
							{
								result: false,
								data: 'pillock',
								impact: 'cats'
							}
						],
						any: [],
						none: [],
						node: createDqElement(),
						impact: 'cats'
					}
				]
			},
			{
				id: 'bypass',
				description: 'something even more nifty',
				tags: ['tag3'],
				impact: 'monkeys',
				result: 'failed',
				passes: [],
				violations: [
					{
						result: 'failed',
						impact: 'monkeys',
						none: [
							{
								data: 'foon',
								impact: 'monkeys',
								result: true
							}
						],
						any: [],
						all: [],
						node: createDqElement()
					}
				]
			},
			{
				id: 'blinky',
				description: 'something awesome',
				tags: ['tag4'],
				violations: [],
				result: 'passed',
				passes: [
					{
						result: 'passed',
						none: [
							{
								data: 'clueso',
								result: true
							}
						],
						node: createDqElement()
					}
				]
			}
		];

		axe.testUtils.fixtureSetup();

		axe._load({});
		orig = axe._runRules;
		axe._runRules = function(_, __, cb) {
			cb(mockResults, function noop() {});
		};
		axe.run({ reporter: 'raw' }, function(err, results) {
			if (err) {
				return {};
			}
			rawResults = results;
		});
	});

	after(function() {
		axe._runRules = orig;
		fixture.innerHTML = '';
	});

	it('should pass raw results and env object', function(done) {
		axe.run({ reporter: 'rawEnv' }, function(err, results) {
			if (err) {
				return done(err);
			}
			try {
				assert.deepEqual(results.raw, rawResults);
				assert.isNotNull(results.env);
				assert.isNotNull(results.env.url);
				assert.isNotNull(results.env.timestamp);
				assert.isNotNull(results.env.testEnvironement);
				assert.isNotNull(results.env.testRunner);
			} catch (err) {
				return done(err);
			}
			done();
		});
	});
});
