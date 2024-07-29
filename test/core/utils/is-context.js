describe('axe.utils isContext* methods', () => {
  const { isContextProp, isContextObject, isContextSpec } = axe.utils;

  const methods = [
    { name: 'isLabelledShadowDomSelector', prop: 'fromShadowDom' },
    { name: 'isLabelledFramesSelector', prop: 'fromFrames' }
  ];

  methods.forEach(({ name, prop }) => {
    describe(name, () => {
      const method = axe.utils[name];
      it(`is true for an object with '${prop}'`, () => {
        assert.isTrue(method({ [prop]: true }));
      });

      it('is false for an object without `fromShadowDom`', () => {
        assert.isFalse(method({}));
      });

      it('is false for non-objects', () => {
        assert.isFalse(method('string'));
        assert.isFalse(method(1));
        assert.isFalse(method([]));
        assert.isFalse(method(null));
      });

      it('is false if the property comes from the prototype', () => {
        assert.isFalse(method(Object.create({ [prop]: true })));
      });
    });
  });

  describe('isContextProp', () => {
    it('is true for a string', () => {
      assert.isTrue(isContextProp('string'));
    });

    it('is true for a Node', () => {
      assert.isTrue(isContextProp(document.createElement('div')));
    });

    it('is true for an array', () => {
      assert.isTrue(isContextProp([]));
    });

    it('is true for an object with .length', () => {
      assert.isTrue(isContextProp({ length: 1 }));
    });

    it('is true for an object with `fromFrames`', () => {
      assert.isTrue(isContextProp({ fromFrames: true }));
    });

    it('is true for an object with `fromShadowDom`', () => {
      assert.isTrue(isContextProp({ fromShadowDom: true }));
    });

    it('is false for other objects', () => {
      assert.isFalse(isContextProp({}));
      assert.isFalse(isContextProp({ exclude: [] }));
      assert.isFalse(isContextProp({ include: true }));
      assert.isFalse(isContextProp({ runOnly: 'rules' }));
    });

    it('is false for other types', () => {
      assert.isFalse(isContextProp(1));
      assert.isFalse(isContextProp(null));
      assert.isFalse(isContextProp(undefined));
    });
  });

  describe('isContextObject', () => {
    it('is false if not an object `include` or `exclude`', () => {
      assert.isFalse(isContextObject(true));
      assert.isFalse(isContextObject(null));
      assert.isFalse(isContextObject(1));
      assert.isFalse(isContextObject({ foo: 'bar' }));
    });

    it('is true for an object with `include` with a context prop', () => {
      assert.isTrue(isContextObject({ include: 'string' }));
      assert.isTrue(
        isContextObject({ include: document.createElement('div') })
      );
      assert.isTrue(isContextObject({ include: [] }));
      assert.isTrue(isContextObject({ include: { length: 1 } }));
      assert.isTrue(isContextObject({ include: { fromFrames: true } }));
      assert.isTrue(isContextObject({ include: { fromShadowDom: true } }));
    });

    it('is false for an object with `include` that is not a context prop', () => {
      assert.isFalse(isContextObject({ include: false }));
      assert.isFalse(isContextObject({ include: null }));
      assert.isFalse(isContextObject({ include: 123 }));
      assert.isFalse(isContextObject({ include: { something: 'else' } }));
    });

    it('is true for an object with `exclude` with a context prop', () => {
      assert.isTrue(isContextObject({ exclude: 'string' }));
      assert.isTrue(
        isContextObject({ exclude: document.createElement('div') })
      );
      assert.isTrue(isContextObject({ exclude: [] }));
      assert.isTrue(isContextObject({ exclude: { length: 1 } }));
      assert.isTrue(isContextObject({ exclude: { fromFrames: true } }));
      assert.isTrue(isContextObject({ exclude: { fromShadowDom: true } }));
    });

    it('is false for an object with `exclude` that is not a context prop', () => {
      assert.isFalse(isContextObject({ exclud: false }));
      assert.isFalse(isContextObject({ exclud: null }));
      assert.isFalse(isContextObject({ exclud: 123 }));
      assert.isFalse(isContextObject({ exclude: { something: 'else' } }));
    });

    it('is false if `include` is on the prototype', () => {
      assert.isFalse(isContextObject(Object.create({ include: 'string' })));
    });

    it('is false if `exclude` is on the prototype', () => {
      assert.isFalse(isContextObject(Object.create({ exclude: 'string' })));
    });

    it('is true for an object with both `include` and `exclude`', () => {
      assert.isTrue(isContextObject({ include: 'string', exclude: 'string' }));
    });

    it('is true for an object with a valid `include` and invalid `exclude`', () => {
      assert.isTrue(isContextObject({ include: [], exclude: 1 }));
    });

    it('is true for an object with a valid `exclude` and invalid `include`', () => {
      assert.isTrue(isContextObject({ exclude: [], include: 1 }));
    });
  });

  describe('isContextSpec', () => {
    it('is true for a context object', () => {
      assert.isTrue(isContextSpec({ include: 'string' }));
      assert.isTrue(isContextSpec({ exclude: ['string'] }));
    });

    it('is true for a context prop', () => {
      assert.isTrue(isContextSpec('string'));
    });

    it('is false for other types', () => {
      assert.isFalse(isContextSpec(true));
      assert.isFalse(isContextSpec(null));
      assert.isFalse(isContextSpec(1));
      assert.isFalse(isContextSpec({}));
      assert.isFalse(isContextSpec({ include: null }));
      assert.isFalse(isContextSpec({ runOnly: 'foo' }));
      assert.isFalse(isContextSpec(Object.create({ include: 'foo' })));
    });
  });
});
