/*global Rule*/
describe('axe.reset', function () {
	'use strict';

	it('should throw if no audit is configured', function () {
		axe._audit = null;

		assert.throws(function () {
			axe.reset();
		}, Error, /^No audit configured/);
	});

	it('should restore the default configuration', function () {
		axe._load({
			data: {
				rules: [{
					bob: 'not-joe'
				}]
			},
			rules: [{
				id: 'bob',
				selector: 'fail'
			}]
		});
		assert.lengthOf(axe._audit.rules, 1);
		assert.instanceOf(axe._audit.rules[0], Rule);
		assert.equal(axe._audit.rules[0].id, 'bob');
		assert.equal(axe._audit.rules[0].selector, 'fail');
		axe.configure({
			rules: [{
				id: 'bob',
				selector: 'pass',
			}]
		});
		assert.lengthOf(axe._audit.rules, 1);
		assert.instanceOf(axe._audit.rules[0], Rule);
		assert.equal(axe._audit.rules[0].id, 'bob');
		assert.equal(axe._audit.rules[0].selector, 'pass');
		axe.reset();
		assert.lengthOf(axe._audit.rules, 1);
		assert.instanceOf(axe._audit.rules[0], Rule);
		assert.equal(axe._audit.rules[0].id, 'bob');
		assert.equal(axe._audit.rules[0].selector, 'fail');
	});
});
