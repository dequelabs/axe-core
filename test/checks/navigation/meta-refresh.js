describe('meta-refresh', () => {
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const metaRefreshCheck = axe.testUtils.getCheckEvaluate('meta-refresh');

  afterEach(() => {
    checkContext.reset();
  });

  it('returns false if there is a number', () => {
    const checkArgs = checkSetup(
      '<meta id="target" name="refresh" content="3">'
    );
    assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
  });

  describe('returns false when valid', () => {
    it('there is a decimal', () => {
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3.1">'
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('there is a number followed by a dot', () => {
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3.">'
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('there is a dot followed by a number', () => {
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content=".5">'
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('there is whitespace before the number', () => {
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="  \n\t3">'
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    describe('with a valid separator', () => {
      it('the number is followed by a semicolon', () => {
        const checkArgs = checkSetup(
          '<meta id="target" name="refresh" content="3;">'
        );
        assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
      });

      it('the number is followed by a comma', () => {
        const checkArgs = checkSetup(
          '<meta id="target" name="refresh" content="3,">'
        );
        assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
      });

      it('the number is followed spaces, and then a separator', () => {
        const checkArgs = checkSetup(
          '<meta id="target" name="refresh" content="3 \t\n;">'
        );
        assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
      });

      it('the separator is followed by non-separator characters', () => {
        const checkArgs = checkSetup(
          '<meta id="target" name="refresh" content="3; https://deque.com/">'
        );
        assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
      });

      it('the separator is a space', () => {
        const checkArgs = checkSetup(
          '<meta id="target" name="refresh" content="3 https://deque.com/">'
        );
        assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
      });
    });
  });

  describe('returns true when invalid', () => {
    it('the number is prefaced with a plus', () => {
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="+3">'
      );
      assert.isTrue(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('the number is prefaced with a minus', () => {
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="-3">'
      );
      assert.isTrue(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('the number is prefaced with a letter', () => {
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="a3">'
      );
      assert.isTrue(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('the number is followed by an invalid separator character', () => {
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3: https://deque.com/">'
      );
      assert.isTrue(metaRefreshCheck.apply(checkContext, checkArgs));
    });
  });

  describe('options.minDelay', () => {
    it('returns false when the redirect number is greater than minDelay', () => {
      const options = { minDelay: 2 };
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3">',
        options
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('returns true when the redirect number equals minDelay', () => {
      const options = { minDelay: 3 };
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3">',
        options
      );
      assert.isTrue(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('returns true when the redirect number is less than minDelay', () => {
      const options = { minDelay: 4 };
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3">',
        options
      );
      assert.isTrue(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('ignores minDelay when set to false', () => {
      const options = { minDelay: false };
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="0">',
        options
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });
  });

  describe('options.maxDelay', () => {
    it('returns true when the redirect number is greater than maxDelay', () => {
      const options = { maxDelay: 2 };
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3">',
        options
      );
      assert.isTrue(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('returns false when the redirect number equals maxDelay', () => {
      const options = { maxDelay: 3 };
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3">',
        options
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('returns false when the redirect number is less than maxDelay', () => {
      const options = { maxDelay: 4 };
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="3">',
        options
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });

    it('ignores maxDelay when set to false', () => {
      const options = { maxDelay: false };
      const checkArgs = checkSetup(
        '<meta id="target" name="refresh" content="9999">',
        options
      );
      assert.isFalse(metaRefreshCheck.apply(checkContext, checkArgs));
    });
  });
});
