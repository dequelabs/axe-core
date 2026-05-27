describe('axe.utils.processMessage', () => {
  const original = axe._audit;

  beforeEach(() => {
    axe._audit = {
      data: {
        incompleteFallbackMessage: 'fallback message'
      }
    };
  });

  after(() => {
    axe._audit = original;
  });

  it('should replace a ${data}', () => {
    const message = 'Hello ${data}';
    const output = axe.utils.processMessage(message, 'World!');
    assert.equal(output, 'Hello World!');
  });

  it('should replace a ${ data } (with whitespace)', () => {
    const message = 'Hello ${ data }';
    const output = axe.utils.processMessage(message, 'World!');
    assert.equal(output, 'Hello World!');
  });

  it('should replace ${data.prop}', () => {
    const message = 'Hello ${data.world}';
    const output = axe.utils.processMessage(message, { world: 'World!' });
    assert.equal(output, 'Hello World!');
  });

  it('should replace ${data.prop}', () => {
    const message = 'Hello ${data.world}';
    const output = axe.utils.processMessage(message, { world: undefined });
    assert.equal(output, 'Hello ');
  });

  it('should replace ${ data.prop } (with whitespace)', () => {
    const message = 'Hello ${ data.world }';
    const output = axe.utils.processMessage(message, { world: 'World!' });
    assert.equal(output, 'Hello World!');
  });

  describe('data is array', () => {
    it('should replace ${data.values} with comma separated list of values', () => {
      const message = 'Output: ${data.values}';
      const output = axe.utils.processMessage(message, ['one', 'two']);
      assert.equal(output, 'Output: one, two');
    });

    it('should handle singular message', () => {
      const message = {
        singular: 'Singular message: ${data.values}',
        plural: 'Plural messages: ${ data.values }'
      };
      const output = axe.utils.processMessage(message, ['one']);
      assert.equal(output, 'Singular message: one');
    });

    it('should handle plural message', () => {
      const message = {
        singular: 'Singular message: ${data.values}',
        plural: 'Plural messages: ${ data.values }'
      };
      const output = axe.utils.processMessage(message, ['one', 'two']);
      assert.equal(output, 'Plural messages: one, two');
    });
  });

  describe('message is object', () => {
    it('should handle message based on messageKey', () => {
      const message = {
        prop1: 'prop1 message',
        prop2: 'prop2 message'
      };
      const output = axe.utils.processMessage(message, { messageKey: 'prop2' });
      assert.equal(output, 'prop2 message');
    });

    it('should replace ${data}', () => {
      const message = {
        prop1: 'prop1 message',
        prop2: '${data.world} message'
      };
      const output = axe.utils.processMessage(message, {
        messageKey: 'prop2',
        world: 'World!'
      });
      assert.equal(output, 'World! message');
    });

    it('should use default message', () => {
      const message = {
        default: 'default message',
        prop1: 'prop1 message',
        prop2: 'prop2 message'
      };
      const output = axe.utils.processMessage(message);
      assert.equal(output, 'default message');
    });

    it('should use fallback message if no default', () => {
      const message = {
        prop1: 'prop1 message',
        prop2: 'prop2 message'
      };
      const output = axe.utils.processMessage(message);
      assert.equal(output, 'fallback message');
    });
  });
});
