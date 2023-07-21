describe('aria.validateAttrValue', () => {
  const fixture = document.getElementById('fixture');
  const shadowSupport = axe.testUtils.shadowSupport;
  let node;

  function setAttr(elm, attrName, attrValue) {
    elm.setAttribute(attrName, attrValue);
    axe.teardown();
    return axe.setup(elm);
  }

  beforeEach(() => {
    node = document.createElement('div');
  });

  afterEach(() => {
    axe.reset();
  });

  it('should return true if there is no matching attribute (future-compat???)', () => {
    setAttr(node, 'unknown-attr', 'hello');

    assert.isTrue(axe.commons.aria.validateAttrValue(node, 'unknown-attr'));
  });

  it('works on virtual nodes', () => {
    axe.configure({
      standards: {
        ariaAttrs: {
          cats: {
            type: 'nmtoken',
            values: ['valid'],
            allowEmpty: true
          }
        }
      }
    });
    const vNode = axe.testUtils.queryFixture(
      '<div id="target" cats="valid"></div>'
    );
    assert.isTrue(axe.commons.aria.validateAttrValue(vNode, 'cats'));
  });

  describe('allowEmpty', () => {
    beforeEach(() => {
      axe.configure({
        standards: {
          ariaAttrs: {
            cats: {
              type: 'nmtoken',
              values: ['valid'],
              allowEmpty: true
            },
            dogs: {
              type: 'idref',
              allowEmpty: true
            },
            goats: {
              type: 'idrefs',
              allowEmpty: true
            },
            cows: {
              type: 'string',
              allowEmpty: true
            },
            sheep: {
              type: 'decimal',
              allowEmpty: true
            },
            pigs: {
              type: 'int',
              allowEmpty: true
            },
            horses: {
              type: 'boolean',
              allowEmpty: true
            }
          }
        }
      });
    });

    it('returns true for empty attributes with allowEmpty:true', () => {
      setAttr(node, 'cats', '');
      assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

      setAttr(node, 'dogs', '');
      assert.isTrue(axe.commons.aria.validateAttrValue(node, 'dogs'));

      setAttr(node, 'goats', '');
      assert.isTrue(axe.commons.aria.validateAttrValue(node, 'goats'));

      setAttr(node, 'sheep', '');
      assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

      setAttr(node, 'cows', '');
      assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cows'));

      setAttr(node, 'pigs', '');
      assert.isTrue(axe.commons.aria.validateAttrValue(node, 'pigs'));

      setAttr(node, 'horses', '');
      assert.isTrue(axe.commons.aria.validateAttrValue(node, 'horses'));
    });

    it('returns true for whitespace-only attributes with allowEmpty:true', () => {
      setAttr(node, 'cats', '  \r\n\t  ');
      assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

      setAttr(node, 'dogs', '  \r\n\t  ');
      assert.isTrue(axe.commons.aria.validateAttrValue(node, 'dogs'));

      setAttr(node, 'goats', '  \r\n\t  ');
      assert.isTrue(axe.commons.aria.validateAttrValue(node, 'goats'));

      setAttr(node, 'cows', '  \r\n\t  ');
      assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cows'));

      setAttr(node, 'pigs', '  \r\n\t  ');
      assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

      setAttr(node, 'sheep', '  \r\n\t  ');
      assert.isTrue(axe.commons.aria.validateAttrValue(node, 'pigs'));

      setAttr(node, 'horses', '  \r\n\t  ');
      assert.isTrue(axe.commons.aria.validateAttrValue(node, 'horses'));
    });
  });

  describe('schema defintions', () => {
    describe('enumerated values', () => {
      beforeEach(() => {
        axe.configure({
          standards: {
            ariaAttrs: {
              cats: {
                type: 'nmtoken',
                values: ['valid']
              }
            }
          }
        });
      });

      it('should validate against enumerated .values if present', () => {
        setAttr(node, 'cats', 'valid');

        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

        setAttr(node, 'cats', 'invalid');

        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
      });

      it('should be case-insensitive for enumerated values', () => {
        setAttr(node, 'cats', 'vaLiD');

        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
      });

      it('should reject empty strings', () => {
        setAttr(node, 'cats', '');

        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
      });
    });

    describe('idref', () => {
      beforeEach(() => {
        axe.configure({
          standards: {
            ariaAttrs: {
              dogs: {
                type: 'idref'
              }
            }
          }
        });
      });

      it('should validate the referenced node exists', () => {
        fixture.innerHTML = '<div id="target"></div>';
        setAttr(node, 'dogs', 'target');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'dogs'));

        setAttr(node, 'dogs', 'invalid');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'dogs'));
      });

      it('should work in shadow DOM', () => {
        let shadEl;

        if (shadowSupport.v1) {
          // shadow DOM v1 - note: v0 is compatible with this code, so no need
          // to specifically test this
          fixture.innerHTML = '<div></div>';
          makeShadowTreeVAV(fixture.firstChild);
          axe.setup(fixture);
          shadEl = fixture.firstChild.shadowRoot.querySelector('input#myinput');
          assert.isTrue(
            axe.commons.aria.validateAttrValue(shadEl, 'aria-labelledby')
          );
          shadEl = fixture.firstChild.shadowRoot.querySelector('input#invalid');
          assert.isFalse(
            axe.commons.aria.validateAttrValue(shadEl, 'aria-labelledby')
          );
        }
      });

      it('returns false if empty without allowEmpty: true', () => {
        setAttr(node, 'dogs', '');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'dogs'));
      });
    });

    describe('idrefs', () => {
      beforeEach(() => {
        axe.configure({
          standards: {
            ariaAttrs: {
              goats: {
                type: 'idrefs'
              }
            }
          }
        });
      });

      it('should return false when a single referenced node is not found', () => {
        setAttr(node, 'goats', 'invalid');
        // target2 not found
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'goats'));
      });

      it('should return false when no referenced element is found', () => {
        fixture.innerHTML = '<div id="target"></div>';
        setAttr(node, 'goats', 'target2 target3');
        // target2 not found
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'goats'));
      });

      it('should return true when at least one referenced element is found', () => {
        fixture.innerHTML = '<div id="target"></div>';
        setAttr(node, 'goats', 'target target2');
        // target2 not found
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'goats'));
      });

      it('should return true when all targets are found', () => {
        fixture.innerHTML = '<div id="target"></div><div id="target2"></div>';
        setAttr(node, 'goats', 'target target2');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'goats'));
      });

      it('should not fail on weird whitespace', () => {
        fixture.innerHTML = '<div id="target"></div><div id="target2"></div>';
        setAttr(node, 'goats', ' \t \ttarget   \t   target2      ');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'goats'));
      });

      it('returns false if empty without allowEmpty: true', () => {
        setAttr(node, 'goats', '');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'goats'));
      });
    });

    describe('string', () => {
      beforeEach(() => {
        axe.configure({
          standards: {
            ariaAttrs: {
              cows: {
                type: 'string'
              }
            }
          }
        });
      });

      it('returns true for non-empty strings', () => {
        setAttr(node, 'cows', 'hi');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cows'));
      });

      it('returns false for non-empty strings without allowEmpty:true', () => {
        setAttr(node, 'cows', '');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cows'));
      });
    });

    describe('decimal', () => {
      beforeEach(() => {
        axe.configure({
          standards: {
            ariaAttrs: {
              sheep: {
                type: 'decimal'
              }
            }
          }
        });
      });

      it('should allow, but not require, a preceeding sign', () => {
        setAttr(node, 'sheep', '+1.12');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '-1.12');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '1.12');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));
      });

      it('should make the decimal separator optional', () => {
        setAttr(node, 'sheep', '+1');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '-1');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '1');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));
      });

      it('should make the whole number optional', () => {
        setAttr(node, 'sheep', '+.1');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '-.1');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '.1');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));
      });

      it('should make the right-side optional', () => {
        setAttr(node, 'sheep', '+1.');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '-1.');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '1.');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));
      });

      it('should validate the entire string', () => {
        setAttr(node, 'sheep', ' +1.12 ');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', 'invalid +1.12');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '+1.12 invalid');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));
      });

      it('should only allow for numbers', () => {
        setAttr(node, 'sheep', '+a.12');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '+1.b');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', 'b1.1');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));
      });

      it('should require at least one number', () => {
        setAttr(node, 'sheep', '+.');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '-.');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '+');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '-');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '.');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

        setAttr(node, 'sheep', '');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));
      });

      it('returns false for empty strings without allowEmpty:true', () => {
        setAttr(node, 'sheep', '');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));
      });
    });

    describe('int', () => {
      beforeEach(() => {
        axe.configure({
          standards: {
            ariaAttrs: {
              pigs: {
                type: 'int'
              }
            }
          }
        });
      });

      it('should only allow for numbers by an optional preceding sign', () => {
        setAttr(node, 'pigs', '+1234234');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'pigs'));

        setAttr(node, 'pigs', '-137456745');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'pigs'));

        setAttr(node, 'pigs', '1234523452');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'pigs'));
      });

      it('should return true for value greater than or equal to minValue', () => {
        axe.configure({
          standards: {
            ariaAttrs: {
              pigs: {
                type: 'int',
                minValue: -1
              }
            }
          }
        });

        setAttr(node, 'pigs', '-1');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'pigs'));

        setAttr(node, 'pigs', '0');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'pigs'));

        setAttr(node, 'pigs', '1000');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'pigs'));
      });

      it('returns false for empty strings without allowEmpty:true', () => {
        setAttr(node, 'pigs', '');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'pigs'));
      });

      it('should return false for value less than the minValue', () => {
        axe.configure({
          standards: {
            ariaAttrs: {
              pigs: {
                type: 'int',
                minValue: 0
              }
            }
          }
        });

        setAttr(node, 'pigs', '-1');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'pigs'));
      });
    });

    describe('boolean', () => {
      beforeEach(() => {
        axe.configure({
          standards: {
            ariaAttrs: {
              horses: {
                type: 'boolean'
              }
            }
          }
        });
      });

      it('returns true for boolean value', () => {
        setAttr(node, 'horses', 'true');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'horses'));

        setAttr(node, 'horses', 'false');
        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'horses'));
      });

      it('should be case-insensitive', () => {
        setAttr(node, 'horses', 'trUE');

        assert.isTrue(axe.commons.aria.validateAttrValue(node, 'horses'));
      });

      it('returns false for non-boolean values', () => {
        setAttr(node, 'horses', 'hi');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'horses'));

        setAttr(node, 'horses', '1');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'horses'));
      });

      it('returns false for non-empty strings without allowEmpty:true', () => {
        setAttr(node, 'horses', '');
        assert.isFalse(axe.commons.aria.validateAttrValue(node, 'horses'));
      });
    });
  });
});

function makeShadowTreeVAV(node) {
  'use strict';
  const root = node.attachShadow({ mode: 'open' });
  const div = document.createElement('div');
  div.className = 'parent';
  root.appendChild(div);
  div.appendChild(createContentVAV());
}

function createContentVAV() {
  'use strict';
  const group = document.createElement('div');
  group.innerHTML =
    '<label id="mylabel">Label</label>' +
    '<input id="myinput" aria-labelledby="mylabel" type="text" />' +
    '<input id="invalid" aria-labelledby="doesnotexist" type="text" />';
  return group;
}
