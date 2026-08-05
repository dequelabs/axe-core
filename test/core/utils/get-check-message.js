describe('axe.utils.getCheckMessage', () => {
  const getCheckMessage = axe.utils.getCheckMessage;

  beforeEach(() => {
    axe._audit = {
      data: {
        checks: {
          'my-check': {
            messages: {
              pass: 'Pass message',
              fail: 'Fail message',
              incomplete: 'Incomplete message'
            }
          }
        }
      }
    };
  });

  afterEach(() => {
    axe._audit = undefined;
  });

  it('should return the pass message', () => {
    assert.equal(getCheckMessage('my-check', 'pass'), 'Pass message');
  });

  it('should return the fail message', () => {
    assert.equal(getCheckMessage('my-check', 'fail'), 'Fail message');
  });

  it('should return the incomplete message', () => {
    assert.equal(
      getCheckMessage('my-check', 'incomplete'),
      'Incomplete message'
    );
  });

  it('should handle data', () => {
    axe._audit.data.checks['my-check'].messages.pass =
      'Pass message with ${data.message}';
    assert.equal(
      getCheckMessage('my-check', 'pass', { message: 'hello world!' }),
      'Pass message with hello world!'
    );
  });

  it('should error when check does not exist', () => {
    assert.throws(() => {
      getCheckMessage('invalid-check', 'pass');
    });
  });

  it('should error when check message does not exist', () => {
    assert.throws(() => {
      getCheckMessage('invalid-check', 'invalid');
    });
  });
});
