describe('dqre.run', function () {
	'use strict';

	function createFrames(num, callback) {
		var frame,
			loaded = 0;

		function onLoad() {
			loaded++;
			if (loaded >= (num + 1)) {
				callback();
			}
		}

		for (var i = 0; i < num; i++) {
			frame = document.createElement('frame');
			frame.src = '../mock/frames/e2e.html';

			frame.addEventListener('load', onLoad);
			fixture.appendChild(frame);

		}
		frame = document.createElement('frame');
		frame.src = '../mock/frames/nocode.html';
		frame.addEventListener('load', onLoad);
		fixture.appendChild(frame);
	}

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
		dqre.audit = null;
	});

	it('should throw if no audit is configured', function () {

		assert.throws(function () {
			dqre.run(document);
		}, Error, /^No audit configured/);
	});

	it('should work', function (done) {
		dqre.configure(window.mockAudit);

		createFrames(2, function () {
			dqre.run(document, function (result) {
				console.log(result);
				done();
			});

		});
	});

	it('should call audit.after', function (done) {
		var called = false;
		dqre.configure(window.mockAudit);

		dqre.audit.after = function (context, results, fn) {
			called = true;
			fn(results);
		};
		createFrames(2, function () {
			dqre.run(document, function () {
				assert.ok(called);
				done();
			});
		});
	});

});

describe('mergeResults', function () {
	var results, one, two;
	function makeResults(oneResult, twoResult) {
		var check, results = [];

		check = new CheckResult({id: 'check', result: oneResult});
		check.value = true;
		one.addResults(document.body, [check]);
		one.details[0].value = true;
		one.result = utils.bubbleResult(one.details) || dqre.constants.result.NA;
		check = new CheckResult({id: 'check', result: twoResult});
		check.value = true;
		two.addResults(document.body, [check]);
		two.details[0].value = true;
		two.result = utils.bubbleResult(two.details) || dqre.constants.result.NA;
		results.push([one]);
		results.push([two]);
		return results;
	}
	beforeEach(function () {
		results = [];
		one = new RuleResult(new Rule({id: 'this'}));
		two = new RuleResult(new Rule({id: 'this'}));
	});
	it('Should merge two results into a single object', function () {
		var merged;
		one.addResults(document.body, [new CheckResult({id: 'check', result: dqre.constants.result.PASS})]);
		two.addResults(document.body, [new CheckResult({id: 'check', result: dqre.constants.result.FAIL})]);
		results.push([one]);
		results.push([two]);
		merged = mergeResults(results);
		assert.equal(merged.length, 1);
	});
	describe('cascade FAIL over PASS', function () {
		it('two overrides one', function () {
			var merged;
			results = makeResults(dqre.constants.result.PASS, dqre.constants.result.FAIL);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.FAIL);
		});
		it('one overrides two', function () {
			var merged;
			results = makeResults(dqre.constants.result.FAIL, dqre.constants.result.PASS);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.FAIL);
		});
	});
	describe('cascade FAIL over NA', function () {
		it('two overrides one', function () {
			var merged;
			results = makeResults(dqre.constants.result.NA, dqre.constants.result.FAIL);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.FAIL);
		});
		it('one overrides two', function () {
			var merged;
			results = makeResults(dqre.constants.result.FAIL, dqre.constants.result.NA);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.FAIL);
		});
	});
	describe('cascade FAIL over WARN', function () {
		it('two overrides one', function () {
			var merged;
			results = makeResults(dqre.constants.result.WARN, dqre.constants.result.FAIL);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.FAIL);
		});
		it('one overrides two', function () {
			var merged;
			results = makeResults(dqre.constants.result.FAIL, dqre.constants.result.WARN);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.FAIL);
		});
	});
	describe('cascade WARN over PASS', function () {
		it('two overrides one', function () {
			var merged;
			results = makeResults(dqre.constants.result.PASS, dqre.constants.result.WARN);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.WARN);
		});
		it('one overrides two', function () {
			var merged;
			results = makeResults(dqre.constants.result.WARN, dqre.constants.result.PASS);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.WARN);
		});
	});
	describe('cascade WARN over NA', function () {
		it('two overrides one', function () {
			var merged;
			results = makeResults(dqre.constants.result.NA, dqre.constants.result.WARN);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.WARN);
		});
		it('one overrides two', function () {
			var merged;
			results = makeResults(dqre.constants.result.WARN, dqre.constants.result.NA);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.WARN);
		});
	});
	describe('cascade PASS over NA', function () {
		it('two overrides one', function () {
			var merged;
			results = makeResults(dqre.constants.result.NA, dqre.constants.result.PASS);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.PASS);
		});
		it('one overrides two', function () {
			var merged;
			results = makeResults(dqre.constants.result.PASS, dqre.constants.result.NA);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.PASS);
		});
	});
});

