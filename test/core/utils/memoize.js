describe('axe.utils.memoize', () => {
  it('should add the function to axe._memoizedFns', () => {
    const length = axe._memoizedFns.length;

    axe.utils.memoize(() => {});
    assert.equal(axe._memoizedFns.length, length + 1);
  });

  describe('memoizeObjectArgs', () => {
    it('should add the function to axe._memoizedFns', () => {
      const length = axe._memoizedFns.length;

      axe.utils.memoizeObjectArgs(() => {});
      assert.equal(axe._memoizedFns.length, length + 1);
    });

    it('should memoize function with primitives', () => {
      const spy = sinon.spy();
      const memoized = axe.utils.memoizeObjectArgs(spy);
      memoized(1, '2', 'three');
      memoized(1, '2', 'three');
      memoized(1, '2', 'three');
      assert.equal(spy.callCount, 1);
    });

    it('should memoize function with object', () => {
      const spy = sinon.spy();
      const memoized = axe.utils.memoizeObjectArgs(spy);
      memoized(1, '2', { one: 1 });
      memoized(1, '2', { one: 1 });
      memoized(1, '2', { one: 1 });
      assert.equal(spy.callCount, 1);
    });

    it('should not cache unique object values', () => {
      const spy = sinon.spy();
      const memoized = axe.utils.memoizeObjectArgs(spy);
      memoized(1, '2', { one: 1 });
      memoized(1, '2', { one: 2 });
      memoized(1, '2', { one: '1' });
      assert.equal(spy.callCount, 3);
    });

    it('should work with arrays', () => {
      const spy = sinon.spy();
      const memoized = axe.utils.memoizeObjectArgs(spy);
      const array = [1, 2];
      memoized(1, '2', array);
      memoized(1, '2', array);
      assert.equal(spy.callCount, 1);

      memoized(1, '2', [1, 2]);
      assert.equal(spy.callCount, 2);
    });

    it('should work with null values', () => {
      const spy = sinon.spy();
      const memoized = axe.utils.memoizeObjectArgs(spy);
      memoized(1, null);
      memoized(1, null);
      assert.equal(spy.callCount, 1);
    });

    it('should work with undefined values', () => {
      const spy = sinon.spy();
      const memoized = axe.utils.memoizeObjectArgs(spy);
      memoized(1, undefined);
      memoized(1, undefined);
      assert.equal(spy.callCount, 1);
    });

    it('should work with no parameters', () => {
      const spy = sinon.spy();
      const memoized = axe.utils.memoizeObjectArgs(spy);
      memoized();
      memoized();
      memoized(undefined);
      assert.equal(spy.callCount, 1);
    });

    it('should work with functions', () => {
      const spy = sinon.spy();
      const memoized = axe.utils.memoizeObjectArgs(spy);
      const foo = () => {};
      memoized(1, foo);
      memoized(1, foo);
      assert.equal(spy.callCount, 1);

      memoized(1, () => {});
      assert.equal(spy.callCount, 2);
    });

    it('should work with classes', () => {
      const spy = sinon.spy();
      const memoized = axe.utils.memoizeObjectArgs(spy);
      class FooClass {}
      const foo = new FooClass();
      memoized(1, foo);
      memoized(1, foo);
      assert.equal(spy.callCount, 1);

      memoized(1, new FooClass());
      assert.equal(spy.callCount, 2);
    });

    it('should work missing args', () => {
      const spy = sinon.spy();
      const memoized = axe.utils.memoizeObjectArgs(spy);
      memoized(1);
      memoized(1, undefined);
      assert.equal(spy.callCount, 1);
    });

    it('should work with nested objects', () => {
      const spy = sinon.spy();
      const memoized = axe.utils.memoizeObjectArgs(spy);
      memoized(1, { one: 1, two: { three: 3 } });
      memoized(1, { one: 1, two: { three: 3 } });
      assert.equal(spy.callCount, 1);
    });

    it('should work with nested objects with functions', () => {
      const spy = sinon.spy();
      const memoized = axe.utils.memoizeObjectArgs(spy);
      const foo = () => {};
      memoized(1, { one: 1, two: { three: foo } });
      memoized(1, { one: 1, two: { three: foo } });
      assert.equal(spy.callCount, 1);

      memoized(1, { one: 1, two: {} });
      assert.equal(spy.callCount, 2);
    });
  });
});
