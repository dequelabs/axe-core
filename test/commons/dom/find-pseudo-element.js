describe('dom.findPseudoElement', function () {
  var queryFixture = axe.testUtils.queryFixture;
  var findPseudoElement = axe.commons.dom.findPseudoElement;

  var pseudoElms = ['::before', '::after'];
  for (var i = 0; i < pseudoElms.length; i++) {
    var pseudoElm = pseudoElms[i];
    describe(pseudoElm, function () {
      it('should return the element with a pseudo element (background color)', function () {
        var vNode = queryFixture(
          '<style>#target' +
            pseudoElm +
            '{ content: ""; width: 100%; height: 100px; background: red; position: absolute; }</style>' +
            '<div id="target" style="height: 100px;"></div>'
        );
        var actual = findPseudoElement(vNode);
        assert.equal(vNode, actual);
      });

      it('should return the element with a pseudo element (background image)', function () {
        var vNode = queryFixture(
          '<style>#target' +
            pseudoElm +
            '{ content: ""; width: 100%; height: 100px; background-image: url(foo.png); position: absolute; }</style>' +
            '<div id="target" style="height: 100px;"></div>'
        );
        var actual = findPseudoElement(vNode);
        assert.equal(vNode, actual);
      });

      it('should return a parent element with a pseudo element', function () {
        var vNode = queryFixture(
          '<style>.parent' +
            pseudoElm +
            '{ content: ""; width: 100%; height: 100px; background: red; position: absolute; }</style><div class="parent"><div><div id="target" style="height: 100px;"></div></div></div>'
        );
        var target = axe.utils.querySelectorAll(axe._tree, '.parent')[0];
        var actual = findPseudoElement(vNode);
        assert.equal(target, actual);
      });

      it('should return undefined if pseudo element has no content', function () {
        var vNode = queryFixture(
          '<style>#target' +
            pseudoElm +
            '{ width: 100%; height: 100px; background: red; position: absolute; }</style><div id="target" style="height: 100px;"></div>'
        );
        var actual = findPseudoElement(vNode);
        assert.isUndefined(actual);
      });

      it('should return undefined if pseudo element is hidden (display: none)', function () {
        var vNode = queryFixture(
          '<style>#target' +
            pseudoElm +
            '{ content: ""; width: 100%; height: 100px; background: red; position: absolute; display: none; }</style><div id="target" style="height: 100px;"></div>'
        );
        var actual = findPseudoElement(vNode);
        assert.isUndefined(actual);
      });

      it('should return undefined if pseudo element is hidden (visibility: hidden)', function () {
        var vNode = queryFixture(
          '<style>#target' +
            pseudoElm +
            '{ content: ""; width: 100%; height: 100px; background: red; position: absolute; visibility: hidden; }</style><div id="target" style="height: 100px;"></div>'
        );
        var actual = findPseudoElement(vNode);
        assert.isUndefined(actual);
      });

      it('should return undefined if pseudo element is hidden (position not absolute)', function () {
        var vNode = queryFixture(
          '<style>#target' +
            pseudoElm +
            '{ content: ""; width: 100%; height: 100px; background: red; position: relative; }</style><div id="target" style="height: 100px;"></div>'
        );
        var actual = findPseudoElement(vNode);
        assert.isUndefined(actual);
      });

      it('should return undefined if pseudo element does not have a background', function () {
        var vNode = queryFixture(
          '<style>#target' +
            pseudoElm +
            '{ content: ""; width: 100%; height: 100px; position: absolute; }</style><div id="target" style="height: 100px;"></div>'
        );
        var actual = findPseudoElement(vNode);
        assert.isUndefined(actual);
      });

      it('should return undefined if pseudo element has a transparent background', function () {
        var vNode = queryFixture(
          '<style>#target' +
            pseudoElm +
            '{ content: ""; width: 100%; height: 100px; position: absolute; background: rgba(0,0,0,0); }</style><div id="target" style="height: 100px;"></div>'
        );
        var actual = findPseudoElement(vNode);
        assert.isUndefined(actual);
      });

      it('should return undefined if pseudo element is too small', function () {
        var vNode = queryFixture(
          '<style>#target' +
            pseudoElm +
            '{ content: ""; width: 1px; height: 1px; position: absolute; background: red; }</style><div id="target" style="height: 100px;"></div>'
        );
        var actual = findPseudoElement(vNode);
        assert.isUndefined(actual);
      });

      it('should return undefined if pseudo size is equal to "pseudoSizeThreshold"', function () {
        var vNode = queryFixture(
          '<style>#target' +
            pseudoElm +
            '{ content: ""; width: 50px; height: 50px; background: red; position: absolute; }</style>' +
            '<div id="target" style="width: 100px; height: 100px;"></div>'
        );
        var actual = findPseudoElement(vNode);
        assert.isUndefined(actual);
      });

      it('should return the element if pseudo size is greater than "pseudoSizeThreshold"', function () {
        var vNode = queryFixture(
          '<style>#target' +
            pseudoElm +
            '{ content: ""; width: 50px; height: 51px; background: red; position: absolute; }</style>' +
            '<div id="target" style="width: 100px; height: 100px;"></div>'
        );
        var actual = findPseudoElement(vNode);
        assert.equal(vNode, actual);
      });

      describe('options', function () {
        it('should return undefined if passed "ignorePseudo: true"', function () {
          var vNode = queryFixture(
            '<style>#target' +
              pseudoElm +
              '{ content: ""; width: 100%; height: 100px; background: red; position: absolute; }</style>' +
              '<div id="target" style="height: 100px;"></div>'
          );
          var actual = findPseudoElement(vNode, { ignorePseudo: true });
          assert.isUndefined(actual);
        });

        it('should return the element for "pseudoSizeThreshold"', function () {
          var vNode = queryFixture(
            '<style>#target' +
              pseudoElm +
              '{ content: ""; width: 25px; height: 25px; background: red; position: absolute; }</style>' +
              '<div id="target" style="width: 100px; height: 100px;"></div>'
          );
          var actual = findPseudoElement(vNode, { pseudoSizeThreshold: 0.05 });
          assert.equal(vNode, actual);
        });

        it('should return undefined for parent with pseudo if passed "recurse: false"', function () {
          var vNode = queryFixture(
            '<style>.parent' +
              pseudoElm +
              '{ content: ""; width: 100%; height: 100px; background: red; position: absolute; }</style><div class="parent"><div><div id="target" style="height: 100px;"></div></div></div>'
          );
          var actual = findPseudoElement(vNode, { recurse: false });
          assert.isUndefined(actual);
        });
      });
    });
  }
});
