describe('identical-links-same-purpose-after tests', () => {
  const fixture = document.getElementById('fixture');
  const check = checks['identical-links-same-purpose'];

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('returns results by clearing relatedNodes after ignoring nodes which has no data (or result is undefined)', () => {
    const nodeOneData = {
      data: null,
      relatedNodes: ['nodeOne'],
      result: undefined
    };
    const nodeTwoData = {
      data: {
        name: 'read more',
        urlProps: { hostname: 'abc.com' }
      },
      relatedNodes: ['nodeTwo'],
      result: true
    };
    const checkResults = [nodeOneData, nodeTwoData];

    const results = check.after(checkResults);
    assert.lengthOf(results, 1);

    const result = results[0];
    assert.deepEqual(result.data, nodeTwoData.data);
    assert.deepEqual(result.relatedNodes, []);
    assert.equal(result.result, true);
  });

  it('sets results of check result to `undefined` one of the native links do not have `urlProps` (and therefore removed as relatedNode)', () => {
    const nodeOneData = {
      data: {
        name: 'read more',
        urlProps: undefined
      },
      relatedNodes: ['nodeOne'],
      result: true
    };
    const nodeTwoData = {
      data: {
        name: 'read more',
        urlProps: { hostname: 'abc.com' }
      },
      relatedNodes: ['nodeTwo'],
      result: true
    };
    const checkResults = [nodeOneData, nodeTwoData];

    const results = check.after(checkResults);
    assert.lengthOf(results, 1);

    const result = results[0];
    assert.deepEqual(result.data, nodeOneData.data);
    assert.deepEqual(result.relatedNodes, ['nodeTwo']);
    assert.equal(result.result, undefined);
  });

  it('sets results of check result to `undefined` if native links do not have same `urlProps` (values are different)', () => {
    const nodeOneData = {
      data: {
        name: 'follow us',
        urlProps: { hostname: 'facebook.com' }
      },
      relatedNodes: ['nodeOne'],
      result: true
    };
    const nodeTwoData = {
      data: {
        name: 'follow us',
        urlProps: { hostname: 'instagram.com' }
      },
      relatedNodes: ['nodeTwo'],
      result: true
    };
    const checkResults = [nodeOneData, nodeTwoData];

    const results = check.after(checkResults);
    assert.lengthOf(results, 1);

    const result = results[0];
    assert.deepEqual(result.data, nodeOneData.data);
    assert.deepEqual(result.relatedNodes, ['nodeTwo']);
    assert.equal(result.result, undefined);
  });

  it('sets results of check result to `undefined` if native links do not have same `urlProps` (keys are different)', () => {
    const nodeOneData = {
      data: {
        name: 'follow us',
        urlProps: { abc: 'abc.com' }
      },
      relatedNodes: ['nodeOne'],
      result: true
    };
    const nodeTwoData = {
      data: {
        name: 'follow us',
        urlProps: { xyz: 'abc.com' }
      },
      relatedNodes: ['nodeTwo'],
      result: true
    };
    const checkResults = [nodeOneData, nodeTwoData];

    const results = check.after(checkResults);
    assert.lengthOf(results, 1);

    const result = results[0];
    assert.deepEqual(result.data, nodeOneData.data);
    assert.deepEqual(result.relatedNodes, ['nodeTwo']);
    assert.equal(result.result, undefined);
  });

  it('sets results of check result to `true` if native links serve identical purpose', () => {
    const nodeOneData = {
      data: {
        name: 'Axe Core',
        urlProps: { hostname: 'deque.com', pathname: 'axe-core' }
      },
      relatedNodes: ['nodeOne'],
      result: true
    };
    const nodeTwoData = {
      data: {
        name: 'Axe Core',
        urlProps: { hostname: 'deque.com', pathname: 'axe-core' }
      },
      relatedNodes: ['nodeTwo'],
      result: true
    };
    const checkResults = [nodeOneData, nodeTwoData];

    const results = check.after(checkResults);

    assert.lengthOf(results, 1);

    const result = results[0];
    assert.deepEqual(result.data, nodeOneData.data);
    assert.deepEqual(result.relatedNodes, ['nodeTwo']);
    assert.equal(result.result, true);
  });

  it('sets results of check result to `true` if ARIA links have different accessible names', () => {
    const nodeOneData = {
      data: {
        name: 'earth',
        urlProps: {}
      },
      relatedNodes: ['nodeOne'],
      result: true
    };

    const nodeTwoData = {
      data: {
        name: 'venus',
        urlProps: {}
      },
      relatedNodes: ['nodeTwo'],
      result: true
    };
    const checkResults = [nodeOneData, nodeTwoData];
    const results = check.after(checkResults);
    assert.lengthOf(results, 2);

    assert.deepEqual(results[0].data, nodeOneData.data);
    assert.deepEqual(results[0].relatedNodes, []);
    assert.equal(results[0].result, true);

    assert.deepEqual(results[1].data, nodeTwoData.data);
    assert.deepEqual(results[1].relatedNodes, []);
    assert.equal(results[1].result, true);
  });
});
