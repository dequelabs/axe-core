describe('link-in-text-block', () => {
  const fixture = document.getElementById('fixture');
  const shadowSupport = axe.testUtils.shadowSupport;
  let styleElm;

  const checkContext = axe.testUtils.MockCheckContext();

  before(() => {
    styleElm = document.createElement('style');
    document.head.appendChild(styleElm);
  });

  const defaultStyle = {
    color: '#000',
    textDecoration: 'none'
  };

  beforeEach(() => {
    createStyleString('p', defaultStyle);
  });

  afterEach(() => {
    fixture.innerHTML = '';
    styleElm.innerHTML = '';
    checkContext.reset();
  });

  after(() => {
    styleElm.parentNode.removeChild(styleElm);
  });

  function createStyleString(selector, outerStyle) {
    // Merge style with the default
    const styleObj = {};
    for (const prop in defaultStyle) {
      if (defaultStyle.hasOwnProperty(prop)) {
        styleObj[prop] = defaultStyle[prop];
      }
    }
    for (const prop in outerStyle) {
      if (outerStyle.hasOwnProperty(prop)) {
        styleObj[prop] = outerStyle[prop];
      }
    }

    const cssLines = Object.keys(styleObj)
      .map(prop => {
        // Make camelCase prop dash separated
        const cssPropName = prop
          .trim()
          .split(/(?=[A-Z])/g)
          .reduce((name, propPiece) => {
            if (!name) {
              return propPiece;
            } else {
              return name + '-' + propPiece.toLowerCase();
            }
          }, null);

        // Return indented line of style code
        return '  ' + cssPropName + ':' + styleObj[prop] + ';';
      })
      .join('\n');

    // Add to the style element
    styleElm.innerHTML += selector + ' {\n' + cssLines + '\n}\n';
  }

  function getLinkElm(linkStyle, paragraphStyle) {
    // Get a random id and build the style strings
    const linkId = 'linkid-' + Math.floor(Math.random() * 100000);
    const parId = 'parid-' + Math.floor(Math.random() * 100000);

    createStyleString('#' + linkId, linkStyle);
    createStyleString('#' + parId, paragraphStyle);

    fixture.innerHTML +=
      '<p id="' +
      parId +
      '"> Text ' +
      '<a href="/" id="' +
      linkId +
      '">link</a>' +
      '</p>';
    axe.testUtils.flatTreeSetup(fixture);
    return document.getElementById(linkId);
  }

  describe('link default state', () => {
    beforeEach(() => {
      createStyleString('a', {
        color: '#100' // insufficient contrast
      });
    });

    it('passes the selected node and closest ancestral block element', () => {
      fixture.innerHTML =
        '<div> <span style="display:block; color: #010" id="parent">' +
        '	<p style="display:inline"><a href="" id="link">' +
        '		 link text ' +
        '	</a> inside block </p> inside block' +
        '</span> outside block </div>';

      axe.testUtils.flatTreeSetup(fixture);
      const linkElm = document.getElementById('link');

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('link-in-text-block')
          .call(checkContext, linkElm)
      );
      assert.equal(checkContext._data.messageKey, 'fgContrast');
    });

    (shadowSupport.v1 ? it : xit)(
      'works with the block outside the shadow tree',
      () => {
        const parentElm = document.createElement('div');
        parentElm.setAttribute(
          'style',
          'color:#100; background-color:#FFFFFF;'
        );
        const shadow = parentElm.attachShadow({ mode: 'open' });
        shadow.innerHTML =
          '<a href="" style="color:#000; background-color:#FFFFFF; text-decoration:none;">Link</a>';
        const linkElm = shadow.querySelector('a');
        fixture.appendChild(parentElm);

        axe.testUtils.flatTreeSetup(fixture);

        assert.isFalse(
          axe.testUtils
            .getCheckEvaluate('link-in-text-block')
            .call(checkContext, linkElm)
        );
        assert.equal(checkContext._data.messageKey, 'fgContrast');
      }
    );

    (shadowSupport.v1 ? it : xit)(
      'works with the link inside the shadow tree slot',
      () => {
        const div = document.createElement('div');
        div.setAttribute('style', 'color:#100; background-color:#FFFFFF;');
        div.innerHTML =
          '<a href="" style="color:#000;background-color:#FFFFFF;">Link</a>';
        const shadow = div.attachShadow({ mode: 'open' });
        shadow.innerHTML = '<p><slot></slot></p>';
        fixture.appendChild(div);

        axe.testUtils.flatTreeSetup(fixture);
        const linkElm = div.querySelector('a');

        assert.isFalse(
          axe.testUtils
            .getCheckEvaluate('link-in-text-block')
            .call(checkContext, linkElm)
        );
        assert.equal(checkContext._data.messageKey, 'fgContrast');
      }
    );
  });

  describe('links distinguished through color', () => {
    beforeEach(() => {
      createStyleString('a:active, a:focus', {
        textDecoration: 'underline'
      });
    });

    it('returns undefined if the background contrast can not be determined', () => {
      const linkElm = getLinkElm(
        {},
        {
          color: '#000010',
          backgroundImage:
            'url(data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7)'
        },
        {
          color: '#000000'
        }
      );
      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('link-in-text-block')
          .call(checkContext, linkElm)
      );
      assert.equal(checkContext._data.messageKey, 'bgImage');
      assert.equal(checkContext._relatedNodes[0], linkElm.parentNode);
    });

    it('returns false with fgContrast key if nodes have insufficient foreground contrast and same background color', () => {
      const linkElm = getLinkElm(
        {
          color: 'black'
        },
        {
          color: '#100'
        }
      );
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('link-in-text-block')
          .call(checkContext, linkElm)
      );
      assert.equal(checkContext._data.messageKey, 'fgContrast');
    });

    it('returns false with fgContrast key if nodes have insufficient foreground contrast and insufficient background color', () => {
      const linkElm = getLinkElm(
        {
          color: 'black',
          backgroundColor: 'white'
        },
        {
          color: '#100',
          backgroundColor: '#F0F0F0'
        }
      );
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('link-in-text-block')
          .call(checkContext, linkElm)
      );
      assert.equal(checkContext._data.messageKey, 'fgContrast');
    });

    it('returns false with bgContrast key if nodes have same foreground color and insufficient background contrast', () => {
      const linkElm = getLinkElm(
        {
          color: 'black',
          backgroundColor: 'white'
        },
        {
          color: 'black',
          backgroundColor: '#F0F0F0'
        }
      );
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('link-in-text-block')
          .call(checkContext, linkElm)
      );
      assert.equal(checkContext._data.messageKey, 'bgContrast');
      assert.equal(checkContext._relatedNodes[0], linkElm.parentNode);
    });

    it('returns true if nodes have sufficient foreground contrast and insufficient background contrast', () => {
      const linkElm = getLinkElm(
        {
          color: 'black',
          backgroundColor: 'white'
        },
        {
          color: '#606060',
          backgroundColor: '#F0F0F0'
        }
      );
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('link-in-text-block')
          .call(checkContext, linkElm)
      );
      assert.equal(checkContext._relatedNodes[0], linkElm.parentNode);
    });

    it('returns true if nodes have insufficient foreground contrast and sufficient background contrast', () => {
      const linkElm = getLinkElm(
        {
          color: 'black',
          backgroundColor: 'white'
        },
        {
          color: '#100',
          backgroundColor: '#808080'
        }
      );
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('link-in-text-block')
          .call(checkContext, linkElm)
      );
      assert.equal(checkContext._relatedNodes[0], linkElm.parentNode);
    });

    it('should return the proper values stored in data (fgContrast)', () => {
      fixture.innerHTML =
        '<div> <span style="display:block; color: #100" id="parent">' +
        ' <p style="display:inline"><a href="" id="link" style="color: #00e">' +
        '    link text ' +
        ' </a> inside block </p> inside block' +
        '</span> outside block </div>';

      axe.testUtils.flatTreeSetup(fixture);
      const linkElm = document.getElementById('link');

      axe.testUtils
        .getCheckEvaluate('link-in-text-block')
        .call(checkContext, linkElm);

      assert.deepEqual(checkContext._data, {
        messageKey: 'fgContrast',
        contrastRatio: 2.18,
        requiredContrastRatio: 3,
        nodeColor: '#0000ee',
        parentColor: '#110000'
      });
    });

    it('should return the proper values stored in data (bgContrast)', () => {
      const linkElm = getLinkElm(
        {
          color: 'black',
          backgroundColor: 'white'
        },
        {
          color: 'black',
          backgroundColor: '#F0F0F0'
        }
      );
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('link-in-text-block')
          .call(checkContext, linkElm)
      );

      assert.deepEqual(checkContext._data, {
        messageKey: 'bgContrast',
        contrastRatio: 1.13,
        requiredContrastRatio: 3,
        nodeBackgroundColor: '#ffffff',
        parentBackgroundColor: '#f0f0f0'
      });
    });

    describe('options.allowSameColor', () => {
      it('when true, passes when link and text colors are identical', () => {
        const linkElm = getLinkElm(
          {
            color: 'black'
          },
          {
            color: '#000'
          }
        );
        assert.isTrue(
          axe.testUtils
            .getCheckEvaluate('link-in-text-block')
            .call(checkContext, linkElm, { allowSameColor: true })
        );
        assert.equal(checkContext._relatedNodes[0], linkElm.parentNode);
      });

      it('when false, fails when link and text colors are identical', () => {
        const linkElm = getLinkElm(
          {
            color: 'black'
          },
          {
            color: '#000'
          }
        );
        assert.isFalse(
          axe.testUtils
            .getCheckEvaluate('link-in-text-block')
            .call(checkContext, linkElm, { allowSameColor: false })
        );
        assert.equal(checkContext._data.messageKey, 'fgContrast');
        assert.equal(checkContext._relatedNodes[0], linkElm.parentNode);
      });
    });
  });
});
