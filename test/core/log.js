describe('axe.log', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should be a function', () => {
    assert.isFunction(axe.log);
  });

  it('should invoke console.log', () => {
    let spy;
    if (!window.console) {
      spy = sinon.stub();
      window.console = { log: spy };
    } else {
      spy = sinon.stub(console, 'log');
    }
    const expected = ['hi', 'hello'];

    axe.log.apply(axe.log, expected);
    assert.isTrue(spy.called);
    assert.isTrue(spy.calledWith(expected[0], expected[1]));
  });
});
