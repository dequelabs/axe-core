/* global dqreConfiguration, Rule, Classifier, AnalysisRule */
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

	it('should push rules on the Audit', function () {
		var mockAudit = {
			rules: [{ id: 'monkeys' }, { id: 'bananas' }]
		};

		dqre.configure(mockAudit);
		assert.instanceOf(dqre.audit.rules[0], Rule);
		assert.instanceOf(dqre.audit.rules[1], Rule);
		assert.equal(dqre.audit.rules[0].id, 'monkeys');
		assert.equal(dqre.audit.rules[1].id, 'bananas');


	});

	it('should add classifiers on the Audit', function () {
		var mockAudit = {
			classifiers: [{ id: 'monkeys' }, { id: 'bananas' }]
		};

		dqre.configure(mockAudit);
		assert.instanceOf(dqre.audit.classifiers.monkeys, Classifier);
		assert.instanceOf(dqre.audit.classifiers.bananas, Classifier);
		assert.equal(dqre.audit.classifiers.monkeys.id, 'monkeys');
		assert.equal(dqre.audit.classifiers.bananas.id, 'bananas');


	});

	it('should add analysis rules on the Audit', function () {
		var mockAudit = {
			analyzers: [{ id: 'monkeys' }, { id: 'bananas' }]
		};

		dqre.configure(mockAudit);
		assert.instanceOf(dqre.audit.analyzers.monkeys, AnalysisRule);
		assert.instanceOf(dqre.audit.analyzers.bananas, AnalysisRule);
		assert.equal(dqre.audit.analyzers.monkeys.id, 'monkeys');
		assert.equal(dqre.audit.analyzers.bananas.id, 'bananas');


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
				assert.ok(topic.indexOf('dqre.') === 0);
				assert.isFunction(callback);
			};
			dqre.configure(mockAudit);

			window.utils.respondable.subscribe = orig;
		});

		describe('given command rules', function () {


			it('should call `runRules` and default context to empty object', function (done) {
				var mockAudit = {
					rules: []
				};
				var origSub = window.utils.respondable.subscribe;
				var orig = window.runRules;
				window.runRules = function (context, options, callback) {
					assert.deepEqual(context, {});
					assert.isFunction(callback);
					done();
				};

				utils.respondable.subscribe = function (topic, callback) {
					callback({data: 'iscool', command: 'rules'}, function (response) {
						// ping callback will call this response function
						assert.ok(response);
					});

				};
				dqre.configure(mockAudit);

				window.utils.respondable.subscribe = origSub;
				window.runRules = orig;
			});

			it('should pass data.context to `runRules`', function (done) {
				var origSub = window.utils.respondable.subscribe;
				var orig = window.runRules;
				window.runRules = function (context, options, callback) {
					assert.deepEqual(context, {include: ['monkeys']});
					assert.isFunction(callback);
					done();
				};

				utils.respondable.subscribe = function (topic, callback) {
					callback({ command: 'rules', context: { include: ['monkeys'] }}, function (response) {
						assert.ok(response);
					});

				};
				dqre.configure({
					rules: []
				});

				window.utils.respondable.subscribe = origSub;
				window.runRules = orig;
			});
			it('should default include to current document if none are found', function (done) {
				var origSub = utils.respondable.subscribe;
				var orig = window.runRules;
				var expected = {include: [document]};
				window.runRules = function (context) {
					assert.deepEqual(context, expected);
					done();
				};

				utils.respondable.subscribe = function (topic, callback) {
					callback({ command: 'rules', context: { include: [] }}, function () {});

				};
				dqre.configure({
					rules: []
				});
				window.runRules = orig;
				utils.respondable.subscribe = origSub;
			});
		});

		describe('given command classify', function () {
			it('should call `runClassifier` and default context to empty object', function (done) {
				var mockAudit = {
					rules: []
				};
				var origSub = window.utils.respondable.subscribe;
				var orig = window.runClassifier;
				window.runClassifier = function (id, context, options, callback) {
					assert.equal(id, 'bananas');
					assert.deepEqual(context, {});
					assert.isFunction(callback);
					done();
				};

				utils.respondable.subscribe = function (topic, callback) {
					callback({parameter: 'bananas', data: 'iscool', command: 'classify'}, function (response) {
						// ping callback will call this response function
						assert.ok(response);
					});

				};
				dqre.configure(mockAudit);

				window.utils.respondable.subscribe = origSub;
				window.runClassifier = orig;
			});

			it('should pass data.context to `runClassifier`', function (done) {
				var origSub = window.utils.respondable.subscribe;
				var orig = window.runClassifier;
				window.runClassifier = function (id, context, options, callback) {
					assert.equal(id, 'bananas');
					assert.deepEqual(context, {include: ['monkeys']});
					assert.isFunction(callback);
					done();
				};

				utils.respondable.subscribe = function (topic, callback) {
					callback({parameter: 'bananas', command: 'classify', context: { include: ['monkeys'] }}, function (response) {
						assert.ok(response);
					});

				};
				dqre.configure({
					rules: []
				});

				window.utils.respondable.subscribe = origSub;
				window.runClassifier = orig;
			});

		});


		it('should respond', function () {
			var origSub = window.utils.respondable.subscribe;
			var expected = {data: {include: ['monkeys']}};

			utils.respondable.subscribe = function (topic, callback) {
				callback({}, function responder(data) {
					if (topic === 'dqre.start') {
						assert.equal(data, expected);
					} else if (topic === 'dqre.ping') {
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
		});



	});

});
