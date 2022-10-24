describe('no-autoplay-audio-matches', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var preloadOptions = { preload: { assets: ['media'] } };
  var rule;

  beforeEach(function () {
    rule = axe.utils.getRule('no-autoplay-audio');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns false for <audio> element that has no src attribute', function (done) {
    var vNode = queryFixture('<audio id="target"></audio>');
    axe.utils.preload(preloadOptions).then(function () {
      var actual = rule.matches(vNode.actualNode);
      assert.isFalse(actual);
      done();
    });
  });

  it('returns false for <video> element that is paused', function (done) {
    var vNode = queryFixture(
      '<video id="target" autoplay="true" paused="true">' +
        '<source src="/test/assets/video.webm" type="video/webm" />' +
        '<source src="/test/assets/video.mp4" type="video/mp4" />' +
        '</video>'
    );
    axe.utils.preload(preloadOptions).then(function () {
      var actual = rule.matches(vNode.actualNode);
      assert.isFalse(actual);
      done();
    });
  });

  it('returns false for <video> element that is muted', function (done) {
    var vNode = queryFixture(
      '<video id="target" autoplay="true" muted="true">' +
        '<source src="/test/assets/video.webm" type="video/webm" />' +
        '<source src="/test/assets/video.mp4" type="video/mp4" />' +
        '</video>'
    );
    axe.utils.preload(preloadOptions).then(function () {
      var actual = rule.matches(vNode.actualNode);
      assert.isFalse(actual);
      done();
    });
  });
});
