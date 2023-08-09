describe('nodeSerializer', () => {
  const { nodeSerializer, DqElement } = axe.utils;
  const fixture = document.querySelector('#fixture');
  beforeEach(() => {
    axe.setup();
  });

  afterEach(() => {
    nodeSerializer.update(null);
  });

  describe('.toSpec()', () => {
    it('returns DqElement.toJSON() by default', () => {
      const spec = nodeSerializer.toSpec(fixture);
      const dqElm = new DqElement(fixture);
      assert.deepEqual(spec, dqElm.toJSON());
    });

    it('can be replaced with nodeSerializer.update({ toSpec: fn })', () => {
      nodeSerializer.update({
        toSpec(dqElm) {
          const json = dqElm.toJSON();
          json.source = 'Replaced';
          return json;
        }
      });

      const spec = nodeSerializer.toSpec(fixture);
      const dqElm = new DqElement(fixture);
      assert.deepEqual(spec, { ...dqElm.toJSON(), source: 'Replaced' });
    });
  });

  describe('.dqElmToSpec()', () => {
    it('returns DqElement.toJSON() by default', () => {
      const dqElm = new DqElement(fixture);
      const spec = nodeSerializer.dqElmToSpec(dqElm);
      assert.deepEqual(spec, dqElm.toJSON());
    });

    it('can be replaced with nodeSerializer.update({ toSpec: fn })', () => {
      nodeSerializer.update({
        toSpec(dqElm) {
          const json = dqElm.toJSON();
          json.source = 'Replaced';
          return json;
        }
      });

      const dqElm = new DqElement(fixture);
      const spec = nodeSerializer.dqElmToSpec(dqElm);
      assert.deepEqual(spec, { ...dqElm.toJSON(), source: 'Replaced' });
    });
  });

  describe('.mergeSpecs()', () => {
    const nodeSpec = {
      source: '<div id="fixture"></div>',
      selector: ['#fixture'],
      ancestry: ['html > body > #fixture'],
      nodeIndexes: [3],
      xpath: ['html/body/div[1]']
    };
    const frameSpec = {
      source: '<iframe></iframe>',
      selector: ['#frame'],
      ancestry: ['html > body > #frame'],
      nodeIndexes: [3],
      xpath: ['html/body/iframe[1]']
    };

    it('returns DqElement.mergeSpecs() by default', () => {
      const combinedSpec = nodeSerializer.mergeSpecs(nodeSpec, frameSpec);
      assert.deepEqual(combinedSpec, DqElement.mergeSpecs(nodeSpec, frameSpec));
    });

    it('can be replaced with nodeSerializer.update({ mergeSpecs: fn })', () => {
      nodeSerializer.update({
        mergeSpecs(childSpec, parentSpec) {
          const spec = DqElement.mergeSpecs(childSpec, parentSpec);
          spec.source = 'Replaced';
          return spec;
        }
      });
      const spec = nodeSerializer.mergeSpecs(nodeSpec, frameSpec);
      assert.deepEqual(spec, {
        ...DqElement.mergeSpecs(nodeSpec, frameSpec),
        source: 'Replaced'
      });
    });
  });

  describe('.mapRawNodeResults()', () => {
    it('returns undefined when passed undefined', () => {
      assert.isUndefined(nodeSerializer.mapRawNodeResults(undefined));
    });

    it('converts DqElements node to specs', () => {
      const dqElm = new DqElement(fixture);
      const rawNodeResults = [
        {
          any: [],
          all: [],
          none: [
            {
              id: 'nope',
              data: null,
              relatedNodes: []
            }
          ],
          node: dqElm,
          result: 'failed'
        }
      ];

      const serialized = nodeSerializer.mapRawNodeResults(rawNodeResults);
      assert.deepEqual(serialized, [
        {
          ...rawNodeResults[0],
          node: dqElm.toJSON()
        }
      ]);
    });

    it('converts DqElements relatedNodes to specs', () => {
      const dqElm = new DqElement(fixture);
      const related = new DqElement(fixture.querySelector('p'));
      const rawNodeResults = [
        {
          any: [
            {
              id: 'something',
              data: null,
              relatedNodes: [related]
            }
          ],
          all: [
            {
              id: 'everything',
              data: null,
              relatedNodes: [related]
            }
          ],
          none: [
            {
              id: 'nope',
              data: null,
              relatedNodes: [related]
            }
          ],
          node: dqElm,
          result: 'failed'
        }
      ];

      const serialized = nodeSerializer.mapRawNodeResults(rawNodeResults);
      assert.deepEqual(serialized[0].any, [
        {
          ...rawNodeResults[0].any[0],
          relatedNodes: [related.toJSON()]
        }
      ]);
      assert.deepEqual(serialized[0].all, [
        {
          ...rawNodeResults[0].all[0],
          relatedNodes: [related.toJSON()]
        }
      ]);
      assert.deepEqual(serialized[0].none, [
        {
          ...rawNodeResults[0].none[0],
          relatedNodes: [related.toJSON()]
        }
      ]);
    });
  });
});
