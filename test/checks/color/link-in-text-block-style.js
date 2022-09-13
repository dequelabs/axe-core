describe('link-in-text-block-style', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var shadowSupport = axe.testUtils.shadowSupport;
  var styleElm;

  var checkContext = axe.testUtils.MockCheckContext();

  before(function () {
    styleElm = document.createElement('style');
    document.head.appendChild(styleElm);
  });

  var defaultStyle = {
    color: 'black',
    textDecoration: 'none'
  };

  beforeEach(function () {
    createStyleString('p', defaultStyle);
  });

  afterEach(function () {
    fixture.innerHTML = '';
    styleElm.innerHTML = '';
    checkContext.reset();
  });

  after(function () {
    styleElm.parentNode.removeChild(styleElm);
  });

  function createStyleString(selector, outerStyle) {
    // Merge style with the default
    var prop;
    var styleObj = {};
    for (prop in defaultStyle) {
      if (defaultStyle.hasOwnProperty(prop)) {
        styleObj[prop] = defaultStyle[prop];
      }
    }
    for (prop in outerStyle) {
      if (outerStyle.hasOwnProperty(prop)) {
        styleObj[prop] = outerStyle[prop];
      }
    }

    var cssLines = Object.keys(styleObj)
      .map(function (prop) {
        // Make camelCase prop dash separated
        var cssPropName = prop
          .trim()
          .split(/(?=[A-Z])/g)
          .reduce(function (prop, propPiece) {
            if (!prop) {
              return propPiece;
            } else {
              return prop + '-' + propPiece.toLowerCase();
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
    var linkId = 'linkid-' + Math.floor(Math.random() * 100000);
    var parId = 'parid-' + Math.floor(Math.random() * 100000);

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

  describe('link default state', function () {
    beforeEach(function () {
      createStyleString('a', {
        textDecoration: 'none'
      });
    });

    it('passes the selected node and closest ancestral block element', function () {
      fixture.innerHTML =
        '<div> <span style="display:block; id="parent">' +
        '	<p style="display:inline"><a href="" id="link">' +
        '		 link text ' +
        '	</a> inside block </p> inside block' +
        '</span> outside block </div>';

      axe.testUtils.flatTreeSetup(fixture);
      var linkElm = document.getElementById('link');

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('link-in-text-block-style')
          .call(checkContext, linkElm)
      );
    });

    (shadowSupport.v1 ? it : xit)(
      'works with the block outside the shadow tree',
      function () {
        var parentElm = document.createElement('div');
        var shadow = parentElm.attachShadow({ mode: 'open' });
        shadow.innerHTML =
          '<a href="" style="text-decoration:underline;">Link</a>';
        var linkElm = shadow.querySelector('a');
        fixture.appendChild(parentElm);

        axe.testUtils.flatTreeSetup(fixture);

        assert.isTrue(
          axe.testUtils
            .getCheckEvaluate('link-in-text-block-style')
            .call(checkContext, linkElm)
        );
      }
    );

    (shadowSupport.v1 ? it : xit)(
      'works with the link inside the shadow tree slot',
      function () {
        var div = document.createElement('div');
        div.setAttribute('style', 'text-decoration:none;');
        div.innerHTML =
          '<a href="" style="text-decoration:underline;">Link</a>';
        var shadow = div.attachShadow({ mode: 'open' });
        shadow.innerHTML = '<p><slot></slot></p>';
        fixture.appendChild(div);

        axe.testUtils.flatTreeSetup(fixture);
        var linkElm = div.querySelector('a');

        assert.isTrue(
          axe.testUtils
            .getCheckEvaluate('link-in-text-block-style')
            .call(checkContext, linkElm)
        );
      }
    );
  });

  describe('links distinguished through style', function () {
    it('returns false if link style matches parent', function () {
      var linkElm = getLinkElm({});
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('link-in-text-block-style')
          .call(checkContext, linkElm)
      );
      assert.equal(checkContext._relatedNodes[0], linkElm.parentNode);
    });

    it('returns true if link has underline', function () {
      var linkElm = getLinkElm({
        textDecoration: 'underline'
      });
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('link-in-text-block-style')
          .call(checkContext, linkElm)
      );
      assert.equal(checkContext._relatedNodes[0], linkElm.parentNode);
    });
  });
});
