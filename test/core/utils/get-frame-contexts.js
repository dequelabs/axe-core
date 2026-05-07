describe('utils.getFrameContexts', () => {
  const html = axe.testUtils.html;
  const getFrameContexts = axe.utils.getFrameContexts;
  const fixture = document.querySelector('#fixture');

  it('returns an empty array if the page has no frames', () => {
    const frameContext = getFrameContexts();
    assert.isArray(frameContext);
    assert.lengthOf(frameContext, 0);
  });

  it('returns a `frameSelector` for each included frame', () => {
    fixture.innerHTML = html`
      <iframe></iframe>
      <iframe></iframe>
      <iframe></iframe>
    `;

    const selectors = getFrameContexts().map(frameData => {
      return frameData.frameSelector;
    });
    assert.lengthOf(selectors, 3);
    assert.include(selectors[0], 'iframe:nth-child(1)');
    assert.include(selectors[1], 'iframe:nth-child(2)');
    assert.include(selectors[2], 'iframe:nth-child(3)');
  });

  it('sets frameContext.initiator to false for each included frame', () => {
    fixture.innerHTML = html`
      <iframe></iframe>
      <iframe></iframe>
      <iframe></iframe>
    `;

    const contexts = getFrameContexts().map(frameData => {
      return frameData.frameContext;
    });

    assert.lengthOf(contexts, 3);
    assert.isFalse(contexts[0].initiator);
    assert.isFalse(contexts[1].initiator);
    assert.isFalse(contexts[2].initiator);
  });

  it('sets frameContext.focusable depending on the frame', () => {
    fixture.innerHTML = html`
      <iframe></iframe>
      <iframe tabindex="0"></iframe>
      <iframe tabindex="-1"></iframe>
    `;

    const contexts = getFrameContexts().map(frameData => {
      return frameData.frameContext;
    });
    assert.lengthOf(contexts, 3);
    assert.isTrue(contexts[0].focusable);
    assert.isTrue(contexts[1].focusable);
    assert.isFalse(contexts[2].focusable);
  });

  it('sets frameContext.size based on frame size', () => {
    fixture.innerHTML = html`
      <iframe width="1" height="1"></iframe>
      <iframe width="10" height="10"></iframe>
      <iframe width="100" height="100"></iframe>
    `;

    const frameSize = getFrameContexts().map(frameData => {
      return frameData.frameContext.size;
    });
    assert.lengthOf(frameSize, 3);
    assert.deepEqual(frameSize[0], {
      width: 1,
      height: 1
    });
    assert.deepEqual(frameSize[1], {
      width: 10,
      height: 10
    });
    assert.deepEqual(frameSize[2], {
      width: 100,
      height: 100
    });
  });

  describe('include / exclude', () => {
    it('returns a `frameContext` for each included frame', () => {
      fixture.innerHTML = html`
        <iframe id="f1"></iframe>
        <iframe id="f2"></iframe>
        <iframe id="f3"></iframe>
      `;
      const context = {
        include: [
          ['#f1', 'header'],
          ['#f2', 'main']
        ],
        exclude: [['#f3', 'footer']]
      };
      const contexts = getFrameContexts(context).map(frameData => {
        return frameData.frameContext;
      });

      assert.lengthOf(contexts, 3);
      assert.deepEqual(contexts[0].include, [['header']]);
      assert.deepEqual(contexts[0].exclude, []);
      assert.deepEqual(contexts[1].include, [['main']]);
      assert.deepEqual(contexts[1].exclude, []);
      assert.deepEqual(contexts[2].include, []);
      assert.deepEqual(contexts[2].exclude, [['footer']]);
    });

    it('excludes non-frame contexts', () => {
      fixture.innerHTML = '<iframe id="f1"></iframe>';
      const context = {
        include: [['#header'], ['a'], ['#f1', 'header']]
      };
      const contexts = getFrameContexts(context).map(frameData => {
        return frameData.frameContext;
      });

      assert.lengthOf(contexts, 1);
      assert.deepEqual(contexts[0].include, [['header']]);
      assert.deepEqual(contexts[0].exclude, []);
    });

    it('mixes contexts if the frame is selected twice', () => {
      fixture.innerHTML = html`
        <iframe id="f1"></iframe>
        <iframe id="f2"></iframe>
      `;
      const context = {
        include: [
          ['#f1', 'header'],
          ['#f2', 'footer']
        ],
        exclude: [['iframe', 'main']]
      };
      const contexts = getFrameContexts(context).map(frameData => {
        return frameData.frameContext;
      });
      assert.lengthOf(contexts, 2);
      assert.deepEqual(contexts[0].include, [['header']]);
      assert.deepEqual(contexts[0].exclude, [['main']]);
      assert.deepEqual(contexts[1].include, [['footer']]);
      assert.deepEqual(contexts[1].exclude, [['main']]);
    });

    it('combines include/exclude arrays of frames selected twice', () => {
      fixture.innerHTML = '<iframe></iframe>';
      const context = {
        include: [
          ['iframe', 'header'],
          ['iframe', 'main']
        ],
        exclude: [
          ['iframe', 'aside'],
          ['iframe', 'footer']
        ]
      };
      const contexts = getFrameContexts(context).map(frameData => {
        return frameData.frameContext;
      });

      assert.lengthOf(contexts, 1);
      assert.deepEqual(contexts[0].include, [['header'], ['main']]);
      assert.deepEqual(contexts[0].exclude, [['aside'], ['footer']]);
    });

    it('skips excluded frames', () => {
      fixture.innerHTML = html`
        <iframe id="f1"></iframe>
        <iframe id="f2"></iframe>
        <iframe id="f3"></iframe>
      `;
      const context = {
        exclude: [[['#f2']]]
      };
      const selectors = getFrameContexts(context).map(frameData => {
        return frameData.frameSelector;
      });
      assert.lengthOf(selectors, 2);
      assert.include(selectors[0], 'iframe:nth-child(1)');
      assert.include(selectors[1], 'iframe:nth-child(3)');
    });

    it('skips frames excluded by a parent', () => {
      fixture.innerHTML = '<iframe></iframe>';
      const frameContexts = getFrameContexts({
        exclude: [['#fixture']]
      });
      assert.lengthOf(frameContexts, 0);
    });

    it('normalizes the context', () => {
      let frameContexts;
      fixture.innerHTML = html`
        <iframe id="f1"></iframe>
        <iframe id="f2"></iframe>
      `;
      frameContexts = getFrameContexts('#f1');
      assert.lengthOf(frameContexts, 1);
      assert.include(frameContexts[0].frameSelector, 'iframe:nth-child(1)');
      assert.deepEqual(frameContexts[0].frameContext.include, []);
      assert.deepEqual(frameContexts[0].frameContext.exclude, []);

      frameContexts = getFrameContexts({ include: [['#f1']] });
      assert.lengthOf(frameContexts, 1);
      assert.include(frameContexts[0].frameSelector, 'iframe:nth-child(1)');
      assert.deepEqual(frameContexts[0].frameContext.include, []);
      assert.deepEqual(frameContexts[0].frameContext.exclude, []);

      frameContexts = getFrameContexts({ exclude: [['#f2']] });
      assert.lengthOf(frameContexts, 1);
      assert.include(frameContexts[0].frameSelector, 'iframe:nth-child(1)');
      assert.deepEqual(frameContexts[0].frameContext.include, []);
      assert.deepEqual(frameContexts[0].frameContext.exclude, []);
    });

    it('accepts elements', () => {
      let frameContexts;
      fixture.innerHTML = html`
        <iframe id="f1"></iframe>
        <iframe id="f2"></iframe>
      `;
      const f1 = fixture.querySelector('#f1');
      const f2 = fixture.querySelector('#f2');
      frameContexts = getFrameContexts(f1);
      assert.lengthOf(frameContexts, 1);
      assert.include(frameContexts[0].frameSelector, 'iframe:nth-child(1)');
      assert.deepEqual(frameContexts[0].frameContext.include, []);
      assert.deepEqual(frameContexts[0].frameContext.exclude, []);

      frameContexts = getFrameContexts({ include: [f1] });
      assert.lengthOf(frameContexts, 1);
      assert.include(frameContexts[0].frameSelector, 'iframe:nth-child(1)');
      assert.deepEqual(frameContexts[0].frameContext.include, []);
      assert.deepEqual(frameContexts[0].frameContext.exclude, []);

      frameContexts = getFrameContexts({ exclude: [f2] });
      assert.lengthOf(frameContexts, 1);
      assert.include(frameContexts[0].frameSelector, 'iframe:nth-child(1)');
      assert.deepEqual(frameContexts[0].frameContext.include, []);
      assert.deepEqual(frameContexts[0].frameContext.exclude, []);
    });

    it('works with nested frames', () => {
      fixture.innerHTML = html`
        <iframe id="f1"></iframe>
        <iframe id="f2"></iframe>
      `;
      const context = {
        include: [
          ['#f1', '#f3', 'header'],
          ['#f2', '#f4', '#f5', 'footer']
        ],
        exclude: [['#f2', '#f6', '#f7', '#f7', 'main']]
      };
      const contexts = getFrameContexts(context).map(frameData => {
        return frameData.frameContext;
      });

      assert.lengthOf(contexts, 2);
      assert.deepEqual(contexts[0].include, [['#f3', 'header']]);
      assert.deepEqual(contexts[0].exclude, []);
      assert.deepEqual(contexts[1].include, [['#f4', '#f5', 'footer']]);
      assert.deepEqual(contexts[1].exclude, [['#f6', '#f7', '#f7', 'main']]);
    });

    it('works on iframes in shadow dom', () => {
      fixture.innerHTML = '<div id="shadow"></div>';
      const div = fixture.querySelector('div');
      const shadowRoot = div.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML =
        '<main><iframe id="f1" width="100" height="100"></iframe></main>';

      const frameContext = getFrameContexts();

      assert.lengthOf(frameContext, 1);
      assert.lengthOf(frameContext[0].frameSelector, 2);
      assert.equal(frameContext[0].frameSelector[1], 'main > iframe');
      assert.deepEqual(frameContext[0].frameContext.include, []);
      assert.deepEqual(frameContext[0].frameContext.exclude, []);
    });
  });

  describe('options.iframes', () => {
    it('returns a non-empty array with `iframes: true`', () => {
      fixture.innerHTML = '<iframe></iframe>';
      const contexts = getFrameContexts({}, { iframes: true });
      assert.lengthOf(contexts, 1);
    });

    it('returns an empty array with `iframes: false`', () => {
      fixture.innerHTML = '<iframe></iframe>';
      const contexts = getFrameContexts({}, { iframes: false });
      assert.lengthOf(contexts, 0);
    });
  });
});
