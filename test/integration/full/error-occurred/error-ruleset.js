window.assertIsErrorOccurred = function (result, { message, target }) {
  assert.isDefined(result);
  assert.isDefined(result.error);
  assert.include(result.error.message, message);
  assert.isDefined(result.error.method);
  // errorNode is not included as it can be unsafe to serialize
  assert.isUndefined(result.error.errorNode);
  assert.isUndefined(result.errorNode);

  assert.lengthOf(result.nodes, 1);
  const node = result.nodes[0];
  assert.lengthOf(node.any, 0);
  assert.lengthOf(node.all, 0);
  assert.lengthOf(node.none, 1);
  assert.equal(node.none[0].id, 'error-occurred');
  assert.include(node.none[0].message, 'Axe encountered an error');
  assert.deepEqual(node.none[0].data, result.error);
  assert.deepEqual(node.target, target);
  assert.isDefined(node.html);
};

axe.configure({
  rules: [
    {
      id: 'matches-error',
      selector: '#target',
      matches: () => {
        throw new Error('matches error');
      },
      any: ['exists']
    },
    {
      id: 'evaluate-error',
      selector: '#target',
      any: ['check-evaluate-error']
    },
    {
      id: 'after-error',
      selector: '#target',
      any: ['check-after-error']
    }
  ],
  checks: [
    {
      id: 'check-evaluate-error',
      evaluate: () => {
        throw new Error('evaluate error');
      },
      after: () => {
        throw new Error('I should not be seen');
      }
    },
    {
      id: 'check-after-error',
      evaluate: () => true,
      after: () => {
        throw new Error('after error');
      }
    }
  ]
});
