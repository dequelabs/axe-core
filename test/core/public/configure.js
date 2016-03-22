/*global Rule, Check, configureChecksRulesAndBranding */
describe('axe.configure', function() {
	'use strict';

	function createFrames(callback) {
		var frame;
		frame = document.createElement('iframe');
		frame.src = '../mock/frames/nested1.html';
		frame.addEventListener('load', function () {
			setTimeout(callback, 500);
		});
		fixture.appendChild(frame);
	}

	var assertNotCalled = function () {
		assert.ok(false, 'Should not be called');
	};

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	beforeEach(function () {
		axe._audit = null;
	});

	it('should throw if audit is not configured', function() {
		assert.throws(function () {
			axe.configure({});
    }, Error, /^No audit configured/);
	});

	it('should override an audit\'s reporter - string', function() {
		axe._load({ reporter: function (results, callback) { callback(results); } });
		axe.configure({ reporter: 'v1' });
		assert.equal(axe._audit.reporter, 'v1');
	});

	it('should not allow setting to an un-registered reporter', function () {
		axe._load({ reporter: 'v1' });
		axe.configure({ reporter: 'no-exist-evar-plz' });
		assert.equal(axe._audit.reporter, 'v1');
	});

	it('should allow for addition of rules', function () {
		axe._load({});
		axe.configure({
			rules: [{
				id: 'bob',
				metadata: {
					joe: 'joe'
				}
			}]
		});

		assert.lengthOf(axe._audit.rules, 1);
		assert.instanceOf(axe._audit.rules[0], Rule);
		assert.equal(axe._audit.rules[0].id, 'bob');
		assert.deepEqual(axe._audit.data.rules.bob.joe, 'joe');
	});

	it('should call setBranding when passed options', function () {
		axe._load({});
		axe.configure({
			rules: [{
				id: 'bob',
				selector: 'pass',
			}]
		});
		assert.lengthOf(axe._audit.rules, 1);
		assert.equal(axe._audit.data.rules.bob.helpUrl,
			'https://dequeuniversity.com/rules/axe/2.0/bob?application=axeAPI');
		axe.configure({
			branding: {
				application: 'thing',
				brand: 'thung'
			}
		});
		assert.equal(axe._audit.data.rules.bob.helpUrl,
			'https://dequeuniversity.com/rules/thung/2.0/bob?application=thing');
	});

	it('should allow for overwriting of rules', function () {
		axe._load({
			data: {
				rules: {
					bob: 'not-joe'
				}
			},
			rules: {
				id: 'bob',
				selector: 'fail'
			}
		});
		axe.configure({
			rules: [{
				id: 'bob',
				selector: 'pass',
				metadata: {joe: 'joe'}
			}]
		});

		assert.lengthOf(axe._audit.rules, 1);
		assert.instanceOf(axe._audit.rules[0], Rule);
		assert.equal(axe._audit.rules[0].id, 'bob');
		assert.equal(axe._audit.rules[0].selector, 'pass');
		assert.equal(axe._audit.data.rules.bob.joe, 'joe');
	});

	it('should allow for the addition of checks', function () {
		axe._load({});
		axe.configure({
			checks: [{
				id: 'bob',
				options: true,
				metadata: 'joe'
			}]
		});

		assert.instanceOf(axe._audit.checks.bob, Check);
		assert.equal(axe._audit.checks.bob.id, 'bob');
		assert.isTrue(axe._audit.checks.bob.options);
		assert.equal(axe._audit.data.checks.bob, 'joe');

	});

	it('should allow for the overwriting of checks', function () {
		axe._load({
			data: {
				checks: {
					bob: 'not-joe'
				}
			},
			checks: [{
				id: 'bob',
				options: false,
				selector: 'fail'
			}]
		});
		axe.configure({
			checks: [{
				id: 'bob',
				options: true,
				selector: 'pass',
				metadata: 'joe'
			}]
		});

		assert.instanceOf(axe._audit.checks.bob, Check);
		assert.equal(axe._audit.checks.bob.id, 'bob');
		assert.isTrue(axe._audit.checks.bob.options);
		assert.equal(axe._audit.checks.bob.selector, 'pass');
		assert.equal(axe._audit.data.checks.bob, 'joe');

	});

	it('should send command to frames to configure', function (done) {
		createFrames(function () {
			axe._load({});
			var orig = axe.utils.sendCommandToFrame;
			var frame = document.querySelector('iframe');
			axe.utils.sendCommandToFrame = function (node, opts) {
				assert.equal(node, frame);
				assert.deepEqual(opts, {
					command: 'configure',
					spec: {}
				});
				axe.utils.sendCommandToFrame = orig;
				done();
			};
			configureChecksRulesAndBranding({});
		});
	});

	it('should call the resolve function if passed one', function (done) {
		axe._load({});
		configureChecksRulesAndBranding({}, function () {
			assert.ok(true);
			done();
		}, assertNotCalled);
	});

});
