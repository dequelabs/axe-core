describe('axe.utils.extend', () => {
  it('should merge properties', () => {
    const src = {
      cats: 'fail',
      dogs: 'fail'
    };

    axe.utils.extendMetaData(src, {
      cats: 'meow',
      dogs: 'woof'
    });
    assert.equal(Object.keys(src).length, 2);
    assert.equal(src.cats, 'meow');
    assert.equal(src.dogs, 'woof');
  });

  it('should execute any found functions', () => {
    const src = {
      cats: 'fail',
      dogs: 'fail'
    };
    axe.utils.extendMetaData(src, {
      cats: ctxt => {
        assert.equal(ctxt, src);
        return 'meow';
      },
      dogs: 'woof'
    });
    assert.equal(Object.keys(src).length, 2);
    assert.equal(src.cats, 'meow');
    assert.equal(src.dogs, 'woof');
  });
  it('should catch exceptions in functions and default to `null`', () => {
    const src = {
      cats: 'fail',
      dogs: 'fail'
    };
    axe.utils.extendMetaData(src, {
      cats: () => {
        throw new Error('hehe');
      },
      dogs: 'woof'
    });
    assert.equal(Object.keys(src).length, 2);
    assert.isNull(src.cats);
    assert.equal(src.dogs, 'woof');
  });
});
