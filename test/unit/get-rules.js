describe('dqre.getRules', function () {
	'use strict';

	beforeEach(function () {
		dqre.configure({messages: [], rules: [{
			id: 'awesomeRule1',
			selector: '',
			excludeHidden: false,
			checks: [],
			tags: [ 'tag1']
		}, {
			id: 'awesomeRule2',
			checks: [ ],
			tags: [ 'tag1', 'tag2' ]
		}], data: {rules: { awesomeRule1: {description: 'some interesting information'}, awesomeRule2: {description: 'also some interesting information'}}}});
	});

	afterEach(function () {
		dqre.audit = null;
	});

	it('should return rules', function () {
		var retValue = dqre.getRules(['tag1']);
		assert.isArray(retValue);
		assert.lengthOf(retValue, 2);
		assert.equal(retValue[0].ruleId, 'awesomeRule1');
		assert.equal(retValue[0].description, 'some interesting information');
		assert.equal(retValue[1].ruleId, 'awesomeRule2');
		assert.equal(retValue[1].description, 'also some interesting information');

		retValue = dqre.getRules(['tag2']);
		assert.isArray(retValue);
		assert.lengthOf(retValue, 1);
		assert.equal(retValue[0].ruleId, 'awesomeRule2');
		assert.equal(retValue[0].description, 'also some interesting information');
	});

	it('should not return nothing', function () {
		var retValue = dqre.getRules(['bob']);
		assert.isArray(retValue);
		assert.lengthOf(retValue, 0);
	});

});
