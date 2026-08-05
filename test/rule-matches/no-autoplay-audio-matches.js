describe('no-autoplay-audio-matches', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const preloadOptions = { preload: { assets: ['media'] } };
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('no-autoplay-audio');
  });

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('returns false for <audio> element that has no src attribute', done => {
    const vNode = queryFixture('<audio id="target"></audio>');
    axe.utils.preload(preloadOptions).then(() => {
      const actual = rule.matches(vNode.actualNode);
      assert.isFalse(actual);
      done();
    });
  });

  it('returns false for <video> element that is paused', done => {
    const vNode = queryFixture(html`
      <video id="target" autoplay="true" paused="true">
        <source src="/test/assets/video.webm" type="video/webm" />
        <source src="/test/assets/video.mp4" type="video/mp4" />
      </video>
    `);
    axe.utils.preload(preloadOptions).then(() => {
      const actual = rule.matches(vNode.actualNode);
      assert.isFalse(actual);
      done();
    });
  });

  it('returns false for <video> element that is muted', done => {
    const vNode = queryFixture(html`
      <video id="target" autoplay="true" muted="true">
        <source src="/test/assets/video.webm" type="video/webm" />
        <source src="/test/assets/video.mp4" type="video/mp4" />
      </video>
    `);
    axe.utils.preload(preloadOptions).then(() => {
      const actual = rule.matches(vNode.actualNode);
      assert.isFalse(actual);
      done();
    });
  });
});
