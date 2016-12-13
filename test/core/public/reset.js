/*global Rule */
describe('axe.reset', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	afterEach(function () {
		fixture.innerHTML = '';
	});

	beforeEach(function () {
		axe._audit = null;
	});

	it('should throw if no audit is configured', function () {
		assert.throws(function () {
			axe.reset(function () {}, function () {});
		}, Error, /^No audit configured/);
	});

	it('should restore the default configuration', function () {
		axe._load({
			data: {
				rules: {
					bob: {
						'knows': 'not-joe'
					}
				}
			},
			rules: [{
				id: 'bob',
				selector: 'fail'
			}],
			reporter: 'v2'
		});
		assert.lengthOf(axe._audit.rules, 1);
		assert.instanceOf(axe._audit.rules[0], Rule);
		assert.equal(axe._audit.rules[0].id, 'bob');
		assert.equal(axe._audit.rules[0].selector, 'fail');
		assert.equal(axe._audit.reporter, 'v2');

		axe.configure({
			rules: [{
				id: 'bob',
				selector: 'pass',
				metadata: {
					knows: 'joe'
				}
			}],
			reporter: 'raw'
		});
		assert.lengthOf(axe._audit.rules, 1);
		assert.instanceOf(axe._audit.rules[0], Rule);
		assert.equal(axe._audit.rules[0].id, 'bob');
		assert.equal(axe._audit.rules[0].selector, 'pass');
		assert.equal(axe._audit.reporter, 'raw');
		assert.equal(axe._audit.data.rules.bob.knows, 'joe');

		axe.reset();

		assert.lengthOf(axe._audit.rules, 1);
		assert.instanceOf(axe._audit.rules[0], Rule);
		assert.equal(axe._audit.rules[0].id, 'bob');
		assert.equal(axe._audit.rules[0].selector, 'fail');
		assert.equal(axe._audit.reporter, 'v2');
		assert.equal(axe._audit.data.rules.bob.knows, 'not-joe');
	});

});
