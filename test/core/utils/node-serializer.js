describe('nodeSerializer', () => {
  const { nodeSerializer, DqElement } = axe.utils;
  const fixture = document.querySelector('#fixture');
  beforeEach(() => {
    axe.setup();
  });

  afterEach(() => {
    nodeSerializer(null);
  });

  describe('.toSpec()', () => {
    it('returns DqElement.toJSON() by default', () => {
      const spec = nodeSerializer.toSpec(fixture);
      const dqElm = new DqElement(fixture);
      assert.deepEqual(spec, dqElm.toJSON());
    });

    it('can be replaced with nodeSerializer({ toSpec: fn })', () => {
      nodeSerializer({
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

  describe('.combineSpecs()', () => {
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
      const combinedSpec = nodeSerializer.combineSpecs(nodeSpec, frameSpec);
      assert.deepEqual(combinedSpec, DqElement.mergeSpecs(nodeSpec, frameSpec));
    });

    it('can be replaced with nodeSerializer({ combineSpecs: fn })', () => {
      nodeSerializer({
        combineSpecs(childSpec, parentSpec) {
          const spec = DqElement.mergeSpecs(childSpec, parentSpec);
          spec.source = 'Replaced';
          return spec;
        }
      });
      const spec = nodeSerializer.combineSpecs(nodeSpec, frameSpec);
      assert.deepEqual(spec, {
        ...DqElement.mergeSpecs(nodeSpec, frameSpec),
        source: 'Replaced'
      });
    });
  });
});
