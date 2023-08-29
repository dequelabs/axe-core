describe('link-in-text-block-style', () => {
  const fixture = document.getElementById('fixture');
  const shadowSupport = axe.testUtils.shadowSupport;
  let styleElm;

  const checkContext = axe.testUtils.MockCheckContext();

  const { queryFixture } = axe.testUtils;
  const linkInBlockStyleCheck = axe.testUtils.getCheckEvaluate(
    'link-in-text-block-style'
  );

  before(() => {
    styleElm = document.createElement('style');
    document.head.appendChild(styleElm);
  });

  const defaultStyle = {
    color: 'black',
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

  function getLinkElm(linkStyle) {
    // Get a random id and build the style strings
    const linkId = 'linkid-' + Math.floor(Math.random() * 100000);
    const parId = 'parid-' + Math.floor(Math.random() * 100000);

    createStyleString('#' + linkId, linkStyle);
    createStyleString('#' + parId, {});

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
        textDecoration: 'none'
      });
    });

    it('passes the selected node and closest ancestral block element', () => {
      fixture.innerHTML =
        '<div> <span style="display:block; id="parent">' +
        '	<p style="display:inline"><a href="" id="link">' +
        '		 link text ' +
        '	</a> inside block </p> inside block' +
        '</span> outside block </div>';

      axe.testUtils.flatTreeSetup(fixture);
      const linkElm = document.getElementById('link');

      assert.isFalse(linkInBlockStyleCheck.call(checkContext, linkElm));
    });

    (shadowSupport.v1 ? it : xit)(
      'works with the block outside the shadow tree',
      () => {
        const parentElm = document.createElement('div');
        const shadow = parentElm.attachShadow({ mode: 'open' });
        shadow.innerHTML =
          '<a href="" style="text-decoration:underline;">Link</a>';
        const linkElm = shadow.querySelector('a');
        fixture.appendChild(parentElm);

        axe.testUtils.flatTreeSetup(fixture);

        assert.isTrue(linkInBlockStyleCheck.call(checkContext, linkElm));
      }
    );

    (shadowSupport.v1 ? it : xit)(
      'works with the link inside the shadow tree slot',
      () => {
        const div = document.createElement('div');
        div.setAttribute('style', 'text-decoration:none;');
        div.innerHTML =
          '<a href="" style="text-decoration:underline;">Link</a>';
        const shadow = div.attachShadow({ mode: 'open' });
        shadow.innerHTML = '<p><slot></slot></p>';
        fixture.appendChild(div);

        axe.testUtils.flatTreeSetup(fixture);
        const linkElm = div.querySelector('a');

        assert.isTrue(linkInBlockStyleCheck.call(checkContext, linkElm));
      }
    );
  });

  describe('links distinguished through style', () => {
    it('returns false if link style matches parent', () => {
      const linkElm = getLinkElm({});
      assert.isFalse(linkInBlockStyleCheck.call(checkContext, linkElm));
      assert.equal(checkContext._relatedNodes[0], linkElm.parentNode);
      assert.isNull(checkContext._data);
    });

    it('returns true if link has underline', () => {
      const linkElm = getLinkElm({
        textDecoration: 'underline'
      });
      assert.isTrue(linkInBlockStyleCheck.call(checkContext, linkElm));
      assert.equal(checkContext._relatedNodes[0], linkElm.parentNode);
      assert.isNull(checkContext._data);
    });

    it('returns undefined when the link has a :before pseudo element', () => {
      const link = queryFixture(`
        <style>
          a:before { content: '🔗'; }
          a { text-decoration: none; }
        </style>
        <p>A <a href="#" id="target">link</a> inside a block of text</p>
      `).actualNode;
      const result = linkInBlockStyleCheck.call(checkContext, link);
      assert.isUndefined(result);
      assert.deepEqual(checkContext._data, { messageKey: 'pseudoContent' });
      assert.equal(checkContext._relatedNodes[0], link.parentNode);
    });

    it('returns undefined when the link has a :after pseudo element', () => {
      const link = queryFixture(`
        <style>
          a:after { content: ""; }
          a { text-decoration: none; }
        </style>
        <p>A <a href="#" id="target">link</a> inside a block of text</p>
      `).actualNode;
      const result = linkInBlockStyleCheck.call(checkContext, link);
      assert.isUndefined(result);
      assert.deepEqual(checkContext._data, { messageKey: 'pseudoContent' });
      assert.equal(checkContext._relatedNodes[0], link.parentNode);
    });

    it('does not return undefined when the pseudo element content is none', () => {
      const link = queryFixture(`
        <style>
          a:after { content: none; position: absolute; }
          a { text-decoration: none; }
        </style>
        <p>A <a href="#" id="target">link</a> inside a block of text</p>
      `).actualNode;
      const result = linkInBlockStyleCheck.call(checkContext, link);
      assert.isFalse(result);
    });
  });
});
