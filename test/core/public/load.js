/* global Rule, commons */
describe('axe._load', function () {
	'use strict';

	afterEach(function () {
		axe._audit = null;
	});

	it('should be a function', function () {
		assert.isFunction(axe._load);
	});

	it('should create a new audit', function () {
		var success = false;
		var orig = window.Audit;
		var audit = {rules: []};
		window.Audit = function () {
			success = true;
		};

		axe._load(audit);
		assert.isTrue(success);
		window.Audit = orig;

	});

	it('should push rules on the Audit', function () {
		var mockAudit = {
			rules: [{ id: 'monkeys' }, { id: 'bananas' }]
		};

		axe._load(mockAudit);
		assert.instanceOf(axe._audit.rules[0], Rule);
		assert.instanceOf(axe._audit.rules[1], Rule);
		assert.equal(axe._audit.rules[0].id, 'monkeys');
		assert.equal(axe._audit.rules[1].id, 'bananas');
	});

	it('should locally define commons', function () {
		axe._load({
			commons: 'foo'
		});
		assert.equal(commons, 'foo');
	});

	it('should define commons on axe', function () {
		axe._load({
			commons: 'foo'
		});
		assert.equal(axe.commons, 'foo');
	});

	describe('respondable subscriber', function () {
		it('should add a respondable subscriber', function () {
			var mockAudit = {
				rules: [{ id: 'monkeys' }, { id: 'bananas' }]
			};
			var orig = window.utils.respondable.subscribe;

			axe.utils.respondable.subscribe = function (topic, callback) {
				assert.ok(topic.indexOf('axe.') === 0);
				assert.isFunction(callback);
			};
			axe._load(mockAudit);

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

				axe.utils.respondable.subscribe = function (topic, callback) {
					callback({data: 'iscool', command: 'rules'}, undefined, function (response) {
						// ping callback will call this response function
						assert.ok(response);
					});

				};
				axe._load(mockAudit);

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

				axe.utils.respondable.subscribe = function (topic, callback) {
					callback({ command: 'rules', context: { include: ['monkeys'] }}, undefined, function (response) {
						assert.ok(response);
					});

				};
				axe._load({
					rules: []
				});

				window.utils.respondable.subscribe = origSub;
				window.runRules = orig;
			});
			it('should default include to current document if none are found', function (done) {
				var origSub = axe.utils.respondable.subscribe;
				var orig = window.runRules;
				var expected = {include: [document]};
				window.runRules = function (context) {
					assert.deepEqual(context, expected);
					done();
				};

				axe.utils.respondable.subscribe = function (topic, callback) {
					callback({ command: 'rules', context: { include: [] }}, undefined, function () {});
				};
				axe._load({
					rules: []
				});
				window.runRules = orig;
				axe.utils.respondable.subscribe = origSub;
			});
		});

		describe('given command cleanup-plugins', function () {
			it('should call `cleanupPlugins`', function (done) {
				var mockAudit = {
					rules: []
				};
				var origSub = window.utils.respondable.subscribe;
				var orig = window.cleanupPlugins;
				window.cleanupPlugins = function (callback) {
					assert.isFunction(callback);
					done();
				};

				axe.utils.respondable.subscribe = function (topic, callback) {
					callback({
						command: 'cleanup-plugin'
					}, undefined, function (response) {
						// ping callback will call this response function
						assert.ok(response);
					});

				};
				axe._load(mockAudit);

				window.utils.respondable.subscribe = origSub;
				window.cleanupPlugins = orig;
			});

		});

		it('should respond', function () {
			var origSub = window.utils.respondable.subscribe;
			var expected = {data: {include: ['monkeys']}};

			axe.utils.respondable.subscribe = function (topic, callback) {
				callback({}, undefined, function responder(data) {
					if (topic === 'axe.start') {
						assert.equal(data, expected);
					} else if (topic === 'axe.ping') {
						assert.deepEqual(data, {axe: true});
					} else {
						assert.ok(false);
					}
				});

			};
			axe._load({
				rules: []
			});

			window.utils.respondable.subscribe = origSub;
		});

	});

});
