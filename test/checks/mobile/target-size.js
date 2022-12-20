describe('target-size tests', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;
  var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  var check = checks['target-size'];

  function elmIds(elms) {
    return Array.from(elms).map(function (elm) {
      return '#' + elm.id;
    });
  }

  afterEach(function () {
    checkContext.reset();
  });

  it('returns false for targets smaller than minSize', function () {
    var checkArgs = checkSetup(
      '<button id="target" style="' +
        'display: inline-block; width:20px; height:30px;' +
        '">x</button>'
    );
    assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      minSize: 24,
      width: 20,
      height: 30
    });
  });

  it('returns undefined for non-tabbable targets smaller than minSize', function () {
    var checkArgs = checkSetup(
      '<button id="target" tabindex="-1" style="' +
        'display: inline-block; width:20px; height:30px;' +
        '">x</button>'
    );
    assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      minSize: 24,
      width: 20,
      height: 30
    });
  });

  it('returns true for unobscured targets larger than minSize', function () {
    var checkArgs = checkSetup(
      '<button id="target" style="' +
        'display: inline-block; width:40px; height:30px;' +
        '">x</button>'
    );
    assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      minSize: 24,
      width: 40,
      height: 30
    });
  });

  describe('when fully obscured', function () {
    it('returns true, regardless of size', function () {
      var checkArgs = checkSetup(
        '<a href="#" id="target" style="' +
          'display: inline-block; width:20px; height:20px;' +
          '">x</a>' +
          '<div id="obscurer" style="' +
          'display: inline-block; width:20px; height:20px; margin-left: -20px;' +
          '">x</div>'
      );
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, { messageKey: 'obscured' });
      assert.deepEqual(elmIds(checkContext._relatedNodes), ['#obscurer']);
    });

    it('returns true when obscured by another focusable widget', function () {
      var checkArgs = checkSetup(
        '<a href="#" id="target" style="' +
          'display: inline-block; width:20px; height:20px;' +
          '">x</a>' +
          '<a href="#" id="obscurer" style="' +
          'display: inline-block; width:20px; height:20px; margin-left: -20px;' +
          '">x</a>'
      );
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, { messageKey: 'obscured' });
      assert.deepEqual(elmIds(checkContext._relatedNodes), ['#obscurer']);
    });

    it('ignores obscuring element has pointer-events:none', function () {
      var checkArgs = checkSetup(
        '<a href="#" id="target" style="' +
          'display: inline-block; width:20px; height:20px;' +
          '">x</a>' +
          '<span style="' +
          'display: inline-block; pointer-events: none; width:20px; height:20px; margin-left: -20px;' +
          '">x</span>'
      );
      assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        minSize: 24,
        width: 20,
        height: 20
      });
    });
  });

  describe('when partially obscured', function () {
    it('returns true for focusable non-widgets', function () {
      var checkArgs = checkSetup(
        '<button id="target" style="' +
          'display: inline-block; width:40px; height:30px; margin-left:30px;' +
          '">x</button>' +
          '<button id="obscurer" style="' +
          'display: inline-block; width:40px; height:30px; margin-left: -10px;' +
          '">x</button>' +
          '<span tabindex="0" style="' +
          'display: inline-block; width:40px; height:30px; margin-left: -100px;' +
          '">x</span>'
      );
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        minSize: 24,
        width: 30,
        height: 30
      });
      assert.deepEqual(elmIds(checkContext._relatedNodes), ['#obscurer']);
    });

    it('returns true for non-focusable widgets', function () {
      var checkArgs = checkSetup(
        '<button id="target" style="' +
          'display: inline-block; width:40px; height:30px; margin-left:30px;' +
          '">x</button>' +
          '<button id="obscurer" style="' +
          'display: inline-block; width:40px; height:30px; margin-left: -10px;' +
          '">x</button>' +
          '<button disabled style="' +
          'display: inline-block; width:40px; height:30px; margin-left: -100px;' +
          '">x</button>'
      );
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        minSize: 24,
        width: 30,
        height: 30
      });
      assert.deepEqual(elmIds(checkContext._relatedNodes), ['#obscurer']);
    });

    describe('by a focusable widget', function () {
      it('returns true for obscured targets with sufficient space', function () {
        var checkArgs = checkSetup(
          '<button id="target" style="' +
            'display: inline-block; width:40px; height:30px;' +
            '">x</button>' +
            '<button id="obscurer" style="' +
            'display: inline-block; width:40px; height:30px; margin-left: -10px;' +
            '">x</button>'
        );
        assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
        assert.deepEqual(checkContext._data, {
          minSize: 24,
          width: 30,
          height: 30
        });
        assert.deepEqual(elmIds(checkContext._relatedNodes), ['#obscurer']);
      });

      describe('for obscured targets with insufficient space', () => {
        it('returns false if all elements are tabbable', function () {
          var checkArgs = checkSetup(
            '<button id="target" style="' +
              'display: inline-block; width:40px; height:30px; margin-left:30px;' +
              '">x</button>' +
              '<button id="obscurer1" style="' +
              'display: inline-block; width:40px; height:30px; margin-left: -10px;' +
              '">x</button>' +
              '<button id="obscurer2" style="' +
              'display: inline-block; width:40px; height:30px; margin-left: -100px;' +
              '">x</button>'
          );
          assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
          assert.deepEqual(checkContext._data, {
            messageKey: 'partiallyObscured',
            minSize: 24,
            width: 20,
            height: 30
          });
          assert.deepEqual(elmIds(checkContext._relatedNodes), [
            '#obscurer1',
            '#obscurer2'
          ]);
        });

        it('returns undefined if the target is not tabbable', function () {
          var checkArgs = checkSetup(
            '<button id="target" tabindex="-1" style="' +
              'display: inline-block; width:40px; height:30px; margin-left:30px;' +
              '">x</button>' +
              '<button id="obscurer1" style="' +
              'display: inline-block; width:40px; height:30px; margin-left: -10px;' +
              '">x</button>' +
              '<button id="obscurer2" style="' +
              'display: inline-block; width:40px; height:30px; margin-left: -100px;' +
              '">x</button>'
          );
          assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
          assert.deepEqual(checkContext._data, {
            messageKey: 'partiallyObscured',
            minSize: 24,
            width: 20,
            height: 30
          });
          assert.deepEqual(elmIds(checkContext._relatedNodes), [
            '#obscurer1',
            '#obscurer2'
          ]);
        });

        it('returns undefined if the obscuring node is not tabbable', function () {
          var checkArgs = checkSetup(
            '<button id="target" style="' +
              'display: inline-block; width:40px; height:30px; margin-left:30px;' +
              '">x</button>' +
              '<button id="obscurer1" tabindex="-1" style="' +
              'display: inline-block; width:40px; height:30px; margin-left: -10px;' +
              '">x</button>' +
              '<button id="obscurer2" style="' +
              'display: inline-block; width:40px; height:30px; margin-left: -100px;' +
              '">x</button>'
          );
          assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
          assert.deepEqual(checkContext._data, {
            messageKey: 'partiallyObscuredNonTabbable',
            minSize: 24,
            width: 20,
            height: 30
          });
          assert.deepEqual(elmIds(checkContext._relatedNodes), [
            '#obscurer1',
            '#obscurer2'
          ]);
        });
      });

      describe('that is a descendant', () => {
        it('returns false if the widget is tabbable', function () {
          var checkArgs = checkSetup(
            `<a role="link" aria-label="play" tabindex="0" style="display:inline-block" id="target">
              <button style="margin:1px; line-height:20px">Play</button>
            </a>`
          );
          const out = check.evaluate.apply(checkContext, checkArgs);
          assert.isFalse(out);
        });

        it('returns true if the widget is not tabbable', function () {
          var checkArgs = checkSetup(
            `<a role="link" aria-label="play" tabindex="0" style="display:inline-block" id="target">
              <button tabindex="-1" style="margin:1px; line-height:20px">Play</button>
            </a>`
          );
          const out = check.evaluate.apply(checkContext, checkArgs);
          assert.isTrue(out);
        });
      });

      describe('that is a descendant', () => {
        it('returns false if the widget is tabbable', function () {
          var checkArgs = checkSetup(
            `<a role="link" aria-label="play" tabindex="0" style="display:inline-block" id="target">
              <button style="margin:1px; line-height:20px">Play</button>
            </a>`
          );
          const out = check.evaluate.apply(checkContext, checkArgs);
          assert.isFalse(out);
        });

        it('returns true if the widget is not tabbable', function () {
          var checkArgs = checkSetup(
            `<a role="link" aria-label="play" tabindex="0" style="display:inline-block" id="target">
              <button tabindex="-1" style="margin:1px; line-height:20px">Play</button>
            </a>`
          );
          const out = check.evaluate.apply(checkContext, checkArgs);
          assert.isTrue(out);
        });
      });
    });
  });

  describe('with overflowing content', function () {
    it('returns undefined target is too small', () => {
      var checkArgs = checkSetup(
        '<a href="#" id="target"><img width="24" height="24"></a>'
      );
      assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        minSize: 24,
        messageKey: 'contentOverflow'
      });
    });

    it('returns true if target has sufficient size', () => {
      var checkArgs = checkSetup(
        '<a href="#" id="target" style="font-size:24px;"><img width="24" height="24"></a>'
      );
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
    });

    describe('and partially obscured', () => {
      it('is undefined when unobscured area is too small', () => {
        var checkArgs = checkSetup(
          '<a href="#" id="target" style="font-size:24px;">' +
            '  <img width="24" height="36" style="vertical-align: bottom;">' +
            '</a><br>' +
            '<a href="" style="margin-top:-10px; position:absolute; width:24px;">&nbsp;</a>'
        );
        assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
        assert.deepEqual(checkContext._data, {
          minSize: 24,
          messageKey: 'contentOverflow'
        });
      });

      it('is true when unobscured area is sufficient', () => {
        var checkArgs = checkSetup(
          '<a href="#" id="target" style="font-size:24px;">' +
            '  <img width="24" height="36" style="vertical-align: bottom;">' +
            '</a><br>' +
            '<a href="" style="margin-top:-2px; position:absolute; width:24px;">&nbsp;</a>'
        );
        assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      });
    });

    describe('and fully obscured', () => {
      it('is undefined', () => {
        var checkArgs = checkSetup(
          '<a href="#" id="target" style="font-size:24px;">' +
            '  <img width="24" height="36" style="vertical-align: bottom;">' +
            '</a><br>' +
            '<a href="" style="margin-top:-40px; position:absolute; width:100px; height:100px;">&nbsp;</a>'
        );
        assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
        assert.deepEqual(checkContext._data, {
          minSize: 24,
          messageKey: 'contentOverflow'
        });
      });
    });
  });

  it('works across shadow boundaries', function () {
    var checkArgs = shadowCheckSetup(
      '<span id="shadow"></span>' +
        '<button id="obscurer1" style="' +
        'display: inline-block; width:40px; height:30px; margin-left: -10px;' +
        '">x</button>' +
        '<button id="obscurer2" style="' +
        'display: inline-block; width:40px; height:30px; margin-left: -100px;' +
        '">x</button>',
      '<button id="target" style="' +
        'display: inline-block; width:40px; height:30px; margin-left:30px;' +
        '">x</button>'
    );
    assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      messageKey: 'partiallyObscured',
      minSize: 24,
      width: 20,
      height: 30
    });
    assert.deepEqual(elmIds(checkContext._relatedNodes), [
      '#obscurer1',
      '#obscurer2'
    ]);
  });
});
