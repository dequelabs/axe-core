describe('color.elementIsDistinct', () => {
  const elementIsDistinct = axe.commons.color.elementIsDistinct;
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const fixture = document.querySelector('#fixture');

  function convertStylePropsToString(props = {}) {
    return Object.entries(props)
      .map(([name, value]) => `${name}: ${value}`)
      .join(';');
  }

  function createTestFixture({ target, root, targetWrap } = {}) {
    const linkStyles = convertStylePropsToString(target);
    const paragraphStyles = convertStylePropsToString(root);
    const spanStyles = convertStylePropsToString(targetWrap);

    fixtureSetup(`
      <p style="color: black; ${paragraphStyles}">
        <span style="${spanStyles}">
          <a href="#" style="text-decoration: none; color: black; ${linkStyles}">Hello World</a>
        </span>
      </p>
    `);

    return {
      root: fixture.querySelector('p'),
      targetWrap: fixture.querySelector('span'),
      target: fixture.querySelector('a')
    };
  }

  it('returns false without style adjustments', () => {
    const elms = createTestFixture();
    const result = elementIsDistinct(elms.target, elms.root);

    assert.isFalse(result);
  });

  it('returns true with background-image set', () => {
    const elms = createTestFixture({
      target: { background: 'url(icon.png) no-repeat' }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isTrue(result);
  });

  it('returns true with border: dashed 1px black', () => {
    const elms = createTestFixture({
      target: { border: 'dashed 1px black' }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isTrue(result);
  });

  it('returns true with border-bottom: dashed 1px black', () => {
    const elms = createTestFixture({
      target: { 'border-bottom': 'dashed 1px black' }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isTrue(result);
  });

  it('returns false with border: solid 0px black', () => {
    const elms = createTestFixture({
      target: { border: 'solid 0px black' }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isFalse(result);
  });

  it('returns false with border: none 1px black', () => {
    const elms = createTestFixture({
      target: { border: 'none 1px black' }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isFalse(result);
  });

  it('returns false with border: solid 1px transparent', () => {
    const elms = createTestFixture({
      target: { border: 'solid 1px transparent' }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isFalse(result);
  });

  it('returns true with outline: solid 1px black', () => {
    const elms = createTestFixture({
      target: { outline: 'solid 1px black' }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isTrue(result);
  });

  it('returns true if font-weight is different', () => {
    const elms = createTestFixture({
      target: {
        'font-weight': 'bold'
      },
      root: {
        'font-weight': 'normal'
      }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isTrue(result);
  });

  it('returns false if font-weight is the same', () => {
    const elms = createTestFixture({
      target: {
        'font-weight': 'bold'
      },
      root: {
        'font-weight': 'bold'
      }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isFalse(result);
  });

  it('compares font numbers and labels correctly', () => {
    const elms = createTestFixture({
      target: {
        'font-weight': 'bold'
      },
      root: {
        'font-weight': '700'
      }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isFalse(result);
  });

  it('returns true if text-decoration is different', () => {
    const elms = createTestFixture({
      target: {
        'text-decoration': 'underline'
      },
      root: {
        'text-decoration': 'none'
      }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isTrue(result);
  });

  it('returns false if text-decoration is the same', () => {
    const elms = createTestFixture({
      target: {
        'text-decoration': 'underline'
      },
      root: {
        'text-decoration': 'underline'
      }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isFalse(result);
  });

  it('returns true if font-size is different', () => {
    const elms = createTestFixture({
      target: {
        'font-size': '14px'
      },
      root: {
        'font-size': '12px'
      }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isTrue(result);
  });

  it('returns true if font-family is different', () => {
    const elms = createTestFixture({
      target: {
        'font-family': 'Arial'
      },
      root: {
        'font-family': 'Arial-black'
      }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isTrue(result);
  });

  it('returns false if the first font-family is identical', () => {
    const elms = createTestFixture({
      target: {
        'font-family': 'Arial-black, Arial'
      },
      root: {
        'font-family': 'Arial-black, sans-serif'
      }
    });

    const result = elementIsDistinct(elms.target, elms.root);
    assert.isFalse(result);
  });

  describe('targetWrap element', () => {
    describe('background-image', () => {
      it('returns true if targetWrap adds background-image', () => {
        const elms = createTestFixture({
          targetWrap: {
            background: 'url(icon.png) no-repeat'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isTrue(result);
      });
    });

    describe('border', () => {
      it('returns true if targetWrap adds border', () => {
        const elms = createTestFixture({
          targetWrap: {
            'border-bottom': '1px solid'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isTrue(result);
      });

      it('returns false if targetWrap adds border with 0 width', () => {
        const elms = createTestFixture({
          targetWrap: {
            'border-top': '0 solid'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isFalse(result);
      });

      it('returns false if targetWrap adds border with 0 alpha', () => {
        const elms = createTestFixture({
          targetWrap: {
            'border-bottom': '2px solid rgba(255,255,255,0)'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isFalse(result);
      });
    });

    describe('outline', () => {
      it('returns true if targetWrap adds outline', () => {
        const elms = createTestFixture({
          targetWrap: {
            outline: '1px solid'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isTrue(result);
      });

      it('returns false if targetWrap adds outline with 0 width', () => {
        const elms = createTestFixture({
          targetWrap: {
            outline: '0 solid'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isFalse(result);
      });

      it('returns false if targetWrap adds outline with 0 alpha', () => {
        const elms = createTestFixture({
          targetWrap: {
            outline: '2px solid rgba(255,255,255,0)'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isFalse(result);
      });
    });

    describe('text-decoration-line', () => {
      it('returns true if targetWrap adds text-decoration-line', () => {
        const elms = createTestFixture({
          targetWrap: {
            'text-decoration': 'underline'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isTrue(result);
      });

      it('returns true if target has text-decoration:none and targetWrap adds', () => {
        const elms = createTestFixture({
          target: {
            'text-decoration': 'none'
          },
          targetWrap: {
            'text-decoration': 'underline'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isTrue(result);
      });

      it('returns false if targetWrap and root use same value', () => {
        const elms = createTestFixture({
          root: {
            'text-decoration': 'underline'
          },
          targetWrap: {
            'text-decoration': 'underline'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isFalse(result);
      });

      it('returns true if targetWrap and root use different value', () => {
        const elms = createTestFixture({
          root: {
            'text-decoration': 'underline'
          },
          targetWrap: {
            'text-decoration': 'overline'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isTrue(result);
      });
    });

    describe('text-decoration-style', () => {
      it('returns true if targetWrap adds text-decoration-style', () => {
        const elms = createTestFixture({
          targetWrap: {
            'text-decoration': 'underline solid'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isTrue(result);
      });

      it('returns true if target has text-decoration:none and targetWrap adds', () => {
        const elms = createTestFixture({
          target: {
            'text-decoration': 'none'
          },
          targetWrap: {
            'text-decoration': 'underline solid'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isTrue(result);
      });

      it('returns false if targetWrap and root use same value', () => {
        const elms = createTestFixture({
          root: {
            'text-decoration': 'underline solid'
          },
          targetWrap: {
            'text-decoration': 'underline solid'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isFalse(result);
      });

      it('returns true if targetWrap and root use different value', () => {
        const elms = createTestFixture({
          root: {
            'text-decoration': 'underline solid'
          },
          targetWrap: {
            'text-decoration': 'underline wavy'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isTrue(result);
      });
    });

    describe('text', () => {
      it('returns true if targetWrap adds border and has <= 3 characters before target', () => {
        const elms = createTestFixture({
          targetWrap: {
            'border-bottom': '1px solid'
          }
        });
        elms.targetWrap.innerHTML = `the ${elms.target.outerHTML}`;
        const target = elms.targetWrap.querySelector('a');

        const result = elementIsDistinct(target, elms.root);
        assert.isTrue(result);
      });

      it('returns true if targetWrap adds outline and has <= 3 characters after target', () => {
        const elms = createTestFixture({
          targetWrap: {
            outline: '1px solid'
          }
        });
        elms.targetWrap.innerHTML = `${elms.target.outerHTML} the`;
        const target = elms.targetWrap.querySelector('a');

        const result = elementIsDistinct(target, elms.root);
        assert.isTrue(result);
      });

      it('returns true if targetWrap adds text-decoration and has <= 3 characters before target', () => {
        const elms = createTestFixture({
          targetWrap: {
            'text-decoration': 'underline'
          }
        });
        elms.targetWrap.innerHTML = `the ${elms.target.outerHTML}`;
        const target = elms.targetWrap.querySelector('a');

        const result = elementIsDistinct(target, elms.root);
        assert.isTrue(result);
      });

      it('returns false if targetWrap adds border and has > 3 characters before target', () => {
        const elms = createTestFixture({
          targetWrap: {
            'border-bottom': '1px solid'
          }
        });
        elms.targetWrap.innerHTML = `World ${elms.target.outerHTML}`;
        const target = elms.targetWrap.querySelector('a');

        const result = elementIsDistinct(target, elms.root);
        assert.isFalse(result);
      });

      it('returns false if targetWrap adds outline and has <= 3 characters after target', () => {
        const elms = createTestFixture({
          targetWrap: {
            outline: '1px solid'
          }
        });
        elms.targetWrap.innerHTML = `${elms.target.outerHTML} World`;
        const target = elms.targetWrap.querySelector('a');

        const result = elementIsDistinct(target, elms.root);
        assert.isFalse(result);
      });

      it('returns false if targetWrap adds text-decoration and has > 3 characters after target', () => {
        const elms = createTestFixture({
          targetWrap: {
            'text-decoration': 'underline'
          }
        });
        elms.targetWrap.innerHTML = `${elms.target.outerHTML} World`;
        const target = elms.targetWrap.querySelector('a');

        const result = elementIsDistinct(target, elms.root);
        assert.isFalse(result);
      });

      it('ignores whitespace differences', () => {
        const elms = createTestFixture({
          targetWrap: {
            'text-decoration': 'underline'
          }
        });
        elms.targetWrap.innerHTML = `\t   \n${elms.target.outerHTML}`;
        const target = elms.targetWrap.querySelector('a');

        const result = elementIsDistinct(target, elms.root);
        assert.isTrue(result);
      });
    });

    describe('font', () => {
      it('returns true if targetWrap adds', () => {
        const elms = createTestFixture({
          targetWrap: {
            'font-weight': 'bold'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isTrue(result);
      });

      it('returns false if target has same font as root and targetWrap adds', () => {
        const elms = createTestFixture({
          target: {
            'font-weight': 'normal'
          },
          root: {
            'font-weight': 'normal'
          },
          targetWrap: {
            'font-weight': 'bold'
          }
        });

        const result = elementIsDistinct(elms.target, elms.root);
        assert.isFalse(result);
      });
    });
  });
});
