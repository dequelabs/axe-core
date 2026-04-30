describe('frameMessenger', () => {
  let stub;

  after(() => {
    stub.restore();
  });

  it('should call into axe.utils.respondable.updateMessenger', () => {
    stub = sinon.stub(axe.utils.respondable, 'updateMessenger');
    axe.frameMessenger();
    assert.isTrue(stub.called);
  });
});
