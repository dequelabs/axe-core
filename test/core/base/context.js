/*eslint no-unused-vars:0*/
describe('Context', function () {
  'use strict';

  var Context = axe._thisWillBeDeletedDoNotUse.base.Context;

  function $id(id) {
    return document.getElementById(id);
  }

  var fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should not mutate exclude in input', function () {
    fixture.innerHTML = '<div id="foo"></div>';
    var context = { exclude: [['iframe', '#foo']] };
    // eslint-disable-next-line no-new
    new Context(context);
    assert.deepEqual(context, { exclude: [['iframe', '#foo']] });
  });

  it('should not mutate its include input', function () {
    fixture.innerHTML = '<div id="foo"></div>';
    var context = { include: [['#foo']] };
    // eslint-disable-next-line no-new
    new Context(context);
    assert.deepEqual(context, { include: [['#foo']] });
  });

  it('should not share memory with complex object', function () {
    fixture.innerHTML = '<div id="foo"><a href="">Click me</a></div>';
    var spec = {
      include: [['#foo'], ['a']],
      exclude: [['iframe', '#foo2']],
      size: { width: 100, height: 100 }
    };
    var context = new Context(spec);
    assert.notStrictEqual(spec.include, context.include);
    spec.include.forEach(function (_, index) {
      assert.notStrictEqual(spec.include[index], context.include[index]);
    });
    assert.notStrictEqual(spec.exclude, context.exclude);
    spec.exclude.forEach(function (_, index) {
      assert.notStrictEqual(spec.exclude[index], context.exclude[index]);
    });
    assert.notStrictEqual(spec.size, context.size);
  });

  it('should not share memory with simple array', function () {
    fixture.innerHTML = '<div id="foo"></div>';
    var spec = ['#foo'];
    var context = new Context(spec);
    assert.notStrictEqual(spec, context.include);
  });

  describe('include', function () {
    it('should accept a single selector', function () {
      fixture.innerHTML = '<div id="foo"></div>';
      var result = new Context('#foo');

      assert.deepEqual([result.include[0].actualNode], [$id('foo')]);
    });

    it('should accept multiple selectors', function () {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
      var result = new Context([['#foo'], ['#bar']]);

      assert.deepEqual(
        [result.include[0].actualNode, result.include[1].actualNode],
        [$id('foo'), $id('bar')]
      );
    });

    it('should accept a node reference', function () {
      var div = document.createElement('div');
      fixture.appendChild(div);

      var result = new Context(div);

      assert.deepEqual([result.include[0].actualNode], [div]);
    });

    it('should accept a node reference consisting of nested divs', function () {
      var div1 = document.createElement('div');
      var div2 = document.createElement('div');

      div1.appendChild(div2);
      fixture.appendChild(div1);

      var result = new Context(div1);

      assert.deepEqual([result.include[0].actualNode], [div1]);
    });

    it('should accept a node reference consisting of a form with nested controls', function () {
      var form = document.createElement('form');
      var input = document.createElement('input');

      form.appendChild(input);
      fixture.appendChild(form);

      var result = new Context(form);

      assert.deepEqual([result.include[0].actualNode], [form]);
    });

    it('should accept an array of node references', function () {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';

      var result = new Context([$id('foo'), $id('bar')]);

      assert.deepEqual(
        [result.include[0].actualNode, result.include[1].actualNode],
        [$id('foo'), $id('bar')]
      );
    });

    it('should remove any non-matched reference', function () {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';

      var result = new Context([['#foo'], ['#baz'], ['#bar']]);

      assert.deepEqual(
        result.include.map(function (n) {
          return n.actualNode;
        }),
        [$id('foo'), $id('bar')]
      );
    });

    it('should sort the include nodes in document order', function () {
      fixture.innerHTML =
        '<div id="foo"><div id="bar"></div></div><div id="baz"></div>';

      var result = new Context([['#foo'], ['#baz'], ['#bar']]);

      assert.deepEqual(
        result.include.map(function (n) {
          return n.actualNode;
        }),
        [$id('foo'), $id('bar'), $id('baz')]
      );
    });

    it('should remove any null reference', function () {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';

      var result = new Context([$id('foo'), $id('bar'), null]);

      assert.deepEqual(
        result.include.map(function (n) {
          return n.actualNode;
        }),
        [$id('foo'), $id('bar')]
      );
    });

    it('should accept mixed', function () {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
      var div = document.createElement('div');
      div.id = 'baz';
      fixture.appendChild(div);

      var result = new Context([['#foo'], ['#bar'], div]);

      assert.deepEqual(
        result.include.map(function (n) {
          return n.actualNode;
        }),
        [$id('foo'), $id('bar'), $id('baz')]
      );
    });

    it('should support jQuery-like objects', function () {
      fixture.innerHTML =
        '<div id="foo"></div><div id="bar"></div><div id="baz"></div>';
      var $test = {
        0: $id('foo'),
        1: $id('bar'),
        2: $id('baz'),
        length: 3
      };

      var result = new Context($test);

      assert.deepEqual(
        result.include.map(function (n) {
          return n.actualNode;
        }),
        [$id('foo'), $id('bar'), $id('baz')]
      );
    });

    describe('throwing errors', function () {
      var isInFrame;

      beforeEach(function () {
        isInFrame = axe.utils.respondable.isInFrame;
      });
      afterEach(function () {
        axe.utils.respondable.isInFrame = isInFrame;
      });

      it('should throw when no elements match the context', function () {
        fixture.innerHTML = '<div id="foo"></div>';
        assert.throws(
          function () {
            var ctxt = new Context('#notAnElement');
          },
          Error,
          'No elements found for include in page Context'
        );
      });

      it.skip('should throw when no elements match the context inside a frame', function () {
        axe.utils.respondable.isInFrame = function () {
          return true;
        };

        fixture.innerHTML = '<div id="foo"></div>';
        assert.throws(
          function () {
            var ctxt = new Context('#notAnElement');
          },
          Error,
          'No elements found for include in frame Context'
        );
      });
    });

    it('should create a flatTree property', function () {
      var context = new Context({ include: [document] });
      assert.isArray(context.flatTree);
      assert.isAtLeast(context.flatTree.length, 1);
    });
  });

  describe('object definition', function () {
    it('should assign include/exclude', function () {
      var context = new Context({
        include: ['#fixture'],
        exclude: ['#mocha']
      });
      assert.isNotNull(context);
      assert.hasAllKeys(context, [
        'include',
        'exclude',
        'flatTree',
        'initiator',
        'page',
        'frames',
        'focusable',
        'size'
      ]);
      assert.isArray(context.flatTree);
      assert.isAtLeast(context.flatTree.length, 1);
    });

    it('should disregard bad input, non-matching selectors', function () {
      var flatTree = axe.utils.getFlattenedTree(document);
      var context = new Context({
        include: ['#fixture', '#monkeys'],
        exclude: ['#bananas']
      });
      assert.isNotNull(context);
      assert.hasAllKeys(context, [
        'include',
        'exclude',
        'flatTree',
        'initiator',
        'page',
        'frames',
        'focusable',
        'size'
      ]);
      assert.lengthOf(context.include, 1);
      assert.equal(
        context.include[0].actualNode.id,
        axe.utils.querySelectorAll(flatTree, '#fixture')[0].actualNode.id
      );
    });

    it('should disregard bad input (null)', function () {
      var result = new Context();

      assert.lengthOf(result.include, 1);
      assert.equal(result.include[0].actualNode, document.documentElement);

      assert.lengthOf(result.exclude, 0);

      assert.isTrue(result.initiator);
      assert.isTrue(result.page);

      assert.lengthOf(result.frames, 0);
    });

    it('should default include to document', function () {
      var result = new Context({ exclude: ['#fixture'] });
      assert.lengthOf(result.include, 1);
      assert.equal(result.include[0].actualNode, document.documentElement);

      assert.lengthOf(result.exclude, 1);
      assert.equal(result.exclude[0].actualNode, $id('fixture'));

      assert.isTrue(result.initiator);
      assert.isTrue(result.page);

      assert.lengthOf(result.frames, 0);
    });

    it('should default empty include to document', function () {
      var result = new Context({ include: [], exclude: [] });
      assert.lengthOf(result.include, 1);
      assert.equal(result.include[0].actualNode, document.documentElement);
    });
  });

  describe('initiator', function () {
    it('should not be clobbered', function () {
      var result = new Context({
        initiator: false
      });
      assert.lengthOf(result.include, 1);
      assert.equal(result.include[0].actualNode, document.documentElement);

      assert.lengthOf(result.exclude, 0);

      assert.isFalse(result.initiator);
      assert.isTrue(result.page);

      assert.lengthOf(result.frames, 0);
    });

    // document.hasOwnProperty is undefined in Firefox content scripts
    it('should not throw given really weird circumstances when hasOwnProperty is deleted from a document node?', function () {
      var spec = document.implementation.createHTMLDocument('ie is dumb');
      spec.hasOwnProperty = undefined;

      var result = new Context(spec);

      assert.lengthOf(result.include, 1);
      assert.equal(result.include[0].actualNode, spec.documentElement);

      assert.lengthOf(result.exclude, 0);

      assert.isTrue(result.initiator);
      assert.isFalse(result.page);

      assert.lengthOf(result.frames, 0);
    });
  });

  describe('page', function () {
    it('takes the page argument as default', function () {
      assert.isTrue(new Context({ page: true }).page);
      assert.isFalse(new Context({ page: false }).page);
    });

    it('is true if the document element is included', function () {
      assert.isTrue(new Context(document).page);
      assert.isTrue(new Context(document.documentElement).page);
      assert.isTrue(new Context('html').page);
      assert.isTrue(new Context(':root').page);
    });

    it('is true, with exclude used', function () {
      // What matters is that the documentElement is included
      // not that parts within that are excluded
      assert.isTrue(
        new Context({
          include: [document],
          exclude: ['#mocha']
        }).page
      );
    });

    it('is false if the context does not include documentElement', function () {
      assert.isFalse(new Context(fixture).page);
      assert.isFalse(new Context('#fixture').page);
      assert.isFalse(new Context(['#fixture']).page);
      assert.isFalse(new Context({ include: ['#fixture'] }).page);
    });
  });

  describe('focusable', function () {
    it('should default to true', function () {
      var result = new Context();
      assert.isTrue(result.focusable);
    });

    it('should use passed in value', function () {
      var result = new Context({
        focusable: false
      });
      assert.isFalse(result.focusable);
    });

    it('should reject bad values', function () {
      var result = new Context({
        focusable: 'hello'
      });
      assert.isTrue(result.focusable);
    });
  });

  describe('size', function () {
    it('should default to empty object', function () {
      var result = new Context();
      assert.deepEqual(result.size, {});
    });

    it('should use passed in value', function () {
      var result = new Context({
        size: {
          width: 10,
          height: 20
        }
      });
      assert.deepEqual(result.size, {
        width: 10,
        height: 20
      });
    });

    it('should reject bad values', function () {
      var result = new Context({
        size: 'hello'
      });
      assert.deepEqual(result.size, {});
    });
  });

  describe('frames', function () {
    function iframeReady(src, context, id, cb, done) {
      var iframe = document.createElement('iframe');
      iframe.addEventListener('load', function () {
        try {
          cb(iframe);
          done();
        } catch (e) {
          done(e);
        }
      });
      iframe.src = src;
      iframe.id = id;
      context.appendChild(iframe);
    }

    it('adds frames that are explicitly included', function (done) {
      fixture.innerHTML = '<div id="outer"></div>';
      iframeReady(
        '../mock/frames/context.html',
        $id('outer'),
        'target',
        function () {
          var result = new Context('#target');
          assert.lengthOf(result.frames, 1);
          assert.deepEqual(result.frames[0].node, $id('target'));
        },
        done
      );
    });

    it('adds frames that are implicitly included', function (done) {
      fixture.innerHTML = '<div id="outer"></div>';
      iframeReady(
        '../mock/frames/context.html',
        $id('outer'),
        'target',
        function () {
          var result = new Context('#outer');
          assert.lengthOf(result.frames, 1);
          assert.deepEqual(result.frames[0].node, $id('target'));
        },
        done
      );
    });

    it('sets include', function (done) {
      fixture.innerHTML = '<div id="outer"></div>';
      iframeReady(
        '../mock/frames/context.html',
        $id('outer'),
        'target',
        function () {
          var result = new Context([['#target', '#foo']]);
          assert.lengthOf(result.frames, 1);

          assert.deepEqual(result.frames[0].node, $id('target'));
          assert.deepEqual(result.frames[0].include, [['#foo']]);
          assert.deepEqual(result.frames[0].exclude, []);
        },
        done
      );
    });

    it('sets exclude', function (done) {
      fixture.innerHTML = '<div id="outer"></div>';
      iframeReady(
        '../mock/frames/context.html',
        $id('outer'),
        'target',
        function () {
          var result = new Context({
            exclude: [['#target', '#foo']]
          });
          assert.lengthOf(result.frames, 1);

          assert.deepEqual(result.frames[0].node, $id('target'));
          assert.deepEqual(result.frames[0].include, []);
          assert.deepEqual(result.frames[0].exclude, [['#foo']]);
        },
        done
      );
    });

    it('sets initiator: false', function (done) {
      iframeReady(
        '../mock/frames/context.html',
        $id('fixture'),
        'target',
        function () {
          var result = new Context();
          assert.isTrue(result.initiator);
          assert.lengthOf(result.frames, 1);
          assert.isFalse(result.frames[0].initiator);
        },
        done
      );
    });

    describe('.page', function () {
      it('is true if context includes the document element', function (done) {
        iframeReady(
          '../mock/frames/context.html',
          $id('fixture'),
          'target',
          function () {
            var result = new Context({
              exclude: [['#mocha']]
            });
            assert.lengthOf(result.frames, 1);
            assert.isTrue(result.frames[0].page);
          },
          done
        );
      });

      it("can be false, even if the frame's documentElement is included", function (done) {
        iframeReady(
          '../mock/frames/context.html',
          $id('fixture'),
          'target',
          function () {
            var result = new Context({
              include: [['#fixture']]
            });
            assert.lengthOf(result.frames, 1);
            assert.isFalse(result.frames[0].page);
          },
          done
        );
      });
    });

    describe('.focusable', function () {
      it('is true if tabindex is 0', function (done) {
        iframeReady(
          '../mock/frames/context.html',
          $id('fixture'),
          'target',
          function (iframe) {
            iframe.tabIndex = '0';
            var result = new Context();
            assert.lengthOf(result.frames, 1);
            assert.isTrue(result.frames[0].focusable);
          },
          done
        );
      });

      it('is false if the context has a negative tabindex', function (done) {
        iframeReady(
          '../mock/frames/context.html',
          $id('fixture'),
          'target',
          function (iframe) {
            iframe.tabIndex = '-1';
            var result = new Context('#fixture');
            assert.lengthOf(result.frames, 1);
            assert.isFalse(result.frames[0].focusable);
          },
          done
        );
      });

      it('is false if the parent context is not focusable', function (done) {
        iframeReady(
          '../mock/frames/context.html',
          $id('fixture'),
          'target',
          function () {
            var result = new Context({
              include: ['#fixture'],
              focusable: false
            });
            assert.lengthOf(result.frames, 1);
            assert.isFalse(result.frames[0].focusable);
          },
          done
        );
      });
    });

    describe('.size', function () {
      it('sets width and height of the frame', function (done) {
        iframeReady(
          '../mock/frames/context.html',
          $id('fixture'),
          'target',
          function (iframe) {
            iframe.width = '100';
            iframe.height = '200';
            var result = new Context('#fixture');
            var size = result.frames[0].size;
            assert.closeTo(size.width, 105, 10);
            assert.closeTo(size.height, 205, 10);
          },
          done
        );
      });

      it('works with CSS width / height', function (done) {
        iframeReady(
          '../mock/frames/context.html',
          $id('fixture'),
          'target',
          function (iframe) {
            iframe.setAttribute('style', 'width: 100px; height: 200px');
            var result = new Context('#fixture');
            var size = result.frames[0].size;
            assert.closeTo(size.width, 105, 10);
            assert.closeTo(size.height, 205, 10);
          },
          done
        );
      });
    });

    it('combines includes', function (done) {
      fixture.innerHTML = '<div id="outer"></div>';
      iframeReady(
        '../mock/frames/context.html',
        $id('outer'),
        'target',
        function () {
          var result = new Context([
            ['#target', '#foo'],
            ['#target', '#bar']
          ]);

          assert.lengthOf(result.frames, 1);
          assert.deepEqual(result.frames[0].node, $id('target'));
          assert.deepEqual(result.frames[0].include, [['#foo'], ['#bar']]);
          assert.deepEqual(result.frames[0].exclude, []);
        },
        done
      );
    });

    it('does not include the same frame twice', function (done) {
      fixture.innerHTML = '<div id="outer"></div>';
      iframeReady(
        '../mock/frames/context.html',
        $id('outer'),
        'target',
        function () {
          var result = new Context([$id('target'), $id('target')]);
          assert.lengthOf(result.frames, 1);
          assert.deepEqual(result.frames[0].node, $id('target'));
        },
        done
      );
    });

    it('should filter out invisible frames', function (done) {
      fixture.innerHTML = '<div id="outer"></div>';
      iframeReady(
        '../mock/frames/context.html',
        $id('outer'),
        'target',
        function () {
          var frame = $id('target');
          frame.setAttribute('hidden', 'hidden');

          var result = new Context([$id('target')]);
          assert.deepEqual(result.frames, []);
        },
        done
      );
    });

    it('should throw when frame could not be found', function (done) {
      fixture.innerHTML = '<div id="outer"></div>';
      iframeReady(
        '../mock/frames/context.html',
        $id('outer'),
        'target',
        function () {
          assert.throws(function () {
            var ctxt = new Context(['#notAFrame', '#foo']);
          });
        },
        done
      );
    });
  });
});
