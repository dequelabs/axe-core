/*eslint no-unused-vars:0*/
describe('Context', () => {
  const { Context } = axe._thisWillBeDeletedDoNotUse.base;
  const fixture = document.getElementById('fixture');

  function $id(id) {
    return document.getElementById(id);
  }

  it('should not mutate exclude in input', () => {
    fixture.innerHTML = '<div id="foo"></div>';
    const context = { exclude: [['iframe', '#foo']] };
    // eslint-disable-next-line no-new
    new Context(context);
    assert.deepEqual(context, { exclude: [['iframe', '#foo']] });
  });

  it('should not mutate its include input', () => {
    fixture.innerHTML = '<div id="foo"></div>';
    const context = { include: [['#foo']] };
    // eslint-disable-next-line no-new
    new Context(context);
    assert.deepEqual(context, { include: [['#foo']] });
  });

  it('should not share memory with complex object', () => {
    fixture.innerHTML = '<div id="foo"><a href="">Click me</a></div>';
    const spec = {
      include: [['#foo'], ['a']],
      exclude: [['iframe', '#foo2']],
      size: { width: 100, height: 100 }
    };
    const context = new Context(spec);
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

  it('should not share memory with simple array', () => {
    fixture.innerHTML = '<div id="foo"></div>';
    const spec = [['#foo']];
    const context = new Context(spec);
    assert.notStrictEqual(spec, context.include);
  });

  describe('include', () => {
    it('should accept a single selector', () => {
      fixture.innerHTML = '<div id="foo"></div>';
      const result = new Context('#foo');

      assert.deepEqual([result.include[0].actualNode], [$id('foo')]);
    });

    it('should accept multiple selectors', () => {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
      const result = new Context([['#foo'], ['#bar']]);

      assert.deepEqual(
        [result.include[0].actualNode, result.include[1].actualNode],
        [$id('foo'), $id('bar')]
      );
    });

    it('should accept a node reference', () => {
      const div = document.createElement('div');
      fixture.appendChild(div);

      const result = new Context(div);

      assert.deepEqual([result.include[0].actualNode], [div]);
    });

    it('should accept a node reference consisting of nested divs', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');

      div1.appendChild(div2);
      fixture.appendChild(div1);

      const result = new Context(div1);

      assert.deepEqual([result.include[0].actualNode], [div1]);
    });

    it('should accept a node reference consisting of a form with nested controls', () => {
      const form = document.createElement('form');
      const input = document.createElement('input');

      form.appendChild(input);
      fixture.appendChild(form);

      const result = new Context(form);

      assert.deepEqual([result.include[0].actualNode], [form]);
    });

    it('should accept an array of node references', () => {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';

      const result = new Context([$id('foo'), $id('bar')]);

      assert.deepEqual(
        [result.include[0].actualNode, result.include[1].actualNode],
        [$id('foo'), $id('bar')]
      );
    });

    it('should remove any non-matched reference', () => {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';

      const result = new Context([['#foo'], ['#baz'], ['#bar']]);

      assert.deepEqual(
        result.include.map(function (n) {
          return n.actualNode;
        }),
        [$id('foo'), $id('bar')]
      );
    });

    it('should sort the include nodes in document order', () => {
      fixture.innerHTML =
        '<div id="foo"><div id="bar"></div></div><div id="baz"></div>';

      const result = new Context([['#foo'], ['#baz'], ['#bar']]);

      assert.deepEqual(
        result.include.map(function (n) {
          return n.actualNode;
        }),
        [$id('foo'), $id('bar'), $id('baz')]
      );
    });

    it('should remove any null reference', () => {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';

      const result = new Context([$id('foo'), $id('bar'), null]);

      assert.deepEqual(
        result.include.map(function (n) {
          return n.actualNode;
        }),
        [$id('foo'), $id('bar')]
      );
    });

    it('should accept mixed', () => {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
      const div = document.createElement('div');
      div.id = 'baz';
      fixture.appendChild(div);

      const result = new Context([['#foo'], ['#bar'], div]);

      assert.deepEqual(
        result.include.map(function (n) {
          return n.actualNode;
        }),
        [$id('foo'), $id('bar'), $id('baz')]
      );
    });

    it('should support jQuery-like objects', () => {
      fixture.innerHTML =
        '<div id="foo"></div><div id="bar"></div><div id="baz"></div>';
      const $test = {
        0: $id('foo'),
        1: $id('bar'),
        2: $id('baz'),
        length: 3
      };

      const result = new Context($test);

      assert.deepEqual(
        result.include.map(function (n) {
          return n.actualNode;
        }),
        [$id('foo'), $id('bar'), $id('baz')]
      );
    });

    describe('throwing errors', () => {
      let isInFrame;

      beforeEach(() => {
        isInFrame = axe.utils.respondable.isInFrame;
      });
      afterEach(() => {
        axe.utils.respondable.isInFrame = isInFrame;
      });

      it('should throw when no elements match the context', () => {
        fixture.innerHTML = '<div id="foo"></div>';
        assert.throws(
          () => {
            const ctxt = new Context('#notAnElement');
          },
          Error,
          'No elements found for include in page Context'
        );
      });

      it.skip('should throw when no elements match the context inside a frame', () => {
        axe.utils.respondable.isInFrame = () => {
          return true;
        };

        fixture.innerHTML = '<div id="foo"></div>';
        assert.throws(
          () => {
            const ctxt = new Context('#notAnElement');
          },
          Error,
          'No elements found for include in frame Context'
        );
      });
    });

    it('should create a flatTree property', () => {
      const context = new Context({ include: [document] });
      assert.isArray(context.flatTree);
      assert.isAtLeast(context.flatTree.length, 1);
    });
  });

  describe('object definition', function () {
    it('should assign include/exclude', function () {
      const context = new Context({
        include: [['#fixture']],
        exclude: [['#mocha']]
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
      const flatTree = axe.utils.getFlattenedTree(document);
      const context = new Context({
        include: [['#fixture'], ['#monkeys']],
        exclude: [['#bananas']]
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
      const result = new Context();

      assert.lengthOf(result.include, 1);
      assert.equal(result.include[0].actualNode, document.documentElement);

      assert.lengthOf(result.exclude, 0);

      assert.isTrue(result.initiator);
      assert.isTrue(result.page);

      assert.lengthOf(result.frames, 0);
    });

    it('should default include to document', function () {
      const result = new Context({ exclude: [['#fixture']] });
      assert.lengthOf(result.include, 1);
      assert.equal(result.include[0].actualNode, document.documentElement);

      assert.lengthOf(result.exclude, 1);
      assert.equal(result.exclude[0].actualNode, $id('fixture'));

      assert.isTrue(result.initiator);
      assert.isTrue(result.page);

      assert.lengthOf(result.frames, 0);
    });

    it('should default empty include to document', function () {
      const result = new Context({ include: [], exclude: [] });
      assert.lengthOf(result.include, 1);
      assert.equal(result.include[0].actualNode, document.documentElement);
    });
  });

  describe('initiator', function () {
    it('should not be clobbered', function () {
      const result = new Context({
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
      const spec = document.implementation.createHTMLDocument('ie is dumb');
      spec.hasOwnProperty = undefined;

      const result = new Context(spec);

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
          include: document,
          exclude: [['#mocha']]
        }).page
      );
    });

    it('is false if the context does not include documentElement', function () {
      assert.isFalse(new Context(fixture).page);
      assert.isFalse(new Context('#fixture').page);
      assert.isFalse(new Context([['#fixture']]).page);
      assert.isFalse(new Context({ include: [['#fixture']] }).page);
    });
  });

  describe('focusable', function () {
    it('should default to true', function () {
      const result = new Context();
      assert.isTrue(result.focusable);
    });

    it('should use passed in value', function () {
      const result = new Context({
        focusable: false
      });
      assert.isFalse(result.focusable);
    });

    it('should reject bad values', function () {
      const result = new Context({
        focusable: 'hello'
      });
      assert.isTrue(result.focusable);
    });
  });

  describe('size', function () {
    it('should default to empty object', function () {
      const result = new Context();
      assert.deepEqual(result.size, {});
    });

    it('should use passed in value', function () {
      const result = new Context({
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
      const result = new Context({
        size: 'hello'
      });
      assert.deepEqual(result.size, {});
    });
  });

  describe('frames', function () {
    function iframeReady(src, context, id, cb, done) {
      const iframe = document.createElement('iframe');
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
          const result = new Context('#target');
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
          const result = new Context('#outer');
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
          const result = new Context([['#target', '#foo']]);
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
          const result = new Context({
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
          const result = new Context();
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
            const result = new Context({
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
            const result = new Context({
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
            const result = new Context();
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
            const result = new Context('#fixture');
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
            const result = new Context({
              include: [['#fixture']],
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
            const result = new Context('#fixture');
            const size = result.frames[0].size;
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
            const result = new Context('#fixture');
            const size = result.frames[0].size;
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
          const result = new Context([
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
          const result = new Context([$id('target'), $id('target')]);
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
          const frame = $id('target');
          frame.setAttribute('hidden', 'hidden');

          const result = new Context([$id('target')]);
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
            const ctxt = new Context(['#notAFrame', '#foo']);
          });
        },
        done
      );
    });
  });
});
