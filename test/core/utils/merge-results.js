describe('axe.utils.mergeResults', function() {
	'use strict';
	it('should normalize empty results', function() {
		var result = axe.utils.mergeResults([
			{ results: [] },
			{ results: [{ id: 'a', result: 'b' }] }
		]);
		assert.deepEqual(result, [
			{
				id: 'a',
				result: 'b'
			}
		]);
	});

	it('merges frame content, including all selector types', function() {
		var iframe = document.createElement('iframe');
		iframe.id = 'myframe';
		var node = {
			selector: ['#foo'],
			xpath: ['html/#foo'],
			ancestry: ['html > div']
		};
		var result = axe.utils.mergeResults([
			{
				frame: '#myframe',
				frameElement: iframe,
				results: [
					{
						id: 'a',
						result: 'b',
						nodes: [{ node: node }]
					}
				]
			}
		]);

		assert.lengthOf(result, 1);
		assert.lengthOf(result[0].nodes, 1);

		var node = result[0].nodes[0].node;
		assert.deepEqual(node.selector, ['#myframe', '#foo']);
		assert.deepEqual(node.xpath, ['/iframe', 'html/#foo']);
		assert.deepEqual(node.ancestry, ['iframe', 'html > div']);
	});
});
