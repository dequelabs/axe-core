describe('p-as-heading', () => {
  const html = axe.testUtils.html;
  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;

  const checkContext = axe.testUtils.MockCheckContext();
  const shadowCheckSetup = axe.testUtils.shadowCheckSetup;

  const testOptions = {
    margins: [{ weight: 100 }, { italic: true }, { size: 1.2 }]
  };

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
    axe._tree = undefined;
  });

  it('returns true if the styles are identical', () => {
    const params = checkSetup(
      '<p id="target">elm 1</p> <p>elm 2</p>',
      testOptions
    );
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  it('returns true if there is no p element following it', () => {
    const params = checkSetup('<p id="target">lone elm</p>', testOptions);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  it('returns false if the font-weight is heavier', () => {
    const params = checkSetup(
      html`
        <p id="target" style="font-weight:bold">elm 1</p>
        <p>elm 2elm 2</p>
      `,
      testOptions
    );
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  it('returns false if the font-size is bigger', () => {
    const params = checkSetup(
      '<p id="target" style="font-size:150%">elm 1</p> <p>elm 2elm 2</p>',
      testOptions
    );
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  it('returns false if the fake heading is italic and the text is not', () => {
    const params = checkSetup(
      '<p id="target" style="font-style:italic">elm 1</p> <p>elm 2elm 2</p>',
      testOptions
    );
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  it('returns true if both texts are bold, italic and larger', () => {
    const params = checkSetup(
      html`
        <p
          id="target"
          style="font-weight:bold; font-size:120%; font-style:italic"
        >
          elm 1
        </p>
        <p style="font: italic bold 120% bold">elm 2elm 2</p>
      `,
      testOptions
    );
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  it('considers styles of elements inside the paragraph', () => {
    const params = checkSetup(
      '<p id="target"><b>elm 1</b></p> <p>elm 2elm 2</p>',
      testOptions
    );
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  it('ignores empty child element for style', () => {
    const params = checkSetup(
      '<p id="target"><span> </span><b>elm 1</b></p> <p>elm 2elm 2</p>',
      testOptions
    );
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  it('considers styles of elements that do not contain all the text', () => {
    const params = checkSetup(
      '<p id="target"><b>elm</b> 1</p> <p>elm 2elm 2</p>',
      testOptions
    );
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  it('returns undefined instead of false if the element is inside a blockquote', () => {
    const params = checkSetup(
      html`
        <blockquote>
          <p style="font-weight:bold" id="target">elm 1</p>
          <p>elm 2elm 2</p>
        </blockquote>
      `,
      testOptions
    );
    assert.isUndefined(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  it('returns true over undefined from within a blockquote', () => {
    const params = checkSetup(
      html`
        <blockquote>
          <p id="target">elm 1</p>
          <p>elm 2elm 2</p>
        </blockquote>
      `,
      testOptions
    );
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  it('returns undefined if a previous sibling has a similar font-weight', () => {
    const params = checkSetup(
      html`
        <p><b>elm 1</b></p>
        <p id="target"><b>elm 2</b></p>
        <p>elm 3</p>
      `,
      testOptions
    );
    assert.isUndefined(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  it('returns true if the heading is greater than the paragraph', () => {
    const params = checkSetup(
      html`
        <p id="target">elm1elm1</p>
        <p>elm2</p>
      `,
      testOptions
    );
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  it('returns undefined if the heading is twice as long but not greater than the length of the pararaph', () => {
    const params = checkSetup(
      html`
        <p id="target" style="font-weight:bold">elm1elm</p>
        <p>elm2elm2</p>
      `,
      testOptions
    );
    assert.isUndefined(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  describe('options.passLength and options.failLength', () => {
    it('returns true if the heading is greater than the paragraph using options.passLength', () => {
      const options = {
        margins: [{ weight: 100 }, { italic: true }, { size: 1.2 }],
        passLength: 2
      };

      const params = checkSetup(
        html`
          <p id="target">elm1elm1elm1</p>
          <p>elm2</p>
        `,
        options
      );
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('p-as-heading')
          .apply(checkContext, params)
      );
    });

    it('returns undefined if the heading is twice as long but not greater than the length of the pararaph using options.failLength ', () => {
      const options = {
        margins: [{ weight: 100 }, { italic: true }, { size: 1.2 }],
        failLength: 0.6
      };
      const params = checkSetup(
        html`
          <p id="target" style="font-weight:bold">elm1elm</p>
          <p>elm2elm2elm2</p>
        `,
        options
      );
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('p-as-heading')
          .apply(checkContext, params)
      );
    });
  });

  describe('option.margin', () => {
    it('passes if no margins are set', () => {
      const options = {};

      const params = checkSetup(
        '<p id="target"><b>elm 1</b></p> <p>elm 2elm 2</p>',
        options
      );
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('p-as-heading')
          .apply(checkContext, params)
      );
    });

    it('takes an array of margins', () => {
      const options = {
        margins: [{ size: 1.2 }]
      };

      const params = checkSetup(
        '<p id="target"><b>elm 1</b></p> <p>elm 2elm 2</p>',
        options
      );
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('p-as-heading')
          .apply(checkContext, params)
      );
    });

    it('returns false if all values in the margin are passed', () => {
      const options = {
        margins: [{ size: 1.2, weight: 100 }]
      };

      const params = checkSetup(
        html`
          <p id="target" style="font-size:1.5em; font-weight:bold">elm 1</p>
          <p>elm 2elm 2</p>
        `,
        options
      );
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('p-as-heading')
          .apply(checkContext, params)
      );
    });

    it('returns true if any of the values is not passed', () => {
      const options = {
        margins: [{ size: 1.2, weight: 100 }]
      };

      const params = checkSetup(
        html`
          <p id="target" style="font-weight:bold">elm 1</p>
          <p>elm 2</p>
        `,
        options
      );
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('p-as-heading')
          .apply(checkContext, params)
      );
    });

    it('returns false if any of the margins is passed', () => {
      const options = {
        margins: [{ size: 1.2, weight: 100 }, { size: 1.5 }, { italic: true }]
      };

      const params = checkSetup(
        html`
          <p id="target" style="font-style:italic">elm 1</p>
          <p>elm 2elm 2</p>
        `,
        options
      );
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('p-as-heading')
          .apply(checkContext, params)
      );
    });

    it('returns true if none of the set margins is passed', () => {
      /*eslint indent: 0*/
      const options = {
        margins: [
          { size: 1.2, weight: 100 },
          { size: 1.5 },
          { size: 1.2, italic: true }
        ]
      };

      const params = checkSetup(
        html`
          <p id="target" style="font-size:1.5em">elm 1</p>
          <p>elm 2</p>
        `,
        options
      );
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('p-as-heading')
          .apply(checkContext, params)
      );
    });
  });

  it('returns undefined instead of false if the element is inside a blockquote in light dom', () => {
    const params = shadowCheckSetup(
      '<blockquote></blockquote>',
      '<p style="font-weight:bold" id="target">elm 1</p> <p>elm 2</p>',
      testOptions
    );
    assert.isUndefined(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });

  it('returns true over undefined from within a blockquote in light dom', () => {
    const params = shadowCheckSetup(
      '<blockquote></blockquote>',
      '<p id="target">elm 1</p> <p>elm 2</p>',
      testOptions
    );
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('p-as-heading').apply(checkContext, params)
    );
  });
});
