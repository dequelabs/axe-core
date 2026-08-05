describe('axe.utils.queue', () => {
  it('should be a function', () => {
    assert.isFunction(axe.utils.queue);
  });

  describe('defer', () => {
    it('should be a function', () => {
      const q = axe.utils.queue();
      assert.isFunction(q.defer);
    });

    it('should push onto the "axe.utils.queue"', done => {
      const q = axe.utils.queue();

      q.defer(resolve => {
        setTimeout(() => {
          resolve(1);
        }, 0);
      });

      q.defer(resolve => {
        setTimeout(() => {
          resolve(2);
        }, 0);
      });

      q.then(data => {
        assert.deepEqual(data, [1, 2]);
        done();
      });
    });

    it('should execute resolve immediately if defered functions are already complete', () => {
      const q = axe.utils.queue();
      let complete = false;

      q.defer(resolve => {
        resolve(1);
      });

      q.defer(resolve => {
        resolve(2);
      });

      q.then(data => {
        complete = true;
        assert.deepEqual(data, [1, 2]);
      });

      assert.isTrue(complete);
    });

    it('is chainable', () => {
      const q = axe.utils.queue();
      assert.equal(
        q,
        q.defer(() => {})
      );
    });

    it('throws if then was already called', () => {
      assert.throws(() => {
        const q = axe.utils.queue();
        q.defer(resolve => {
          resolve();
        });

        q.then(() => {});

        q.defer(resolve => {
          resolve();
        });
      });
    });

    it('can await another queue', done => {
      const q1 = axe.utils.queue();
      const q2 = axe.utils.queue();

      q1.defer(resolve => {
        setTimeout(() => {
          resolve(123);
        }, 10);
      });

      q2.defer(q1);
      q2.then(res => {
        // unwrap both queue results
        assert.equal(res[0][0], 123);
        done();
      });
    });
  });

  describe('then', () => {
    it('should be a function', () => {
      const q = axe.utils.queue();
      assert.isFunction(q.then);
    });

    it('should execute immediately if axe.utils.queue is complete', () => {
      const q = axe.utils.queue();
      let result = false;

      q.then(() => {
        result = true;
      });

      assert.isTrue(result);
    });

    it('is chainable', () => {
      const q = axe.utils.queue();
      assert.equal(
        q,
        q.then(() => {})
      );
    });

    it('throws when called more than once', () => {
      assert.throws(() => {
        const q = axe.utils.queue();
        q.defer(() => {});
        q.then(() => {});
        q.then(() => {});
      });
    });
  });

  describe('abort', () => {
    it('should be a function', () => {
      const q = axe.utils.queue();
      assert.isFunction(q.abort);
    });

    it('stops `then` from being called', done => {
      const q = axe.utils.queue();

      q.defer(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 100);
      });

      q.then(() => {
        assert.ok(false, 'should not execute');
      });
      q.catch(() => {});

      setTimeout(() => {
        const data = q.abort();
        assert.ok(true, 'Queue aborted');
        assert.isFunction(data[0]);
        done();
      }, 1);
    });

    it('sends a message to `catch`', done => {
      const q = axe.utils.queue();
      q.defer(() => {});

      q.then(() => {});
      q.catch(err => {
        assert.equal(err, 'Super sheep');
        done();
      });

      q.abort('Super sheep');
    });
  });

  describe('catch', () => {
    it('is called when defer throws an error', done => {
      const q = axe.utils.queue();
      q.defer(() => {
        throw 'error! 1';
      });

      q.catch(e => {
        assert.equal(e, 'error! 1');
        done();
      });
    });

    it('can catch error synchronously', done => {
      const q = axe.utils.queue();
      let sync = true;
      q.defer(() => {
        throw 'error! 2';
      });

      q.catch(e => {
        assert.equal(e, 'error! 2');
        assert.ok(sync, 'error caught in sync');
        done();
      });
      sync = false;
    });

    it('is called when the reject method is called', done => {
      /*eslint no-unused-vars: 0*/
      const q = axe.utils.queue();
      let errorsCaught = 0;

      q.defer((resolve, reject) => {
        setTimeout(() => {
          reject('error! 2');
        }, 1);
      });

      q.catch(e => {
        assert.equal(e, 'error! 2');
        errorsCaught += 1;
        done();
      });
    });

    it('will not run `then` if an error is thrown', done => {
      const q = axe.utils.queue();
      q.defer(() => {
        throw 'error! 3';
      });

      q.then(() => {
        assert.ok(false, 'Should not be called');
      });
      q.catch(e => {
        assert.equal(e, 'error! 3');
        done();
      });
    });

    it('does not continue other tasks if an error occurs', done => {
      const q = axe.utils.queue();
      let aborted;
      q.defer(() => {
        throw 'error! 3';
      });
      q.defer(() => {
        aborted = false;
      });

      q.then(() => {
        assert.ok(false, 'Should not be called');
      });
      q.catch(e => {
        assert.equal(e, 'error! 3');
      });
      setTimeout(() => {
        assert.notEqual(aborted, false);
        done();
      }, 30);
    });

    it('is chainable', () => {
      const q = axe.utils.queue();
      assert.equal(
        q,
        q.catch(() => {})
      );
    });

    it('throws when called more than once', () => {
      assert.throws(() => {
        const q = axe.utils.queue();
        q.defer(() => {});
        q.catch(() => {});
        q.catch(() => {});
      });
    });
  });
});
