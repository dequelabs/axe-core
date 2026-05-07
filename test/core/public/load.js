describe('axe._load', () => {
  const fixture = document.querySelector('#fixture');
  const captureError = axe.testUtils.captureError;

  afterEach(() => {
    axe._audit = null;
  });

  it('should be a function', () => {
    assert.isFunction(axe._load);
  });

  it('should push rules on the Audit', () => {
    const mockAudit = {
      rules: [{ id: 'monkeys' }, { id: 'bananas' }]
    };

    axe._load(mockAudit);
    // TODO: this does not work yet thanks to webpack
    // assert.instanceOf(axe._audit.rules[0], Rule);
    // assert.instanceOf(axe._audit.rules[1], Rule);
    assert.equal(axe._audit.rules[0].id, 'monkeys');
    assert.equal(axe._audit.rules[1].id, 'bananas');
  });

  it('should load with a lang', () => {
    axe._load({
      lang: 'ja'
    });
    assert.equal(axe._audit.lang, 'ja');
  });

  describe('respondable subscriber', () => {
    it('should add a respondable subscriber for axe.ping', done => {
      const winParent = window.parent;
      const mockAudit = {
        rules: [{ id: 'monkeys' }, { id: 'bananas' }]
      };

      axe._load(mockAudit);

      const frame = document.createElement('iframe');
      frame.src = '../mock/frames/test.html';
      frame.addEventListener('load', () => {
        const win = frame.contentWindow;
        window.parent = win;
        win.postMessage = captureError(message => {
          const data = JSON.parse(message);
          assert.deepEqual(data.payload, { axe: true });
          window.parent = winParent;
          done();
        }, done);
        axe.utils.respondable(win, 'axe.ping', { axe: true });
      });

      fixture.appendChild(frame);
    });

    describe('given command rules', () => {
      // todo: see issue - https://github.com/dequelabs/axe-core/issues/2168
      it.skip('should call `runRules` and default context to empty object', done => {
        const mockAudit = {
          rules: []
        };
        const origSub = window.utils.respondable.subscribe;
        const orig = window.runRules;
        window.runRules = (context, options, callback) => {
          assert.deepEqual(context, {});
          assert.isFunction(callback);
          done();
        };

        axe.utils.respondable.subscribe = (topic, callback) => {
          callback(
            { data: 'iscool', command: 'rules' },
            undefined,
            response => {
              // ping callback will call this response function
              assert.ok(response);
            }
          );
        };
        axe._load(mockAudit);

        window.utils.respondable.subscribe = origSub;
        window.runRules = orig;
      });

      // todo: see issue - https://github.com/dequelabs/axe-core/issues/2168
      it.skip('should pass data.context to `runRules`', done => {
        const origSub = window.utils.respondable.subscribe;
        const orig = window.runRules;
        window.runRules = (context, options, callback) => {
          assert.deepEqual(context, { include: ['monkeys'] });
          assert.isFunction(callback);
          done();
        };

        axe.utils.respondable.subscribe = (topic, callback) => {
          callback(
            { command: 'rules', context: { include: ['monkeys'] } },
            undefined,
            response => {
              assert.ok(response);
            }
          );
        };
        axe._load({
          rules: []
        });

        window.utils.respondable.subscribe = origSub;
        window.runRules = orig;
      });

      // todo: see issue - https://github.com/dequelabs/axe-core/issues/2168
      it.skip('should default include to current document if none are found', done => {
        const origSub = axe.utils.respondable.subscribe;
        const orig = window.runRules;
        const expected = { include: [document] };
        window.runRules = context => {
          assert.deepEqual(context, expected);
          done();
        };

        axe.utils.respondable.subscribe = (topic, callback) => {
          callback(
            { command: 'rules', context: { include: [] } },
            undefined,
            () => {}
          );
        };
        axe._load({
          rules: []
        });
        window.runRules = orig;
        axe.utils.respondable.subscribe = origSub;
      });
    });

    describe('given command cleanup-plugins', () => {
      // todo: see issue - https://github.com/dequelabs/axe-core/issues/2168
      it.skip('should call `cleanup`', done => {
        const mockAudit = {
          rules: []
        };
        const origSub = window.utils.respondable.subscribe;
        const orig = window.cleanup;
        window.cleanup = callback => {
          assert.isFunction(callback);
          done();
        };

        axe.utils.respondable.subscribe = (topic, callback) => {
          callback(
            {
              command: 'cleanup-plugin'
            },
            undefined,
            response => {
              // ping callback will call this response function
              assert.ok(response);
            }
          );
        };
        axe._load(mockAudit);

        window.utils.respondable.subscribe = origSub;
        window.cleanup = orig;
      });
    });
  });
});
