describe('dom.isInTextBlock', () => {
  const fixture = document.getElementById('fixture');
  const { shadowSupport, fixtureSetup, queryFixture } = axe.testUtils;
  const isInTextBlock = axe.commons.dom.isInTextBlock;

  it('returns true if the element is a node in a block of text', () => {
    fixtureSetup(
      '<p>Some paragraph with text ' +
        '  <a href="" id="link">link</a>' +
        '</p>'
    );
    const link = document.getElementById('link');
    assert.isTrue(isInTextBlock(link));
  });

  it('returns false if the element is a block', () => {
    fixtureSetup(
      '<p>Some paragraph with text ' +
        '  <a href="" id="link" style="display:block">link</a>' +
        '</p>'
    );
    const link = document.getElementById('link');
    assert.isFalse(isInTextBlock(link));
  });

  it('returns false if the element has the only text in the block', () => {
    fixtureSetup('<p><a href="" id="link">link</a></p>');
    const link = document.getElementById('link');
    assert.isFalse(isInTextBlock(link));
  });

  it('returns false if there is more text in link(s) than in the rest of the block', () => {
    fixtureSetup(
      '<p> short text:' +
        '  <a href="" id="link">on a link with a very long text</a>' +
        '</p>'
    );
    const link = document.getElementById('link');
    assert.isFalse(isInTextBlock(link));
  });

  it('return false if there are links along side other links', () => {
    fixtureSetup(
      '<p>' +
        '  <a href="" id="link">link</a>' +
        '  <a href="">other link</a>' +
        '</p>'
    );
    const link = document.getElementById('link');
    assert.isFalse(isInTextBlock(link));
  });

  it('ignores hidden content', () => {
    fixtureSetup(
      '<p>' +
        '  <a href="" id="link">link</a>' +
        '  <span style="display:none">some hidden text</span>' +
        '</p>'
    );
    const link = document.getElementById('link');
    assert.isFalse(isInTextBlock(link));
  });

  it('ignores floated content', () => {
    fixtureSetup(
      '<p>' +
        '  <span style="float: left">A floating text in the area</span>' +
        '  <a href="" id="link">link</a>' +
        '</p>'
    );
    const link = document.getElementById('link');
    assert.isFalse(isInTextBlock(link));
  });

  it('ignores positioned content', () => {
    fixtureSetup(
      '<p>' +
        '  <span style="position:absolute;">Some absolute potitioned text</span>' +
        '  <a href="" id="link">link</a>' +
        '</p>'
    );
    const link = document.getElementById('link');
    assert.isFalse(isInTextBlock(link));
  });

  it('ignores none-text content', () => {
    fixtureSetup(
      '<p>' +
        '  <img alt="Some graphical component" src="img.png" />' +
        '  <a href="" id="link">link</a>' +
        '</p>'
    );
    const link = document.getElementById('link');
    assert.isFalse(isInTextBlock(link));
  });

  it('ignore text in the block coming before a br', () => {
    fixtureSetup(
      '<p>Some paragraph with text <br>' +
        '  <a href="" id="link">link</a>' +
        '</p>'
    );
    const link = document.getElementById('link');
    assert.isFalse(isInTextBlock(link));
  });

  it('ignore text in the block coming after a br', () => {
    fixtureSetup(
      '<p>' +
        '  <a href="" id="link">link</a> <br>' +
        '  Some paragraph with text ' +
        '</p>'
    );
    const link = document.getElementById('link');
    assert.isFalse(isInTextBlock(link));
  });

  it('ignore text in the block coming before and after a br', () => {
    fixtureSetup(
      '<p>Some paragraph with text <br>' +
        '  <a href="" id="link">link</a> <br>' +
        '  Some paragraph with text ' +
        '</p>'
    );
    const link = document.getElementById('link');
    assert.isFalse(isInTextBlock(link));
  });

  it('ignores text inside inline widgets and components', () => {
    fixtureSetup(
      '<p>' +
        '  <a href="" id="link">link</a>' +
        '  <button> My button </button>' +
        '  <button disabled> My disabled button </button>' +
        '  <span role="searchbox">My query</span>' +
        '  <textarea>My text content</textarea>' +
        '  <select><option>My first choice</option></select>' +
        '</p>'
    );
    const link = document.getElementById('link');
    assert.isFalse(isInTextBlock(link));
  });

  it('treats hr elements the same as br elements', () => {
    fixtureSetup(
      '<div>Some paragraph with text <hr>' +
        '  <a href="" id="link">link</a> <hr>' +
        '  Some paragraph with text ' +
        '</div>'
    );
    const link = document.getElementById('link');
    assert.isFalse(isInTextBlock(link));
  });

  it('ignore comments', () => {
    fixtureSetup(
      '<p><!-- Some paragraph with text -->' +
        '  <a href="" id="link">link</a>' +
        '</p>'
    );
    const link = document.getElementById('link');
    assert.isFalse(isInTextBlock(link));
  });

  (shadowSupport.v1 ? it : xit)('can reach outside a shadow tree', () => {
    const div = document.createElement('div');
    div.innerHTML = 'Some paragraph with text <span></span> ';
    const shadow = div.querySelector('span').attachShadow({ mode: 'open' });
    shadow.innerHTML = '<a href="" id="link">link</a>';
    fixtureSetup(div);

    const link = shadow.querySelector('#link');
    assert.isTrue(isInTextBlock(link));
  });

  (shadowSupport.v1 ? it : xit)('can reach into a shadow tree', () => {
    const div = document.createElement('div');
    div.innerHTML = '<a href="" id="link">link</a>';
    const shadow = div.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<p>Some paragraph with text <slot></slot> </p>';
    fixtureSetup(div);

    const link = fixture.querySelector('#link');
    assert.isTrue(isInTextBlock(link));
  });

  (shadowSupport.v1 ? it : xit)('treats shadow DOM slots as siblings', () => {
    const div = document.createElement('div');
    div.innerHTML = '<br>';
    const shadow = div.attachShadow({ mode: 'open' });
    shadow.innerHTML =
      '<p>Some paragraph with text ' +
      '<slot></slot> <a href="" id="link">link</a></p>';
    fixtureSetup(div);

    const link = shadow.querySelector('#link');
    assert.isFalse(isInTextBlock(link));
  });

  describe('inline-block element', () => {
    it('returns false if element has widget parent', () => {
      const target = queryFixture(`
        <div role="button">
          <button id="target">button</button>
        </div>
      `);
      assert.isFalse(isInTextBlock(target));
    });

    it('returns false if element has focusable parent', () => {
      const target = queryFixture(`
        <div tabindex="0">
          <button id="target">button</button>
        </div>
      `);
      assert.isFalse(isInTextBlock(target));
    });

    it('returns false if element has text sibling', () => {
      const target = queryFixture(`
        <div>
          Hello world
          <button id="target">button</button>
        </div>
      `);
      assert.isFalse(isInTextBlock(target));
    });

    it('returns false if element has inline element sibling', () => {
      const target = queryFixture(`
        <div>
          <span>Hello world</span>
          <button id="target">button</button>
        </div>
      `);
      assert.isFalse(isInTextBlock(target));
    });

    it('returns false if element has inline-block element sibling', () => {
      const target = queryFixture(`
        <div>
          <div style="display: inline-block">Hello world</div>
          <button id="target">button</button>
        </div>
      `);
      assert.isFalse(isInTextBlock(target));
    });

    it('returns false if element has widget element sibling', () => {
      const target = queryFixture(`
        <div>
          <div role="button" style="display: inline">Hello world</div>
          <button id="target">button</button>
        </div>
      `);
      assert.isFalse(isInTextBlock(target));
    });

    it('ignores br elements', () => {
      const target = queryFixture(`
        <div>
          <span>Hello World</span>
          <br/>
          <button id="target">button</button>
        </div>
      `);
      assert.isFalse(isInTextBlock(target));
    });

    it('ignores hr elements', () => {
      const target = queryFixture(`
        <div>
          <span>Hello World</span>
          <hr/>
          <button id="target">button</button>
        </div>
      `);
      assert.isFalse(isInTextBlock(target));
    });

    it('looks at all siblings', () => {
      const target = queryFixture(`
        <div>
          <br/>
          <button id="target">button</button>
          <br/>
          <div role="button" style="display: inline">Hello world</div>
        </div>
      `);
      assert.isFalse(isInTextBlock(target));
    });

    it('works for inline-grid', () => {
      const target = queryFixture(`
        <div>
          <div role="button" style="display: inline">Hello world</div>
          <button id="target" style="display: inline-grid">button</button>
        </div>
      `);
      assert.isFalse(isInTextBlock(target));
    });

    it('works for inline-flex', () => {
      const target = queryFixture(`
        <div>
          <div role="button" style="display: inline">Hello world</div>
          <button id="target" style="display: inline-flex">button</button>
        </div>
      `);
      assert.isFalse(isInTextBlock(target));
    });
  });

  describe('options.noLengthCompare', () => {
    it('returns true if there is any text outside the link', () => {
      fixtureSetup('<p>amy <a href="" id="link">link text is longer</a></p>');
      const link = document.getElementById('link');
      assert.isTrue(isInTextBlock(link, { noLengthCompare: true }));
    });

    it('returns false if the non-widget text is only whitespace', () => {
      fixtureSetup(
        '<p>' +
          ' <a href="" id="link">link 1</a>\t\n\r' +
          ' <a href="">link 2</a>' +
          ' <a href="">link 3</a>' +
          ' <a href="">link 4</a>' +
          '</p>'
      );
      const link = document.getElementById('link');
      assert.isFalse(isInTextBlock(link, { noLengthCompare: true }));
    });
  });

  describe('with options.includeInlineBlock: true', () => {
    it('returns true if inline-block element has text sibling', () => {
      const target = queryFixture(`
        <div>
          Hello world
          <button id="target">button</button>
        </div>
      `);
      assert.isTrue(isInTextBlock(target, { includeInlineBlock: true }));
    });

    it('returns true if inline-block element has inline element sibling', () => {
      const target = queryFixture(`
        <div>
          <span>Hello world</span>
          <button id="target">button</button>
        </div>
      `);
      assert.isTrue(isInTextBlock(target, { includeInlineBlock: true }));
    });

    it('returns true if inline-block element has text sibling after it', () => {
      const target = queryFixture(`
        <div>
          <button id="target">button</button> hello world
        </div>
      `);
      assert.isTrue(isInTextBlock(target, { includeInlineBlock: true }));
    });

    it('returns true if inline-block element has both inline text and a widget sibling', () => {
      const target = queryFixture(`
        <div>
          <button>button 1</button>
          <span>Hello world, goodbye mars</span>
          <button id="target">button 2</button>
        </div>
      `);
      assert.isTrue(isInTextBlock(target, { includeInlineBlock: true }));
    });

    it('returns false the inline text sibling is on a different line', () => {
      const target = queryFixture(`
        <div>
          Hello
          <br>
          <button id="target">button</button>
          <hr>
          world
        </div>
      `);
      assert.isFalse(isInTextBlock(target, { includeInlineBlock: true }));
    });

    it('returns true if inline-block element has a sibling on the same line', () => {
      const target = queryFixture(`
        <div>
          Hello
          <br>
          world <button id="target">button</button>
        </div>
      `);
      assert.isFalse(isInTextBlock(target, { includeInlineBlock: true }));
    });
  });
});
