/*global Rule, Check, Tool */
describe('axe.configure', function() {
	'use strict';

	beforeEach(function() {
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
				metadata: 'joe'
			}]
		});

		assert.lengthOf(axe._audit.rules, 1);
		assert.instanceOf(axe._audit.rules[0], Rule);
		assert.equal(axe._audit.rules[0].id, 'bob');
		assert.equal(axe._audit.data.rules.bob, 'joe');
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
				metadata: 'joe'
			}]
		});

		assert.lengthOf(axe._audit.rules, 1);
		assert.instanceOf(axe._audit.rules[0], Rule);
		assert.equal(axe._audit.rules[0].id, 'bob');
		assert.equal(axe._audit.rules[0].selector, 'pass');
		assert.equal(axe._audit.data.rules.bob, 'joe');
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

	it('should allow for the addition of tools', function () {
		axe._load({});
		axe.configure({
			tools: [{
				id: 'bob',
				options: true
			}]
		});

		assert.instanceOf(axe._audit.tools.bob, Tool);
		assert.equal(axe._audit.tools.bob.id, 'bob');
		assert.isTrue(axe._audit.tools.bob.options);

	});

	it('should allow for the overwriting of tools', function () {
		axe._load({
			tools: [{
				id: 'bob',
				options: false
			}]
		});
		axe.configure({
			tools: [{
				id: 'bob',
				options: true
			}]
		});

		assert.instanceOf(axe._audit.tools.bob, Tool);
		assert.equal(axe._audit.tools.bob.id, 'bob');
		assert.isTrue(axe._audit.tools.bob.options);

	});

	it('should allow for the addition of finders', function () {
		axe._load({});
		axe.configure({
			finders: [{
				id: 'bob'
			}]
		});

		assert.instanceOf(axe._audit.finders.bob, Tool);
		assert.equal(axe._audit.finders.bob.id, 'bob');

	});

	it('should allow for the overwriting of finders', function () {
		axe._load({
			finders: [{
				id: 'bob',
				options: false
			}]
		});
		axe.configure({
			finders: [{
				id: 'bob',
				options: true
			}]
		});

		assert.instanceOf(axe._audit.finders.bob, Tool);
		assert.equal(axe._audit.finders.bob.id, 'bob');
		assert.isTrue(axe._audit.finders.bob.options);

	});

});
