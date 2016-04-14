describe('axe.utils.aggregateResult', function () {
	var orig, results,
	_results = [{
		id: 'gimmeLabel',
		helpUrl: 'things',
		description: 'something nifty',
		tags: ['tag1'],
		result: 'passed',
		violations: [],
		passes: [{
			result: 'passed',
			any: [{
				result: true,
				data: 'minkey'
			}],
			all: [],
			none: [],
			node: {
				selector: ['minkey'],
				frames: [],
				source: '<minkey>chimp</minky>'
			}
		}]
	}, {
		id: 'bypass',
		description: 'something even more nifty',
		tags: ['tag3'],
		impact: 'monkeys',
		result: 'failed',
		passes: [],
		violations: [{
			result: 'failed',
			impact: 'monkeys',
			none: [{
				data: 'foon',
				impact: 'monkeys',
				result: true
			}],
			any: [],
			all: [],
			node: {
				selector: ['foon'],
				source: '<foon>telephone</foon>'
			}
		}]
	}, {
		id: 'idkStuff',
		description: 'something more nifty',
		pageLevel: true,
		result: 'failed',
		impact: 'cats',
		tags: ['tag2'],
		passes: [{
			result: 'passed',
			any: [{
				result: true,
				data: 'minkey'
			}],
			all: [],
			none: [],
			node: {
				selector: ['minkey'],
				frames: [],
				source: '<minkey>chimp</minky>'
			}
		}],
		violations: [{
			result: 'failed',
			all: [{
				result: false,
				data: 'pillock',
				impact: 'cats'
			}],
			any: [],
			none: [],
			node: {
				selector: ['q', 'r', 'pillock'],
				source: '<pillock>george bush</pillock>'
			},
			impact: 'cats'
		}],
		cantTell: [{
			result: 'cantTell',
			any: [{
				result: 0,
				data: 'minkey'
			}],
			all: [],
			none: [],
			node: {
				selector: ['minkey'],
				frames: [],
				source: '<minkey>chimp</minky>'
			}
		}]
	}, {
		id: 'blinky',
		description: 'something awesome',
		tags: ['tag4'],
		violations: [],
		result: 'inapplicable',
		passes: [{
			result: 'passed',
			any: [{
				shouldIBeHere: 'no, this should be inapplicable!',
				result: true,
				data: 'minkey'
			}],
			all: [],
			none: [],
			node: {
				selector: ['minkey'],
				frames: [],
				source: '<minkey>chimp</minky>'
			}
		}],
		violations: [],
		cantTell: []
	}];

	beforeEach(function() {
		results = JSON.parse(JSON.stringify(_results));
	});

	it('creates an object with arrays as properties for each result', function () {
		var resultObject = axe.utils.aggregateResult(results);

		assert.isArray(resultObject.passes);
		assert.isArray(resultObject.violations);
		assert.isArray(resultObject.cantTell);
		assert.isArray(resultObject.inapplicable);
	});

	it('copies failures and passes to their respective arrays on the result object', function () {
		// insert 1 pass and 1 fail
		var input = [results[0], results[1]];
		var resultObject = axe.utils.aggregateResult(input);

		assert.lengthOf(resultObject.passes, 1);
		assert.lengthOf(resultObject.violations, 1);
		assert.lengthOf(resultObject.cantTell, 0);
		assert.lengthOf(resultObject.inapplicable, 0);

		// Objects are the same
		assert.deepEqual(resultObject.passes[0], input[0]);
		assert.deepEqual(resultObject.violations[0], input[1]);

		// Object is a copy
		assert.notEqual(resultObject.passes[0], input[0]);
		assert.notEqual(resultObject.violations[0], input[1]);
	});

	it('creates a duplicate of the result for each outcome it has', function () {
		// insert 1 fail, containing a pass, a fail and a cantTell result
		var input = [results[2]];
		var resultObject = axe.utils.aggregateResult(input);

		assert.lengthOf(resultObject.passes, 1);
		assert.lengthOf(resultObject.violations, 1);
		assert.lengthOf(resultObject.cantTell, 1);
		assert.lengthOf(resultObject.inapplicable, 0);

		// Objects are the same
		assert.deepEqual(resultObject.passes[0], input[0]);
		assert.deepEqual(resultObject.violations[0], input[0]);
		assert.deepEqual(resultObject.cantTell[0], input[0]);

		// Object is a copy
		assert.notEqual(resultObject.passes[0], resultObject.violations[0]);
		assert.notEqual(resultObject.passes[0], resultObject.cantTell[0]);
		assert.notEqual(resultObject.violations[0], resultObject.cantTell[0]);
	});

	it('moves inapplicable results only to the inapplicable array', function () {
		// insert 1 fail, containing a pass, a fail and a cantTell result
		var input = [results[3]];
		var resultObject = axe.utils.aggregateResult(input);

		assert.lengthOf(resultObject.passes, 0);
		assert.lengthOf(resultObject.violations, 0);
		assert.lengthOf(resultObject.cantTell, 0);
		assert.lengthOf(resultObject.inapplicable, 1);

		assert.deepEqual(resultObject.inapplicable[0], input[0]);
	});

});