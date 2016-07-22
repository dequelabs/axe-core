/*global Rule, Check */
describe('axe.configure', function() {
	'use strict';
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
		axe._load({ });
		assert.isNull(axe._audit.reporter);

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
			}],
			branding: {}
		});
		assert.lengthOf(axe._audit.rules, 1);
		assert.equal(axe._audit.data.rules.bob.helpUrl,
			'https://dequeuniversity.com/rules/axe/x.y/bob?application=axeAPI');
		axe.configure({
			branding: {
				application: 'thing',
				brand: 'thung'
			}
		});
		assert.equal(axe._audit.data.rules.bob.helpUrl,
			'https://dequeuniversity.com/rules/thung/x.y/bob?application=thing');
	});

	it('sets branding on newly configured rules', function () {
		axe._load({});
		axe.configure({
			branding: {
				application: 'thing',
				brand: 'thung'
			}
		});
		axe.configure({
			rules: [{
				id: 'bob',
				selector: 'pass',
			}],
		});

		assert.equal(axe._audit.data.rules.bob.helpUrl,
			'https://dequeuniversity.com/rules/thung/x.y/bob?application=thing');
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
				metadata: {
					joe: 'joe'
				}
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
				metadata: {
					joe: 'joe'
				}
			}]
		});

		assert.instanceOf(axe._audit.checks.bob, Check);
		assert.equal(axe._audit.checks.bob.id, 'bob');
		assert.isTrue(axe._audit.checks.bob.options);
		assert.equal(axe._audit.data.checks.bob.joe, 'joe');

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
			}]
		});
		axe.configure({
			checks: [{
				id: 'bob',
				options: true,
				metadata: {
					joe: 'joe'
				}
			}]
		});

		assert.instanceOf(axe._audit.checks.bob, Check);
		assert.equal(axe._audit.checks.bob.id, 'bob');
		assert.isTrue(axe._audit.checks.bob.options);
		assert.equal(axe._audit.data.checks.bob.joe, 'joe');

	});

	it('should create an execution context for check messages', function () {
		axe._load({});
		axe.configure({
			checks: [{
				id: 'bob',
				metadata: {
					messages: {
						pass: 'function () { return \'Bob\' + \' John\';}',
						fail: 'Bob Pete'
					}
				}
			}]
		});

		assert.isFunction(axe._audit.data.checks.bob.messages.pass);
		assert.isString(axe._audit.data.checks.bob.messages.fail);
		assert.equal(axe._audit.data.checks.bob.messages.pass(), 'Bob John');
		assert.equal(axe._audit.data.checks.bob.messages.fail, 'Bob Pete');
	});

	it('overrides the default value of audit.tagExclude', function () {
		axe._load({});
		assert.deepEqual(axe._audit.tagExclude, ['experimental']);

		axe.configure({
			tagExclude: ['ninjas']
		});
		assert.deepEqual(axe._audit.tagExclude, ['ninjas']);
	});
});
