describe('landmark-is-unique-after', () => {
  const checkContext = axe.testUtils.MockCheckContext();
  function createResult(result, data) {
    return {
      result: result,
      data: data
    };
  }

  function createResultWithSameRelatedNodes(result, data) {
    return Object.assign(createResult(result, data), {
      relatedNodes: [createResult(result, data)]
    });
  }

  function createResultWithProvidedRelatedNodes(result, data, relatedNodes) {
    return Object.assign(createResult(result, data), {
      relatedNodes: relatedNodes
    });
  }

  afterEach(() => {
    axe._tree = undefined;
    checkContext.reset();
  });

  it('should update duplicate landmarks with failed result', () => {
    const result = checks['landmark-is-unique'].after([
      createResultWithSameRelatedNodes(true, {
        role: 'some role',
        accessibleText: 'some accessibleText'
      }),
      createResultWithSameRelatedNodes(true, {
        role: 'some role',
        accessibleText: 'some accessibleText'
      }),
      createResultWithSameRelatedNodes(true, {
        role: 'different role',
        accessibleText: 'some accessibleText'
      }),
      createResultWithSameRelatedNodes(true, {
        role: 'some role',
        accessibleText: 'different accessibleText'
      })
    ]);

    const expectedResult = [
      createResultWithProvidedRelatedNodes(
        false,
        {
          role: 'some role',
          accessibleText: 'some accessibleText'
        },
        [
          createResult(true, {
            role: 'some role',
            accessibleText: 'some accessibleText'
          })
        ]
      ),
      createResultWithProvidedRelatedNodes(
        true,
        {
          role: 'different role',
          accessibleText: 'some accessibleText'
        },
        []
      ),
      createResultWithProvidedRelatedNodes(
        true,
        {
          role: 'some role',
          accessibleText: 'different accessibleText'
        },
        []
      )
    ];
    assert.deepEqual(result, expectedResult);
  });

  it('should not fail labelled landmarks with identical content', () => {
    const data = {
      role: 'navigation',
      accessibleText: 'search results',
      contentHash: 'abc'
    };
    const result = checks['landmark-is-unique'].after([
      createResultWithSameRelatedNodes(true, data),
      createResultWithSameRelatedNodes(true, data)
    ]);

    assert.deepEqual(result, [
      createResultWithProvidedRelatedNodes(true, data, []),
      createResultWithProvidedRelatedNodes(true, data, [])
    ]);
  });

  it('should fail labelled landmarks when any of them has different content', () => {
    const data = {
      role: 'navigation',
      accessibleText: 'search results',
      contentHash: 'abc'
    };
    const otherData = Object.assign({}, data, { contentHash: 'xyz' });
    const result = checks['landmark-is-unique'].after([
      createResultWithSameRelatedNodes(true, data),
      createResultWithSameRelatedNodes(true, data),
      createResultWithSameRelatedNodes(true, otherData)
    ]);

    assert.deepEqual(result, [
      createResultWithProvidedRelatedNodes(false, data, [
        createResult(true, data),
        createResult(true, otherData)
      ])
    ]);
  });

  it('should fail landmarks without a content hash', () => {
    const data = {
      role: 'navigation',
      accessibleText: 'search results'
    };
    const result = checks['landmark-is-unique'].after([
      createResultWithSameRelatedNodes(true, data),
      createResultWithSameRelatedNodes(true, data)
    ]);

    assert.deepEqual(result, [
      createResultWithProvidedRelatedNodes(false, data, [
        createResult(true, data)
      ])
    ]);
  });

  it('should not fail three or more labelled landmarks with identical content', () => {
    const data = {
      role: 'navigation',
      accessibleText: 'search results',
      contentHash: 'abc'
    };
    const result = checks['landmark-is-unique'].after([
      createResultWithSameRelatedNodes(true, data),
      createResultWithSameRelatedNodes(true, data),
      createResultWithSameRelatedNodes(true, data)
    ]);

    assert.deepEqual(result, [
      createResultWithProvidedRelatedNodes(true, data, []),
      createResultWithProvidedRelatedNodes(true, data, []),
      createResultWithProvidedRelatedNodes(true, data, [])
    ]);
  });

  it('should keep the order of results', () => {
    const navData = {
      role: 'navigation',
      accessibleText: 'search results',
      contentHash: 'abc'
    };
    const mainData = { role: 'main', accessibleText: null };
    const result = checks['landmark-is-unique'].after([
      createResultWithSameRelatedNodes(true, navData),
      createResultWithSameRelatedNodes(true, mainData),
      createResultWithSameRelatedNodes(true, navData)
    ]);

    assert.deepEqual(result, [
      createResultWithProvidedRelatedNodes(true, navData, []),
      createResultWithProvidedRelatedNodes(true, mainData, []),
      createResultWithProvidedRelatedNodes(true, navData, [])
    ]);
  });
});
