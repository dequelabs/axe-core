/* global Rule, Tool, commons */
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

	it('should add tools to the Audit', function () {
		var mockAudit = {
			tools: [{ id: 'monkeys' }, { id: 'bananas' }]
		};

		axe._load(mockAudit);
		assert.instanceOf(axe._audit.tools.monkeys, Tool);
		assert.instanceOf(axe._audit.tools.bananas, Tool);
		assert.equal(axe._audit.tools.monkeys.id, 'monkeys');
		assert.equal(axe._audit.tools.bananas.id, 'bananas');
	});

	it('should locally define commons', function () {
		axe._load({
			commons: 'foo'
		});
		assert.equal(commons, 'foo');
	});

	describe('respondable subscriber', function () {
		it('should add a respondable subscriber', function () {
			var mockAudit = {
				rules: [{ id: 'monkeys' }, { id: 'bananas' }]
			};
			var orig = window.utils.respondable.subscribe;

			utils.respondable.subscribe = function (topic, callback) {
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

				utils.respondable.subscribe = function (topic, callback) {
					callback({data: 'iscool', command: 'rules'}, function (response) {
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

				utils.respondable.subscribe = function (topic, callback) {
					callback({ command: 'rules', context: { include: ['monkeys'] }}, function (response) {
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
				axe._load({
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
				axe._load(mockAudit);

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
				axe._load(mockAudit);

				window.utils.respondable.subscribe = origSub;
				window.cleanupTools = orig;
			});

		});

		it('should respond', function () {
			var origSub = window.utils.respondable.subscribe;
			var expected = {data: {include: ['monkeys']}};

			utils.respondable.subscribe = function (topic, callback) {
				callback({}, function responder(data) {
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

	describe('style', function () {
		afterEach(function () {
			axe._load({});
		});
		it('should not throw if not given style', function () {
			assert.doesNotThrow(function () {
				axe._load({});
			});
		});

		it('should inject a stylesheet', function () {
			var styles = document.getElementsByTagName('style');
			var length = styles.length;
			axe._load({
				style: '.foo { color: red; }'
			});
			assert.lengthOf(styles, length + 1);
			assert.match(styles[length].textContent || styles[length].styleSheet.cssText,
				/\.foo[\r\n\s]*?\{[\r\n\s]*color:[\r\n\s]+?red;?[\r\n\s]*?\}[\r\n\s]*?/);
		});

		it('should remove previously injected sheets if no style is given', function () {
			var styles = document.getElementsByTagName('style');
			var length = styles.length;
			axe._load({
				style: '.foo { color: red; }'
			});
			assert.lengthOf(styles, length + 1);
			axe._load({});
			assert.lengthOf(styles, length);
		});

		it('should replace previously injected styleSheets', function () {
			var styles = document.getElementsByTagName('style');
			var length = styles.length;
			axe._load({
				style: '.foo { color: red; }'
			});
			assert.lengthOf(styles, length + 1);
			axe._load({
				style: '.bar { color: red; }'
			});
			assert.lengthOf(styles, length + 1);
			assert.match(styles[length].textContent || styles[length].styleSheet.cssText,
				/\.bar[\r\n\s]*?\{[\r\n\s]*color:[\r\n\s]*?red;?[\r\n\s]*?\}[\r\n\s]*?/);

		});
	});

});
