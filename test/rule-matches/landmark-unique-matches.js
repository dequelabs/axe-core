describe('landmark-unique-matches', function () {
  'use strict';
  let rule;
  let fixture;
  let axeFixtureSetup;
  const shadowSupport = axe.testUtils.shadowSupport.v1;
  const excludedDescendantsForHeadersFooters = [
    'article',
    'aside',
    'main',
    'nav',
    'section'
  ];
  const headerFooterElements = ['header', 'footer'];

  beforeEach(function () {
    fixture = document.getElementById('fixture');
    axeFixtureSetup = axe.testUtils.fixtureSetup;
    rule = axe.utils.getRule('landmark-unique');
  });

  it('should not match because not a landmark', function () {
    axeFixtureSetup('<h1>some heading</h1>');
    const node = fixture.querySelector('h1');
    const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isFalse(rule.matches(node, virtualNode));
  });

  it('should pass because is a landmark', function () {
    axeFixtureSetup('<div role="banner">some banner</div>');
    const node = fixture.querySelector('div');
    fixture.appendChild(node);
    const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isTrue(rule.matches(node, virtualNode));
  });

  it('should not match because landmark is hidden', function () {
    axeFixtureSetup('<div role="banner">some banner</div>');
    const node = fixture.querySelector('div');
    node.style.display = 'none';
    fixture.appendChild(node);
    const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isFalse(rule.matches(node, virtualNode));
  });

  describe('form and section elements must have accessible names to be matched', function () {
    const sectionFormElements = ['section', 'form'];

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
          const node = fixture.querySelector(elementType);
          const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
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
          const node = fixture.querySelector(elementType);
          const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
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
            const node = fixture.querySelector(elementType);
            const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
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
          const node = fixture.querySelector(elementType);
          const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
          assert.isTrue(rule.matches(node, virtualNode));
        }
      );
    });
  });

  if (shadowSupport) {
    it('return true for landmarks contained within shadow dom', function () {
      const container = document.createElement('div');
      const shadow = container.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<footer></footer>';

      axeFixtureSetup(container);
      const vNode = axe.utils.querySelectorAll(axe._tree[0], 'footer')[0];
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
              const virtualNode = axe.utils.querySelectorAll(
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
            const virtualNode = axe.utils.querySelectorAll(
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
