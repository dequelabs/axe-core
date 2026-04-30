describe('dom.isOffscreen', () => {
  const html = axe.testUtils.html;
  const { isOffscreen } = axe.commons.dom;
  const fixture = document.getElementById('fixture');
  const { queryFixture, fixtureSetup, flatTreeSetup, shadowSupport } =
    axe.testUtils;

  afterEach(() => {
    document.body.style.direction = 'ltr';
  });

  after(() => {
    window.scrollTo(0, 0);
  });

  it('should be false for 0 height elements at the top of the viewport', () => {
    assert.isFalse(isOffscreen(document.body));
    assert.isFalse(isOffscreen(document.documentElement));

    const vNode = queryFixture('<div id="target"></div>');
    assert.isFalse(isOffscreen(vNode));
  });

  it('should detect elements positioned outside the left edge', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; width: 50px; left: -51px;">Offscreen?</div>'
    );
    assert.isTrue(isOffscreen(vNode));
  });

  it('should detect elements positioned to but not beyond the left edge', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; width: 50px; left: -50px;">Offscreen?</div>'
    );

    assert.isTrue(isOffscreen(vNode));
  });

  it('should not detect elements at the left edge with a zero width', () => {
    const vNode = queryFixture(
      '<div id="target" style="width: 0px; left: 0px;"></div>'
    );

    assert.isFalse(isOffscreen(vNode));
  });

  it('should detect elements positioned outside the top edge', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; height: 50px; top: -50px;">Offscreen?</div>'
    );
    assert.isTrue(isOffscreen(vNode));
  });

  it('should never detect elements positioned outside the bottom edge', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; height: 50px; bottom: -501px;">Offscreen?</div>'
    );

    assert.isFalse(isOffscreen(vNode));
  });

  it('should detect elements positioned that bleed inside the left edge', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; width: 50px; left: -49px;">Offscreen?</div>'
    );

    assert.isFalse(isOffscreen(vNode));
  });

  it('should detect elements positioned outside the right edge', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; width: 50px; right: -49px;">Offscreen?</div>'
    );

    assert.isFalse(isOffscreen(vNode));
  });

  it('should detect elements positioned outside the top edge', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; height: 50px; top: -49px;">Offscreen?</div>'
    );

    assert.isFalse(isOffscreen(vNode));
  });

  it('should detect elements positioned outside the bottom edge', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; height: 50px; bottom: -49px;">Offscreen?</div>'
    );

    assert.isFalse(isOffscreen(vNode));
  });

  it('should detect elements that are made off-screen by a parent', () => {
    const vNode = queryFixture(html`
      <div id="target" style="position: absolute; width: 50px; left: -51px;">
        <div id="target">Offscreen?</div>
      </div>
    `);

    assert.isTrue(isOffscreen(vNode));
  });

  it('should NOT detect elements positioned outside the right edge on LTR documents', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; width: 50px; right: -51px;">Offscreen?</div>'
    );

    assert.isFalse(isOffscreen(vNode));
  });

  it('should detect elements positioned outside the right edge on RTL documents', () => {
    document.body.style.direction = 'rtl';
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; width: 50px; right: -151px;">Offscreen?</div>'
    );
    assert.isTrue(isOffscreen(vNode));
  });

  it('should NOT detect elements positioned outside the left edge on RTL documents', () => {
    document.body.style.direction = 'rtl';
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; width: 50px; left: -51px;">Offscreen?</div>'
    );

    assert.isFalse(isOffscreen(vNode));
  });

  it('should detect elements positioned outside the right edge on RTL documents', () => {
    document.body.style.direction = 'rtl';
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; width: 50px; left: 100vw;">Offscreen?</div>'
    );

    assert.isTrue(isOffscreen(vNode));
  });

  it('should not detect elements positioned because of a scroll', () => {
    fixtureSetup(html`
      <div id="scrollable" style="max-height:20px;overflow:scroll">
        <div id="visible">goodbye</div>
        <div id="high" style="height:50px">high</div>
        <div id="scrollme">hello</div>
      </div>
    `);
    const viz = document.getElementById('visible');
    assert.isFalse(isOffscreen(viz));
    const scrollme = document.getElementById('scrollme');
    scrollme.scrollIntoView();
    assert.isFalse(isOffscreen(viz));
  });

  it('should return undefined if actual node is undefined', () => {
    assert.isUndefined(isOffscreen());
  });

  it('should detect on screen shadow nodes', () => {
    fixture.innerHTML = '<div></div>';
    const shadow = fixture.querySelector('div').attachShadow({ mode: 'open' });
    shadow.innerHTML = '<div id="target">Offscreen?</div>';
    flatTreeSetup(fixture);

    const el = shadow.querySelector('#target');
    assert.isFalse(isOffscreen(el));
  });

  it('should detect off screen shadow nodes', () => {
    fixture.innerHTML = '<div></div>';
    const shadow = fixture.querySelector('div').attachShadow({ mode: 'open' });
    shadow.innerHTML =
      '<div id="target" style="position: absolute; height: 50px; top: -51px;">Offscreen?</div>';
    flatTreeSetup(fixture);

    const el = shadow.querySelector('#target');
    assert.isTrue(isOffscreen(el));
  });

  describe('positioned: fixed', () => {
    it('should detect elements positioned outside the top edge', () => {
      const vNode = queryFixture(
        '<div id="target" style="position: fixed; height: 50px; top: -50px;">Offscreen?</div>'
      );

      assert.isTrue(isOffscreen(vNode));
    });

    it('should detect elements positioned outside the top edge when scrolled', () => {
      const vNode = queryFixture(html`
        <div style="height: 5000px">
          <div id="target" style="position: fixed; height: 50px; top: -50px;">
            Offscreen?
          </div>
        </div>
      `);

      assert.isTrue(isOffscreen(vNode));
      window.scrollTo(0, document.body.scrollHeight);
      assert.isTrue(isOffscreen(vNode));
    });

    it('should detect elements positioned outside the bottom edge', () => {
      const vNode = queryFixture(
        html`<div
          id="target"
          style="position: fixed; height: 50px; top: 100vh;"
        >
          Offscreen?
        </div>`
      );
      assert.isTrue(isOffscreen(vNode));
    });

    it('should consider elements in the viewport, but beyond the window size as on screen', () => {
      const vNode = queryFixture(html`
        <div>
          <p>Hello World</p>
          <div id="target" style="position: fixed; top: calc(100vh - 50px);">
            Offscreen?
          </div>
        </div>
      `);
      assert.isFalse(isOffscreen(vNode));
    });

    it('should detect elements positioned outside the right edge (LTR)', () => {
      const vNode = queryFixture(
        html`<div
          id="target"
          style="position: fixed; width: 50px; left: 100vw;"
        >
          Offscreen?
        </div>`
      );
      assert.isTrue(isOffscreen(vNode));
    });

    it('should detect elements positioned outside the right edge (RTL)', () => {
      document.body.style.direction = 'rtl';
      const vNode = queryFixture(
        html`<div
          id="target"
          style="position: fixed; width: 50px; left: 100vw;"
        >
          Offscreen?
        </div>`
      );
      assert.isTrue(isOffscreen(vNode));
    });

    it('should detect elements positioned outside the left edge (LTR)', () => {
      const vNode = queryFixture(
        html`<div
          id="target"
          style="position: fixed; width: 50px; left: -50px;"
        >
          Offscreen?
        </div>`
      );
      assert.isTrue(isOffscreen(vNode));
    });

    it('should detect elements positioned outside the left edge on RTL documents', () => {
      document.body.style.direction = 'rtl';
      const vNode = queryFixture(
        html`<div
          id="target"
          style="position: fixed; width: 50px; left: -50px;"
        >
          Offscreen?
        </div>`
      );
      assert.isTrue(isOffscreen(vNode));
    });
  });
});
