describe('context test', () => {
  const config = { runOnly: { type: 'rule', values: ['html-lang-valid'] } };

  before(done => {
    axe.testUtils.awaitNestedLoad(done);
    axe._tree = undefined;
  });

  describe('direct exclude', () => {
    describe('no include', () => {
      it('should find no violations given a selector array', done => {
        axe.run({ exclude: [['iframe']] }, config, (err, results) => {
          assert.isNull(err);
          assert.lengthOf(results.violations, 0, 'violations');
          assert.lengthOf(results.passes, 1, 'passes');
          assert.lengthOf(
            results.passes[0].nodes,
            1,
            'context.html has a lang attribute'
          );
          done();
        });
      });

      it('should find one violation given a multi-level selector array', done => {
        axe.run({ exclude: [['iframe', 'iframe']] }, config, (err, results) => {
          assert.isNull(err);
          assert.lengthOf(results.violations, 1, 'violations');
          assert.lengthOf(
            results.violations[0].nodes,
            1,
            'level1.html; 2-a & 2-b excluded'
          );
          assert.lengthOf(results.passes, 1, 'passes');
          assert.lengthOf(
            results.passes[0].nodes,
            1,
            'context.html (main doc) not excluded'
          );
          done();
        });
      });

      it('should find no violations given a direct reference', done => {
        axe.run(
          { exclude: [document.querySelector('iframe')] },
          config,
          (err, results) => {
            assert.isNull(err);
            assert.lengthOf(results.violations, 0, 'violations');
            assert.lengthOf(results.passes, 1, 'passes');
            assert.lengthOf(
              results.passes[0].nodes,
              1,
              'context.html has a lang attribute'
            );
            done();
          }
        );
      });

      it('should find no violations given a NodeList', done => {
        axe.run(
          { exclude: document.getElementsByTagName('iframe') },
          config,
          (err, results) => {
            assert.isNull(err);
            assert.lengthOf(results.violations, 0, 'violations');
            assert.lengthOf(results.passes, 1, 'passes');
            assert.lengthOf(
              results.passes[0].nodes,
              1,
              'context.html has a lang attribute'
            );
            done();
          }
        );
      });
    });

    describe('body include', () => {
      it('should find no violations given a selector array', done => {
        axe.run(
          { include: [document.body], exclude: [['iframe']] },
          config,
          (err, results) => {
            assert.isNull(err);
            assert.lengthOf(results.violations, 0, 'violations');
            assert.lengthOf(results.passes, 0, 'passes');
            done();
          }
        );
      });

      it('should find one violation given a multi-level selector array', done => {
        axe.run(
          { include: [document.body], exclude: [['iframe', 'iframe']] },
          config,
          (err, results) => {
            assert.isNull(err);
            assert.lengthOf(results.violations, 1, 'violations');
            assert.lengthOf(results.passes, 0, 'passes');
            done();
          }
        );
      });

      it('should find no violations given a direct reference', done => {
        axe.run(
          {
            include: [document.body],
            exclude: [document.querySelector('iframe')]
          },
          config,
          (err, results) => {
            assert.isNull(err);
            assert.lengthOf(results.violations, 0, 'violations');
            assert.lengthOf(results.passes, 0, 'passes');
            done();
          }
        );
      });

      it('should find no violations given a NodeList', done => {
        axe.run(
          {
            include: [document.body],
            exclude: document.getElementsByTagName('iframe')
          },
          config,
          (err, results) => {
            assert.isNull(err);
            assert.lengthOf(results.violations, 0, 'violations');
            assert.lengthOf(results.passes, 0, 'passes');
            done();
          }
        );
      });
    });
  });

  describe('indirect exclude', () => {
    it('should find no nodes', done => {
      axe.run(
        { include: [document.body], exclude: [['#myframe']] },
        config,
        (err, results) => {
          assert.isNull(err);
          assert.lengthOf(results.violations, 0, 'violations');
          assert.lengthOf(results.passes, 0, 'passes');
          done();
        }
      );
    });

    it('should find no nodes in Shadow DOM', done => {
      const sConfig = { runOnly: { type: 'rule', values: ['color-contrast'] } };
      axe.run(
        { include: [['#shadow-container']], exclude: [['#shadow-host']] },
        sConfig,
        (err, results) => {
          try {
            assert.isNull(err);
            assert.lengthOf(results.violations, 0, 'violations');
            assert.lengthOf(results.passes, 1, 'passes');
            done();
          } catch (e) {
            done(e);
          }
        }
      );
    });

    describe('no include', () => {
      it('should find no violations given a selector array', done => {
        axe.run({ exclude: [['#frame-container']] }, config, (err, results) => {
          assert.isNull(err);
          assert.lengthOf(results.violations, 0, 'violations');
          assert.lengthOf(results.passes, 1, 'passes');
          assert.lengthOf(
            results.passes[0].nodes,
            1,
            'context.html has a lang attribute'
          );
          done();
        });
      });

      it('should find one violation given a multi-level selector array', done => {
        axe.run({ exclude: [['iframe', 'body']] }, config, (err, results) => {
          assert.isNull(err);
          assert.lengthOf(results.violations, 1, 'violations');
          assert.lengthOf(
            results.violations[0].nodes,
            1,
            'level1.html; 2-a & 2-b excluded'
          );
          assert.lengthOf(results.passes, 1, 'passes');
          assert.lengthOf(
            results.passes[0].nodes,
            1,
            'context.html (main doc) not excluded'
          );
          done();
        });
      });

      it('should find no violations given a direct reference', done => {
        axe.run(
          { exclude: [document.querySelector('#frame-container')] },
          config,
          (err, results) => {
            assert.isNull(err);
            assert.lengthOf(results.violations, 0, 'violations');
            assert.lengthOf(results.passes, 1, 'passes');
            assert.lengthOf(
              results.passes[0].nodes,
              1,
              'context.html has a lang attribute'
            );
            done();
          }
        );
      });

      it('should find no violations given a NodeList', done => {
        axe.run(
          { exclude: document.getElementsByTagName('div') },
          config,
          (err, results) => {
            assert.isNull(err);
            assert.lengthOf(results.violations, 0, 'violations');
            assert.lengthOf(results.passes, 1, 'passes');
            assert.lengthOf(
              results.passes[0].nodes,
              1,
              'context.html has a lang attribute'
            );
            done();
          }
        );
      });
    });

    describe('body include', () => {
      it('should find no violations given a selector array', done => {
        axe.run(
          { include: [document.body], exclude: [['#frame-container']] },
          config,
          (err, results) => {
            assert.isNull(err);
            assert.lengthOf(results.violations, 0, 'violations');
            assert.lengthOf(results.passes, 0, 'passes');
            done();
          }
        );
      });

      it('should find one violation given a multi-level selector array', done => {
        axe.run(
          { include: [document.body], exclude: [['iframe', 'body']] },
          config,
          (err, results) => {
            assert.isNull(err);
            assert.lengthOf(results.violations, 1, 'violations');
            assert.lengthOf(
              results.violations[0].nodes,
              1,
              'level1.html; 2-a & 2-b excluded'
            );
            assert.lengthOf(results.passes, 0, 'passes');
            done();
          }
        );
      });

      it('should find no violations given a direct reference', done => {
        axe.run(
          {
            include: [document.body],
            exclude: [document.querySelector('#frame-container')]
          },
          config,
          (err, results) => {
            assert.isNull(err);
            assert.lengthOf(results.violations, 0, 'violations');
            assert.lengthOf(results.passes, 0, 'passes');
            done();
          }
        );
      });

      it('should find no violations given a NodeList', done => {
        axe.run(
          {
            include: [document.body],
            exclude: document.getElementsByTagName('div')
          },
          config,
          (err, results) => {
            assert.isNull(err);
            assert.lengthOf(results.violations, 0, 'violations');
            assert.lengthOf(results.passes, 0, 'passes');
            done();
          }
        );
      });
    });
  });

  describe('direct include', () => {
    it('should find the frames given a context object', done => {
      axe.run({ include: [['#myframe']] }, config, (err, results) => {
        assert.isNull(err);
        assert.lengthOf(results.violations, 1, 'violations');
        assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
        assert.lengthOf(results.passes, 0, 'passes');
        done();
      });
    });
    it('should find the frames given a direct reference', done => {
      axe.run(document.getElementById('myframe'), config, (err, results) => {
        assert.isNull(err);
        assert.lengthOf(results.violations, 1, 'violations');
        assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
        assert.lengthOf(results.passes, 0, 'passes');
        done();
      });
    });
    it('should find the frames given a NodeList', done => {
      axe.run(
        document.getElementsByTagName('iframe'),
        config,
        (err, results) => {
          assert.isNull(err);
          assert.lengthOf(results.violations, 1, 'violations');
          assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
          assert.lengthOf(results.passes, 0, 'passes');
          done();
        }
      );
    });

    describe('Shadow DOM', () => {
      const sConfig = {
        runOnly: {
          type: 'rule',
          values: ['aria-allowed-attr', 'color-contrast']
        }
      };
      it('when passed a shadow host, reports issues both on itself and in the shadow DOM', done => {
        axe.run('#shadow-host', sConfig, (err, results) => {
          assert.isNull(err);
          assert.lengthOf(results.violations, 2, 'violations');
          const allowedAttrsViolations = results.violations.filter(
            violation => {
              return violation.id === 'aria-allowed-attr';
            }
          );
          assert.lengthOf(
            allowedAttrsViolations,
            1,
            'aria allowed attrs violations'
          );
          done();
        });
      });
      it('when passed a shadow root, reports issues in the shadow DOM, but not on the host', done => {
        const host = document.querySelector('#shadow-host');
        const shadowRoot = host.shadowRoot;
        axe.run(shadowRoot, sConfig, (err, results) => {
          assert.isNull(err);
          assert.lengthOf(results.violations, 1, 'violations');
          const allowedAttrsViolations = results.violations.filter(
            violation => {
              return violation.id === 'aria-allowed-attr';
            }
          );
          assert.lengthOf(
            allowedAttrsViolations,
            0,
            'aria allowed attrs violations'
          );
          done();
        });
      });
    });
  });

  describe('indirect include', () => {
    it('should find the frames given context object with a node reference', done => {
      axe.run({ include: [document.body] }, config, (err, results) => {
        assert.isNull(err);
        assert.lengthOf(results.violations, 1, 'violations');
        assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
        assert.lengthOf(results.passes, 0, 'passes');
        done();
      });
    });
    it('should find the frames give a node', done => {
      axe.run(document.body, config, (err, results) => {
        assert.isNull(err);
        assert.lengthOf(results.violations, 1, 'violations');
        assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
        assert.lengthOf(results.passes, 0, 'passes');
        done();
      });
    });
    it('should find the frames give a NodeList', done => {
      axe.run(document.getElementsByTagName('body'), config, (err, results) => {
        assert.isNull(err);
        assert.lengthOf(results.violations, 1, 'violations');
        assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
        assert.lengthOf(results.passes, 0, 'passes');
        done();
      });
    });
  });
});
