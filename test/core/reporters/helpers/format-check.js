
describe('helpers.formatCheck', function () {
	'use strict';

	it('should return id', function () {
		var result = helpers.formatCheck({
			id: 'foo',
			relatedNodes: []
		});

		assert.equal(result.id, 'foo');
	});

	it('should return impact', function () {
		var result = helpers.formatCheck({
			impact: 'foo',
			relatedNodes: []
		});

		assert.equal(result.impact, 'foo');
	});

	it('should return message', function () {
		var result = helpers.formatCheck({
			message: 'foo',
			relatedNodes: []
		});

		assert.equal(result.message, 'foo');
	});

	it('should return data', function () {
		var result = helpers.formatCheck({
			data: 'foo',
			relatedNodes: []
		});

		assert.equal(result.data, 'foo');
	});

	it('should format relatedNodes', function () {
		var result = helpers.formatCheck({
			relatedNodes: [{
				source: '<div class="foo1">',
				selector: '.foo1'
			}, {
				source: '<div class="foo2">',
				selector: '.foo2'
			}]
		});

		assert.lengthOf(result.relatedNodes, 2);
		assert.equal(result.relatedNodes[0].html, '<div class="foo1">');
		assert.equal(result.relatedNodes[0].target, '.foo1');
		assert.equal(result.relatedNodes[1].html, '<div class="foo2">');
		assert.equal(result.relatedNodes[1].target, '.foo2');
	});
});
