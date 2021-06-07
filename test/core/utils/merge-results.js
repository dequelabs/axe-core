describe('axe.utils.mergeResults', function() {
  'use strict';
  var queryFixture = axe.testUtils.queryFixture;

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
    var iframe = queryFixture('<iframe id="target"></iframe>').actualNode;
    var node = {
      selector: ['#foo'],
      xpath: ['html/#foo'],
      ancestry: ['html > div'],
      nodeIndexes: [123]
    };
    var result = axe.utils.mergeResults([
      {
        frame: '#target',
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
    assert.deepEqual(node.selector, ['#target', '#foo']);
    assert.deepEqual(node.xpath, ['/iframe[@id=\'target\']', 'html/#foo']);
    assert.deepEqual(node.ancestry, [
      'html > body > div:nth-child(1) > iframe',
      'html > div'
    ]);
    assert.deepEqual(node.nodeIndexes, [1, 123]);
  });

  it('sorts results from iframes into their correct DOM position', function() {
    var result = axe.utils.mergeResults([{
      results: [{
          id: 'a',
          result: 'a',
          nodes: [{
            node: {
              selector: ['h1'],
              nodeIndexes: [1]
            }
          }]
        }, {
          id: 'a',
          result: 'd',
          nodes: [{
            node: {
              selector: ['h4'],
              nodeIndexes: [4]
            }
          }]
        }, {
          id: 'a',
          result: 'b',
          nodes: [{
            node: {
              selector: ['iframe1', 'h2'],
              nodeIndexes: [2, 1],
              fromFrame: true
            }
          }]
        }, {
          id: 'a',
          result: 'c',
          nodes: [{
            node: {
              selector: ['iframe1', 'h3'],
              nodeIndexes: [2, 2],
              fromFrame: true
            }
          }]
        }
      ]
    }]);

    var ids = result[0].nodes.map(function(el) {
      return el.node.selector.join(' >> ');
    });
    assert.deepEqual(ids, ['h1', 'iframe1 >> h2', 'iframe1 >> h3', 'h4']);
  });
});
