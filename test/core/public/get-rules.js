describe('axe.getRules', function() {
	'use strict';

	beforeEach(function() {
		axe._load({
			messages: [],
			rules: [{
				id: 'awesomeRule1',
				selector: '',
				excludeHidden: false,
				any: [],
				tags: ['tag1']
			}, {
				id: 'awesomeRule2',
				any: [],
				tags: ['tag1', 'tag2']
			}],
			data: {
				rules: {
					awesomeRule1: {
						description: 'some interesting information',
						help: 'halp'
					},
					awesomeRule2: {
						description: 'also some interesting information',
						help: 'halp me!'
					}
				}
			}
		});
	});

	afterEach(function() {
		axe._audit = null;
	});

	it('should return rules', function() {
		var retValue = axe.getRules(['tag1']);
		assert.isArray(retValue);
		assert.lengthOf(retValue, 2);
		assert.equal(retValue[0].ruleId, 'awesomeRule1');
		assert.equal(retValue[0].description, 'some interesting information');
		assert.equal(retValue[0].help, 'halp');
		assert.equal(retValue[0].helpUrl, 'https://dequeuniversity.com/rules/axe/x.y/awesomeRule1?application=axeAPI');
		assert.deepEqual(retValue[0].tags, ['tag1']);

		assert.equal(retValue[1].ruleId, 'awesomeRule2');
		assert.equal(retValue[1].description, 'also some interesting information');
		assert.equal(retValue[1].help, 'halp me!');
		assert.equal(retValue[1].helpUrl, 'https://dequeuniversity.com/rules/axe/x.y/awesomeRule2?application=axeAPI');
		assert.deepEqual(retValue[1].tags, ['tag1', 'tag2']);

		retValue = axe.getRules(['tag2']);
		assert.isArray(retValue);
		assert.lengthOf(retValue, 1);
		assert.equal(retValue[0].ruleId, 'awesomeRule2');
		assert.equal(retValue[0].description, 'also some interesting information');
		assert.equal(retValue[0].help, 'halp me!');
		assert.equal(retValue[0].helpUrl, 'https://dequeuniversity.com/rules/axe/x.y/awesomeRule2?application=axeAPI');
		assert.deepEqual(retValue[0].tags, ['tag1', 'tag2']);
	});

	it('should not return nothing', function() {
		var retValue = axe.getRules(['bob']);
		assert.isArray(retValue);
		assert.lengthOf(retValue, 0);
	});

	it('should return all rules if given no tags - undefined', function() {
		var retValue = axe.getRules();
		assert.equal(retValue[0].ruleId, 'awesomeRule1');
		assert.equal(retValue[0].description, 'some interesting information');
		assert.equal(retValue[0].help, 'halp');
		assert.equal(retValue[0].helpUrl, 'https://dequeuniversity.com/rules/axe/x.y/awesomeRule1?application=axeAPI');
		assert.deepEqual(retValue[0].tags, ['tag1']);

		assert.equal(retValue[1].ruleId, 'awesomeRule2');
		assert.equal(retValue[1].description, 'also some interesting information');
		assert.equal(retValue[1].help, 'halp me!');
		assert.equal(retValue[1].helpUrl, 'https://dequeuniversity.com/rules/axe/x.y/awesomeRule2?application=axeAPI');
		assert.deepEqual(retValue[1].tags, ['tag1', 'tag2']);
	});

	it('should return all rules if given empty array', function() {
		var retValue = axe.getRules([]);
		assert.equal(retValue[0].ruleId, 'awesomeRule1');
		assert.equal(retValue[0].description, 'some interesting information');
		assert.equal(retValue[0].help, 'halp');
		assert.equal(retValue[0].helpUrl, 'https://dequeuniversity.com/rules/axe/x.y/awesomeRule1?application=axeAPI');
		assert.deepEqual(retValue[0].tags, ['tag1']);

		assert.equal(retValue[1].ruleId, 'awesomeRule2');
		assert.equal(retValue[1].description, 'also some interesting information');
		assert.equal(retValue[1].help, 'halp me!');
		assert.equal(retValue[1].helpUrl, 'https://dequeuniversity.com/rules/axe/x.y/awesomeRule2?application=axeAPI');
		assert.deepEqual(retValue[1].tags, ['tag1', 'tag2']);
	});

});
