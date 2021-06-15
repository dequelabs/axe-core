describe('utils.getFrameContexts', function () {
  var getFrameContexts = axe.utils.getFrameContexts;
  var fixture = document.querySelector('#fixture')

  it('returns an empty array if the page has no frames', function () {
    var frameContext = getFrameContexts()
    assert.isArray(frameContext)
    assert.lengthOf(frameContext, 0)
  });

  it('returns a `frameSelector` for each included frame', function () {
    fixture.innerHTML =
      '<iframe></iframe>' +
      '<iframe></iframe>' +
      '<iframe></iframe>'

    var selectors = getFrameContexts().map(function (frameData) {
      return frameData.frameSelector;
    });
    assert.include(selectors[0], 'iframe:nth-child(1)')
    assert.include(selectors[1], 'iframe:nth-child(2)')
    assert.include(selectors[2], 'iframe:nth-child(3)')
    assert.lengthOf(selectors, 3)
  });

  it('returns a `frameContext` for each included frame', function () {
    fixture.innerHTML =
      '<iframe id="f1"></iframe>' +
      '<iframe id="f2"></iframe>' +
      '<iframe id="f3"></iframe>'
    var context = {
      include: [
        ["#f1", "header"],
        ["#f2", "main"]
      ],
      exclude: [
        ["#f3", "footer"]
      ]
    }
    var contexts = getFrameContexts(context).map(function (frameData) {
      return frameData.frameContext;
    });

    assert.deepEqual(contexts[0], { include: [['header']], exclude: [] })
    assert.deepEqual(contexts[1], { include: [['main']], exclude: [] })
    assert.deepEqual(contexts[2], { include: [], exclude: [['footer']] })
  });

  it('returns a `frameContext` for each included frame', function () {
    fixture.innerHTML =
      '<iframe id="f1"></iframe>' +
      '<iframe id="f2"></iframe>' +
      '<iframe id="f3"></iframe>'
    var context = {
      include: [
        ["#f1", "header"],
        ["#f2", "main"]
      ],
      exclude: [
        ["#f3", "footer"]
      ]
    }
    var contexts = getFrameContexts(context).map(function (frameData) {
      return frameData.frameContext;
    });

    assert.deepEqual(contexts[0], {
      include: [['header']],
      exclude: []
    })
    assert.deepEqual(contexts[1], {
      include: [['main']],
      exclude: []
    })
    assert.deepEqual(contexts[2], {
      include: [],
      exclude: [['footer']]
    })
  });
  
  it.skip('mixes contexts if the frame is selected twice', function () {
    fixture.innerHTML =
      '<iframe id="f1"></iframe>' +
      '<iframe id="f2"></iframe>'
    var context = {
      include: [
        ["#f1", "header"],
        ["#f2", "footer"]
      ],
      exclude: [
        ['iframe', 'main']
      ]
    }
    var contexts = getFrameContexts(context).map(function (frameData) {
      return frameData.frameContext;
    });
    console.log(JSON.stringify(contexts, null, 2));
    assert.deepEqual(contexts[0], {
      include: [['header']],
      exclude: [['main']]
    })
    assert.deepEqual(contexts[1], {
      include: [['footer']],
      exclude: [['main']]
    })
  });

  it('combines include/exclude arrays of frames selected twice', function () {
    fixture.innerHTML = '<iframe></iframe>';
    var context = {
      include: [
        ["iframe", "header"],
        ["iframe", "main"]
      ],
      exclude: [
        ["iframe", "aside"],
        ["iframe", "footer"]
      ]
    };
    var contexts = getFrameContexts(context).map(function (frameData) {
      return frameData.frameContext;
    });

    assert.deepEqual(contexts[0], {
      include: [
        ['header'],
        ['main']
      ],
      exclude: [
        ['aside'],
        ['footer']
      ]
    })
  });

  it('skips excluded frames', function () {
    fixture.innerHTML =
      '<iframe id="f1"></iframe>' +
      '<iframe id="f2"></iframe>' +
      '<iframe id="f3"></iframe>'
    var context = {
      exclude: [
        [["#f2"]]
      ]
    }
    var selectors = getFrameContexts(context).map(function (frameData) {
      return frameData.frameSelector;
    });
    assert.include(selectors[0], 'iframe:nth-child(1)')
    assert.include(selectors[1], 'iframe:nth-child(3)')
    assert.lengthOf(selectors, 2)
  });

  it('skips frames excluded by a parent', function () {
    fixture.innerHTML = '<iframe></iframe>';
    var frameContexts = getFrameContexts({
      exclude: [['#fixture']]
    })
    assert.lengthOf(frameContexts, 0)
  });

  it('normalises the context', function () {
    var frameContexts
    fixture.innerHTML =
      '<iframe id="f1"></iframe>' +
      '<iframe id="f2"></iframe>'
    frameContexts = getFrameContexts('#f1')
    assert.lengthOf(frameContexts, 1)

    frameContexts = getFrameContexts({ include: ['#f1'] })
    assert.lengthOf(frameContexts, 1)

    frameContexts = getFrameContexts({ exclude: ['#f2'] })
    assert.lengthOf(frameContexts, 1)
  });

  it('accepts elements');

  it('works with nested frames');

  it('works on iframes in shadow dom');
});
