describe('utils.sendCommandToFrame', function () {
  'use strict';

  var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

  it('should timeout if there is no response from frame', function (done) {
    var orig = window.setTimeout;
    window.setTimeout = function (fn, to) {
      if (to === 30000) {
        assert.ok('timeout set');
        fn();
      } else { // ping timeout
        return orig(fn, to);
      }
      return 'cats';
    };

    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      utils.sendCommandToFrame(frame, {}, function () {
        assert.ok(false, 'should not be called');

      }, function (err) {
        assert.instanceOf(err, Error);
        assert.equal(err.message.split(/: /)[0], 'No response from frame');
        window.setTimeout = orig;
        done();
      });
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/zombie-frame.html';
    fixture.appendChild(frame);

  });

  it('should respond once when no keepalive', function (done) {
    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      utils.sendCommandToFrame(frame, {
        number: 1
      }, function () {
        assert.isTrue(true);
        done();
      });
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/responder.html';
    fixture.appendChild(frame);

  });

  it('should respond multiple times when keepalive', function (done) {
    var number = 3;
    var called = 0;
    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      utils.sendCommandToFrame(frame, {
        number: number,
        keepalive: true
      }, function () {
        called += 1;
        if (called === number) {
          assert.isTrue(true);
          done();
        }
      });
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/responder.html';
    fixture.appendChild(frame);

  });

  it('should respond once when no keepalive', function (done) {
    var number = 2;
    var called = 0;
    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      utils.sendCommandToFrame(frame, {
        number: number
      }, function () {
        called += 1;
        if (called === number) {
          clearTimeout(timer);
          assert.isTrue(false);
          done();
        }
      });
    });
    var timer = setTimeout(function () {
      assert.isTrue(true);
      done();
    }, 150);

    frame.id = 'level0';
    frame.src = '../mock/frames/responder.html';
    fixture.appendChild(frame);

  });

});
