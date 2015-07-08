describe('helpers.formatRuleResult', function () {
	'use strict';

	it('should return id', function () {
		var result = helpers.formatRuleResult({
			id: 'foo'
		});

		assert.equal(result.id, 'foo');
	});

	it('should return description', function () {
		var result = helpers.formatRuleResult({
			description: 'foo'
		});

		assert.equal(result.description, 'foo');
	});

	it('should return help', function () {
		var result = helpers.formatRuleResult({
			help: 'foo'
		});

		assert.equal(result.help, 'foo');
	});

	it('should return helpUrl', function () {
		var result = helpers.formatRuleResult({
			helpUrl: 'foo'
		});

		assert.equal(result.helpUrl, 'foo');
	});

	it('should default helpUrl to null', function () {
		var result = helpers.formatRuleResult({});

		assert.isNull(result.helpUrl);
	});

	it('should set impact to null', function () {
		var result = helpers.formatRuleResult({
			impact: 'bob'
		});

		assert.isNull(result.helpUrl);
	});

	it('should return tags', function () {
		var result = helpers.formatRuleResult({
			tags: 'foo'
		});

		assert.equal(result.tags, 'foo');
	});

	it('should set nodes to an empty array', function () {
		var result = helpers.formatRuleResult({
			nodes: 'should not respect'
		});

		assert.isArray(result.nodes);
		assert.lengthOf(result.nodes, 0);
	});
});
