function setShadowId(vNode, shadowId) {
  vNode.shadowId = shadowId;
  for (var i = 0; i < vNode.children.length; i++) {
    setShadowId(vNode.children[i], shadowId);
  }
}

function getTestDom() {
  'use strict';
  var html = document.createElement('html');
  html.innerHTML =
    '' +
    '<body>' +
    '<div class="first" data-a11yhero="faulkner">' +
    '<ul>' +
    '<li class="breaking"></li>' +
    '<li class="breaking"></li>' +
    '</ul>' +
    '</div>' +
    '<div id="one"></div>' +
    '<div class="second third">' +
    '<ul>' +
    '<li role="tab" id="one"></li>' +
    '<li role="button" id="one"></li>' +
    '</ul>' +
    '</div>' +
    '<span class="fourth">' +
    '<span>' +
    '<span>' +
    '<span></span>' +
    '<span></span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</body>';

  // remove the head node
  var head = html.querySelector('head');
  if (head) {
    head.parentNode.removeChild(head);
  }

  var tree = axe.utils.getFlattenedTree(html);

  // setup shadowIds for testing
  var first = axe.utils.getNodeFromTree(html.querySelector('.first'));
  var second = axe.utils.getNodeFromTree(html.querySelector('.second'));
  setShadowId(first, 'a');
  setShadowId(second, 'b');
  axe.utils.getNodeFromTree(html.querySelector('[role="button"]')).shadowId =
    'c';

  return tree;
}

describe('axe.utils.querySelectorAllFilter', function () {
  'use strict';
  var dom;
  afterEach(function () {});

  var tests = ['without cache', 'with cache'];
  for (var i = 0; i < tests.length; i++) {
    var describeName = tests[i];
    describe(describeName, function () {
      afterEach(function () {});

      if (describeName === 'without cache') {
        beforeEach(function () {
          dom = getTestDom();

          // prove we're using the DOM by deleting the cache
          delete dom[0]._selectorCache;
        });

        it('should not have a primed cache', function () {
          assert.isUndefined(dom[0]._selectorCache);
        });
      } else {
        beforeEach(function () {
          dom = getTestDom();

          // prove we're using the cache by deleting all the children
          dom[0].children = [];
        });

        it('should not use the cache if not using the top-level node', function () {
          var nodes = axe.utils.querySelectorAllFilter(dom, 'ul');

          // this would return 4 nodes if we were still using the
          // top-level cache
          var result = axe.utils.querySelectorAllFilter(nodes[0], 'li');
          assert.equal(result.length, 2);
        });
      }

      it('should find nodes using just the tag', function () {
        var result = axe.utils.querySelectorAllFilter(dom, 'li');
        assert.equal(result.length, 4);
      });
      it('should find nodes using parent selector', function () {
        var result = axe.utils.querySelectorAllFilter(dom, 'ul > li');
        assert.equal(result.length, 4);
      });
      it('should NOT find nodes using parent selector', function () {
        var result = axe.utils.querySelectorAllFilter(dom, 'div > li');
        assert.equal(result.length, 0);
      });
      it('should find nodes using nested parent selectors', function () {
        var result = axe.utils.querySelectorAllFilter(
          dom,
          'span > span > span > span'
        );
        assert.equal(result.length, 2);
      });
      it('should find nodes using hierarchical selector', function () {
        var result = axe.utils.querySelectorAllFilter(dom, 'div li');
        assert.equal(result.length, 4);
      });
      it('should find nodes using class selector', function () {
        var result = axe.utils.querySelectorAllFilter(dom, '.breaking');
        assert.equal(result.length, 2);
      });
      it('should find nodes using hierarchical class selector', function () {
        var result = axe.utils.querySelectorAllFilter(dom, '.first .breaking');
        assert.equal(result.length, 2);
      });
      it('should NOT find nodes using hierarchical class selector', function () {
        var result = axe.utils.querySelectorAllFilter(dom, '.second .breaking');
        assert.equal(result.length, 0);
      });
      it('should find nodes using multiple class selector', function () {
        var result = axe.utils.querySelectorAllFilter(dom, '.second.third');
        assert.equal(result.length, 1);
      });
      it('should find nodes using id', function () {
        var result = axe.utils.querySelectorAllFilter(dom, '#one');
        assert.equal(result.length, 1);
      });

      // can only select shadow dom nodes when we're not using the
      // top-level node. but since the top-level node is the one
      // with the cache, this only works when we are testing the full
      // tree (i.e. without cache)
      if (describeName === 'without cache') {
        it('should find nodes using id, but not in shadow DOM', function () {
          var result = axe.utils.querySelectorAllFilter(
            dom[0].children[0],
            '#one'
          );
          assert.equal(result.length, 1);
        });
        it('should find nodes using id, within a shadow DOM', function () {
          var result = axe.utils.querySelectorAllFilter(
            dom[0].children[0].children[2],
            '#one'
          );
          assert.equal(result.length, 1);
        });
      }

      it('should find nodes using attribute', function () {
        var result = axe.utils.querySelectorAllFilter(dom, '[role]');
        assert.equal(result.length, 2);
      });
      it('should find nodes using attribute with value', function () {
        var result = axe.utils.querySelectorAllFilter(dom, '[role=tab]');
        assert.equal(result.length, 1);
      });
      it('should find nodes using attribute with value', function () {
        var result = axe.utils.querySelectorAllFilter(dom, '[role="button"]');
        assert.equal(result.length, 1);
      });
      it('should find nodes using parent attribute with value', function () {
        var result = axe.utils.querySelectorAllFilter(
          dom,
          '[data-a11yhero="faulkner"] > ul'
        );
        assert.equal(result.length, 1);
      });
      it('should find nodes using hierarchical attribute with value', function () {
        var result = axe.utils.querySelectorAllFilter(
          dom,
          '[data-a11yhero="faulkner"] li'
        );
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with class', function () {
        var result = axe.utils.querySelectorAllFilter(dom, 'div:not(.first)');
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with matching id', function () {
        var result = axe.utils.querySelectorAllFilter(dom, 'div:not(#one)');
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with matching attribute selector', function () {
        var result = axe.utils.querySelectorAllFilter(
          dom,
          'div:not([data-a11yhero])'
        );
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with matching attribute selector with value', function () {
        var result = axe.utils.querySelectorAllFilter(
          dom,
          'div:not([data-a11yhero=faulkner])'
        );
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with bogus attribute selector with value', function () {
        var result = axe.utils.querySelectorAllFilter(
          dom,
          'div:not([data-a11yhero=wilco])'
        );
        assert.equal(result.length, 3);
      });
      it('should find nodes using :not selector with bogus id', function () {
        var result = axe.utils.querySelectorAllFilter(dom, 'div:not(#thangy)');
        assert.equal(result.length, 3);
      });
      it('should find nodes using :not selector with attribute', function () {
        var result = axe.utils.querySelectorAllFilter(dom, 'div:not([id])');
        assert.equal(result.length, 2);
      });
      it('should find nodes hierarchically using :not selector', function () {
        var result = axe.utils.querySelectorAllFilter(
          dom,
          'div:not(.first) li'
        );
        assert.equal(result.length, 2);
      });
      it('should find same nodes hierarchically using more :not selector', function () {
        var result = axe.utils.querySelectorAllFilter(
          dom,
          'div:not(.first) li:not(.breaking)'
        );
        assert.equal(result.length, 2);
      });
      it('should NOT find nodes hierarchically using :not selector', function () {
        var result = axe.utils.querySelectorAllFilter(
          dom,
          'div:not(.second) li:not(.breaking)'
        );
        assert.equal(result.length, 0);
      });
      it('should find nodes using ^= attribute selector', function () {
        var result = axe.utils.querySelectorAllFilter(dom, '[class^="sec"]');
        assert.equal(result.length, 1);
      });
      it('should find nodes using $= attribute selector', function () {
        var result = axe.utils.querySelectorAllFilter(dom, '[id$="ne"]');
        assert.equal(result.length, 3);
      });
      it('should find nodes using *= attribute selector', function () {
        var result = axe.utils.querySelectorAllFilter(dom, '[role*="t"]');
        assert.equal(result.length, 2);
      });
      it('should put it all together', function () {
        var result = axe.utils.querySelectorAllFilter(
          dom,
          '.first[data-a11yhero="faulkner"] > ul li.breaking'
        );
        assert.equal(result.length, 2);
      });
      it('should find an element only once', function () {
        var divs = axe.utils.querySelectorAllFilter(dom, 'div');
        var ones = axe.utils.querySelectorAllFilter(dom, '#one');
        var divOnes = axe.utils.querySelectorAllFilter(dom, 'div, #one');

        assert.isBelow(
          divOnes.length,
          divs.length + ones.length,
          'Elements matching both parts of a selector should not be included twice'
        );
      });
      it('should return nodes sorted by document position', function () {
        var result = axe.utils.querySelectorAllFilter(dom, 'ul, #one');
        assert.equal(result[0].actualNode.nodeName, 'UL');
        assert.equal(result[1].actualNode.nodeName, 'DIV');
        assert.equal(result[2].actualNode.nodeName, 'UL');
      });
      it('should filter the returned nodes when passed a filter function', function () {
        var result = axe.utils.querySelectorAllFilter(
          dom,
          'ul, #one',
          function (node) {
            return node.actualNode.nodeName !== 'UL';
          }
        );
        assert.equal(result[0].actualNode.nodeName, 'DIV');
        assert.equal(result.length, 1);
      });
    });
  }
});

describe('axe.utils.querySelectorAll', function () {
  'use strict';
  var dom;
  afterEach(function () {});
  beforeEach(function () {
    dom = getTestDom();
  });
  it('should find nodes using just the tag', function () {
    var result = axe.utils.querySelectorAll(dom, 'li');
    assert.equal(result.length, 4);
  });
});
