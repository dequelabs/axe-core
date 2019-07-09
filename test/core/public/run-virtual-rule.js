describe('axe.runVirtualRule', function() {
	'use strict';

	var origRunRules = axe._runRules;
	var vNode = {
		shadowId: undefined,
		children: [],
		parent: undefined,
		_cache: {},
		_isHidden: null,
		_attrs: {
			type: 'text',
			autocomplete: 'not-on-my-watch'
		},
		props: {
			nodeType: 1,
			nodeName: 'input',
			id: null,
			type: 'text'
		},
		hasClass: function() {
			return false;
		},
		attr: function(attrName) {
			return this._attrs[attrName];
		},
		hasAttr: function(attrName) {
			return !!this._attrs[attrName];
		}
	};

	beforeEach(function() {
		axe._load({
			rules: [
				{
					id: 'test',
					selector: '*',
					none: ['fred']
				}
			],
			checks: [
				{
					id: 'fred',
					evaluate: function() {
						return true;
					}
				}
			]
		});
	});

	afterEach(function() {
		axe._audit = null;
		axe._runRules = origRunRules;
	});

	it('should throw if the rule does not exist', function() {
		axe._audit.rules = [];
		function fn() {
			axe.runVirtualRule('aria-roles');
		}

		assert.throws(fn);
	});

	it('should modify the rule to not excludeHidden', function() {
		axe._audit.rules = [
			{
				id: 'aria-roles',
				excludeHidden: true,
				runSync: function() {
					assert.isFalse(this.excludeHidden);

					return {
						id: 'aria-roles',
						nodes: []
					};
				}
			}
		];

		axe.runVirtualRule('aria-roles');
	});

	it('should not modify the original rule', function() {
		axe._audit.rules = [
			{
				id: 'aria-roles',
				excludeHidden: true,
				runSync: function() {
					assert.notEqual(this, axe._audit.rules[0]);

					return {
						id: 'aria-roles',
						nodes: []
					};
				}
			}
		];

		axe.runVirtualRule('aria-roles');
	});

	it('should call rule.runSync', function() {
		var called = false;
		axe._audit.rules = [
			{
				id: 'aria-roles',
				runSync: function() {
					called = true;
					return {
						id: 'aria-roles',
						nodes: []
					};
				}
			}
		];

		axe.runVirtualRule('aria-roles');
		assert.isTrue(called);
	});

	it('should pass a virtual context to rule.runSync', function() {
		var node = {};
		axe._audit.rules = [
			{
				id: 'aria-roles',
				runSync: function(context) {
					assert.equal(typeof context, 'object');
					assert.isTrue(Array.isArray(context.include));
					assert.equal(context.include[0], node);

					return {
						id: 'aria-roles',
						nodes: []
					};
				}
			}
		];

		axe.runVirtualRule('aria-roles', node);
	});

	it('should pass through options to rule.runSync', function() {
		axe._audit.rules = [
			{
				id: 'aria-roles',
				runSync: function(context, options) {
					assert.equal(options.foo, 'bar');

					return {
						id: 'aria-roles',
						nodes: []
					};
				}
			}
		];

		axe.runVirtualRule('aria-roles', null, { foo: 'bar' });
	});

	it('should run a rule without needing actual node', function() {
		function fn() {
			axe.runVirtualRule('test', vNode);
		}
		assert.doesNotThrow(fn);
	});

	it('should return correct structure', function() {
		var results = axe.runVirtualRule('test', vNode);
		assert.isDefined(results.violations);
		assert.isDefined(results.passes);
		assert.isDefined(results.incomplete);
		assert.isDefined(results.inapplicable);
		assert.isDefined(results.testEngine);
		assert.isDefined(results.toolOptions);
	});
});
