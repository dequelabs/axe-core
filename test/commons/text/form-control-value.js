describe('text.formControlValue', () => {
  const formControlValue = axe.commons.text.formControlValue;
  const { queryFixture, fixtureSetup, injectIntoFixture, html } = axe.testUtils;
  const fixture = document.querySelector('#fixture');

  function getNodeType(node) {
    // Note: Inconsistent response for `node.type` across browsers, hence resolving and sanitizing using getAttribute
    let nodeType = node.hasAttribute('type')
      ? axe.commons.text.sanitize(node.getAttribute('type')).toLowerCase()
      : 'text';
    nodeType = axe.utils.validInputTypes().includes(nodeType)
      ? nodeType
      : 'text';
    return nodeType;
  }

  it('returns the first truthy result from text.formControlValueMethods', () => {
    const target = queryFixture(html`
      <div id="target" role="textbox" value="foo">bar</div>
    `);
    const vNode = axe.utils.querySelectorAll(axe._tree, '#fixture')[0];
    assert.equal(formControlValue(target, { startNode: vNode }), 'bar');
  });

  it('returns `` when the node equals context.startNode', () => {
    const target = queryFixture('<input id="target" value="foo" />');
    assert.equal(formControlValue(target, { startNode: target }), '');
  });

  describe('unsupported accessibleNameFromFieldValue', () => {
    it('returns `` for unsupported progressbar role', () => {
      const target = queryFixture(html`
        <div id="target" role="progressbar" aria-value="foo"></div>
      `);
      assert.equal(formControlValue(target), '');
    });

    it('returns the value for supported textbox role', () => {
      const target = queryFixture(html`
        <div id="target" role="textbox">bar</div>
      `);
      assert.equal(formControlValue(target), 'bar');
    });

    it('returns the value for supported listbox role', () => {
      const target = queryFixture(html`
        <div id="target" role="listbox">
          <div role="option">foo</div>
          <div role="option" aria-selected="true">bar</div>
          <div role="option">baz</div>
        </div>
      `);
      assert.equal(formControlValue(target), 'bar');
    });

    it('returns the value for supported combobox role', () => {
      const target = queryFixture(html`
        <div id="target" role="combobox">
          <div role="textbox" id="text">nope</div>
          <div role="listbox" id="list">
            <div role="option">foo</div>
            <div role="option" aria-selected="true">bar</div>
          </div>
        </div>
      `);
      assert.equal(formControlValue(target), 'bar');
    });
  });

  describe('nativeTextboxValue', () => {
    const { nativeTextboxValue } = axe.commons.text.formControlValueMethods;

    it('returns the value of textarea elements', () => {
      const target = queryFixture('<textarea>foo</textarea>', 'textarea');
      assert.equal(nativeTextboxValue(target), 'foo');
    });

    it('returns the value of text field input elements', () => {
      const formData = {
        text: 'foo',
        date: '2018-12-12',
        'datetime-local': '2018-12-12T12:34',
        email: 'foo@bar.baz',
        month: '2018-11',
        number: '123',
        search: 'foo',
        tel: '123456',
        time: '12:34',
        url: 'http://foo.bar.baz',
        week: '2018-W46'
      };
      fixtureSetup(
        Object.keys(formData).reduce((code, fieldType) => {
          return `${code}<input type="${fieldType}" value="${formData[fieldType]}">`;
        }, '')
      );
      axe.utils
        .querySelectorAll(axe._tree[0], '#fixture input')
        .forEach(function (target) {
          const expected = formData[getNodeType(target.actualNode)];
          assert.isDefined(expected);
          const actual = nativeTextboxValue(target);
          assert.equal(
            actual,
            expected,
            'Expected value for ' + target.actualNode.outerHTML
          );
        });
    });

    it('returns `` for non-text input elements', () => {
      fixtureSetup(html`
        <input type="button" value="foo" />
        <input type="checkbox" value="foo" />
        <input type="file" value="foo" />
        <input type="hidden" value="foo" />
        <input type="image" value="foo" />
        <input type="password" value="foo" />
        <input type="radio" value="foo" />
        <input type="reset" value="foo" />
        <input type="submit" value="foo" />
        <input type="color" value="#000000" />
      `);
      axe.utils
        .querySelectorAll(axe._tree[0], '#fixture input')
        .forEach(function (target) {
          // Safari and IE11 do not support the color input type
          // and thus treat them as text inputs. ignore fallback
          // inputs
          if (target.actualNode.type === 'text') {
            return;
          }

          assert.equal(
            nativeTextboxValue(target),
            '',
            'Expected no value for ' + target.actualNode.outerHTML
          );
        });
    });

    it('returns the value of DOM nodes', () => {
      fixture.innerHTML = '<input value="foo">';
      axe.utils.getFlattenedTree(fixture);
      assert.equal(nativeTextboxValue(fixture.querySelector('input')), 'foo');
    });

    it('returns `` for other elements', () => {
      // some random elements:
      ['div', 'span', 'h1', 'output', 'summary', 'style', 'template'].forEach(
        function (nodeName) {
          const target = document.createElement(nodeName);
          target.value = 'foo'; // That shouldn't do anything
          fixture.appendChild(target);
          axe.utils.getFlattenedTree(fixture);
          assert.equal(nativeTextboxValue(target), '');
        }
      );
    });
  });

  describe('nativeSelectValue', () => {
    const { nativeSelectValue } = axe.commons.text.formControlValueMethods;

    it('returns the selected option text', () => {
      const target = queryFixture(html`
        <select id="target">
          <option>foo</option>
          <option value="bar" selected>baz</option>
        </select>
      `);
      assert.equal(nativeSelectValue(target), 'baz');
    });

    it('returns the selected option text after selection', () => {
      injectIntoFixture(html`
        <select id="target">
          <option value="foo" selected>foo</option>
          <option value="bar">baz</option>
        </select>
      `);
      fixture.querySelector('#target').value = 'bar';
      const rootNode = axe.setup(fixture);
      const target = axe.utils.querySelectorAll(rootNode, '#target')[0];
      assert.equal(nativeSelectValue(target), 'baz');
    });

    it('returns multiple options, space separated', () => {
      // Can't apply multiple "selected" props without setting "multiple"
      const target = queryFixture(html`
        <select id="target" multiple>
          <option>oof</option>
          <option selected>foo</option>
          <option>rab</option>
          <option selected>bar</option>
          <option>zab</option>
          <option selected>baz</option>
        </select>
      `);
      assert.equal(nativeSelectValue(target), 'foo bar baz');
    });

    it('returns options from within optgroup elements', () => {
      const target = queryFixture(html`
        <select id="target" multiple>
          <option>oof</option>
          <option selected>foo</option>
          <optgroup>
            <option>rab</option>
            <option selected>bar</option>
          </optgroup>
          <optgroup>
            <option>zab</option>
            <option selected>baz</option>
          </optgroup>
        </select>
      `);
      assert.equal(nativeSelectValue(target), 'foo bar baz');
    });

    it('returns the first option when there are no selected options', () => {
      // Browser automatically selectes the first option
      const target = queryFixture(html`
        <select id="target">
          <option>foo</option>
          <option>baz</option>
        </select>
      `);
      assert.equal(nativeSelectValue(target), 'foo');
    });

    it('returns `` for other elements', () => {
      // some random elements:
      ['div', 'span', 'h1', 'output', 'summary', 'style', 'template'].forEach(
        function (nodeName) {
          const target = document.createElement(nodeName);
          target.value = 'foo'; // That shouldn't do anything
          fixture.appendChild(target);
          axe.utils.getFlattenedTree(fixture);
          assert.equal(nativeSelectValue(target), '');
        }
      );
    });
  });

  describe('ariaTextboxValue', () => {
    const ariaTextboxValue =
      axe.commons.text.formControlValueMethods.ariaTextboxValue;

    it('returns the text of role=textbox elements', () => {
      const target = queryFixture('<div id="target" role="textbox">foo</div>');
      assert.equal(ariaTextboxValue(target), 'foo');
    });

    it('returns `` for elements without role=textbox', () => {
      const target = queryFixture('<div id="target" role="combobox">foo</div>');
      assert.equal(ariaTextboxValue(target), '');
    });

    it('ignores text hidden with CSS', () => {
      const target = queryFixture(html`
        <div id="target" role="textbox">
          <span>foo</span>
          <span style="display: none;">bar</span>
          <span style="visibility: hidden;">baz</span>
        </div>
      `);
      assert.equal(ariaTextboxValue(target), 'foo');
    });

    it('ignores elements with hidden content', () => {
      const target = queryFixture(html`
        <div id="target" role="textbox">
          <span>span</span>
          <style>
            style {
            }
          </style>
          <template>template</template>
          <script>
            script;
          </script>
          <!-- comment -->
          <h1>h1</h1>
        </div>
      `);
      assert.equal(ariaTextboxValue(target), 'span h1');
    });

    it('does not return HTML or comments', () => {
      const target = queryFixture(html`
        <div id="target" role="textbox">
          <i>foo</i>
          <!-- comment -->
        </div>
      `);
      assert.equal(ariaTextboxValue(target), 'foo');
    });

    it('returns the entire text content if the textbox is hidden', () => {
      // Yes, this is how it works in browsers :-(
      const target = queryFixture(html`
        <div id="target" role="textbox" style="display:none">
          <style>
            [role='texbox'] {
              display: none;
            }
          </style>
        </div>
      `);
      const text = ariaTextboxValue(target).replace(/\s+/g, ' ').trim();
      assert.equal(text, "[role='texbox'] { display: none; }");
    });
  });

  describe('ariaListboxValue', () => {
    const ariaListboxValue =
      axe.commons.text.formControlValueMethods.ariaListboxValue;

    it('returns the selected option when the element is a listbox', () => {
      const target = queryFixture(html`
        <div id="target" role="listbox">
          <div role="option">foo</div>
          <div role="option" aria-selected="true">bar</div>
          <div role="option">baz</div>
        </div>
      `);
      assert.equal(ariaListboxValue(target), 'bar');
    });

    it('returns `` when the element is not a listbox', () => {
      const target = queryFixture(html`
        <div id="target" role="combobox">
          <div role="option">foo</div>
          <div role="option" aria-selected="true">bar</div>
          <div role="option">baz</div>
        </div>
      `);
      assert.equal(ariaListboxValue(target), '');
    });

    it('returns `` when there is no selected option', () => {
      const target = queryFixture(html`
        <div id="target" role="listbox">
          <div role="option">foo</div>
          <div role="option">bar</div>
          <div role="option">baz</div>
        </div>
      `);
      assert.equal(ariaListboxValue(target), '');
    });

    it('returns `` when aria-selected is not true option', () => {
      const target = queryFixture(html`
        <div id="target" role="listbox">
          <div role="option" aria-selected="false">foo</div>
          <div role="option" aria-selected="TRUE">bar</div>
          <div role="option" aria-selected="yes">baz</div>
          <div role="option" aria-selected="selected">fiz</div>
        </div>
      `);
      assert.equal(ariaListboxValue(target), '');
    });

    it('returns selected options from aria-owned', () => {
      const target = queryFixture(html`
        <div id="target" role="listbox" aria-owns="opt1 opt2 opt3"></div>
        <div role="option" id="opt1">foo</div>
        <div role="option" id="opt2" aria-selected="true">bar</div>
        <div role="option" id="opt3">baz</div>
      `);
      assert.equal(ariaListboxValue(target), 'bar');
    });

    it('ignores aria-selected for elements that are not options', () => {
      const target = queryFixture(html`
        <div id="target" role="listbox" aria-owns="opt1 opt2 opt3"></div>
        <div id="opt1">foo</div>
        <div id="opt2" aria-selected="true">bar</div>
        <div id="opt3">baz</div>
      `);
      assert.equal(ariaListboxValue(target), '');
    });

    describe('with multiple aria-selected', () => {
      it('returns the first selected option from children', () => {
        const target = queryFixture(html`
          <div id="target" role="listbox">
            <div role="option">foo</div>
            <div role="option" aria-selected="true">bar</div>
            <div role="option" aria-selected="true">baz</div>
          </div>
        `);
        assert.equal(ariaListboxValue(target), 'bar');
      });

      it('returns the first selected option in aria-owned (as opposed to in the DOM order)', () => {
        const target = queryFixture(html`
          <div id="target" role="listbox" aria-owns="opt3 opt2 opt1"></div>
          <div role="option" id="opt1" aria-selected="true">foo</div>
          <div role="option" id="opt2" aria-selected="true">bar</div>
          <div role="option" id="opt3">baz</div>
        `);
        assert.equal(ariaListboxValue(target), 'bar');
      });

      it('returns the a selected child before a selected aria-owned element', () => {
        const target = queryFixture(html`
          <div id="target" role="listbox" aria-owns="opt2 opt3">
            <div role="option" aria-selected="true">foo</div>
          </div>
          <div role="option" id="opt2" aria-selected="true">bar</div>
          <div role="option" id="opt3">baz</div>
        `);
        assert.equal(ariaListboxValue(target), 'foo');
      });

      it('ignores aria-multiselectable=true', () => {
        // aria-multiselectable doesn't add additional content to the accessible name
        const target = queryFixture(html`
          <div
            id="target"
            role="listbox"
            aria-owns="opt2 opt3"
            aria-multiselectable="true"
          >
            <div role="option" aria-selected="true">foo</div>
          </div>
          <div role="option" id="opt2" aria-selected="true">bar</div>
          <div role="option" id="opt3" aria-selected="true">baz</div>
        `);
        assert.equal(ariaListboxValue(target), 'foo');
      });
    });
  });

  describe('ariaComboboxValue', () => {
    const { ariaComboboxValue } = axe.commons.text.formControlValueMethods;

    const comboboxContent = html`
      <div role="textbox" id="text">nope</div>
      <div role="listbox" id="list">
        <div role="option">foo</div>
        <div role="option" aria-selected="true">bar</div>
      </div>
    `;

    it('returns the text of role=combobox elements', () => {
      const target = queryFixture(html`
        <div id="target" role="combobox">${comboboxContent}</div>
      `);
      assert.equal(ariaComboboxValue(target), 'bar');
    });

    it('returns `` for elements without role=combobox', () => {
      const target = queryFixture(
        `<div role="combobox">${comboboxContent}</div>`,
        '[role=listbox]'
      );
      assert.equal(ariaComboboxValue(target), '');
    });

    it('passes child listbox to `ariaListboxValue` and returns its result', () => {
      const target = queryFixture(html`
        <div id="target" role="combobox">${comboboxContent}</div>
      `);
      assert.equal(ariaComboboxValue(target), 'bar');
    });

    it('passes aria-owned listbox to `ariaListboxValue` and returns its result', () => {
      const target = queryFixture(
        '<div id="target" role="combobox" aria-owns="text list"></div>' +
          comboboxContent
      );
      assert.equal(ariaComboboxValue(target), 'bar');
    });
  });

  describe('ariaRangeValue', () => {
    const rangeRoles = ['progressbar', 'scrollbar', 'slider', 'spinbutton'];
    const ariaRangeValue =
      axe.commons.text.formControlValueMethods.ariaRangeValue;

    it('returns `` for roles that are not ranges', () => {
      const target = queryFixture('<div id="target" role="textbox">foo</div>');
      assert.equal(ariaRangeValue(target), '');
    });

    rangeRoles.forEach(function (role) {
      describe('with ' + role, () => {
        it('returns the result of aria-valuenow', () => {
          const target = queryFixture(html`
            <div id="target" role="${role}" aria-valuenow="+123">foo</div>
          `);
          assert.equal(ariaRangeValue(target), '123');
        });

        it('returns `0` if aria-valuenow is not a number', () => {
          const target = queryFixture(html`
            <div id="target" role="${role}" aria-valuenow="abc">foo</div>
          `);
          assert.equal(ariaRangeValue(target), '0');
        });

        it('returns decimal numbers', () => {
          const target = queryFixture(html`
            <div id="target" role="${role}" aria-valuenow="1.5678">foo</div>
          `);
          assert.equal(ariaRangeValue(target), '1.5678');
        });

        it('returns negative numbers', () => {
          const target = queryFixture(html`
            <div id="target" role="${role}" aria-valuenow="-1.0">foo</div>
          `);
          assert.equal(ariaRangeValue(target), '-1');
        });
      });
    });
  });
});
