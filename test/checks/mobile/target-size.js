describe('target-size tests', () => {
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  const check = checks['target-size'];
  const fixture = document.querySelector('#fixture');

  function elmIds(elms) {
    return Array.from(elms).map(elm => {
      return `#${elm.id}`;
    });
  }

  afterEach(() => {
    checkContext.reset();
  });

  it('returns false for targets smaller than minSize', () => {
    const checkArgs = checkSetup(
      `<button id="target" style="display: inline-block; width:20px; height:30px;">x</button>`
    );
    assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      minSize: 24,
      width: 20,
      height: 30
    });
  });

  it('returns undefined for non-tabbable targets smaller than minSize', () => {
    const checkArgs = checkSetup(
      `<button id="target" tabindex="-1" style="display: inline-block; width:20px; height:30px;">x</button>`
    );
    assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      minSize: 24,
      width: 20,
      height: 30
    });
  });

  it('returns true for unobscured targets larger than minSize', () => {
    const checkArgs = checkSetup(
      `<button id="target" style="display: inline-block; width:40px; height:30px;">x</button>`
    );
    assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      minSize: 24,
      width: 40,
      height: 30
    });
  });

  it('returns true for very large targets', () => {
    const checkArgs = checkSetup(
      `<button id="target" style="display: inline-block; width:240px; height:300px;">x</button>`
    );
    assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, { messageKey: 'large', minSize: 24 });
  });

  describe('when fully obscured', () => {
    it('returns true, regardless of size', () => {
      const checkArgs = checkSetup(
        `<a href="#" id="target" style="display: inline-block; width:20px; height:20px;">x</a>` +
          `<div id="obscurer" style="display: inline-block; width:20px; height:20px; margin-left: -20px;">x</div>`
      );
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, { messageKey: 'obscured' });
      assert.deepEqual(elmIds(checkContext._relatedNodes), ['#obscurer']);
    });

    it('returns true when obscured by another focusable widget', () => {
      const checkArgs = checkSetup(
        `<a href="#" id="target" style="display: inline-block; width:20px; height:20px;">x</a>` +
          `<a href="#" id="obscurer" style="display: inline-block; width:20px; height:20px; margin-left: -20px;">x</a>`
      );
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, { messageKey: 'obscured' });
      assert.deepEqual(elmIds(checkContext._relatedNodes), ['#obscurer']);
    });

    it('ignores obscuring element has pointer-events:none', () => {
      const checkArgs = checkSetup(
        `<a href="#" id="target" style="display: inline-block; width:20px; height:20px;">x</a>` +
          `<span style="display: inline-block; pointer-events: none; width:20px; height:20px; margin-left: -20px;">x</span>`
      );
      assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        minSize: 24,
        width: 20,
        height: 20
      });
    });
  });

  describe('when partially obscured', () => {
    it('returns true for focusable non-widgets', () => {
      const checkArgs = checkSetup(
        `<button id="target" style="display: inline-block; width:40px; height:30px; margin-left:30px;">x</button>` +
          `<button id="obscurer" style="display: inline-block; width:40px; height:30px; margin-left: -10px;">x</button>` +
          `<span tabindex="0" style="display: inline-block; width:40px; height:30px; margin-left: -100px;">x</span>`
      );
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        minSize: 24,
        width: 30,
        height: 30
      });
      assert.deepEqual(elmIds(checkContext._relatedNodes), ['#obscurer']);
    });

    it('returns true for non-focusable widgets', () => {
      const checkArgs = checkSetup(
        `<button id="target" style="display: inline-block; width:40px; height:30px; margin-left:30px;">x</button>` +
          `<button id="obscurer" style="display: inline-block; width:40px; height:30px; margin-left: -10px;">x</button>` +
          `<button disabled style="display: inline-block; width:40px; height:30px; margin-left: -100px;">x</button>`
      );
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        minSize: 24,
        width: 30,
        height: 30
      });
      assert.deepEqual(elmIds(checkContext._relatedNodes), ['#obscurer']);
    });

    describe('by a focusable widget', () => {
      it('returns true for obscured targets with sufficient space', () => {
        const checkArgs = checkSetup(
          `<button id="target" style="display: inline-block; width:40px; height:30px;">x</button>` +
            `<button id="obscurer" style="display: inline-block; width:40px; height:30px; margin-left: -10px;">x</button>`
        );
        assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
        assert.deepEqual(checkContext._data, {
          minSize: 24,
          width: 30,
          height: 30
        });
        assert.deepEqual(elmIds(checkContext._relatedNodes), ['#obscurer']);
      });

      it('returns true for obscured target when an unobscured rect has sufficient size but smaller area', () => {
        const checkArgs = checkSetup(
          `<div style="position: relative;">` +
            `<button id="target" style="width: 80px; height: 40px;">X</button>` +
            `<button id="obscurer" style="width: 80px; height: 40px; position: absolute; left: 30px; top: 20px;">x</button>` +
            `</div>`
        );
        assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
        assert.deepEqual(checkContext._data, {
          minSize: 24,
          width: 30,
          height: 40
        });
        assert.deepEqual(elmIds(checkContext._relatedNodes), ['#obscurer']);
      });

      it('returns true for multiline inline target with sufficient space', () => {
        const checkArgs = checkSetup(
          `<div style="font-size: 18px; margin: 1em auto; width: 6em; line-height: 1.3;">` +
            `<a id="not-obscurer" href="/foo" class="A"> Hello hello</a>` +
            `<a id="target" href="/bar" class="B"> Hello hello hello</a>` +
            `<a id="obscurer" href="/baz" class="C"> Hello hello hello</a>` +
            `</div>`
        );
        assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
        assert.closeTo(checkContext._data.width, 40.5, 10);
        assert.closeTo(checkContext._data.height, 40.5, 5);
        assert.deepEqual(elmIds(checkContext._relatedNodes), ['#obscurer']);
      });

      it('returns undefined if there are too many focusable widgets', () => {
        let rows = '';
        for (let i = 0; i < 100; i++) {
          rows +=
            `<tr>` +
            `<td><a href="#">A</a></td>` +
            `<td><button>B</button></td>` +
            `<td><button>C</button></td>` +
            `<td><button>D</button></td>` +
            `</tr>`;
        }
        const checkArgs = checkSetup(
          `<div id="target" role="tabpanel" tabindex="0" style="display:inline-block">` +
            `<table id="tab-table">${rows}</table>` +
            `</div>`
        );
        assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
        assert.deepEqual(checkContext._data, {
          messageKey: 'tooManyRects',
          minSize: 24
        });
      });

      describe('for obscured targets with insufficient space', () => {
        it('returns false if all elements are tabbable', () => {
          const checkArgs = checkSetup(
            `<button id="target" style="display: inline-block; width:40px; height:30px; margin-left:30px;">x</button>` +
              `<button id="obscurer1" style="display: inline-block; width:40px; height:30px; margin-left: -10px;">x</button>` +
              `<button id="obscurer2" style="display: inline-block; width:40px; height:30px; margin-left: -100px;">x</button>`
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

        it('returns undefined if the target is not tabbable', () => {
          const checkArgs = checkSetup(
            `<button id="target" tabindex="-1" style="display: inline-block; width:40px; height:30px; margin-left:30px;">x</button>` +
              `<button id="obscurer1" style="display: inline-block; width:40px; height:30px; margin-left: -10px;">x</button>` +
              `<button id="obscurer2" style="display: inline-block; width:40px; height:30px; margin-left: -100px;">x</button>`
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

        it('returns undefined if the obscuring node is not tabbable', () => {
          const checkArgs = checkSetup(
            `<button id="target" style="display: inline-block; width:40px; height:30px; margin-left:30px;">x</button>` +
              `<button id="obscurer1" tabindex="-1" style="display: inline-block; width:40px; height:30px; margin-left: -10px;">x</button>` +
              `<button id="obscurer2" style="display: inline-block; width:40px; height:30px; margin-left: -100px;">x</button>`
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

      describe('that links to the same destination', () => {
        const bar = obscurerHref =>
          `<div style="position: relative; width: 100px;">` +
          `<a href="/w" id="target" style="display: block; height: 30px;">x</a>` +
          `<a href="${obscurerHref}" id="obscurer" style="position: absolute; top: 6px; left: 0; right: 0; height: 18px;">x</a>` +
          `</div>`;

        it('returns false when the obscurer links to a different destination', () => {
          const checkArgs = checkSetup(bar('/other'));
          assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
          assert.equal(checkContext._data.messageKey, 'partiallyObscured');
        });

        it('returns true and measures the full target', () => {
          const checkArgs = checkSetup(bar('/w'));
          assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
          assert.deepEqual(checkContext._data, {
            minSize: 24,
            width: 100,
            height: 30
          });
          assert.deepEqual(elmIds(checkContext._relatedNodes), []);
        });

        it('still returns false for an undersized target', () => {
          const checkArgs = checkSetup(
            `<div style="position: relative;">` +
              `<a href="/o" id="target" style="display: inline-block; width: 16px; height: 16px;">a</a>` +
              `<a href="/o" style="position: absolute; left: 8px; top: 0; display: inline-block; width: 16px; height: 16px;">b</a>` +
              `</div>`
          );
          assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
          assert.deepEqual(checkContext._data, {
            minSize: 24,
            width: 16,
            height: 16
          });
        });

        it('reports only the obscurer that links elsewhere', () => {
          const checkArgs = checkSetup(
            `<div style="position: relative; width: 100px;">` +
              `<a href="/w" id="target" style="display: block; height: 30px;">x</a>` +
              `<a href="/w" style="position: absolute; top: 6px; left: 0; right: 0; height: 18px;">x</a>` +
              `<a href="/other" id="other" style="position: absolute; top: 0; left: 0; width: 20px; height: 30px;">x</a>` +
              `</div>`
          );
          assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
          assert.deepEqual(checkContext._data, {
            minSize: 24,
            width: 80,
            height: 30
          });
          assert.deepEqual(elmIds(checkContext._relatedNodes), ['#other']);
        });

        it('ignores a same-destination link sharing a wrapped line', () => {
          const checkArgs = checkSetup(
            `<div style="font-size: 18px; margin: 1em auto; width: 6em; line-height: 1.3;">` +
              `<a id="not-obscurer" href="/foo" class="A"> Hello hello</a>` +
              `<a id="target" href="/bar" class="B"> Hello hello hello</a>` +
              `<a href="/bar" class="C"> Hello hello hello</a>` +
              `</div>`
          );
          const targetRect = fixture
            .querySelector('#target')
            .getBoundingClientRect();
          assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
          assert.closeTo(checkContext._data.width, targetRect.width, 1);
          assert.closeTo(checkContext._data.height, targetRect.height, 1);
          assert.deepEqual(elmIds(checkContext._relatedNodes), []);
        });
      });

      describe('that is a descendant', () => {
        it('returns false if the widget is tabbable', () => {
          const checkArgs = checkSetup(
            `<a role="link" aria-label="play" tabindex="0" style="display:inline-block" id="target">` +
              `<button style="margin:1px; line-height:20px">Play</button>` +
              `</a>`
          );
          const out = check.evaluate.apply(checkContext, checkArgs);
          assert.isFalse(out);
        });

        it('returns true if the widget is not tabbable', () => {
          const checkArgs = checkSetup(
            `<a role="link" aria-label="play" tabindex="0" style="display:inline-block" id="target">` +
              `<button tabindex="-1" style="margin:1px; line-height:20px">Play</button>` +
              `</a>`
          );
          const out = check.evaluate.apply(checkContext, checkArgs);
          assert.isTrue(out);
        });
      });

      describe('that is a descendant', () => {
        it('returns false if the widget is tabbable', () => {
          const checkArgs = checkSetup(
            `<a role="link" aria-label="play" tabindex="0" style="display:inline-block" id="target">` +
              `<button style="margin:1px; line-height:20px">Play</button>` +
              `</a>`
          );
          const out = check.evaluate.apply(checkContext, checkArgs);
          assert.isFalse(out);
        });

        it('returns true if the widget is not tabbable', () => {
          const checkArgs = checkSetup(
            `<a role="link" aria-label="play" tabindex="0" style="display:inline-block" id="target">` +
              `<button tabindex="-1" style="margin:1px; line-height:20px">Play</button>` +
              `</a>`
          );
          const out = check.evaluate.apply(checkContext, checkArgs);
          assert.isTrue(out);
        });
      });
    });
  });

  describe('with overflowing content', () => {
    it('returns undefined target is too small', () => {
      const checkArgs = checkSetup(
        '<a href="#" id="target"><img width="24" height="24"></a>'
      );
      assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        minSize: 24,
        messageKey: 'contentOverflow'
      });
    });

    it('returns true if target has sufficient size', () => {
      const checkArgs = checkSetup(
        '<a href="#" id="target" style="font-size:24px;"><img width="24" height="24"></a>'
      );
      assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
    });

    describe('and partially obscured', () => {
      it('is undefined when unobscured area is too small', () => {
        const checkArgs = checkSetup(
          `<a href="#" id="target" style="font-size:24px;"><img width="24" height="36" style="vertical-align: bottom;" /> </a>` +
            `<br />` +
            `<a href="" style="margin-top:-10px; position:absolute; width:24px;">&nbsp;</a>`
        );
        assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
        assert.deepEqual(checkContext._data, {
          minSize: 24,
          messageKey: 'contentOverflow'
        });
      });

      it('is true when unobscured area is sufficient', () => {
        const checkArgs = checkSetup(
          `<a href="#" id="target" style="font-size:24px;"><img width="24" height="36" style="vertical-align: bottom;" /> </a>` +
            `<br />` +
            `<a href="" style="margin-top:-2px; position:absolute; width:24px;">&nbsp;</a>`
        );
        assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
      });
    });

    describe('and fully obscured', () => {
      it('is undefined', () => {
        const checkArgs = checkSetup(
          `<a href="#" id="target" style="font-size:24px;"><img width="24" height="36" style="vertical-align: bottom;" /> </a>` +
            `<br />` +
            `<a href="" style="margin-top:-40px; position:absolute; width:100px; height:100px;">&nbsp;</a>`
        );
        assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
        assert.deepEqual(checkContext._data, {
          minSize: 24,
          messageKey: 'contentOverflow'
        });
      });
    });
  });

  it('works across shadow boundaries', () => {
    const checkArgs = shadowCheckSetup(
      `<span id="shadow"></span>` +
        `<button id="obscurer1" style="display: inline-block; width:40px; height:30px; margin-left: -10px;">x</button>` +
        `<button id="obscurer2" style="display: inline-block; width:40px; height:30px; margin-left: -100px;">x</button>`,
      `<button id="target" style="display: inline-block; width:40px; height:30px; margin-left:30px;">x</button>`
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

  it('ignores descendants of the target that are in shadow dom', () => {
    fixture.innerHTML =
      `<button id="target" style="width: 30px; height: 40px; position: absolute; left: 10px; top: 5px">` +
      `<span id="shadow"></span>` +
      `</button>`;
    const target = fixture.querySelector('#target');
    const shadow = fixture
      .querySelector('#shadow')
      .attachShadow({ mode: 'open' });
    shadow.innerHTML =
      '<div style="position: absolute; left: 5px; top: 5px; width: 50px; height: 50px;"></div>';

    axe.setup(fixture);
    const vNode = axe.utils.getNodeFromTree(target);
    assert.isTrue(check.evaluate.apply(checkContext, [target, {}, vNode]));
  });
});
