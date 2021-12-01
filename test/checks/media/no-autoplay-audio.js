describe('no-autoplay-audio', function() {
  'use strict';

  var check;
  var fixture = document.getElementById('fixture');
  var isIE11 = axe.testUtils.isIE11;
  var checkSetup = axe.testUtils.checkSetup;
  var checkContext = axe.testUtils.MockCheckContext();
  var preloadOptions = { preload: { assets: ['media'] } };

  before(function() {
    // our circle ci windows machine cannot play audio elements
    // (mp3 nor wav formats). setting an onerror event handler
    // resulted in error code 4: MEDIA_ERR_SRC_NOT_SUPPORTED.
    // looking around it might be due to a setting in ie11 that
    // prevents audio from playing
    // @see https://stackoverflow.com/questions/34802319/audio-tag-is-not-working-in-ie11/41172831
    if (isIE11) {
      this.skip();
    }
    check = checks['no-autoplay-audio'];
  });

  afterEach(function() {
    fixture.innerHTML = '';
    axe._tree = undefined;
    checkContext.reset();
  });

  it('returns undefined when <audio> has no source (duration cannot be interpreted)', function(done) {
    var checkArgs = checkSetup('<audio id="target"></audio>');
    axe.utils.preload(preloadOptions).then(function() {
      assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
      done();
    });
  });

  it('returns undefined when <video> has no source (duration cannot be interpreted)', function(done) {
    var checkArgs = checkSetup('<video id="target"><source src=""/></video>');
    axe.utils.preload(preloadOptions).then(function() {
      assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
      done();
    });
  });

  it('returns false when <audio> can autoplay and has no controls mechanism', function(done) {
    var checkArgs = checkSetup(
      '<audio id="target" src="/test/assets/moon-speech.mp3" autoplay="true"></audio>'
    );
    axe.utils.preload(preloadOptions).then(function() {
      assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
      done();
    });
  });

  it('returns false when <video> can autoplay and has no controls mechanism', function(done) {
    var checkArgs = checkSetup(
      '<video id="target" autoplay="true">' +
        '<source src="/test/assets/video.webm" type="video/webm" />' +
        '<source src="/test/assets/video.mp4" type="video/mp4" />' +
        '</video>'
    );
    axe.utils.preload(preloadOptions).then(function() {
      assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
      done();
    });
  });

  it('returns false when <audio> plays less than allowed dutation but loops', function(done) {
    var checkArgs = checkSetup(
      '<audio id="target" src="/test/assets/moon-speech.mp3#t=2,4" autoplay="true" loop="true"></audio>'
    );
    axe.utils.preload(preloadOptions).then(function() {
      assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
      done();
    });
  });

  it('returns true when <video> can autoplay and duration is below allowed duration (by passing options)', function(done) {
    var checkArgs = checkSetup(
      '<video id="target" autoplay="true">' +
        '<source src="/test/assets/video.webm" type="video/webm" />' +
        '<source src="/test/assets/video.mp4" type="video/mp4" />' +
        '</video>',
      { allowedDuration: 15 }
    );
    axe.utils.preload(preloadOptions).then(function() {
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      done();
    });
  });

  it('returns true when <video> can autoplay and duration is below allowed duration (by setting playback range)', function(done) {
    var checkArgs = checkSetup(
      '<video id="target" autoplay="true">' +
        '<source src="/test/assets/video.webm#t=7,9" type="video/webm" />' +
        '<source src="/test/assets/video.mp4#t=7,9" type="video/mp4" />' +
        '</video>'
      // Note: default allowed duration is 3s
    );
    axe.utils.preload(preloadOptions).then(function() {
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      done();
    });
  });

  it('returns true when <audio> can autoplay but has controls mechanism', function(done) {
    var checkArgs = checkSetup(
      '<audio id="target" src="/test/assets/moon-speech.mp3" autoplay="true" controls></audio>'
    );
    axe.utils.preload(preloadOptions).then(function() {
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      done();
    });
  });

  it('returns true when <video> can autoplay and has controls mechanism', function(done) {
    var checkArgs = checkSetup(
      '<video id="target" autoplay="true" controls>' +
        '<source src="/test/assets/video.webm" type="video/webm" />' +
        '<source src="/test/assets/video.mp4" type="video/mp4" />' +
        '</video>'
    );
    axe.utils.preload(preloadOptions).then(function() {
      assert.isTrue(check.evaluate.apply(null, checkArgs));
      done();
    });
  });
});
