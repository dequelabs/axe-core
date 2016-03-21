describe('plugins', function () {
  'use strict';

  function createFrames(callback) {
    var frame, num = 2,
    loaded = 0;

    function onLoad() {
      loaded++;
      if (loaded >= (num)) {
        callback();
      }
    }

    frame = document.createElement('iframe');
    frame.id = 'target';
    frame.src = '../mock/frames/frame-frame.html';

    frame.addEventListener('load', onLoad);
    fixture.appendChild(frame);

    frame = document.createElement('iframe');
    frame.src = '../mock/frames/frame-frame.html';
    frame.addEventListener('load', onLoad);
    fixture.appendChild(frame);
  }

  var fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
    axe._audit = null;
  });

  beforeEach(function () {
    axe._load({
      rules: []
    });
  });

  it('Should have registerPlugin function', function () {
    assert.ok(axe.registerPlugin);
    assert.equal(typeof axe.registerPlugin, 'function');
  });

  it('should have an empty set of plugins', function () {
    assert.deepEqual({}, axe.plugins);
  });

  it('should add a plugin to the plugins list and a command to the audit commands', function () {
    axe.registerPlugin({
      id: 'my-plugin',
      run: 'run',
      commands: [{
        id: 'my-command',
        callback: 'callback'
      }]
    });
    assert.ok(axe.plugins['my-plugin']);
    assert.equal(axe.plugins['my-plugin']._run, 'run');
    assert.equal(axe._audit.commands['my-command'], 'callback');
  });
  describe('Plugin class', function () {
    it('should call the run function of the registered plugin, when run is called', function () {
      var called = false;
      axe.registerPlugin({
        id: 'my-plugin',
        run: function (id, action, options) {
          called = {
            id: id,
            action: action,
            options: options
          };
        },
        commands: [{
          id: 'my-command',
          callback: 'callback'
        }]
      });
      axe.plugins['my-plugin'].run('id', 'action', 'options');
      assert.deepEqual({id: 'id', action: 'action', options: 'options'}, called);
    });
  });
  describe('Plugin.protoype.run', function () {
    afterEach(function () {
      fixture.innerHTML = '';
      axe._audit = null;
      axe.plugins = {};
    });
    beforeEach(function () {
      axe._load({
        rules: []
      });
      axe.registerPlugin({
        id: 'multi',
        run: function (id, action, options, callback) {
          this._registry[id][action].call(this._registry[id], options, callback);
        },
        commands: [{
          id: 'run-multi',
          callback: function (data, callback) {
            return axe.plugins.multi.run(data.parameter, data.action, data.options, callback);
          }
        }]
      });
      axe.plugins.multi.add({
        id: 'hideall',
        cleanup: function (done) {
          done();
        },
        run: function (options, callback) {
          var frames;
          var q = axe.utils.queue();

          frames = axe.utils.toArray(document.querySelectorAll('iframe, frame'));
          frames.forEach(function (frame) {
            q.defer(function (resolve, reject) {
              axe.utils.sendCommandToFrame(frame, {
                options: options,
                command: 'run-multi',
                parameter: 'hideall',
                action: 'run'
              }, resolve, reject);
            });
          });

          q.defer(function (done) {
            // implementation
            done('ola!');
          });
          q.then(function (data) {
            // done with all the frames
            var results = [];
            data.forEach(function (datum) {
              if (datum) {
                results = results.concat(datum);
              }
            });
            callback(results);
          }).catch(callback);
        }
      });
    });
    it('should work without frames', function (done) {
      axe.plugins.multi.run('hideall', 'run', {}, function (results) {
        assert.deepEqual(results, ['ola!']);
        done();
      });
    });
    it('should work with frames', function (done) {
      createFrames(function () {
        setTimeout(function () {
          axe.plugins.multi.run('hideall', 'run', {}, function (results) {
            assert.deepEqual(results, ['ola!', 'ola!', 'ola!', 'ola!', 'ola!']);
            done();
          });
        }, 500);
      });
    });
    it('should call the implementation\'s cleanup function', function (done) {
      var called = false;
      axe.plugins.multi.cleanup = function(done) {
        called = true;
        done();
      };
      axe.plugins.multi.cleanup(function () {
        assert.ok(called);
        done();
      });
    });
  });
});
