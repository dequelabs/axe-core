describe('color.getBackgroundStack', () => {
  const html = axe.testUtils.html;
  const fixture = document.getElementById('fixture');

  function setup(css = '', modal = false, shadowOpacity = null) {
    fixture.innerHTML = html`
      <style>
        #behind {
          position: fixed;
          left: 170px;
          top: 108px;
          width: 50px;
          height: 20px;
          background: red;
        }
        #panel {
          position: fixed;
          left: 16px;
          top: 60px;
          margin: 0;
          padding: 24px;
          width: 358px;
          box-sizing: border-box;
          border: 0;
          border-radius: 0;
          background: #142442;
        }
        #target {
          background: #142442;
          color: white;
          font: 16px/24px Arial;
          margin: 0;
        }
        ${css}
      </style>
      <div id="behind"></div>
      <dialog id="panel" open>
        <p id="target">
          Pin the named city. Drag the map to pan or drag your pin to adjust it.
          Arrow keys move the pin; hold Shift for finer adjustment.
        </p>
      </dialog>
    `;
    const panel = fixture.querySelector('#panel');
    if (modal) {
      panel.close();
      panel.showModal();
    }
    const target = fixture.querySelector('#target');
    if (shadowOpacity !== null) {
      const holder = document.createElement('div');
      holder.setHTMLUnsafe(html`
        <div>
          <template shadowrootmode="open">
            <style>
              p {
                background: #142442;
                color: white;
                font: 16px/24px Arial;
                margin: 0;
              }
            </style>
          </template>
        </div>
      `);
      const host = holder.firstElementChild;
      target.replaceWith(host);
      host.shadowRoot.append(target);
      host.style.opacity = shadowOpacity;
    }
    axe.testUtils.flatTreeSetup(fixture);
    return target;
  }

  afterEach(() => {
    fixture.querySelector('dialog')?.close();
    axe.commons.color.incompleteData.clear();
  });

  for (const modal of [false, true]) {
    it(`ignores hidden layers behind opaque ${modal ? 'modal' : 'nonmodal'} text`, () => {
      const target = setup('', modal);
      const stack = axe.commons.color.getBackgroundStack(target);
      assert.isArray(stack);
      assert.strictEqual(stack[0], target);
      assert.isTrue(stack.includes(fixture.querySelector('#panel')));
    });
  }

  it('ignores hidden layers behind an opaque ancestor', () => {
    const target = setup('#target { background: transparent; }');
    assert.isArray(axe.commons.color.getBackgroundStack(target));
  });

  for (const [name, css] of [
    ['transparent backgrounds', '#target, #panel { background: transparent; }'],
    [
      'translucent backgrounds',
      '#target, #panel { background: rgba(20,36,66,.5); }'
    ],
    ['ancestor opacity', '#panel { opacity: .5; }'],
    ['gradient', '#target { background: linear-gradient(white, black); }'],
    [
      'image',
      '#target { background-image: url(data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22/%3E); }'
    ],
    ['filter', '#panel { filter: opacity(.5); }'],
    ['overflow clipping', '#panel { overflow: hidden; }'],
    ['clipping', '#panel { clip-path: circle(40%); }'],
    ['mask', '#panel { mask-image: linear-gradient(white, transparent); }'],
    ['transform', '#panel { transform: rotate(5deg); }'],

    ['blend mode', '#panel { mix-blend-mode: difference; }'],
    ['rounded backgrounds', '#target, #panel { border-radius: 96px; }'],
    [
      'generated overlays',
      '#panel::after { content: ""; position: absolute; left: 40px; top: 40px; width: 160px; height: 24px; background: gray; }'
    ]
  ]) {
    it(`preserves incomplete results for ${name}`, () => {
      const target = setup(css);
      assert.isTrue(axe.commons.color.getBackgroundColor(target) === null);
    });
  }

  for (const position of ['absolute', 'fixed']) {
    it(`preserves incomplete results for ${position} foreground overlay`, () => {
      const target = setup();
      const overlay = document.createElement('div');
      overlay.style.cssText = `position: ${position}; z-index: 10; left: 30px; top: ${position === 'fixed' ? 108 : 40}px; width: 200px; height: 20px; background: rgba(128,128,128,.8)`;
      target.parentElement.append(overlay);
      axe.testUtils.flatTreeSetup(fixture);
      assert.isTrue(axe.commons.color.getBackgroundColor(target) === null);
    });
  }

  it('supports opaque text across a shadow boundary', () => {
    const target = setup('', false, '1');
    assert.isArray(axe.commons.color.getBackgroundStack(target));
  });

  it('preserves incomplete results for shadow-host opacity', () => {
    const target = setup('', false, '0.5');
    assert.isTrue(axe.commons.color.getBackgroundColor(target) === null);
  });

  for (const opacity of ['1', '0.5']) {
    it(`accounts for slot opacity ${opacity} across a shadow boundary`, () => {
      const target = setup();
      const holder = document.createElement('div');
      holder.setHTMLUnsafe(html`
        <div>
          <template shadowrootmode="open">
            <slot style="display: block; opacity: ${opacity}"></slot>
          </template>
        </div>
      `);
      const host = holder.firstElementChild;
      target.replaceWith(host);
      host.append(target);
      axe.testUtils.flatTreeSetup(fixture);
      const color = axe.commons.color.getBackgroundColor(target);
      assert.strictEqual(color === null, opacity !== '1');
    });
  }

  it('preserves incomplete results for overlays in a clipped modal', () => {
    const target = setup('#panel { overflow: hidden; }', true);
    const overlay = document.createElement('div');
    overlay.style.cssText =
      'position: absolute; z-index: 10; left: 30px; top: 40px; width: 200px; height: 20px; background: gray; pointer-events: none';
    target.parentElement.append(overlay);
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(axe.commons.color.getBackgroundColor(target) === null);
  });
});
