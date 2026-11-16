describe('dom.isMultiline', () => {
  const html = axe.testUtils.html;
  const isMultiline = axe.commons.dom.isMultiline;
  const fixture = document.querySelector('#fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('returns false if there is a single line', () => {
    fixture.innerHTML = '<p>hello</p>';
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns true if there are two lines', () => {
    fixture.innerHTML = '<p>hello <br> world</p>';
    assert.isTrue(isMultiline(fixture.firstElementChild));
  });

  it('handles single-line texts with varying font-sizes', () => {
    fixture.innerHTML = html`
      <p>
        <span style="font-size: 12px">small</span>
        <span style="font-size: 20px">large</span>
        <span style="font-size: 16px">medium</span>
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns true when lines overlap because of a small line-height', () => {
    fixture.innerHTML = html`
      <p style="font-size: 20px; line-height: 20px; width: 200px">
        The toy brought back fond memories of being lost in the rain forest.
      </p>
    `;
    assert.isTrue(isMultiline(fixture.firstElementChild));
  });

  it('returns true for two lines with a line-height below 1', () => {
    fixture.innerHTML = html`
      <p style="font-size: 20px; line-height: 0.8">hello<br />world</p>
    `;
    assert.isTrue(isMultiline(fixture.firstElementChild));
  });

  it('returns true when the next line is in a smaller font', () => {
    fixture.innerHTML = html`
      <p style="font-size: 20px">
        first<br /><span style="font-size: 0.5em">second</span>
      </p>
    `;
    assert.isTrue(isMultiline(fixture.firstElementChild));
  });

  it('returns true for two lines with a line-height of 0.5', () => {
    fixture.innerHTML = html`
      <p style="font-size: 20px; line-height: 0.5">first<br />second</p>
    `;
    assert.isTrue(isMultiline(fixture.firstElementChild));
  });

  it('returns true for two right-to-left lines with a small line-height', () => {
    fixture.innerHTML = html`
      <p dir="rtl" style="font-size: 20px; line-height: 0.8">
        שלום עולם<br />שורה שנייה
      </p>
    `;
    assert.isTrue(isMultiline(fixture.firstElementChild));
  });

  it('returns true for overlapping lines in a zoomed out container', () => {
    fixture.innerHTML = html`
      <div style="zoom: 0.5">
        <p style="font-size: 20px; line-height: 0.8">first<br />second</p>
      </div>
    `;
    assert.isTrue(isMultiline(fixture.querySelector('p')));
  });

  it('returns true for overlapping lines in a scaled down container', () => {
    fixture.innerHTML = html`
      <div style="transform: scale(0.5)">
        <p style="font-size: 20px; line-height: 0.8">first<br />second</p>
      </div>
    `;
    assert.isTrue(isMultiline(fixture.querySelector('p')));
  });

  it('returns false for a single line with a small line-height', () => {
    fixture.innerHTML = html`
      <p style="font-size: 20px; line-height: 10px">hello world</p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a single line with superscript and subscript', () => {
    fixture.innerHTML = html`
      <p style="line-height: 1">E = mc<sup>2</sup> and H<sub>2</sub>O</p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false when part of a line is moved with relative positioning', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/20px serif; white-space: nowrap">
        first <span style="position: relative; top: 14px">second</span>
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false when part of a line is moved with a transform', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/20px serif; white-space: nowrap">
        first
        <span style="display: inline-block; transform: translateY(14px)"
          >second</span
        >
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for content positioned above the line', () => {
    fixture.innerHTML = html`
      <p style="line-height: 1.2">
        Read more
        <span style="position: absolute; top: -9999px">about pricing</span>
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a label positioned just above the line', () => {
    fixture.innerHTML = html`
      <p
        style="position: relative; font-size: 20px; line-height: 16px; white-space: nowrap"
      >
        <span style="position: absolute; top: -16px; left: 220px">Label</span
        >The quick brown fox
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns true for overlapping lines next to a positioned label', () => {
    fixture.innerHTML = html`
      <p
        style="position: relative; font-size: 20px; line-height: 20px; width: 150px"
      >
        <span style="position: absolute; top: -19px; left: 120px">Label</span>
        The quick brown fox jumps over
      </p>
    `;
    assert.isTrue(isMultiline(fixture.firstElementChild));
  });

  it('returns true for overlapping lines in a positioned element', () => {
    fixture.innerHTML = html`
      <p style="position: relative; font-size: 20px; line-height: 20px">
        <span style="position: absolute; width: 150px">
          The quick brown fox jumps over
        </span>
      </p>
    `;
    assert.isTrue(isMultiline(fixture.querySelector('span')));
  });

  it('returns true for overlapping lines next to a tall positioned tooltip', () => {
    fixture.innerHTML = html`
      <p style="position: relative; font: 16px/0.8 Arial">
        <span
          style="position: absolute; top: -1em; left: 8em; width: 5em; font-size: 2em; line-height: 1"
          >Tooltip text that wraps</span
        >first line<br />second line
      </p>
    `;
    assert.isTrue(isMultiline(fixture.firstElementChild));
  });

  it('returns true for positioned text with display: contents', () => {
    fixture.innerHTML = html`
      <p style="font: 16px/0.8 Arial; width: 9em">
        Intro
        <span style="position: absolute; display: contents"
          >text in a contents wrapper that wraps across lines</span
        >
      </p>
    `;
    assert.isTrue(isMultiline(fixture.firstElementChild));
  });

  it('returns true for overlapping lines after a line break at the start', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/0.8 Arial; width: 150px">
        <br />The quick brown fox jumps over
      </p>
    `;
    assert.isTrue(isMultiline(fixture.firstElementChild));
  });

  it('returns true for overlapping lines that break between inline elements', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/0.8 Arial; width: 120px">
        Welcome to <b style="white-space: nowrap">Acme Corp</b>
      </p>
    `;
    assert.isTrue(isMultiline(fixture.firstElementChild));
  });

  it('returns true for overlapping lines in an inline element with position: relative', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/0.8 Arial; width: 150px">
        Intro <a style="position: relative">quick brown fox jumps over</a>
      </p>
    `;
    assert.isTrue(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a float with lines of its own', () => {
    fixture.innerHTML = html`
      <p style="font: 16px/1 Arial; white-space: nowrap">
        Price 100 zł<span style="float: left; width: 5em; white-space: normal"
          >Free shipping over 200</span
        >
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for an inline-block with lines of its own', () => {
    fixture.innerHTML = html`
      <p style="font: 14px/0.6 'Times New Roman'">
        <span style="display: inline-block; width: 4em"
          >Two line button text</span
        >
        The quick brown fox
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a label slotted into a positioned element', () => {
    const vNode = axe.testUtils.queryFixture(html`
      <div
        id="target"
        style="position: relative; font: 14px/0.8 Arial; white-space: nowrap"
      >
        <template shadowrootmode="open">
          <span style="position: absolute; left: 0; top: -0.95em"
            ><slot name="tip"></slot></span
          ><slot></slot>
        </template>
        <span slot="tip">Label</span>Some text here
      </div>
    `);
    assert.isFalse(isMultiline(vNode.actualNode));
  });

  it('returns false for text moved under the text before it', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/16px Arial; white-space: nowrap">
        first second
        <span style="position: relative; top: 16px; left: -90px">note</span>
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for text moved with a calculated offset', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/16px Arial; white-space: nowrap; height: 16px">
        first second
        <span style="position: relative; top: calc(50% + 8px); left: -90px"
          >note</span
        >
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for text lowered under the text before it', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/16px Arial; white-space: nowrap">
        first second
        <span style="vertical-align: -16px; margin-left: -90px">note</span>
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a box moved under a box of the same size', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/16px Arial; white-space: nowrap">
        Team
        <span style="display: inline-block; width: 24px; height: 24px"></span
        ><span
          style="display: inline-block; width: 24px; height: 24px; position: relative; left: -12px; top: 16px"
        ></span>
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a superscript above a subscript', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/0.5 Arial; white-space: nowrap">
        C<sup>14</sup><sub style="margin-left: -1.1em">6</sub> atom
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for hidden text on more lines', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/0.8 Arial; width: 220px">
        Visible
        <span style="visibility: hidden"
          >hidden text that wraps onto more lines here</span
        >
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a single line in a rotated element', () => {
    fixture.innerHTML = html`
      <p
        style="display: inline-block; font: 20px/20px Arial; white-space: nowrap; padding: 30px 0; transform: rotate(45deg)"
      >
        AAAAAAAA<span>AAAAAAAA</span>
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a single line with a line-height of 0', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/0 Arial; white-space: nowrap">
        <span dir="rtl"><b>שלום</b> עולם</span> text
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a single line in a rotated container', () => {
    fixture.innerHTML = html`
      <div style="width: 300px; transform: rotate(45deg)">
        <p style="font: 20px/20px Arial; white-space: nowrap">
          AAAAAAAA<span>AAAAAAAA</span>
        </p>
      </div>
    `;
    assert.isFalse(isMultiline(fixture.querySelector('p')));
  });

  it('returns false for a single line in a rotated square', () => {
    fixture.innerHTML = html`
      <div
        style="box-sizing: border-box; width: 100px; height: 100px; padding-top: 42px; font: 16px/1 Arial; text-align: center; white-space: nowrap; transform: rotate(30deg)"
      >
        Read <a href="#">more</a> here
      </div>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a single line of mixed direction in a rotated square', () => {
    fixture.innerHTML = html`
      <div
        style="width: 200px; height: 200px; font: 16px/1.2 monospace; white-space: nowrap; transform: rotate(45deg)"
      >
        xאבגדהabcdeוזחטי
      </div>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a single line with another dominant-baseline', () => {
    fixture.innerHTML = html`
      <p
        style="font: 16px/0.3 Arial; white-space: nowrap; dominant-baseline: text-bottom"
      >
        Left <span style="position: relative; left: -10px">two</span>
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a single line with another dominant-baseline in it', () => {
    fixture.innerHTML = html`
      <p style="font: 16px/0.3 Arial; white-space: nowrap">
        Left
        <span style="dominant-baseline: text-bottom">
          a <span style="position: relative; left: -10px">two</span>
        </span>
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a single line with an empty line after it', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/16px Arial">Some text<br />&nbsp;</p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for transparent text on more lines', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/0.8 Arial; width: 220px">
        Visible
        <span style="opacity: 0"
          >hidden text that wraps onto more lines here</span
        >
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a canvas with fallback content', () => {
    fixture.innerHTML = html`
      <p style="font: 16px/1 Arial">
        Sales
        <canvas width="80" height="24"
          >Sales trend over the last 12 months</canvas
        >
        up 3% this year
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for the fallback content of a canvas', () => {
    fixture.innerHTML = html`
      <canvas width="200" height="100" style="font: 16px/1 Arial">
        Sales by month.
        <span>January 10, February 12, March 9, April 14, May 11.</span>
      </canvas>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
    assert.isFalse(isMultiline(fixture.querySelector('span')));
  });

  it('returns false for text that a slot moves', () => {
    const vNode = axe.testUtils.queryFixture(html`
      <p id="target" style="font: 20px/16px Arial; white-space: nowrap">
        first second
        <span>
          <template shadowrootmode="open">
            <slot
              style="display: inline; position: relative; top: 16px; left: -90px"
            ></slot>
          </template>
          note
        </span>
      </p>
    `);
    assert.isFalse(isMultiline(vNode.actualNode));
  });

  it('returns false for a text node', () => {
    fixture.innerHTML = html`<p>hello</p>`;
    assert.isFalse(isMultiline(fixture.firstElementChild.firstChild));
  });

  it('returns true for overlapping lines of two characters', () => {
    fixture.innerHTML = html`<p style="font: 20px/0.8 Arial">W.<br />M.</p>`;
    assert.isTrue(isMultiline(fixture.firstElementChild));
  });

  it('returns true for overlapping lines that are centered', () => {
    fixture.innerHTML = html`
      <p style="font: 20px/0.8 Arial; width: 200px; text-align: center">
        The quick brown fox jumps over
      </p>
    `;
    assert.isTrue(isMultiline(fixture.firstElementChild));
  });

  it('returns true for overlapping lines in a container with perspective', () => {
    fixture.innerHTML = html`
      <div style="transform: perspective(800px)">
        <p style="font: 20px/0.8 Arial; width: 200px">
          The quick brown fox jumps over
        </p>
      </div>
    `;
    assert.isTrue(isMultiline(fixture.querySelector('p')));
  });

  it('returns false for an inline-block raised with a margin', () => {
    fixture.innerHTML = html`
      <p style="font-size: 16px; line-height: 1.2">
        Pay with
        <span
          style="display: inline-block; width: 24px; height: 24px; margin-bottom: 12px"
        ></span>
        card
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for a ruby annotation', () => {
    fixture.innerHTML = html`
      <p style="font-size: 20px; line-height: 1; white-space: nowrap">
        The <ruby>word<rt>annotation</rt></ruby> here
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false when parts of a line are moved up and down', () => {
    fixture.innerHTML = html`
      <p style="font-size: 20px; line-height: 1.2; white-space: nowrap">
        x = <span style="position: relative; top: -0.7em">a</span
        ><span style="position: relative; top: 0.7em">b</span>
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for superscript and subscript at a line-height of 0.6', () => {
    fixture.innerHTML = html`
      <p style="font-size: 20px; line-height: 0.6">
        E = mc<sup>2</sup> and H<sub>2</sub>O
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  it('returns false for boxes of the same height side by side', () => {
    fixture.innerHTML = html`
      <p style="font-size: 16px; line-height: 1.2">
        Liked by
        <span style="display: inline-block; width: 48px; height: 48px"></span>
        <span
          style="display: inline-block; width: 48px; height: 48px; line-height: 48px"
          >+5</span
        >
      </p>
    `;
    assert.isFalse(isMultiline(fixture.firstElementChild));
  });

  describe('with non-text elements', () => {
    it('is true when on a multiple lines', () => {
      fixture.innerHTML = html`
        <p>
          <input /><br />
          <textarea rows="5"></textarea><br />
          <button style="font-size: 20px">I like big buttons</button>
        </p>
      `;
      assert.isTrue(isMultiline(fixture.firstElementChild));
    });

    it('is false when on a single line', () => {
      fixture.innerHTML = html`
        <p>
          <span style="font-size: 12px">Hello</span>
          <input />
          <textarea rows="5"></textarea>
          <button style="font-size: 20px">I like big buttons</button>
        </p>
      `;
      assert.isFalse(isMultiline(fixture.firstElementChild));
    });
  });
});
