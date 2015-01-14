describe('utils.mergeResults', function () {
  'use strict';
  
  it('should normalize empty results', function () {
    var result = utils.mergeResults([{ results: [] }, { results: [{ id: 'a', result: 'b'}]}]);
    assert.deepEqual(result, [{
      id: 'a',
      result: 'b'
    }]);
  });
});
