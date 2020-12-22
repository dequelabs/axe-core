describe('axe.utils.preloadMedia', function() {
  'use strict';

  var fixture = document.getElementById('fixture');
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var isIE11 = axe.testUtils.isIE11;

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
  });

  afterEach(function() {
    fixture.innerHTML = '';
  });

  it('returns empty array when there are no media nodes to be preloaded', function(done) {
    axe._tree = axe.utils.getFlattenedTree(document);

    axe.utils.preloadMedia({ treeRoot: axe._tree[0] }).then(function(result) {
      assert.equal(result.length, 0);
      done();
    });
  });

  it('returns empty array when <audio> has no source', function(done) {
    fixtureSetup('<audio autoplay="true" controls></audio>');

    axe.utils.preloadMedia({ treeRoot: axe._tree[0] }).then(function(result) {
      assert.equal(result.length, 0);
      done();
    });
  });

  it('returns empty array when <video> has no source', function(done) {
    fixtureSetup('<video id="target"><source src=""/></video>');
    axe.utils.preloadMedia({ treeRoot: axe._tree[0] }).then(function(result) {
      assert.equal(result.length, 0);
      done();
    });
  });

  it('returns media node (audio) after their metadata has been preloaded', function(done) {
    fixtureSetup(
      '<audio src="/test/assets/moon-speech.mp3" autoplay="true" controls></audio>'
    );

    axe.utils.preloadMedia({ treeRoot: axe._tree[0] }).then(function(result) {
      assert.equal(result.length, 1);
      assert.isTrue(result[0].readyState > 0);
      assert.equal(Math.round(result[0].duration), 27);

      done();
    });
  });

  it('returns media nodes (audio, video) after their metadata has been preloaded', function(done) {
    fixtureSetup(
      // 1 audio elm
      '<audio src="/test/assets/moon-speech.mp3"></audio>' +
        // 1 video elm
        '<video>' +
        '<source src="/test/assets/video.mp4" type="video/mp4" />' +
        '<source src="/test/assets/video.webm" type="video/webm" />' +
        '</video>'
    );

    axe.utils.preloadMedia({ treeRoot: axe._tree[0] }).then(function(result) {
      assert.equal(result.length, 2);
      assert.isTrue(result[0].readyState > 0);
      assert.equal(Math.round(result[0].duration), 27);

      assert.isTrue(result[1].readyState > 0);
      assert.equal(Math.round(result[1].duration), 14);

      done();
    });
  });
});
