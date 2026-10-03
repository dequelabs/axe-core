describe('asset preloading through axe.run', () => {
  const fixture = document.getElementById('fixture');

  [false, true].forEach(hasTarget => {
    it(`should ${hasTarget ? 'read' : 'skip'} CSSOM with ${hasTarget ? 'a media target in shadow DOM' : 'no media targets'}`, async () => {
      const markup =
        '<style>audio { color: black; }</style><div id="shadow"></div>';
      if (hasTarget) {
        const target = axe.testUtils.queryShadowFixture(
          markup,
          '<audio id="target" autoplay loop controls></audio>'
        );
        Object.defineProperty(target.actualNode, 'currentSrc', {
          value: 'https://example.org/audio.wav'
        });
      } else {
        fixture.innerHTML = markup;
      }
      const sheet = fixture.querySelector('style').sheet;
      const rules = sheet.cssRules;
      let reads = 0;
      Object.defineProperty(sheet, 'cssRules', {
        configurable: true,
        get() {
          reads++;
          return rules;
        }
      });

      const results = await axe.run(fixture, {
        runOnly: ['no-autoplay-audio'],
        preload: { assets: ['cssom'] }
      });
      assert.equal(reads > 0, hasTarget);
      assert.isEmpty(results.violations);
      assert.isEmpty(results.incomplete);
      if (hasTarget) {
        assert.lengthOf(results.passes, 1);
        assert.deepEqual(results.passes[0].nodes[0].target, [
          ['#shadow', '#target']
        ]);
      } else {
        assert.lengthOf(results.inapplicable, 1);
      }
    });
  });
});
