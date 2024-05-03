describe('landmark-unique-matches', function () {
  'use strict';
  let rule;
  let fixture;
  let axeFixtureSetup;
  let shadowSupport = axe.testUtils.shadowSupport.v1;
  let excludedDescendantsForHeadersFooters = [
    'article',
    'aside',
    'main',
    'nav',
    'section'
  ];
  let headerFooterElements = ['header', 'footer'];

  beforeEach(function () {
    fixture = document.getElementById('fixture');
    axeFixtureSetup = axe.testUtils.fixtureSetup;
    rule = axe.utils.getRule('landmark-unique');
  });

  it('should not match because not a landmark', function () {
    axeFixtureSetup('<h1>some heading</h1>');
    let node = fixture.querySelector('h1');
    let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isFalse(rule.matches(node, virtualNode));
  });

  it('should pass because is a landmark', function () {
    axeFixtureSetup('<div role="banner">some banner</div>');
    let node = fixture.querySelector('div');
    fixture.appendChild(node);
    let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isTrue(rule.matches(node, virtualNode));
  });

  it('should not match because landmark is hidden', function () {
    axeFixtureSetup('<div role="banner">some banner</div>');
    let node = fixture.querySelector('div');
    node.style.display = 'none';
    fixture.appendChild(node);
    let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isFalse(rule.matches(node, virtualNode));
  });

  describe('form and section elements must have accessible names to be matched', function () {
    let sectionFormElements = ['section', 'form'];

    sectionFormElements.forEach(function (elementType) {
      it(
        'should match because it is a ' + elementType + ' with a label',
        function () {
          axeFixtureSetup(
            '<' +
              elementType +
              ' aria-label="sample label">some ' +
              elementType +
              '</' +
              elementType +
              '>'
          );
          let node = fixture.querySelector(elementType);
          let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
          assert.isTrue(rule.matches(node, virtualNode));
        }
      );

      it(
        'should not match because it is a ' + elementType + ' without a label',
        function () {
          axeFixtureSetup(
            '<' +
              elementType +
              '>some ' +
              elementType +
              '</' +
              elementType +
              '>'
          );
          let node = fixture.querySelector(elementType);
          let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
          assert.isFalse(rule.matches(node, virtualNode));
        }
      );
    });
  });

  describe('header/footers should only match when not inside the excluded descendants', function () {
    headerFooterElements.forEach(function (elementType) {
      excludedDescendantsForHeadersFooters.forEach(function (exclusionType) {
        it(
          'should not match because ' +
            elementType +
            ' is contained inside an ' +
            exclusionType,
          function () {
            axeFixtureSetup(
              '<' +
                exclusionType +
                ' aria-label="sample label"><' +
                elementType +
                '>an element</' +
                elementType +
                '></' +
                exclusionType +
                '>'
            );
            let node = fixture.querySelector(elementType);
            let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
            assert.isFalse(rule.matches(node, virtualNode));
          }
        );
      });

      it(
        'should match because ' +
          elementType +
          ' is not contained inside the excluded descendants',
        function () {
          axeFixtureSetup(
            '<' + elementType + '>an element</' + elementType + '>'
          );
          let node = fixture.querySelector(elementType);
          let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
          assert.isTrue(rule.matches(node, virtualNode));
        }
      );
    });
  });

  if (shadowSupport) {
    it('return true for landmarks contained within shadow dom', function () {
      let container = document.createElement('div');
      let shadow = container.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<footer></footer>';

      axeFixtureSetup(container);
      let vNode = axe.utils.querySelectorAll(axe._tree[0], 'footer')[0];
      assert.isTrue(rule.matches(vNode.actualNode, vNode));
    });

    describe('header/footers should only match when not inside the excluded descendants within shadow dom', function () {
      let container;
      let shadow;

      beforeEach(function () {
        container = document.createElement('div');
        shadow = container.attachShadow({ mode: 'open' });
      });

      headerFooterElements.forEach(function (elementType) {
        excludedDescendantsForHeadersFooters.forEach(function (exclusionType) {
          it(
            'should not match because ' +
              elementType +
              ' is contained inside an ' +
              exclusionType +
              '',
            function () {
              shadow.innerHTML =
                '<' +
                exclusionType +
                ' aria-label="sample label"><' +
                elementType +
                '>an element</' +
                elementType +
                '></' +
                exclusionType +
                '>';

              axeFixtureSetup(container);
              let virtualNode = axe.utils.querySelectorAll(
                axe._tree[0],
                elementType
              )[0];
              assert.isFalse(rule.matches(virtualNode.actualNode, virtualNode));
            }
          );
        });

        it(
          'should match because ' +
            elementType +
            ' is not contained inside the excluded descendants',
          function () {
            shadow.innerHTML =
              '<' + elementType + '>an element</' + elementType + '>';
            axeFixtureSetup(container);
            let virtualNode = axe.utils.querySelectorAll(
              axe._tree[0],
              elementType
            )[0];
            assert.isTrue(rule.matches(virtualNode.actualNode, virtualNode));
          }
        );
      });
    });
  }
});
