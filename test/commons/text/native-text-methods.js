describe('text.nativeTextMethods', () => {
  const text = axe.commons.text;
  const nativeTextMethods = text.nativeTextMethods;
  const fixtureSetup = axe.testUtils.fixtureSetup;

  describe('valueText', () => {
    const valueText = nativeTextMethods.valueText;
    it('returns the value of actualNode', () => {
      fixtureSetup('<input value="foo" />');
      const input = axe.utils.querySelectorAll(axe._tree[0], 'input')[0];
      assert.equal(valueText(input), 'foo');
    });

    it('returns `` when there is no value', () => {
      fixtureSetup('<input />');
      const input = axe.utils.querySelectorAll(axe._tree[0], 'input')[0];
      assert.equal(valueText(input), '');
    });
  });

  describe('buttonDefaultText', () => {
    const buttonDefaultText = nativeTextMethods.buttonDefaultText;
    it('returns the default button text', () => {
      fixtureSetup(
        '<input type="submit" />' +
          '<input type="image" />' +
          '<input type="reset" />' +
          '<input type="button" />'
      );
      const inputs = axe.utils.querySelectorAll(axe._tree[0], 'input');
      assert.equal(buttonDefaultText(inputs[0]), 'Submit');
      assert.equal(buttonDefaultText(inputs[1]), 'Submit');
      assert.equal(buttonDefaultText(inputs[2]), 'Reset');
      assert.equal(buttonDefaultText(inputs[3]), '');
    });

    it('returns `` when the element is not a button', () => {
      fixtureSetup('<input type="text">');
      const input = axe.utils.querySelectorAll(axe._tree[0], 'input')[0];
      assert.equal(buttonDefaultText(input), '');
    });
  });

  describe('altText', () => {
    const altText = nativeTextMethods.altText;
    it('returns the alt attribute of actualNode', () => {
      fixtureSetup('<img alt="foo" />');
      const img = axe.utils.querySelectorAll(axe._tree[0], 'img')[0];
      assert.equal(altText(img), 'foo');
    });

    it('returns `` when there is no alt', () => {
      fixtureSetup('<img />');
      const img = axe.utils.querySelectorAll(axe._tree[0], 'img')[0];
      assert.equal(altText(img), '');
    });
  });

  describe('figureText', () => {
    it('returns the figcaption text', () => {
      const figureText = nativeTextMethods.figureText;
      fixtureSetup(
        '<figure>' +
          '  <figcaption>My caption</figcaption>' +
          '  some content' +
          '</figure>'
      );
      const figure = axe.utils.querySelectorAll(axe._tree[0], 'figure')[0];
      assert.equal(figureText(figure), 'My caption');
    });

    it('returns `` when there is no figcaption', () => {
      const figureText = nativeTextMethods.figureText;
      fixtureSetup('<figure>' + '  some content' + '</figure>');
      const figure = axe.utils.querySelectorAll(axe._tree[0], 'figure')[0];
      assert.equal(figureText(figure), '');
    });

    it('returns `` when if the figcaption is nested in another figure', () => {
      const figureText = nativeTextMethods.figureText;
      fixtureSetup(
        '<figure id="fig1">' +
          '  <figure>' +
          '    <figcaption>No caption</figcaption>' +
          '    some content' +
          '  </figure>' +
          '  some other content' +
          '</figure>'
      );
      const figure = axe.utils.querySelectorAll(axe._tree[0], '#fig1')[0];
      assert.equal(figureText(figure), '');
    });
  });

  describe('tableCaptionText', () => {
    const tableCaptionText = nativeTextMethods.tableCaptionText;
    it('returns the table caption text', () => {
      fixtureSetup(
        '<table>' +
          '  <caption>My caption</caption>' +
          '  <tr><th>heading</th></tr>' +
          '  <tr><td>data</td></tr>' +
          '</table>'
      );
      const table = axe.utils.querySelectorAll(axe._tree[0], 'table')[0];
      assert.equal(tableCaptionText(table), 'My caption');
    });

    it('returns `` when there is no caption', () => {
      fixtureSetup(
        '<table>' +
          '  <tr><th>heading</th></tr>' +
          '  <tr><td>data</td></tr>' +
          '</table>'
      );
      const table = axe.utils.querySelectorAll(axe._tree[0], 'table')[0];
      assert.equal(tableCaptionText(table), '');
    });

    it('returns `` when if the caption is nested in another table', () => {
      fixtureSetup(
        '<table id="tbl1">' +
          '  <tr><td>' +
          '    <table>' +
          '      <caption>My caption</caption>' +
          '      <tr><th>heading</th></tr>' +
          '      <tr><td>data</td></tr>' +
          '    </table>' +
          '  </th></tr>' +
          '</table>'
      );
      const table = axe.utils.querySelectorAll(axe._tree[0], '#tbl1')[0];
      assert.equal(tableCaptionText(table), '');
    });
  });

  describe('fieldsetLegendText', () => {
    it('returns the legend text', () => {
      const fieldsetLegendText = nativeTextMethods.fieldsetLegendText;
      fixtureSetup(
        '<fieldset>' +
          '  <legend>My legend</legend>' +
          '  some content' +
          '</fieldset>'
      );
      const fieldset = axe.utils.querySelectorAll(axe._tree[0], 'fieldset')[0];
      assert.equal(fieldsetLegendText(fieldset), 'My legend');
    });

    it('returns `` when there is no legend', () => {
      const fieldsetLegendText = nativeTextMethods.fieldsetLegendText;
      fixtureSetup('<fieldset>' + '  some content' + '</fieldset>');
      const fieldset = axe.utils.querySelectorAll(axe._tree[0], 'fieldset')[0];
      assert.equal(fieldsetLegendText(fieldset), '');
    });

    it('returns `` when if the legend is nested in another fieldset', () => {
      const fieldsetLegendText = nativeTextMethods.fieldsetLegendText;
      fixtureSetup(
        '<fieldset id="fig1">' +
          '  <fieldset>' +
          '    <legend>No legend</legend>' +
          '    some content' +
          '  </fieldset>' +
          '  some other content' +
          '</fieldset>'
      );
      const fieldset = axe.utils.querySelectorAll(axe._tree[0], '#fig1')[0];
      assert.equal(fieldsetLegendText(fieldset), '');
    });
  });

  describe('svgTitleText', () => {
    const svgTitleText = nativeTextMethods.svgTitleText;
    it('returns the title text', () => {
      fixtureSetup(
        '<svg>' + '  <title>My title</title>' + '  some content' + '</svg>'
      );
      const svg = axe.utils.querySelectorAll(axe._tree[0], 'svg')[0];
      assert.equal(svgTitleText(svg), 'My title');
    });

    it('returns `` when there is no title', () => {
      it('returns the title text', () => {
        fixtureSetup('<svg>' + '  some content' + '</svg>');
        const svg = axe.utils.querySelectorAll(axe._tree[0], 'svg')[0];
        assert.equal(svgTitleText(svg), '');
      });
    });

    it('returns `` when if the title is nested in another svg', () => {
      it('returns the title text', () => {
        fixtureSetup(
          '<svg id="fig1">' +
            '  <svg>' +
            '    <title>No title</title>' +
            '    some content' +
            '  </svg>' +
            '  some other content' +
            '</svg>'
        );
        const svg = axe.utils.querySelectorAll(axe._tree[0], '#fig1')[0];
        assert.equal(svgTitleText(svg), '');
      });
    });
  });

  describe('singleSpace', () => {
    const singleSpace = nativeTextMethods.singleSpace;
    it('returns a single space', () => {
      assert.equal(singleSpace(), ' ');
    });
  });

  describe('placeholderText', () => {
    const placeholderText = nativeTextMethods.placeholderText;
    it('returns the placeholder attribute of actualNode', () => {
      fixtureSetup('<input placeholder="foo" />');
      const input = axe.utils.querySelectorAll(axe._tree[0], 'input')[0];
      assert.equal(placeholderText(input), 'foo');
    });

    it('returns `` when there is no placeholder', () => {
      fixtureSetup('<input />');
      const input = axe.utils.querySelectorAll(axe._tree[0], 'input')[0];
      assert.equal(placeholderText(input), '');
    });
  });
});
