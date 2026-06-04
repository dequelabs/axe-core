/*global cleanup */
describe('cleanup', () => {
  function createFrames(callback) {
    let frame;
    frame = document.createElement('iframe');
    frame.src = '../mock/frames/test.html';
    frame.addEventListener('load', () => {
      setTimeout(callback, 500);
    });
    fixture.appendChild(frame);
  }

  const fixture = document.getElementById('fixture');

  const assertNotCalled = () => {
    assert.ok(false, 'Should not be called');
  };

  afterEach(() => {
    fixture.innerHTML = '';
    axe.plugins = {};
  });

  beforeEach(() => {
    axe._audit = null;
  });

  it('should throw if no audit is configured', () => {
    assert.throws(
      () => {
        axe.cleanup(document, {});
      },
      Error,
      /^No audit configured/
    );
  });

  it('should call cleanup on all plugins', done => {
    /*eslint no-unused-vars: 0*/
    let cleaned = false;
    axe._load({
      rules: []
    });
    axe.registerPlugin({
      id: 'p',
      run: () => {},
      add: function (impl) {
        this._registry[impl.id] = impl;
      },
      commands: []
    });
    axe.plugins.p.cleanup = res => {
      cleaned = true;
      res();
    };
    axe.cleanup(() => {
      assert.equal(cleaned, true);
      done();
    }, assertNotCalled);
  });

  it('should not throw exception if no arguments are provided', done => {
    let cleaned = false;
    axe._load({
      rules: []
    });
    axe.registerPlugin({
      id: 'p',
      run: () => {},
      add: function (impl) {
        this._registry[impl.id] = impl;
      },
      commands: []
    });
    axe.plugins.p.cleanup = res => {
      cleaned = true;
      res();
    };
    assert.doesNotThrow(() => {
      axe.cleanup();
      done();
    });
  });

  it('should send command to frames to cleanup', done => {
    createFrames(() => {
      axe._load({});

      const frame = fixture.querySelector('iframe');
      const win = frame.contentWindow;
      win.addEventListener('message', message => {
        const data = JSON.parse(message.data);
        if (data.topic === 'axe.start') {
          assert.deepEqual(data.payload, { command: 'cleanup-plugin' });
          done();
        }
      });

      axe.cleanup();
    });
  });
});
