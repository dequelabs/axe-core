describe('color-contrast', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const checkSetup = axe.testUtils.checkSetup;
  const shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  const checkContext = axe.testUtils.MockCheckContext();
  const contrastEvaluate = axe.testUtils.getCheckEvaluate('color-contrast');

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
    axe._tree = undefined;
  });

  it('should return undefined if cannot handle color', () => {
    const params = checkSetup(html`
      <div
        id="divundertest"
        style="color: oklch(0.961073 0.000047911 none / 0.2); background-color: black; font-size: 14pt; font-weight: 900;"
      >
        <span id="target" style="font-weight:lighter;">My text</span>
      </div>
    `);

    const expectedRelatedNodes = fixture.querySelector('#divundertest');
    assert.isUndefined(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, [expectedRelatedNodes]);
    assert.deepEqual(checkContext._data.messageKey, 'colorParse');
    assert.equal(
      checkContext._data.colorParse,
      'oklch(0.961073 0.000047911 none / 0.2)'
    );
  });

  it('should return undefined if cannot handle backgroundcolor', () => {
    const params = checkSetup(html`
      <div
        style="color: gray; background-color: oklch(0.961073 0.000047911 none / 0.2); font-size: 14pt; font-weight: 900;"
      >
        <span id="target" style="font-weight:lighter;">My text</span>
      </div>
    `);
    assert.isUndefined(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
    assert.deepEqual(checkContext._data.messageKey, 'colorParse');
    assert.equal(
      checkContext._data.colorParse,
      'oklch(0.961073 0.000047911 none / 0.2)'
    );
  });

  it('should return undefined if cannot handle text-shadow', () => {
    const params = checkSetup(
      '<div id="target" style="background-color: #fff; color:#000; text-shadow: 1px 1px oklch(0.961073 0.000047911 none / 0.2);">My text</div>'
    );

    assert.isUndefined(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return true for hidden element', () => {
    const params = checkSetup(html`
      <div
        style="color: gray; background-color: white; font-size: 14pt; font-weight: 100;"
      >
        <span id="target" style="font-weight:bolder; opacity: 0;">My text</span>
      </div>
    `);

    assert.isTrue(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return true for child of hidden element', () => {
    const params = checkSetup(html`
      <div
        style="color: gray; background-color: white; font-size: 14pt; font-weight: 100; overflow: scroll; height: 0"
      >
        <span id="target" style="font-weight:bolder">My text</span>
      </div>
    `);

    assert.isTrue(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return the proper values stored in data', () => {
    const params = checkSetup(html`
      <div
        id="parent"
        style="color: black; background-color: white; font-size: 14pt"
      >
        <b id="target">My text</b>
      </div>
    `);
    const white = new axe.commons.color.Color(255, 255, 255, 1);
    const black = new axe.commons.color.Color(0, 0, 0, 1);

    assert.isTrue(contrastEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.bgColor, white.toHexString());
    assert.equal(checkContext._data.fgColor, black.toHexString());
    assert.equal(checkContext._data.contrastRatio, '21.00');
    assert.equal(checkContext._data.fontWeight, 'bold');
    assert.isAtLeast(parseFloat(checkContext._data.fontSize), 14, 0.5);
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return true when there is sufficient contrast because of bold tag', () => {
    const params = checkSetup(html`
      <div
        id="parent"
        style="color: gray; background-color: white; font-size: 14pt"
      >
        <b id="target">My text</b>
      </div>
    `);

    assert.isTrue(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return true when there is sufficient contrast because of font weight', () => {
    const params = checkSetup(html`
      <div
        style="color: gray; background-color: white; font-size: 14pt; font-weight: 900"
        id="target"
      >
        <span style="font-weight:lighter">My text</span>
      </div>
    `);

    assert.isTrue(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return false when there is not sufficient contrast because of font weight', () => {
    const params = checkSetup(html`
      <div
        style="color: gray; background-color: white; font-size: 14pt; font-weight: 100"
        id="target"
      >
        <span style="font-weight:bolder">My text</span>
      </div>
    `);

    assert.isFalse(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, [params[0]]);
  });

  it('should return true when there is sufficient contrast because of font size', () => {
    const params = checkSetup(html`
      <div
        style="color: gray; background-color: white; font-size: 18pt;"
        id="target"
      >
        My text
      </div>
    `);
    assert.isTrue(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return false when there is not sufficient contrast because of font size', () => {
    const params = checkSetup(html`
      <div
        style="color: gray; background-color: white; font-size: 8pt; -webkit-text-size-adjust: none;"
        id="target"
      >
        My text
      </div>
    `);

    assert.isFalse(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, [params[0]]);
  });

  it('should return true when there is sufficient contrast with explicit transparency', () => {
    const params = checkSetup(html`
      <div id="parent" style="color: white; background-color: white;">
        <span style="color: black; background-color: rgba(0,0,0,0)" id="target"
          >My text</span
        >
      </div>
    `);

    assert.isTrue(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return true when there is sufficient contrast with implicit transparency', () => {
    const params = checkSetup(html`
      <div id="parent" style="color: white; background-color: white;">
        <span style="color: black;" id="target">My text</span>
      </div>
    `);

    assert.isTrue(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return true when there is sufficient contrast', () => {
    const params = checkSetup(html`
      <div style="color: black; background-color: white;" id="target">
        My text
      </div>
    `);

    assert.isTrue(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it.skip('should return true for inline elements with sufficient contrast spanning multiple lines', () => {
    const params = checkSetup(
      '<p>Text oh heyyyy <a href="#" id="target">and here\'s <br>a link</a></p>'
    );
    assert.isTrue(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return undefined for inline elements spanning multiple lines that are overlapped', () => {
    const params = checkSetup(html`
      <div style="position:relative;">
        <div
          style="background-color:rgba(0,0,0,1);position:absolute;width:300px;height:200px;"
        ></div>
        <p>
          Text oh heyyyy <a href="#" id="target">and here's <br />a link</a>
        </p>
      </div>
    `);
    assert.isUndefined(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return true for truncated inline elements', () => {
    const params = checkSetup(
      '<p>Text oh heyyyy <b id="target" style="display: block;overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sollicitudin quam. Fusce mi odio, egestas pulvinar erat eget, vehicula tempus est. Proin vitae ullamcorper velit. Donec sagittis est justo, mattis iaculis arcu facilisis id. Proin pulvinar ornare arcu a fermentum. Quisque et dignissim nulla, sit amet consectetur ipsum. Donec in libero porttitor, dapibus neque imperdiet, aliquam est. Vivamus blandit volutpat fringilla. In mi magna, mollis sit amet imperdiet eu, rutrum ut tellus. Mauris vel condimentum nibh, quis ultricies nisi. Vivamus accumsan quam mauris, id iaculis quam fringilla ac. Curabitur pulvinar dolor ac magna vehicula, non auctor ligula dignissim. Nam ac nibh porttitor, malesuada tortor varius, feugiat turpis. Mauris dapibus, tellus ut viverra porta, ipsum turpis bibendum ligula, at tempor felis ante non libero. Donec dapibus, diam sit amet posuere commodo, magna orci hendrerit ipsum, eu egestas mauris nulla ut ipsum. Sed luctus, orci in fringilla finibus, odio leo porta dolor, eu dignissim risus eros eget erat</b></p>'
    );
    assert.isTrue(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return true for inline elements with sufficient contrast', () => {
    const params = checkSetup(
      '<p>Text oh heyyyy <b id="target">and here\'s bold text</b></p>'
    );
    assert.isTrue(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return false when there is not sufficient contrast between foreground and background', () => {
    const params = checkSetup(html`
      <div style="color: yellow; background-color: white;" id="target">
        My text
      </div>
    `);

    assert.isFalse(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, [params[0]]);
    assert.deepEqual(checkContext._data.messageKey, null);
  });

  it('should ignore position:fixed elements above the target', () => {
    const params = checkSetup(html`
      <div style="background-color: #e5f1e5;" id="background">
        <div
          style="width:100%; position:fixed; top:0; height:50px; background: #F0F0F0; z-index: 200; color:#fff"
        >
          header
        </div>
        <div style="height: 6000px;"></div>
        stuff
        <span id="target" style="color: rgba(91, 91, 90, 0.7)"
          >This is some text</span
        >
        <div style="height: 6000px;"></div>
      </div>
    `);
    const expectedRelatedNodes = fixture.querySelector('#background');
    assert.isFalse(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, [expectedRelatedNodes]);
  });

  it('should ignore position:fixed elements directly above the target', () => {
    const params = checkSetup(html`
      <div style="background-color: #e5f1e5;" id="background">
        <div
          style="width:100%; position:fixed; top:0; height:400px; background: #F0F0F0; z-index: 200; color:#fff"
        >
          header
        </div>
        <div style="height: 10px;"></div>
        stuff
        <span id="target" style="color: rgba(91, 91, 90, 0.7)"
          >This is some text</span
        >
        <div style="height: 10px;"></div>
      </div>
    `);
    const expectedRelatedNodes = fixture.querySelector('#background');
    assert.isFalse(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, [expectedRelatedNodes]);
  });

  it('should find contrast issues on position:fixed elements', () => {
    const params = checkSetup(html`
      <div style="background-color: #e5f1e5;" id="background">
        <div
          style="width:100%; position:fixed; top:0; height:50px; background: #F0F0F0; z-index: 200; color:#fff"
          id="target"
        >
          header
        </div>
        <div style="height: 6000px;"></div>
        stuff
        <span style="color: rgba(91, 91, 90, 0.7)">This is some text</span>
        <div style="height: 6000px;"></div>
      </div>
    `);
    assert.isFalse(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, [params[0]]);
  });

  it('should return undefined for background-image elements', () => {
    const dataURI = `
      data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/
      XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkA
      ABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKU
      E1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7
    `;

    const params = checkSetup(
      html`<div
        id="background"
        style="background:url(${dataURI}) no-repeat left center; padding: 5px 0 5px 25px;"
      >
        <p id="target">Text 1</p>
      </div>`
    );

    assert.isUndefined(contrastEvaluate.apply(checkContext, params));
    assert.isUndefined(checkContext._data.bgColor);
    assert.equal(checkContext._data.contrastRatio, 0);
    assert.equal(checkContext._data.messageKey, 'bgImage');
  });

  it('should return undefined for background-gradient elements', () => {
    const params = checkSetup(html`
      <div
        id="background"
        style="background-image:linear-gradient(red, orange);"
      >
        <p id="target">Text 2</p>
      </div>
    `);

    assert.isUndefined(contrastEvaluate.apply(checkContext, params));
    assert.isUndefined(checkContext._data.bgColor);
    assert.equal(checkContext._data.messageKey, 'bgGradient');
    assert.equal(checkContext._data.contrastRatio, 0);
  });

  it('should return undefined when there are elements overlapping', done => {
    // Give Edge time to scroll... :/
    setTimeout(() => {
      const params = checkSetup(html`
        <div
          style="color: black; background-color: white; width: 200px; height: 100px; position: relative;"
          id="target"
        >
          My text
          <div
            style="position: absolute; top:0; left: 0; background-color: white; width: 100%; height: 100%;"
          ></div>
        </div>
      `);

      const result = contrastEvaluate.apply(checkContext, params);
      assert.isUndefined(result);
      assert.equal(checkContext._data.messageKey, 'bgOverlap');
      assert.equal(checkContext._data.contrastRatio, 0);
      done();
    }, 10);
  });

  it('should return true when a form wraps mixed content', () => {
    const params = checkSetup(
      '<form id="target"><p>Some text</p><label for="input6">Text</label><input id="input6"></form>'
    );
    assert.isTrue(contrastEvaluate.apply(checkContext, params));
  });

  it('should return true when a label wraps a text input', () => {
    fixtureSetup('<label id="target">My text <input type="text"></label>');
    const target = fixture.querySelector('#target');
    const virtualNode = axe.utils.getNodeFromTree(target);
    const result = contrastEvaluate.call(checkContext, target, {}, virtualNode);
    assert.isTrue(result);
  });

  it("should return true when a label wraps a text input but doesn't overlap", () => {
    const params = checkSetup(html`
      <label id="target">
        My text <input type="text" style="position: absolute; top: 200px;"
      /></label>
    `);
    const result = contrastEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should return true when there is sufficient contrast based on thead', () => {
    const params = checkSetup(
      '<table><thead style="background: #d00d2c"><tr><th id="target" style="color: #fff; padding: .5em">Col 1</th></tr></thead></table>'
    );
    assert.isTrue(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return true when there is sufficient contrast based on tbody', () => {
    const params = checkSetup(
      '<table><tbody style="background: #d00d2c"><tr><td id="target" style="color: #fff; padding: .5em">Col 1</td></tr></tbody></table>'
    );
    assert.isTrue(contrastEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return undefined if element overlaps text content', done => {
    // Give Edge time to scroll
    setTimeout(() => {
      const params = checkSetup(html`
        <div
          style="background-color: white; height: 60px; width: 80px; border:1px solid;position: relative;"
        >
          <div
            id="target"
            style="color: white; height: 40px; width: 60px; border:1px solid red;"
          >
            Hi
          </div>
          <div
            style="position: absolute; top: 0; width: 60px; height: 40px;background-color: #000"
          ></div>
        </div>
      `);

      assert.isUndefined(contrastEvaluate.apply(checkContext, params));
      assert.equal(checkContext._data.messageKey, 'bgOverlap');
      assert.equal(checkContext._data.contrastRatio, 0);
      done();
    }, 10);
  });

  it('should return undefined if element has same color as background', () => {
    const params = checkSetup(html`
      <div style="background-color: white;">
        <div style="color:white;" id="target">Text</div>
      </div>
    `);

    assert.isUndefined(contrastEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'equalRatio');
    assert.equal(checkContext._data.contrastRatio, 1);
  });

  it('returns relatedNodes with undefined', () => {
    const dataURI = `
      data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/
      XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkA
      ABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKU
      E1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7
    `;

    const params = checkSetup(
      html`<div
        id="background"
        style="background:url(${dataURI}) no-repeat left center; padding: 5px 0 5px 25px;"
      >
        <p id="target">Text 1</p>
      </div>`
    );

    assert.isUndefined(contrastEvaluate.apply(checkContext, params));
    assert.equal(
      checkContext._relatedNodes[0],
      document.querySelector('#background')
    );
  });

  it('should not error if client rects do not fill entire bounding rect', () => {
    const params = checkSetup(html`
      <pre
        style="overflow-x: auto; background-color: #333"
      ><span id="target" style="color: #000">
      
x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x 
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
x
      
</span></pre>
    `);
    assert.doesNotThrow(() => {
      contrastEvaluate.apply(checkContext, params);
    });
  });

  it('passes for element outside overflow:hidden', () => {
    const params = checkSetup(html`
      <style>
        .container {
          width: 200px;
          height: 200px;
          overflow: hidden;
        }
        .foo * {
          width: 200px;
          height: 200px;
        }
        #target {
          color: #eee;
        }
      </style>
      <div class="container">
        <div class="foo" id="foo">
          <div id="one">hello</div>
          <div id="target">goodbye</div>
        </div>
      </div>
    `);
    assert.isTrue(contrastEvaluate.apply(checkContext, params));
  });

  describe('with pseudo elements', () => {
    it('should return undefined if :before pseudo element has a background color', () => {
      const params = checkSetup(html`
        <style>
          .foo {
            position: relative;
          }
          .foo:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: red;
          }
        </style>
        <div id="background" class="foo">
          <p id="target" style="#000">Content</p>
        </div>
      `);

      assert.isUndefined(contrastEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, {
        fontSize: '12.0pt (16px)',
        fontWeight: 'normal',
        messageKey: 'pseudoContent',
        expectedContrastRatio: '4.5:1'
      });
      assert.equal(
        checkContext._relatedNodes[0],
        document.querySelector('#background')
      );
    });

    it('should return undefined if :after pseudo element has a background color', () => {
      const params = checkSetup(html`
        <style>
          .foo {
            position: relative;
          }
          .foo:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: red;
          }
        </style>
        <div id="background" class="foo">
          <p id="target" style="#000">Content</p>
        </div>
      `);

      assert.isUndefined(contrastEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, {
        fontSize: '12.0pt (16px)',
        fontWeight: 'normal',
        messageKey: 'pseudoContent',
        expectedContrastRatio: '4.5:1'
      });
      assert.equal(
        checkContext._relatedNodes[0],
        document.querySelector('#background')
      );
    });

    it('should return undefined if pseudo element has a background image', () => {
      const dataURI = `
        data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/
        XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkA
        ABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKU
        E1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7
      `;

      const params = checkSetup(
        html`<style>
            .foo {
              position: relative;
            }
            .foo:before {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              background: url(${dataURI}) no-repeat left center;
            }
          </style>
          <div id="background" class="foo">
            <p id="target" style="#000">Content</p>
          </div>`
      );

      assert.isUndefined(contrastEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, {
        fontSize: '12.0pt (16px)',
        fontWeight: 'normal',
        messageKey: 'pseudoContent',
        expectedContrastRatio: '4.5:1'
      });
      assert.equal(
        checkContext._relatedNodes[0],
        document.querySelector('#background')
      );
    });

    it('should not return undefined if pseudo element has no content', () => {
      const params = checkSetup(html`
        <style>
          .foo {
            position: relative;
          }
          .foo:before {
            position: absolute;
            width: 100%;
            height: 100%;
            background: red;
          }
        </style>
        <div id="background" class="foo">
          <p id="target" style="#000">Content</p>
        </div>
      `);

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
    });

    it('should not return undefined if pseudo element is not absolutely positioned no content', () => {
      const params = checkSetup(html`
        <style>
          .foo {
            position: relative;
          }
          .foo:before {
            content: '';
            width: 100%;
            height: 100%;
            background: red;
          }
        </style>
        <div id="background" class="foo">
          <p id="target" style="#000">Content</p>
        </div>
      `);

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
    });

    it('should not return undefined if pseudo element is has zero dimension', () => {
      const params = checkSetup(html`
        <style>
          .foo {
            position: relative;
          }
          .foo:before {
            content: '';
            position: absolute;
            width: 0;
            height: 100%;
            background: red;
          }
        </style>
        <div id="background" class="foo">
          <p id="target" style="#000">Content</p>
        </div>
      `);

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
    });

    it("should not return undefined if pseudo element doesn't have a background", () => {
      const params = checkSetup(html`
        <style>
          .foo {
            position: relative;
          }
          .foo:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
          }
        </style>
        <div id="background" class="foo">
          <p id="target" style="#000">Content</p>
        </div>
      `);

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
    });

    it('should not return undefined if pseudo element has visibility: hidden', () => {
      const params = checkSetup(html`
        <style>
          .foo {
            position: relative;
          }
          .foo:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: red;
            visibility: hidden;
          }
        </style>
        <div id="background" class="foo">
          <p id="target" style="#000">Content</p>
        </div>
      `);

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
    });

    it('should not return undefined if pseudo element has display: none', () => {
      const params = checkSetup(html`
        <style>
          .foo {
            position: relative;
          }
          .foo:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: red;
            display: none;
          }
        </style>
        <div id="background" class="foo">
          <p id="target" style="#000">Content</p>
        </div>
      `);

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
    });

    it('should return undefined if pseudo element is more than 25% of the element', () => {
      const params = checkSetup(html`
        <style>
          .foo {
            position: relative;
            width: 100px;
            height: 100px;
          }
          .foo:before {
            content: '';
            position: absolute;
            width: 26px;
            height: 100px;
            background: red;
          }
        </style>
        <p id="target" class="foo">Content</p>
      `);
      assert.isUndefined(contrastEvaluate.apply(checkContext, params));
    });

    it('should not return undefined if pseudo element is 25% of the element', () => {
      const params = checkSetup(html`
        <style>
          .foo {
            position: relative;
            width: 100px;
            height: 100px;
          }
          .foo:before {
            content: '';
            position: absolute;
            width: 25px;
            height: 100px;
            background: red;
          }
        </style>
        <p id="target" class="foo">Content</p>
      `);
      assert.isTrue(contrastEvaluate.apply(checkContext, params));
    });
  });

  describe('with special texts', () => {
    it('should return undefined for a single character text with insufficient contrast', () => {
      const params = checkSetup(html`
        <div style="background-color: #FFF;">
          <div style="color:#DDD;" id="target">X</div>
        </div>
      `);

      const actual = contrastEvaluate.apply(checkContext, params);
      assert.isUndefined(actual);
      assert.equal(checkContext._data.messageKey, 'shortTextContent');
    });

    it('should return true for a single character text with insufficient contrast', () => {
      const params = checkSetup(html`
        <div style="background-color: #FFF;">
          <div style="color:#DDD;" id="target">X</div>
        </div>
      `);

      const actual = contrastEvaluate.apply(checkContext, params);
      assert.isUndefined(actual);
      assert.equal(checkContext._data.messageKey, 'shortTextContent');
    });

    it('should return undefined when the text only contains nonBmp unicode when the ignoreUnicode option is true', () => {
      const params = checkSetup(
        html`
          <div style="background-color: #FFF;">
            <div style="color:#DDD;" id="target">
              &#x20A0; &#x20A1; &#x20A2; &#x20A3;
            </div>
          </div>
        `,
        {
          ignoreUnicode: true
        }
      );

      const actual = contrastEvaluate.apply(checkContext, params);
      assert.isUndefined(actual);
      assert.equal(checkContext._data.messageKey, 'nonBmp');
    });

    it('should return true when the text only contains nonBmp unicode when the ignoreUnicode option is false, and there is sufficient contrast', () => {
      const params = checkSetup(
        html`
          <div style="background-color: #FFF;">
            <div style="color:#000;" id="target">◓</div>
          </div>
        `,
        {
          ignoreUnicode: false
        }
      );

      const actual = contrastEvaluate.apply(checkContext, params);
      assert.isTrue(actual);
    });

    it('should return undefined when the text only contains nonBmp unicode when the ignoreUnicode option is false and the ignoreLength option is default, and there is insufficient contrast', () => {
      const params = checkSetup(
        html`
          <div style="background-color: #FFF;">
            <div style="color:#DDD;" id="target">◓</div>
          </div>
        `,
        {
          ignoreUnicode: false
        }
      );

      const actual = contrastEvaluate.apply(checkContext, params);
      assert.isUndefined(actual);
      assert.equal(checkContext._data.messageKey, 'shortTextContent');
    });

    it('should return false when the text only contains nonBmp unicode when the ignoreUnicode option is false and the ignoreLength option is true, and there is insufficient contrast', () => {
      const params = checkSetup(
        html`
          <div style="background-color: #FFF;">
            <div style="color:#DDD;" id="target">◓</div>
          </div>
        `,
        {
          ignoreUnicode: false,
          ignoreLength: true
        }
      );

      const actual = contrastEvaluate.apply(checkContext, params);
      assert.isFalse(actual);
    });
  });

  describe('options', () => {
    it('should support options.boldValue', () => {
      const params = checkSetup(
        html`
          <div
            style="color: gray; background-color: white; font-size: 14pt; font-weight: 100"
            id="target"
          >
            <span style="font-weight:bolder">My text</span>
          </div>
        `,
        {
          boldValue: 100
        }
      );

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._relatedNodes, []);
    });

    it('should support options.boldTextPt', () => {
      const params = checkSetup(
        html`
          <div
            style="color: gray; background-color: white; font-size: 6pt; font-weight: 700"
            id="target"
          >
            <span style="font-weight:bolder">My text</span>
          </div>
        `,
        {
          boldTextPt: 6
        }
      );

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._relatedNodes, []);
    });

    it('should support options.largeTextPt', () => {
      const params = checkSetup(
        html`
          <div
            style="color: gray; background-color: white; font-size: 6pt; font-weight: 100"
            id="target"
          >
            <span style="font-weight:bolder">My text</span>
          </div>
        `,
        {
          largeTextPt: 6
        }
      );

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._relatedNodes, []);
    });

    it('should support options.contrastRatio.normal.expected', () => {
      const params = checkSetup(
        html`
          <div
            style="color: #999; background-color: white; font-size: 14pt; font-weight: 100"
            id="target"
          >
            <span style="font-weight:bolder">My text</span>
          </div>
        `,
        {
          contrastRatio: {
            normal: {
              expected: 2.5
            }
          }
        }
      );

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._relatedNodes, []);
    });

    it('should support options.contrastRatio.normal.minThreshold', () => {
      const params = checkSetup(
        html`
          <div
            style="color: #999; background-color: white; font-size: 14pt; font-weight: 100"
            id="target"
          >
            <span style="font-weight:bolder">My text</span>
          </div>
        `,
        {
          contrastRatio: {
            normal: {
              minThreshold: 3
            }
          }
        }
      );

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._relatedNodes, []);
    });

    it('should not report incomplete when  options.contrastRatio.normal.minThreshold is set', () => {
      const params = checkSetup(
        html` <p
          id="target"
          style="color: #666; background: linear-gradient(to right, #FFF, #0FF); width: 300px"
        >
          Some text in English
        </p>`,
        {
          contrastRatio: {
            normal: {
              minThreshold: 3
            }
          }
        }
      );

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
      assert.isUndefined(checkContext._data.messageKey);
    });

    it('should support options.contrastRatio.normal.maxThreshold', () => {
      const params = checkSetup(
        html`
          <div
            style="color: #999; background-color: white; font-size: 14pt; font-weight: 100"
            id="target"
          >
            <span style="font-weight:bolder">My text</span>
          </div>
        `,
        {
          contrastRatio: {
            normal: {
              maxThreshold: 2
            }
          }
        }
      );

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._relatedNodes, []);
    });

    it('should not report incomplete when  options.contrastRatio.normal.maxThreshold is set', () => {
      const params = checkSetup(
        html` <p
          id="target"
          style="color: #666; background: linear-gradient(to right, #FFF, #0FF); width: 300px"
        >
          Some text in English
        </p>`,
        {
          contrastRatio: {
            normal: {
              maxThreshold: 2
            }
          }
        }
      );

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
      assert.isUndefined(checkContext._data.messageKey);
    });

    it('should support options.contrastRatio.large.expected', () => {
      const params = checkSetup(
        html`
          <div
            style="color: #ccc; background-color: white; font-size: 18pt; font-weight: 100"
            id="target"
          >
            <span style="font-weight:bolder">My text</span>
          </div>
        `,
        {
          contrastRatio: {
            large: {
              expected: 1.5
            }
          }
        }
      );

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._relatedNodes, []);
    });

    it('should support options.contrastRatio.large.minThreshold', () => {
      const params = checkSetup(
        html`
          <div
            style="color: #ccc; background-color: white; font-size: 18pt; font-weight: 100"
            id="target"
          >
            <span style="font-weight:bolder">My text</span>
          </div>
        `,
        {
          contrastRatio: {
            large: {
              minThreshold: 2
            }
          }
        }
      );

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._relatedNodes, []);
    });

    it('should not report incomplete when  options.contrastRatio.large.minThreshold is set', () => {
      const params = checkSetup(
        html` <p
          id="target"
          style="color: #666; background: linear-gradient(to right, #FFF, #0FF); width: 300px; font-size: 18pt;"
        >
          Some text in English
        </p>`,
        {
          contrastRatio: {
            large: {
              minThreshold: 2
            }
          }
        }
      );

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
      assert.isUndefined(checkContext._data.messageKey);
    });

    it('should support options.contrastRatio.large.maxThreshold', () => {
      const params = checkSetup(
        html`
          <div
            style="color: #ccc; background-color: white; font-size: 18pt; font-weight: 100"
            id="target"
          >
            <span style="font-weight:bolder">My text</span>
          </div>
        `,
        {
          contrastRatio: {
            large: {
              maxThreshold: 1.2
            }
          }
        }
      );

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._relatedNodes, []);
    });

    it('should not report incomplete when  options.contrastRatio.large.maxThreshold is set', () => {
      const params = checkSetup(
        html` <p
          id="target"
          style="color: #666; background: linear-gradient(to right, #FFF, #0FF); width: 300px; font-size: 18pt;"
        >
          Some text in English
        </p>`,
        {
          contrastRatio: {
            large: {
              maxThreshold: 2
            }
          }
        }
      );

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
      assert.isUndefined(checkContext._data.messageKey);
    });

    it('should ignore pseudo element with options.ignorePseudo', () => {
      const params = checkSetup(
        html`
          <style>
            .foo {
              position: relative;
            }
            .foo:after {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              background: red;
            }
          </style>
          <div id="background" class="foo">
            <p id="target" style="#000">Content</p>
          </div>
        `,
        {
          ignorePseudo: true
        }
      );

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
    });

    it('should adjust the pseudo element minimum size with the options.pseudoSizeThreshold', () => {
      const params = checkSetup(
        html`
          <style>
            .foo {
              position: relative;
              width: 100px;
              height: 100px;
            }
            .foo:before {
              content: '';
              position: absolute;
              width: 22%;
              height: 100%;
              background: red;
            }
          </style>
          <p id="target" class="foo">Content</p>
        `,
        {
          pseudoSizeThreshold: 0.2
        }
      );
      assert.isUndefined(contrastEvaluate.apply(checkContext, params));
    });
  });

  it('returns colors across Shadow DOM boundaries', () => {
    const params = shadowCheckSetup(
      '<div id="container" style="background-color:black;"></div>',
      '<p style="color: #333;" id="target">Text</p>'
    );
    const container = fixture.querySelector('#container');
    const result = contrastEvaluate.apply(checkContext, params);
    assert.isFalse(result);
    assert.deepEqual(checkContext._relatedNodes, [container]);
  });

  it('handles <slot> elements', () => {
    fixture.innerHTML =
      '<div id="container" style="height: 100px;"><p id="target" style="color: #333;">Slotted text</p></div>';
    const container = fixture.querySelector('#container');
    const shadow = container.attachShadow({ mode: 'open' });

    shadow.innerHTML =
      '<div id="shadowContainer" style="position: absolute; background: black;"><slot></slot></div>';
    const shadowContainer = shadow.querySelector('#shadowContainer');
    axe.testUtils.flatTreeSetup(fixture);

    const target = fixture.querySelector('#target');
    const vNode = axe.utils.getNodeFromTree(target);
    const result = contrastEvaluate.call(
      checkContext,
      vNode.actualNode,
      null,
      vNode
    );
    assert.isFalse(result);
    assert.deepEqual(checkContext._relatedNodes, [shadowContainer]);
  });

  describe('with text-shadow', () => {
    it('passes if thin text shadows have sufficient contrast with the text', () => {
      const params = checkSetup(html`
        <div
          id="target"
          style="background-color: #666; color:#aaa; 
        text-shadow: 0 0 0.09em #000, 0 0 0.09em #000, 0 0 0.09em #000;"
        >
          Hello world
        </div>
      `);
      assert.isTrue(contrastEvaluate.apply(checkContext, params));
    });

    it('does not count text shadows of offset 0, blur 0 as part of the background color', () => {
      const params = checkSetup(html`
        <div
          id="target"
          style="background-color: #fff; color:#0f833e; 
        text-shadow: 0 0 0 #000"
        >
          Hello world
        </div>
      `);

      const white = new axe.commons.color.Color(255, 255, 255, 1);

      assert.isTrue(contrastEvaluate.apply(checkContext, params));
      assert.equal(checkContext._data.bgColor, white.toHexString());
      assert.equal(checkContext._data.fgColor, '#0f833e');
      assert.equal(checkContext._data.contrastRatio, '4.84');
    });

    it('passes if thin text shadows have sufficient contrast with the background', () => {
      const params = checkSetup(html`
        <div
          id="target"
          style="background-color: #aaa; color:#666; 
        text-shadow: 0 0 0.09em #000, 0 0 0.09em #000, 0 0 0.09em #000;"
        >
          Hello world
        </div>
      `);
      assert.isTrue(contrastEvaluate.apply(checkContext, params));
    });

    it('fails if text shadows have sufficient contrast with the background if its width is thicker than `shadowOutlineEmMax`', () => {
      const checkOptions = { shadowOutlineEmMax: 0.05 };
      const params = checkSetup(
        html`
          <div
            id="target"
            style="background-color: #aaa; color:#666; 
        text-shadow: 0 0 0.09em #000, 0 0 0.09em #000, 0 0 0.09em #000;"
          >
            Hello world
          </div>
        `,
        checkOptions
      );
      assert.isFalse(contrastEvaluate.apply(checkContext, params));
      assert.equal(checkContext._data.messageKey, null);
    });

    it('fails if text shadows do not have sufficient contrast with the foreground', () => {
      const params = checkSetup(html`
        <div
          id="target"
          style="background-color: #aaa; color:#666; 
        text-shadow: 1px 1px 0.01em #000"
        >
          Hello world
        </div>
      `);
      assert.isFalse(contrastEvaluate.apply(checkContext, params));
      assert.isNull(checkContext._data.messageKey);
    });

    it('fails if text shadows do not have sufficient contrast with the background', () => {
      const params = checkSetup(html`
        <div
          id="target"
          style="background-color: #aaa; color:#666; 
        text-shadow: 0 0 0.01em #000"
        >
          Hello world
        </div>
      `);
      assert.isFalse(contrastEvaluate.apply(checkContext, params));
      assert.equal(checkContext._data.messageKey, 'shadowOnBgColor');
    });

    it("fails if thick text shadows don't have sufficient contrast", () => {
      const params = checkSetup(html`
        <div
          id="target"
          style="background-color: #aaa; color:#666; 
        text-shadow: 0 0 0.09em #000, 0 0 0.09em #000, 0 0 0.09em #000;"
        >
          Hello world
        </div>
      `);
      assert.isTrue(contrastEvaluate.apply(checkContext, params));
    });

    it("passes if thin text shadows don't have sufficient contrast, but the text and background do", () => {
      const params = checkSetup(html`
        <div
          id="target"
          style="background-color: #aaa; color:#666; 
        text-shadow: 0 0 0.09em #000, 0 0 0.09em #000, 0 0 0.09em #000;"
        >
          Hello world
        </div>
      `);
      assert.isTrue(contrastEvaluate.apply(checkContext, params));
    });

    it('incompletes if text-shadow is only on part of the text', () => {
      const params = checkSetup(html`
        <div
          id="target"
          style="
    background-color: #aaa;
    color:#666; 
    text-shadow: 1px 1px #000;
  "
        >
          Hello world
        </div>
      `);

      assert.isUndefined(contrastEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._relatedNodes, []);
      assert.deepEqual(checkContext._data, {
        messageKey: 'complexTextShadows'
      });
    });
  });
});
