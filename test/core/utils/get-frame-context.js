describe('utils.getFrameContexts', function() {
  var getFrameContexts = axe.utils.getFrameContexts;
  var shadowSupported = axe.testUtils.shadowSupport.v1;
  var fixture = document.querySelector('#fixture');

  it('returns an empty array if the page has no frames', function() {
    var frameContext = getFrameContexts();
    assert.isArray(frameContext);
    assert.lengthOf(frameContext, 0);
  });

  it('sets context.initiator to false for each included frame', function() {
    fixture.innerHTML =
      '<iframe></iframe>' + '<iframe></iframe>' + '<iframe></iframe>';

    var contexts = getFrameContexts().map(function(frameData) {
      return frameData.frameContext;
    });

    assert.lengthOf(contexts, 3);
    assert.isFalse(contexts[0].initiator);
    assert.isFalse(contexts[1].initiator);
    assert.isFalse(contexts[2].initiator);
  });

  it('returns a `frameSelector` for each included frame', function() {
    fixture.innerHTML =
      '<iframe></iframe>' + '<iframe></iframe>' + '<iframe></iframe>';

    var selectors = getFrameContexts().map(function(frameData) {
      return frameData.frameSelector;
    });
    assert.lengthOf(selectors, 3);
    assert.include(selectors[0], 'iframe:nth-child(1)');
    assert.include(selectors[1], 'iframe:nth-child(2)');
    assert.include(selectors[2], 'iframe:nth-child(3)');
  });

  it('returns a `frameContext` for each included frame', function() {
    fixture.innerHTML =
      '<iframe id="f1"></iframe>' +
      '<iframe id="f2"></iframe>' +
      '<iframe id="f3"></iframe>';
    var context = {
      include: [
        ['#f1', 'header'],
        ['#f2', 'main']
      ],
      exclude: [['#f3', 'footer']]
    };
    var contexts = getFrameContexts(context).map(function(frameData) {
      return frameData.frameContext;
    });

    assert.lengthOf(contexts, 3);
    assert.deepEqual(contexts[0], {
      initiator: false,
      include: [['header']],
      exclude: []
    });
    assert.deepEqual(contexts[1], {
      initiator: false,
      include: [['main']],
      exclude: []
    });
    assert.deepEqual(contexts[2], {
      initiator: false,
      include: [],
      exclude: [['footer']]
    });
  });

  it('excludes non-frame contexts', function() {
    fixture.innerHTML = '<iframe id="f1"></iframe>';
    var context = {
      include: [['#header'], ['a'], ['#f1', 'header']]
    };
    var contexts = getFrameContexts(context).map(function(frameData) {
      return frameData.frameContext;
    });

    assert.lengthOf(contexts, 1);
    assert.deepEqual(contexts[0], {
      initiator: false,
      include: [['header']],
      exclude: []
    });
  });

  it('mixes contexts if the frame is selected twice', function() {
    fixture.innerHTML =
      '<iframe id="f1"></iframe>' + '<iframe id="f2"></iframe>';
    var context = {
      include: [
        ['#f1', 'header'],
        ['#f2', 'footer']
      ],
      exclude: [['iframe', 'main']]
    };
    var contexts = getFrameContexts(context).map(function(frameData) {
      return frameData.frameContext;
    });
    assert.lengthOf(contexts, 2);
    assert.deepEqual(contexts[0], {
      initiator: false,
      include: [['header']],
      exclude: [['main']]
    });
    assert.deepEqual(contexts[1], {
      initiator: false,
      include: [['footer']],
      exclude: [['main']]
    });
  });

  it('combines include/exclude arrays of frames selected twice', function() {
    fixture.innerHTML = '<iframe></iframe>';
    var context = {
      include: [
        ['iframe', 'header'],
        ['iframe', 'main']
      ],
      exclude: [
        ['iframe', 'aside'],
        ['iframe', 'footer']
      ]
    };
    var contexts = getFrameContexts(context).map(function(frameData) {
      return frameData.frameContext;
    });

    assert.lengthOf(contexts, 1);
    assert.deepEqual(contexts[0], {
      initiator: false,
      include: [['header'], ['main']],
      exclude: [['aside'], ['footer']]
    });
  });

  it('skips excluded frames', function() {
    fixture.innerHTML =
      '<iframe id="f1"></iframe>' +
      '<iframe id="f2"></iframe>' +
      '<iframe id="f3"></iframe>';
    var context = {
      exclude: [[['#f2']]]
    };
    var selectors = getFrameContexts(context).map(function(frameData) {
      return frameData.frameSelector;
    });
    assert.lengthOf(selectors, 2);
    assert.include(selectors[0], 'iframe:nth-child(1)');
    assert.include(selectors[1], 'iframe:nth-child(3)');
  });

  it('skips frames excluded by a parent', function() {
    fixture.innerHTML = '<iframe></iframe>';
    var frameContexts = getFrameContexts({
      exclude: [['#fixture']]
    });
    assert.lengthOf(frameContexts, 0);
  });

  it('normalizes the context', function() {
    var contexts;
    fixture.innerHTML =
      '<iframe id="f1"></iframe>' + '<iframe id="f2"></iframe>';
    contexts = getFrameContexts('#f1').map(function(frameData) {
      return frameData.frameContext;
    });
    assert.lengthOf(contexts, 1);
    assert.deepEqual(contexts[0], {
      initiator: false,
      include: [],
      exclude: []
    });

    contexts = getFrameContexts({ include: ['#f1'] }).map(function(frameData) {
      return frameData.frameContext;
    });
    assert.lengthOf(contexts, 1);
    assert.deepEqual(contexts[0], {
      initiator: false,
      include: [],
      exclude: []
    });

    contexts = getFrameContexts({ exclude: ['#f2'] }).map(function(frameData) {
      return frameData.frameContext;
    });
    assert.lengthOf(contexts, 1);
    assert.deepEqual(contexts[0], {
      initiator: false,
      include: [],
      exclude: []
    });
  });

  it('accepts elements', function() {
    var contexts;
    fixture.innerHTML =
      '<iframe id="f1"></iframe>' + '<iframe id="f2"></iframe>';
    var f1 = fixture.querySelector('#f1');
    var f2 = fixture.querySelector('#f2');
    contexts = getFrameContexts(f1).map(function(frameData) {
      return frameData.frameContext;
    });
    assert.lengthOf(contexts, 1);
    assert.deepEqual(contexts[0], {
      initiator: false,
      include: [],
      exclude: []
    });

    contexts = getFrameContexts({ include: [f1] }).map(function(frameData) {
      return frameData.frameContext;
    });
    assert.lengthOf(contexts, 1);
    assert.deepEqual(contexts[0], {
      initiator: false,
      include: [],
      exclude: []
    });

    contexts = getFrameContexts({ exclude: [f2] }).map(function(frameData) {
      return frameData.frameContext;
    });
    assert.lengthOf(contexts, 1);
    assert.deepEqual(contexts[0], {
      initiator: false,
      include: [],
      exclude: []
    });
  });

  it('works with nested frames', function() {
    fixture.innerHTML =
      '<iframe id="f1"></iframe>' + '<iframe id="f2"></iframe>';
    var context = {
      include: [
        ['#f1', '#f3', 'header'],
        ['#f2', '#f4', '#f5', 'footer']
      ],
      exclude: [['#f2', '#f6', '#f7', '#f7', 'main']]
    };
    var contexts = getFrameContexts(context).map(function(frameData) {
      return frameData.frameContext;
    });

    assert.lengthOf(contexts, 2);
    assert.deepEqual(contexts[0], {
      initiator: false,
      include: [['#f3', 'header']],
      exclude: []
    });
    assert.deepEqual(contexts[1], {
      initiator: false,
      include: [['#f4', '#f5', 'footer']],
      exclude: [['#f6', '#f7', '#f7', 'main']]
    });
  });

  (shadowSupported ? it : xit)('works on iframes in shadow dom', function() {
    fixture.innerHTML = '<div id="shadow"></div>';
    var div = fixture.querySelector('div');
    var shadowRoot = div.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<main><iframe id="f1"></iframe></main>';

    var frameContext = getFrameContexts();

    assert.lengthOf(frameContext, 1);
    assert.lengthOf(frameContext[0].frameSelector, 2);
    assert.equal(frameContext[0].frameSelector[1], 'main > iframe');
    assert.deepEqual(frameContext[0].frameContext, {
      initiator: false,
      include: [],
      exclude: []
    });
  });
});
