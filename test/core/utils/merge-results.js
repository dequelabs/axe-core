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

	it('sorts results from iframes into their correct DOM position', function() {
		var iframe1 = document.createElement('iframe');
		iframe1.id = 'iframe1';
		var iframe2 = document.createElement('iframe');
		iframe2.id = 'iframe2';
		var h1 = document.createElement('h1');
		var h4 = document.createElement('h4');
		var fixture = document.querySelector('#fixture');

		fixture.appendChild(h1);
		fixture.appendChild(iframe1);
		fixture.appendChild(iframe2);
		fixture.appendChild(h4);

		var result = axe.utils.mergeResults([
			{
				results: [
					{
						id: 'a',
						result: 'a',
						nodes: [
							{
								node: {
									selector: ['h1'],
									element: h1
								}
							}
						]
					},
					{
						id: 'a',
						result: 'd',
						nodes: [
							{
								node: {
									selector: ['h4'],
									element: h4
								}
							}
						]
					},
					{
						id: 'a',
						result: 'b',
						nodes: [
							{
								node: {
									selector: ['iframe1'],
									element: iframe1,
									_fromFrame: true
								}
							}
						]
					},
					{
						id: 'a',
						result: 'c',
						nodes: [
							{
								node: {
									selector: ['iframe2'],
									element: iframe2,
									_fromFrame: true
								}
							}
						]
					}
				]
			}
		]);

		var ids = result[0].nodes.map(function(el) {
			return el.node.selector;
		});

		assert.deepEqual(ids, [['h1'], ['iframe1'], ['iframe2'], ['h4']]);
	});
});
