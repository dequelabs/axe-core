// NOTE: due to how the region check works to return the top-most
// node that is outside the region, all fixture content will need
// a region node (in most cases the <div role="main">Content</div>)
// in order for the check to not give false positives/negatives.
// adding the region node forces the check to not return the #fixture
// as the top-most element but instead use the #target element.
describe('region', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var shadowSupport = axe.testUtils.shadowSupport;
  var checkSetup = axe.testUtils.checkSetup;
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var checkEvaluate = axe.testUtils.getCheckEvaluate('region');

  var checkContext = new axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
    axe.reset();
  });

  it('should return true when content is inside the region', function () {
    var checkArgs = checkSetup(
      '<div role="main"><a id="target" href="a.html#mainheader">Click Here</a><div><h1 id="mainheader" tabindex="0">Introduction</h1></div></div>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true when a region role is added to standards', () => {
    axe.configure({
      standards: {
        ariaRoles: {
          feed: {
            type: 'landmark'
          }
        }
      }
    });
    var checkArgs = checkSetup(
      '<div role="feed" id="target">This is random content.</div>' +
        '<div role="main"><h1 id="mainheader">Introduction</h1></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false when img content is outside the region', function () {
    var checkArgs = checkSetup(
      '<img id="target" src="data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7"><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true when textless text content is outside the region', function () {
    var checkArgs = checkSetup(
      '<p id="target"></p><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true when wrapper content is outside the region', function () {
    var checkArgs = checkSetup(
      '<div id="target"><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div></div>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true when invisible content is outside the region', function () {
    var checkArgs = checkSetup(
      '<p id="target" style="display: none">Click Here</p><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true when there is a skiplink', function () {
    var checkArgs = checkSetup(
      '<a id="target" href="#mainheader">Click Here</a><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true when there is an Angular skiplink', function () {
    var checkArgs = checkSetup(
      '<a id="target" href="/#mainheader">Click Here</a><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false when there is a non-region element', function () {
    var checkArgs = checkSetup(
      '<div id="target">This is random content.</div><div role="main"><h1 id="mainheader">Introduction</h1></div>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false when there is a non-skiplink', function () {
    var checkArgs = checkSetup(
      '<a id="target" href="something.html#mainheader">Click Here</a><div role="main"><h1 id="mainheader">Introduction</h1></div>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true if the non-region element is a script', function () {
    var checkArgs = checkSetup(
      '<script id="target">axe.run()</script><div role="main">Content</div>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should considered aria labelled elements as content', function () {
    var checkArgs = checkSetup(
      '<div id="target" aria-label="axe-core logo" role="img"></div><div role="main">Content</div>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should allow native header elements', function () {
    var checkArgs = checkSetup(
      '<header id="target">branding</header><main>Content </main><aside>stuff</aside><footer>copyright</footer>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should allow native main elements', function () {
    var checkArgs = checkSetup(
      '<header>branding</header><main id="target">Content </main><aside>stuff</aside><footer>copyright</footer>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should allow native aside elements', function () {
    var checkArgs = checkSetup(
      '<header>branding</header><main>Content </main><aside id="target">stuff</aside><footer>copyright</footer>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should allow native footer elements', function () {
    var checkArgs = checkSetup(
      '<header>branding</header><main>Content </main><aside>stuff</aside><footer id="target">copyright</footer>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('ignores native landmark elements with an overwriting role', function () {
    var checkArgs = checkSetup(
      '<main id="target" role="none">Content</main><div role="main">Content</div>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('returns false for content outside of form tags with accessible names', function () {
    var checkArgs = checkSetup(
      '<p id="target">Text</p><form aria-label="form"></form>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('ignores unlabeled forms as they are not landmarks', function () {
    var checkArgs = checkSetup(
      '<form id="target"><fieldset>foo</fieldset></form><div role="main">Content</div>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('treats <forms> with aria label as landmarks', function () {
    var checkArgs = checkSetup(
      '<form id="target" aria-label="foo"><p>This is random content.</p></form><div role="main">Content</div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('treats role=forms with aria label as landmarks', function () {
    var checkArgs = checkSetup(
      '<div role="form" id="target" aria-label="foo"><p>This is random content.</p></div><div role="main">Content</div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('treats forms without aria label as not a landmarks', function () {
    var checkArgs = checkSetup(
      '<form id="target"><p>This is random content.</p></form><div role="main">Content</div>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('treats forms with an empty aria label as not a landmarks', function () {
    var checkArgs = checkSetup(
      '<form id="target" aria-label=" "><p>This is random content.</p></form><div role="main">Content</div>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('treats forms with empty titles not as landmarks', function () {
    var checkArgs = checkSetup(
      '<form id="target" title=""><p>This is random content.</p></form><div role="main">Content</div>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('treats ARIA forms with no label or title as landmarks', function () {
    var checkArgs = checkSetup(
      '<div role="form" id="target"><p>This is random content.</p></div><div role="main">Content</div>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('allows content in aria-live=assertive', function () {
    var checkArgs = checkSetup(
      '<div aria-live="assertive" id="target"><p>This is random content.</p></div><div role="main">Content</div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('allows content in aria-live=polite', function () {
    var checkArgs = checkSetup(
      '<div aria-live="polite" id="target"><p>This is random content.</p></div><div role="main">Content</div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('does not allow content in aria-live=off', function () {
    var checkArgs = checkSetup(
      '<div aria-live="off" id="target"><p>This is random content.</p></div><div role="main">Content</div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('allows content in aria-live=assertive with explicit role set', function () {
    var checkArgs = checkSetup(
      '<div aria-live="assertive" role="alert" id="target"><p>This is random content.</p></div><div role="main">Content</div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('allows content in aria-live=polite with explicit role set', function () {
    var checkArgs = checkSetup(
      '<div aria-live="polite" role="status" id="target"><p>This is random content.</p></div><div role="main">Content</div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('allows content in implicit aria-live role alert', function () {
    var checkArgs = checkSetup(
      '<div role="alert" id="target"><p>This is random content.</p></div><div role="main">Content</div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('allows content in implicit aria-live role log', function () {
    var checkArgs = checkSetup(
      '<div role="log" id="target"><p>This is random content.</p></div><div role="main">Content</div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('allows content in implicit aria-live role status', function () {
    var checkArgs = checkSetup(
      '<div role="status" id="target"><p>This is random content.</p></div><div role="main">Content</div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('treats role=dialog elements as regions', function () {
    var checkArgs = checkSetup(
      '<div role="dialog" id="target"><p>This is random content.</p></div><div role="main">Content</div>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('treats role=alertdialog elements as regions', function () {
    var checkArgs = checkSetup(
      '<div role="alertdialog" id="target"><p>This is random content.</p></div><div role="main">Content</div>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('treats svg elements as regions', function () {
    var checkArgs = checkSetup(
      '<svg id="target"></svg><div role="main">Content</div>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('returns the outermost element as the error', function () {
    var checkArgs = checkSetup(
      '<div id="target"><p>This is random content.</p></div><div role="main"><h1 id="mainheader" tabindex="0">Introduction</h1></div>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('supports options.regionMatcher', function () {
    var checkArgs = checkSetup(
      '<div aria-live="off" id="target"><p>This is random content.</p></div><div role="main">Content</div>',
      {
        regionMatcher: {
          attributes: {
            'aria-live': 'off'
          }
        }
      }
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true when there is a button', function () {
    // Some pages have a skiplink menu, that opens through a button
    // ARIA practices is an example of this.
    var checkArgs = checkSetup(
      '<button id="target">Skip menu</button><main><h1>Introduction</h1></main>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  (shadowSupport.v1 ? it : xit)('should test Shadow tree content', function () {
    var div = document.createElement('div');
    var shadow = div.attachShadow({ mode: 'open' });
    shadow.innerHTML = 'Some text';
    fixtureSetup(div);
    var virutalNode = axe._tree[0];

    // fixture is the outermost element
    assert.isFalse(
      checkEvaluate.call(
        checkContext,
        virutalNode.actualNode,
        null,
        virutalNode
      )
    );
  });

  (shadowSupport.v1 ? it : xit)('should test slotted content', function () {
    var div = document.createElement('div');
    div.innerHTML = 'Some content';
    var shadow = div.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<div role="main"><slot></slot></div>';
    var checkArgs = checkSetup(div);

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  (shadowSupport.v1 ? it : xit)(
    'should ignore skiplink targets inside shadow trees',
    function () {
      var div = document.createElement('div');
      div.innerHTML =
        '<a id="target" href="#foo">skiplink</a><div>Content</div>';

      var shadow = div.querySelector('div').attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div role="main" id=#foo"><slot></slot></div>';
      fixtureSetup(div);
      var virutalNode = axe.utils.getNodeFromTree(div.querySelector('#target'));

      assert.isFalse(
        checkEvaluate.call(
          checkContext,
          virutalNode.actualNode,
          null,
          virutalNode
        )
      );
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should find the skiplink in shadow DOM',
    function () {
      var div = document.createElement('div');
      div.innerHTML = '<span id="foo">Content!</span>';
      var shadow = div.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<a href="#foo">skiplink</a><div role="main"><slot></slot></div>';
      var checkArgs = checkSetup(div);

      assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
      assert.lengthOf(checkContext._relatedNodes, 0);
    }
  );
});
