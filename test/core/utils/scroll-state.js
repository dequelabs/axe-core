describe('axe.utils.getScrollState', function () {
  'use strict';
  var mockWin;
  var getScrollState = axe.utils.getScrollState;

  var fixture = document.getElementById('fixture');

  beforeEach(function () {
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

  it('should be a function', function () {
    assert.isFunction(getScrollState);
  });

  it('takes the window object as an optional argument', function () {
    assert.deepEqual(
      getScrollState(),
      getScrollState(window)
    );
  });

  it('returns the window as the first item, if pageXOffset is supported', function () {
    assert.deepEqual(
      getScrollState(mockWin)[0],
      {
        elm: mockWin,
        top: mockWin.pageYOffset,
        left: mockWin.pageXOffset
      }
    );
  });

  it('returns the html as the first item, if pageXOffset is not supported', function () {
    mockWin.pageYOffset = undefined;
    mockWin.pageXOffset = undefined;
    var html = mockWin.document.documentElement;

    assert.deepEqual(
      getScrollState(mockWin)[0],
      {
        elm: html,
        top: html.scrollTop,
        left: html.scrollLeft
      }
    );
  });

  it('grabs scrollTop and scrollLeft from all descendants of body', function () {
    fixture.innerHTML = 
      '<div style="overflow:auto; height: 50px" id="tgt1">' +
        '<div style="height: 100px"> Han Solo </div>' +
        '<div style="overflow: hidden; height: 50px" id="tgt2">' +
          '<div style="height: 100px"> Chewbacca </div>' +
        '</div>' +
      '</div>';

    var tgt1 = document.getElementById('tgt1');
    var tgt2 = document.getElementById('tgt2');
    tgt1.scrollTop = 10;
    tgt2.scrollTop = 20;

    var scrollState = getScrollState();

    assert.deepEqual(
      scrollState.find(function (scroll) { return scroll.elm === tgt1; }),
      { elm: tgt1, top: 10, left: 0 }
    );
    assert.deepEqual(
      scrollState.find(function (scroll) { return scroll.elm === tgt2; }),
      { elm: tgt2, top: 20, left: 0 }
    );
  });

  it('ignores elements with overflow visible', function () {
    fixture.innerHTML = 
      '<div style="overflow:visible; height: 50px" id="tgt1">' +
        '<div style="height: 100px" id="tgt2"> Han Solo </div>' +
      '</div>';

    var tgt1 = document.getElementById('tgt1');
    var tgt2 = document.getElementById('tgt2');
    var scrollState = getScrollState();

    assert.isUndefined(
      scrollState.find(function (scroll) { return scroll.elm === tgt1; })
    );
    assert.isUndefined(
      scrollState.find(function (scroll) { return scroll.elm === tgt2; })
    );
  });

  it('ignores elements that do not overflow', function () {
    fixture.innerHTML = 
      '<div style="overflow:auto; height: 300px" id="tgt1">' +
        '<div style="height: 100px"> Han Solo </div>' +
        '<div style="overflow: hidden; height: 150px" id="tgt2">' +
          '<div style="height: 100px"> Chewbacca </div>' +
        '</div>' +
      '</div>';

    var tgt1 = document.getElementById('tgt1');
    var tgt2 = document.getElementById('tgt2');
    var scrollState = getScrollState();

    assert.isUndefined(
      scrollState.find(function (scroll) { return scroll.elm === tgt1; })
    );
    assert.isUndefined(
      scrollState.find(function (scroll) { return scroll.elm === tgt2; })
    );
  });
});

describe('axe.utils.setScrollState', function () {
  'use strict';
  var setScrollState = axe.utils.setScrollState;

  var fixture = document.getElementById('fixture');
  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should be a function', function () {
    assert.isFunction(setScrollState);
  });

  it('sets scrollTop and scrollLeft for regular nodes', function () {
    var elm1 = {}, elm2 = {};
    setScrollState([
      { elm: elm1, top: 10, left: 20 },
      { elm: elm2, top: 30, left: 40 },
    ]);

    assert.deepEqual(elm1, { scrollTop: 10, scrollLeft: 20 });
    assert.deepEqual(elm2, { scrollTop: 30, scrollLeft: 40 });
  });

  it('calls scroll() for the window element', function () {
    var called;
    var winScroll = window.scroll;
    window.scroll = function (top, left) {
      called = { top: top, left: left };
    };
    setScrollState([
      { elm: window, top: 10, left: 20 }
    ]);
    assert.deepEqual(called, { top: 10, left: 20 });
    window.scroll = winScroll;
  });
});
