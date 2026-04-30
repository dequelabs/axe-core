describe('axe.utils.getScrollState', () => {
  const html = axe.testUtils.html;
  let mockWin;
  const getScrollState = axe.utils.getScrollState;

  const fixture = document.getElementById('fixture');

  beforeEach(() => {
    mockWin = {
      pageXOffset: 1,
      pageYOffset: 3,
      document: {
        documentElement: {
          children: [],
          scrollTop: 3,
          scrollHeight: 4
        }
      },
      body: { children: [] }
    };
    fixture.innerHTML = '';
  });

  it('should be a function', () => {
    assert.isFunction(getScrollState);
  });

  it('takes the window object as an optional argument', () => {
    assert.deepEqual(getScrollState(), getScrollState(window));
  });

  it('returns the window as the first item, if pageXOffset is supported', () => {
    assert.deepEqual(getScrollState(mockWin)[0], {
      elm: mockWin,
      top: mockWin.pageYOffset,
      left: mockWin.pageXOffset
    });
  });

  it('returns the html as the first item, if pageXOffset is not supported', () => {
    mockWin.pageYOffset = undefined;
    mockWin.pageXOffset = undefined;
    const docEl = mockWin.document.documentElement;

    assert.deepEqual(getScrollState(mockWin)[0], {
      elm: docEl,
      top: docEl.scrollTop,
      left: docEl.scrollLeft
    });
  });

  it('grabs scrollTop and scrollLeft from all descendants of body', () => {
    fixture.innerHTML = html`
      <div style="overflow:auto; height: 50px" id="tgt1">
        <div style="height: 100px">Han Solo</div>
        <div style="overflow: auto; height: 50px" id="tgt2">
          <div style="height: 100px">Chewbacca</div>
        </div>
      </div>
    `;

    const tgt1 = document.getElementById('tgt1');
    const tgt2 = document.getElementById('tgt2');
    tgt1.scrollTop = 10;
    tgt2.scrollTop = 20;

    const scrollState = getScrollState();

    assert.deepEqual(
      scrollState.find(scroll => {
        return scroll.elm === tgt1;
      }),
      { elm: tgt1, top: 10, left: 0 }
    );
    assert.deepEqual(
      scrollState.find(scroll => {
        return scroll.elm === tgt2;
      }),
      { elm: tgt2, top: 20, left: 0 }
    );
  });

  it('ignores elements with overflow visible', () => {
    fixture.innerHTML = html`
      <div style="overflow:visible; height: 50px" id="tgt1">
        <div style="height: 100px" id="tgt2">Han Solo</div>
      </div>
    `;

    const tgt1 = document.getElementById('tgt1');
    const tgt2 = document.getElementById('tgt2');
    const scrollState = getScrollState();

    assert.isUndefined(
      scrollState.find(scroll => {
        return scroll.elm === tgt1;
      })
    );
    assert.isUndefined(
      scrollState.find(scroll => {
        return scroll.elm === tgt2;
      })
    );
  });

  it('ignores elements that do not overflow', () => {
    fixture.innerHTML = html`
      <div style="overflow:auto; height: 300px" id="tgt1">
        <div style="height: 100px">Han Solo</div>
        <div style="overflow: hidden; height: 150px" id="tgt2">
          <div style="height: 100px">Chewbacca</div>
        </div>
      </div>
    `;

    const tgt1 = document.getElementById('tgt1');
    const tgt2 = document.getElementById('tgt2');
    const scrollState = getScrollState();

    assert.isUndefined(
      scrollState.find(scroll => {
        return scroll.elm === tgt1;
      })
    );
    assert.isUndefined(
      scrollState.find(scroll => {
        return scroll.elm === tgt2;
      })
    );
  });

  it('does not fail with svg elements', () => {
    fixture.innerHTML = html`
      <svg
        class="svg"
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="17"
        viewBox="0 0 13 17"
      >
        <path
          fill="currentColor"
          d="M6.5 0L0 6.5 1.4 8l4-4v12.7h2V4l4.3 4L13 6.4z"
        ></path>
      </svg>
    `;

    assert.doesNotThrow(() => {
      getScrollState();
    });
  });
});

describe('axe.utils.setScrollState', () => {
  const setScrollState = axe.utils.setScrollState;

  const fixture = document.getElementById('fixture');
  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should be a function', () => {
    assert.isFunction(setScrollState);
  });

  it('sets scrollTop and scrollLeft for regular nodes', () => {
    const elm1 = {},
      elm2 = {};
    setScrollState([
      { elm: elm1, top: 10, left: 20 },
      { elm: elm2, top: 30, left: 40 }
    ]);

    assert.deepEqual(elm1, { scrollTop: 10, scrollLeft: 20 });
    assert.deepEqual(elm2, { scrollTop: 30, scrollLeft: 40 });
  });

  it('calls scroll() for the window element', () => {
    let called;
    const winScroll = window.scroll;
    window.scroll = (left, top) => {
      called = { top: top, left: left };
    };
    setScrollState([{ elm: window, top: 10, left: 20 }]);
    assert.deepEqual(called, { top: 10, left: 20 });
    window.scroll = winScroll;
  });
});
