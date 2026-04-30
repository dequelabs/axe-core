describe('plugin test', () => {
  it('should register the plugin', () => {
    axe.registerPlugin({
      id: 'doStuff',
      run: function (id, action, options, callback) {
        let frames;
        const q = axe.utils.queue();
        const that = this;
        frames = axe.utils.toArray(document.querySelectorAll('iframe, frame'));

        frames.forEach(frame => {
          q.defer(done => {
            axe.utils.sendCommandToFrame(
              frame,
              {
                options: options,
                command: 'run-doStuff',
                parameter: id,
                action: action
              },
              () => {
                done();
              }
            );
          });
        });

        if (!options.context.length) {
          q.defer(done => {
            that._registry[id][action].call(
              that._registry[id],
              document,
              options,
              done
            );
          });
        }
        q.then(callback);
      },
      commands: [
        {
          id: 'run-doStuff',
          callback: (data, callback) => {
            return axe.plugins.doStuff.run(
              data.parameter,
              data.action,
              data.options,
              callback
            );
          }
        }
      ]
    });

    assert.isOk(axe.plugins.doStuff);
  });

  it('should add plugin instance', () => {
    const highlight = {
      id: 'highlight',
      highlighter: function (node) {
        node.style.backgroundColor = 'yellow';
        this._node = node;
      },
      run: function (contextNode, options, done) {
        const that = this;
        Array.prototype.slice
          .call(contextNode.querySelectorAll(options.selector))
          .forEach(node => {
            that.highlighter(node, options);
          });
        done();
      },
      cleanup: function (done) {
        this._node.style.backgroundColor = '';
        done();
      }
    };

    axe.plugins.doStuff.add(highlight);
    assert.equal(axe.plugins.doStuff._registry.highlight, highlight);
  });

  it('should run the plugin', done => {
    const h1 = document.querySelector('.my-heading');

    axe.plugins.doStuff.run(
      'highlight',
      'run',
      {
        selector: '.my-heading',
        context: []
      },
      () => {
        assert.equal(h1.style.backgroundColor, 'yellow');
        done();
      }
    );
  });

  it('should cleanup the plugin', () => {
    const h1 = document.querySelector('.my-heading');

    axe.cleanup();
    assert.equal(h1.style.backgroundColor, '');
  });
});
