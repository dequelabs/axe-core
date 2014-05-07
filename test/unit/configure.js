
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
		window.Audit = function () {
			success = true;
		};

		dqre.configure({rules: []});
		assert.isTrue(success);

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

		it('should call dqre.run', function (done) {
			var mockAudit = {
				rules: []
			};
			var origSub = window.utils.respondable.subscribe;
			var orig = window.dqre.run;
			window.dqre.run = function (context, callback) {
				assert.equal(context, document);
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
			window.dqre.run = orig;
		});

		it('should pass data.context to dqre.run', function (done) {
			var origSub = window.utils.respondable.subscribe;
			var orig = window.dqre.run;
			window.dqre.run = function (context, callback) {
				assert.equal(context, 'monkeys');
				assert.isFunction(callback);
				done();
			};

			utils.respondable.subscribe = function (topic, callback) {
				callback({context: 'monkeys'}, function (response) {
					assert.ok(response);
				});

			};
			dqre.configure({
				rules: []
			});

			window.utils.respondable.subscribe = origSub;
			window.dqre.run = orig;
		});


		it('should respond', function (done) {
			var origSub = window.utils.respondable.subscribe;
			var orig = window.dqre.run;
			var expected = {data: 'monkeys'};
			window.dqre.run = function (context, callback) {
				callback(expected);
			};

			utils.respondable.subscribe = function (topic, callback) {
				callback({}, function responder(data) {
					if (topic === 'dqre.analysis.start') {
						assert.equal(data, expected);
					} else if (topic === 'dqre.analysis.ping') {
						assert.deepEqual(data, {dqre:true});
					} else {
						assert.ok(false);
					}
					done();
				});

			};
			dqre.configure({
				rules: []
			});

			window.utils.respondable.subscribe = origSub;
			window.dqre.run = orig;
		});

	});

});