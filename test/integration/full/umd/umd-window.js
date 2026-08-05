/*global Promise */
describe('UMD window', () => {
  it('should expose axe as a property of window', () => {
    assert.property(window, 'axe');
  });

  it('should expose Promise as a property of window', () => {
    assert.property(window, 'Promise');
  });

  it('should resolve Promise(s)', done => {
    const p1 = new Promise(resolve => {
      setTimeout(() => {
        resolve('Hello');
      });
    });
    const p2 = new Promise(resolve => {
      setTimeout(() => {
        resolve('World!');
      });
    });
    Promise.all([p1, p2])
      .then(values => {
        assert.lengthOf(values, 2);
        assert.equal(values.join(' '), 'Hello World!');
        done();
      })
      .catch(() => {
        done(new Error('Expected to resolve.'));
      });
  });
  it('should reject Promise', done => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Boom!'));
      });
    })
      .then(() => {
        done(new Error('Expected to reject.'));
      })
      .catch(err => {
        assert.isDefined(err);
        done();
      });
  });

  it('should ensure axe has prototype chained keys', () => {
    assert.hasAnyKeys(axe, ['utils', 'commons', 'core']);
  });
});
