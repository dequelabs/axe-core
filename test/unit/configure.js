/* global dqreConfiguration */
describe('configure', function () {
	'use strict';

	afterEach(function () {
		dqre.audit = null;
	});

	it('should be a function', function () {
		assert.isFunction(dqre.configure);
	});

	it('should create a new audit', function () {
		var success = false;
		var orig = window.Audit;
		var audit = {rules: []};
		window.Audit = function () {
			success = true;
		};

		dqre.configure(audit);
		assert.isTrue(success);
		assert.deepEqual(dqreConfiguration, audit);
		window.Audit = orig;

	});

	it('should call addRule on the Audit for each rule', function () {
		var mockAudit = {
			rules: [{ id: 'monkeys' }, { id: 'bananas' }]
		};
		var called = 0;
		var orig = window.Audit.prototype.addRule;
		window.Audit.prototype.addRule = function (rule) {
			assert.equal(mockAudit.rules[called], rule);
			called++;
		};

		dqre.configure(mockAudit);
		assert.equal(mockAudit.rules.length, called);

		window.Audit.prototype.addRule = orig;

	});

	it('should add the version of rules to dqre.audit', function () {
		dqre.configure({
			data: {},
			rules: [],
			version: 'monkeys'
		});
		assert.equal(dqre.audit.version, 'monkeys');
	});

	describe('respondable subscriber', function () {
		it('should add a respondable subscriber', function () {
			var mockAudit = {
				rules: [{ id: 'monkeys' }, { id: 'bananas' }]
			};
			var orig = window.utils.respondable.subscribe;

			utils.respondable.subscribe = function (topic, callback) {
				assert.ok(topic.indexOf('dqre.analysis.') === 0);
				assert.isFunction(callback);
			};
			dqre.configure(mockAudit);

			window.utils.respondable.subscribe = orig;
		});

		it('should call `runAnalysis` and default context to empty object', function (done) {
			var mockAudit = {
				rules: []
			};
			var origSub = window.utils.respondable.subscribe;
			var orig = window.runAnalysis;
			window.runAnalysis = function (context, options, callback) {
				assert.deepEqual(context, {});
				assert.isFunction(callback);
				done();
			};

			utils.respondable.subscribe = function (topic, callback) {
				callback({data: 'iscool'}, function (response) {
					// ping callback will call this response function
					assert.ok(response);
				});

			};
			dqre.configure(mockAudit);

			window.utils.respondable.subscribe = origSub;
			window.runAnalysis = orig;
		});

		it('should pass data.context to `runAnalysis`', function (done) {
			var origSub = window.utils.respondable.subscribe;
			var orig = window.runAnalysis;
			window.runAnalysis = function (context, options, callback) {
				assert.deepEqual(context, {include: ['monkeys']});
				assert.isFunction(callback);
				done();
			};

			utils.respondable.subscribe = function (topic, callback) {
				callback({context: { include: ['monkeys'] }}, function (response) {
					assert.ok(response);
				});

			};
			dqre.configure({
				rules: []
			});

			window.utils.respondable.subscribe = origSub;
			window.runAnalysis = orig;
		});


		it('should respond', function () {
			var origSub = window.utils.respondable.subscribe;
			var orig = window.runAnalysis;
			var expected = {data: {include: ['monkeys']}};
			window.runAnalysis = function (context, options, callback) {
				callback(expected);
			};

			utils.respondable.subscribe = function (topic, callback) {
				callback({}, function responder(data) {
					if (topic === 'dqre.analysis.start') {
						assert.equal(data, expected);
					} else if (topic === 'dqre.analysis.ping') {
						assert.deepEqual(data, {dqre: true});
					} else {
						assert.ok(false);
					}
				});

			};
			dqre.configure({
				rules: []
			});

			window.utils.respondable.subscribe = origSub;
			window.runAnalysis = orig;
		});


		it('should default include to current document if none are found', function (done) {
			var origSub = utils.respondable.subscribe;
			var orig = window.runAnalysis;
			var expected = {include: [document]};
			window.runAnalysis = function (context) {
				assert.deepEqual(context, expected);
				done();
			};

			utils.respondable.subscribe = function (topic, callback) {
				callback({ context: { include: [] }}, function () {});

			};
			dqre.configure({
				rules: []
			});
			window.runAnalysis = orig;
			utils.respondable.subscribe = origSub;
		});

	});

});
