/* global dqreConfiguration, Rule, Tool */
describe('configure', function () {
	'use strict';

	afterEach(function () {
		dqre._audit = null;
	});

	it('should be a function', function () {
		assert.isFunction(load);
	});

	it('should create a new audit', function () {
		var success = false;
		var orig = window.Audit;
		var audit = {rules: []};
		window.Audit = function () {
			success = true;
		};

		dqre._load(audit);
		assert.isTrue(success);
		assert.deepEqual(dqreConfiguration, audit);
		window.Audit = orig;

	});

	it('should push rules on the Audit', function () {
		var mockAudit = {
			rules: [{ id: 'monkeys' }, { id: 'bananas' }]
		};

		dqre._load(mockAudit);
		assert.instanceOf(dqre._audit.rules[0], Rule);
		assert.instanceOf(dqre._audit.rules[1], Rule);
		assert.equal(dqre._audit.rules[0].id, 'monkeys');
		assert.equal(dqre._audit.rules[1].id, 'bananas');


	});

	it('should add tools to the Audit', function () {
		var mockAudit = {
			tools: [{ id: 'monkeys' }, { id: 'bananas' }]
		};

		dqre._load(mockAudit);
		assert.instanceOf(dqre._audit.tools.monkeys, Tool);
		assert.instanceOf(dqre._audit.tools.bananas, Tool);
		assert.equal(dqre._audit.tools.monkeys.id, 'monkeys');
		assert.equal(dqre._audit.tools.bananas.id, 'bananas');
	});

	it('should add the version of rules to dqre._audit', function () {
		dqre._load({
			data: {},
			rules: [],
			version: 'monkeys'
		});
		assert.equal(dqre._audit.version, 'monkeys');
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
			dqre._load(mockAudit);

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
				dqre._load(mockAudit);

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
				dqre._load({
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
				dqre._load({
					rules: []
				});
				window.runRules = orig;
				utils.respondable.subscribe = origSub;
			});
		});

		describe('given command run-tool', function () {
			it('should call `runTool`, passing parameter and selectorArray', function (done) {
				var mockAudit = {
					rules: []
				};
				var origSub = window.utils.respondable.subscribe;
				var orig = window.runTool;
				window.runTool = function (id, selectorArray, options, callback) {
					assert.equal(id, 'bananas');
					assert.deepEqual(selectorArray, ['cats', 'dogs', 'monkeys']);
					assert.equal(options, 'apples');
					assert.isFunction(callback);
					done();
				};

				utils.respondable.subscribe = function (topic, callback) {
					callback({
						parameter: 'bananas',
						command: 'run-tool',
						options: 'apples',
						selectorArray: ['cats', 'dogs', 'monkeys']
					}, function (response) {
						// ping callback will call this response function
						assert.ok(response);
					});

				};
				dqre._load(mockAudit);

				window.utils.respondable.subscribe = origSub;
				window.runTool = orig;
			});

		});

		describe('given command cleanup-tool', function () {
			it('should call `cleanupTools`', function (done) {
				var mockAudit = {
					rules: []
				};
				var origSub = window.utils.respondable.subscribe;
				var orig = window.cleanupTools;
				window.cleanupTools = function (callback) {
					assert.isFunction(callback);
					done();
				};

				utils.respondable.subscribe = function (topic, callback) {
					callback({
						command: 'cleanup-tool'
					}, function (response) {
						// ping callback will call this response function
						assert.ok(response);
					});

				};
				dqre._load(mockAudit);

				window.utils.respondable.subscribe = origSub;
				window.cleanupTools = orig;
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
			dqre._load({
				rules: []
			});

			window.utils.respondable.subscribe = origSub;
		});

	});

	describe('style', function () {
		afterEach(function () {
			dqre._load({});
		});
		it('should not throw if not given style', function () {
			assert.doesNotThrow(function () {
				dqre._load({});
			});
		});

		it('should inject a stylesheet', function () {
			var styles = document.getElementsByTagName('style');
			var length = styles.length;
			dqre._load({
				style: '.foo { color: red; }'
			});
			assert.lengthOf(styles, length + 1);
			assert.match(styles[length].textContent || styles[length].styleSheet.cssText,
				/\.foo[\r\n\s]*?\{[\r\n\s]*color:[\r\n\s]+?red;?[\r\n\s]*?\}[\r\n\s]*?/);
		});

		it('should remove previously injected sheets if no style is given', function () {
			var styles = document.getElementsByTagName('style');
			var length = styles.length;
			dqre._load({
				style: '.foo { color: red; }'
			});
			assert.lengthOf(styles, length + 1);
			dqre._load({});
			assert.lengthOf(styles, length);
		});

		it('should replace previously injected styleSheets', function () {
			var styles = document.getElementsByTagName('style');
			var length = styles.length;
			dqre._load({
				style: '.foo { color: red; }'
			});
			assert.lengthOf(styles, length + 1);
			dqre._load({
				style: '.bar { color: red; }'
			});
			assert.lengthOf(styles, length + 1);
			assert.match(styles[length].textContent || styles[length].styleSheet.cssText,
				/\.bar[\r\n\s]*?\{[\r\n\s]*color:[\r\n\s]*?red;?[\r\n\s]*?\}[\r\n\s]*?/);

		});
	});

});
