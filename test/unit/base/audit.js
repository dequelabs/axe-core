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
			a.run(document, function () {
				assert.ok('yay');
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
			rule.after = function (node, ruleResult, callback) {
				called = true;
				callback(ruleResult);
			};
			a.run(document, function (result) {
				a.after(document, result, function () {
					assert.ok(called);
					rule.after = orig;
					done();
				});
			});
		});
		it('should replace the FrameRuleResult object', function (done) {
			fixture.innerHTML = '<a href="#">link</a>';

			a.run(document, function (result) {
				var rfr;
				result.forEach(function (r) {
					if (r.id === 'bypass') {
						rfr = r;
					}
				});
				a.after(document, result, function () {
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