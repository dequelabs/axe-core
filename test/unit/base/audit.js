/*global Audit, DqDocument, mockRules */
describe('Audit', function () {
	'use strict';
	var a;

	var fixture = document.getElementById('fixture');

	beforeEach(function () {
		a = new Audit();
		mockRules.forEach(function (rule) {
			a.addRule(rule);
		});
	});
	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should be a function', function () {
		assert.isFunction(Audit);
	});

	describe('document', function () {
		it('should create a document based on the current window.document', function () {
			assert.deepEqual(new Audit({}).document, new DqDocument(document));
		});
	});

	describe('Audit#run', function () {
		it('should work', function (done) {
			fixture.innerHTML = '<input type="text" aria-label="monkeys">' +
				'<div id="monkeys">bananas</div>' +
				'<input type="text" aria-labelledby="monkeys">' +
				'<blink>FAIL ME</blink>';
			a.run({ include: [document] }, {}, function () {
				assert.ok('yay');
				done();
			});
		});
		it('should run all the rules', function (done) {
			fixture.innerHTML = '<input type="text" aria-label="monkeys">' +
				'<div id="monkeys">bananas</div>' +
				'<input type="text" aria-labelledby="monkeys">' +
				'<blink>FAIL ME</blink>';
			a.run({ include: [document] }, {}, function (results) {
				assert.equal(results.length, 7);
				done();
			});
		});
		it('should not run rules disabled by the options', function (done) {
			var options = [{id: 'bypass', enabled: false}];
			fixture.innerHTML = '<a href="#">link</a>';
			a.run({ include: [document] }, options, function (results) {
				assert.equal(results.length, 6);
				done();
			});
		});
		it('should call the rule\'s run function', function (done) {
			var targetRule = mockRules[mockRules.length - 1],
				rule = a.findRule(targetRule.id),
				called = false,
				orig;

			fixture.innerHTML = '<a href="#">link</a>';
			orig = rule.run;
			rule.run = function (node, options, callback) {
				called = true;
				callback({});
			};
			a.run({ include: [document] }, {}, function () {
				rule.run = orig;
				done();
			});
		});
		it('should pass the option to the run function', function (done) {
			var targetRule = mockRules[mockRules.length - 1],
				rule = a.findRule(targetRule.id),
				passed = false,
				orig, options;

			fixture.innerHTML = '<a href="#">link</a>';
			orig = rule.run;
			rule.run = function (node, options, callback) {
				assert.ok(options);
				assert.equal(options.id, targetRule.id);
				assert.equal(options.data, 'monkeys');
				passed = true;
				callback({});
			};
			options = [{id: targetRule.id, data: 'monkeys'}];
			a.run({ include: [document] }, options, function () {
				assert.ok(passed);
				rule.run = orig;
				done();
			});
		});
	});
	describe('Audit#findRule', function () {
		it('should return the rule object by its id', function () {
			var targetRule = mockRules[mockRules.length - 1],
				rule = a.findRule(targetRule.id);
			assert.ok(rule);
			assert.equal(rule.id, targetRule.id);
		});
		it('should return undefined if the id does not exist', function () {
			var rule = a.findRule('somefalseid');
			assert.equal(rule, undefined);
		});
	});
	describe('Audit#after', function () {
		it('should call the rule\'s after function', function (done) {
			var targetRule = mockRules[mockRules.length - 1],
				rule = a.findRule(targetRule.id),
				called = false,
				orig;
			fixture.innerHTML = '<input type="text" aria-label="monkeys">' +
				'<div id="monkeys">bananas</div>' +
				'<input type="text" aria-labelledby="monkeys">' +
				'<blink>FAIL ME</blink>';

			orig = rule.after;
			rule.after = function (node, options, ruleResult, callback) {
				called = true;
				callback(ruleResult);
			};
			a.run({ include: [document] }, {}, function (result) {
				a.after(document, {}, result, function () {
					assert.ok(called);
					rule.after = orig;
					done();
				});
			});
		});
		it('should pass the option to the after function', function (done) {
			var targetRule = mockRules[mockRules.length - 1],
				rule = a.findRule(targetRule.id),
				passed = false,
				orig,
				options;
			fixture.innerHTML = '<input type="text" aria-label="monkeys">' +
				'<div id="monkeys">bananas</div>' +
				'<input type="text" aria-labelledby="monkeys">' +
				'<blink>FAIL ME</blink>';

			orig = rule.after;
			options = [{id: targetRule.id, data: 'monkeys'}];
			rule.after = function (node, options, ruleResult, callback) {
				assert.ok(options);
				assert.equal(options.id, targetRule.id);
				assert.equal(options.data, 'monkeys');
				passed = true;
				callback(ruleResult);
			};
			a.run({ include: [document] }, options, function (result) {
				a.after(null, options, result, function () {
					assert.ok(passed);
					rule.after = orig;
					done();
				});
			});
		});
		it('should replace the FrameRuleResult object', function (done) {
			fixture.innerHTML = '<a href="#">link</a>';

			a.run({ include: [document] }, {}, function (result) {
				var rfr;
				result.forEach(function (r) {
					if (r.id === 'bypass') {
						rfr = r;
					}
				});
				a.after(null, {}, result, function () {
					var nrfr;
					result.forEach(function (r) {
						if (r.id === 'bypass') {
							nrfr = r;
						}
					});
					assert.ok(rfr !== nrfr);
					done();
				});
			});
		});
	});
});