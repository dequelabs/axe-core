describe('color.elementIsDistinct', () => {
  let styleElm;
  let elementIsDistinct;

  const fixture = document.getElementById('fixture');

  before(() => {
    styleElm = document.createElement('style');
    document.head.appendChild(styleElm);
  });

  const defaultStyle = {
    color: '#000',
    textDecoration: 'none'
  };

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
    // Get a random id and build the style string
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
    return {
      link: document.getElementById(linkId),
      par: document.getElementById(parId)
    };
  }

  beforeEach(() => {
    createStyleString('p', defaultStyle);
    elementIsDistinct = axe.commons.color.elementIsDistinct;
  });

  afterEach(() => {
    fixture.innerHTML = '';
    styleElm.innerHTML = '';
  });

  after(() => {
    styleElm.parentNode.removeChild(styleElm);
  });

  it('returns false without style adjustments', () => {
    const elms = getLinkElm({});
    const result = elementIsDistinct(elms.link, elms.par);

    assert.isFalse(result);
  });

  it('returns true with background-image set', () => {
    const elms = getLinkElm({
      background: 'url(icon.png) no-repeat'
    });

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isTrue(result);
  });

  it('returns true with border: dashed 1px black', () => {
    const elms = getLinkElm({
      border: 'dashed 1px black'
    });

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isTrue(result);
  });

  it('returns true with border-bottom: dashed 1px black', () => {
    const elms = getLinkElm({
      borderBottom: 'dashed 1px black'
    });

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isTrue(result);
  });

  it('returns false with border: solid 0px black', () => {
    const elms = getLinkElm({
      border: 'solid 0px black'
    });

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isFalse(result);
  });

  it('returns false with border: none 1px black', () => {
    const elms = getLinkElm({
      border: 'none 1px black'
    });

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isFalse(result);
  });

  it('returns false with border: solid 1px transparent', () => {
    const elms = getLinkElm({
      border: 'solid 1px transparent'
    });

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isFalse(result);
  });

  it('returns true with outline: solid 1px black', () => {
    const elms = getLinkElm({
      outline: 'solid 1px black'
    });

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isTrue(result);
  });

  it('returns true if font-weight is different', () => {
    const elms = getLinkElm(
      {
        fontWeight: 'bold'
      },
      {
        fontWeight: 'normal'
      }
    );

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isTrue(result);
  });

  it('returns false if font-weight is the same', () => {
    const elms = getLinkElm(
      {
        fontWeight: 'bold'
      },
      {
        fontWeight: 'bold'
      }
    );

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isFalse(result);
  });

  it('compares font numbers and labels correctly', () => {
    const elms = getLinkElm(
      {
        fontWeight: 'bold'
      },
      {
        fontWeight: '700'
      }
    );

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isFalse(result);
  });

  it('returns true if text-decoration is different', () => {
    const elms = getLinkElm(
      {
        textDecoration: 'underline'
      },
      {
        textDecoration: 'none'
      }
    );

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isTrue(result);
  });

  it('returns false if text-decoration is the same', () => {
    const elms = getLinkElm(
      {
        textDecoration: 'underline'
      },
      {
        textDecoration: 'underline'
      }
    );

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isFalse(result);
  });

  it('returns true if font-size is different', () => {
    const elms = getLinkElm(
      {
        fontSize: '14px'
      },
      {
        fontSize: '12px'
      }
    );

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isTrue(result);
  });

  it('returns true if font-family is different', () => {
    const elms = getLinkElm(
      {
        fontFamily: 'Arial'
      },
      {
        fontFamily: 'Arial-black'
      }
    );

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isTrue(result);
  });

  it('returns false if the first font-family is identical', () => {
    const elms = getLinkElm(
      {
        fontFamily: 'Arial-black, Arial'
      },
      {
        fontFamily: 'Arial-black, sans-serif'
      }
    );

    const result = elementIsDistinct(elms.link, elms.par);
    assert.isFalse(result);
  });
});
