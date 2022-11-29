/*eslint no-new:0*/
describe('Context', () => {
  const { Context } = axe._thisWillBeDeletedDoNotUse.base;
  const { createNestedShadowDom } = axe.testUtils;
  const fixture = document.getElementById('fixture');

  function $id(id) {
    return document.getElementById(id);
  }
  const selectors = elms =>
    elms.map(elm => {
      const domNode = elm?.actualNode || elm;
      return domNode.id ? `#${domNode.id}` : domNode.nodeName.toLowerCase();
    });

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
    spec.include.forEach((_, index) => {
      assert.notStrictEqual(spec.include[index], context.include[index]);
    });
    assert.notStrictEqual(spec.exclude, context.exclude);
    spec.exclude.forEach((_, index) => {
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
    it('accepts a single selector', () => {
      fixture.innerHTML = '<div id="foo"></div>';
      const result = new Context('#foo');
      assert.deepEqual(selectors(result.include), ['#foo']);
      assert.isEmpty(result.exclude);
    });

    it('accepts frame selectors', () => {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
      const result = new Context([['#foo'], ['#bar']]);
      assert.deepEqual(selectors(result.include), ['#foo', '#bar']);
      assert.isEmpty(result.exclude);
    });

    it('accepts an array of strings as selectors', () => {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
      const context = new Context(['#foo', '#bar']);
      assert.deepEqual(selectors(context.include), ['#foo', '#bar']);
      assert.isEmpty(context.exclude);
    });

    it('accepts a node reference', () => {
      const div = document.createElement('div');
      fixture.appendChild(div);
      const result = new Context(div);
      assert.deepEqual([result.include[0].actualNode], [div]);
    });

    it('does not match shadow DOM nodes with light DOM selection', () => {
      createNestedShadowDom(
        fixture,
        `<p id="p1">Light DOM</p>
        <article id="shadowHost">
          <p id="p2">Slotted light DOM</p>
        </article>`,
        `<section id="shadowHost"> <slot /> </section>
        <p id="p3">Shadow DOM</p>`
      );
      const result = new Context([[['p']]]);
      assert.deepEqual(selectors(result.include), ['#p1', '#p2']);
    });

    it('accepts shadow DOM selectors', () => {
      createNestedShadowDom(
        fixture,
        '<article id="shadowHost"></article>',
        '<div><section id="shadowHost"></section></div>',
        '<h1 id="target">Hello world</h1>'
      );
      const result = new Context([[['#fixture > article', 'section', 'h1']]]);
      assert.equal(result.include[0].props.id, 'target');
    });

    it('accepts a node reference consisting of nested divs', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.appendChild(div2);
      fixture.appendChild(div1);

      const result = new Context(div1);
      assert.deepEqual([result.include[0].actualNode], [div1]);
    });

    it('accepts a node reference consisting of a form with nested controls', () => {
      const form = document.createElement('form');
      const input = document.createElement('input');

      form.appendChild(input);
      fixture.appendChild(form);

      const result = new Context(form);
      assert.deepEqual(result.include[0].actualNode, form);
    });

    it('accepts an array of node references', () => {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
      const result = new Context([$id('foo'), $id('bar')]);
      assert.deepEqual(
        [result.include[0].actualNode, result.include[1].actualNode],
        [$id('foo'), $id('bar')]
      );
    });

    it('removes any non-matched reference', () => {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
      const result = new Context([['#foo'], ['#baz'], ['#bar']]);
      assert.deepEqual(selectors(result.include), ['#foo', '#bar']);
    });

    it('sorts the include nodes in document order', () => {
      fixture.innerHTML =
        '<div id="foo"><div id="bar"></div></div><div id="baz"></div>';
      const result = new Context([['#foo'], ['#baz'], ['#bar']]);
      assert.deepEqual(selectors(result.include), ['#foo', '#bar', '#baz']);
    });

    it('removes any null reference', () => {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
      const result = new Context([$id('foo'), $id('bar'), null]);
      assert.deepEqual(selectors(result.include), ['#foo', '#bar']);
    });

    it('accepts an array of mixed selectors and nodes', () => {
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
      const div = document.createElement('div');
      div.id = 'baz';
      fixture.appendChild(div);

      const result = new Context([['#foo'], '#bar', div]);
      assert.deepEqual(selectors(result.include), ['#foo', '#bar', '#baz']);
    });

    it('accepts jQuery-like objects', () => {
      fixture.innerHTML =
        '<div id="foo"></div><div id="bar"></div><div id="baz"></div>';
      const $test = {
        0: $id('foo'),
        1: $id('bar'),
        2: $id('baz'),
        length: 3
      };

      const result = new Context($test);
      assert.deepEqual(selectors(result.include), ['#foo', '#bar', '#baz']);
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
            new Context('#notAnElement');
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
            new Context('#notAnElement');
          },
          Error,
          'No elements found for include in frame Context'
        );
      });
    });

    it('creates a flatTree property', () => {
      const context = new Context({ include: [document] });
      assert.isArray(context.flatTree);
      assert.isAtLeast(context.flatTree.length, 1);
    });
  });

  describe('object definition', () => {
    it('should assign include/exclude', () => {
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

    it('should disregard bad input, non-matching selectors', () => {
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

    it('should disregard bad input (null)', () => {
      const result = new Context();

      assert.lengthOf(result.include, 1);
      assert.equal(result.include[0].actualNode, document.documentElement);

      assert.isEmpty(result.exclude);

      assert.isTrue(result.initiator);
      assert.isTrue(result.page);

      assert.isEmpty(result.frames);
    });

    it('should default include to document', () => {
      const result = new Context({ exclude: [['#fixture']] });
      assert.lengthOf(result.include, 1);
      assert.equal(result.include[0].actualNode, document.documentElement);

      assert.lengthOf(result.exclude, 1);
      assert.equal(result.exclude[0].actualNode, $id('fixture'));

      assert.isTrue(result.initiator);
      assert.isTrue(result.page);

      assert.isEmpty(result.frames);
    });

    it('should default empty include to document', () => {
      const result = new Context({ include: [], exclude: [] });
      assert.lengthOf(result.include, 1);
      assert.equal(result.include[0].actualNode, document.documentElement);
    });

    it('throws when it has a fromFrames prop', () => {
      assert.throws(() => {
        new Context({
          include: [],
          fromFrames: ['frame', '#fixture']
        });
      });
    });

    it('throws when it has a fromShadowDom prop', () => {
      assert.throws(() => {
        new Context({
          include: [],
          fromShadowDom: ['frame', '#fixture']
        });
      });
    });
  });

  describe('initiator', () => {
    it('should not be clobbered', () => {
      const result = new Context({
        initiator: false
      });
      assert.lengthOf(result.include, 1);
      assert.equal(result.include[0].actualNode, document.documentElement);

      assert.isEmpty(result.exclude);
      assert.isFalse(result.initiator);
      assert.isTrue(result.page);
      assert.isEmpty(result.frames);
    });

    // document.hasOwnProperty is undefined in Firefox content scripts
    it('should not throw given really weird circumstances when hasOwnProperty is deleted from a document node?', () => {
      const spec = document.implementation.createHTMLDocument('ie is dumb');
      spec.hasOwnProperty = undefined;

      const result = new Context(spec);

      assert.lengthOf(result.include, 1);
      assert.equal(result.include[0].actualNode, spec.documentElement);

      assert.isEmpty(result.exclude);

      assert.isTrue(result.initiator);
      assert.isFalse(result.page);

      assert.isEmpty(result.frames);
    });
  });

  describe('page', () => {
    it('takes the page argument as default', () => {
      assert.isTrue(new Context({ page: true }).page);
      assert.isFalse(new Context({ page: false }).page);
    });

    it('is true if the document element is included', () => {
      assert.isTrue(new Context(document).page);
      assert.isTrue(new Context(document.documentElement).page);
      assert.isTrue(new Context('html').page);
      assert.isTrue(new Context(':root').page);
    });

    it('is true, with exclude used', () => {
      // What matters is that the documentElement is included
      // not that parts within that are excluded
      assert.isTrue(
        new Context({
          include: document,
          exclude: [['#mocha']]
        }).page
      );
    });

    it('is false if the context does not include documentElement', () => {
      assert.isFalse(new Context(fixture).page);
      assert.isFalse(new Context('#fixture').page);
      assert.isFalse(new Context([['#fixture']]).page);
      assert.isFalse(new Context({ include: [['#fixture']] }).page);
    });
  });

  describe('focusable', () => {
    it('should default to true', () => {
      const result = new Context();
      assert.isTrue(result.focusable);
    });

    it('should use passed in value', () => {
      const result = new Context({
        focusable: false
      });
      assert.isFalse(result.focusable);
    });

    it('should reject bad values', () => {
      const result = new Context({
        focusable: 'hello'
      });
      assert.isTrue(result.focusable);
    });
  });

  describe('size', () => {
    it('should default to empty object', () => {
      const result = new Context();
      assert.deepEqual(result.size, {});
    });

    it('should use passed in value', () => {
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

    it('should reject bad values', () => {
      const result = new Context({
        size: 'hello'
      });
      assert.deepEqual(result.size, {});
    });
  });

  describe('frames', () => {
    function iframeReady(src, context, id, cb, done) {
      const iframe = document.createElement('iframe');
      iframe.addEventListener('load', () => {
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
        () => {
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
        () => {
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
        () => {
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
        () => {
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
        () => {
          const result = new Context();
          assert.isTrue(result.initiator);
          assert.lengthOf(result.frames, 1);
          assert.isFalse(result.frames[0].initiator);
        },
        done
      );
    });

    it('finds frames inside shadow DOM trees', () => {
      createNestedShadowDom(
        fixture,
        '<article id="shadowHost"></article>',
        '<iframe id="target" srcdoc="<h1>My iframe page</h1>"></iframe>'
      );
      const result = new Context();
      assert.equal(result.frames[0].node.id, 'target');
    });

    it('accepts frames inside shadow DOM selectors', () => {
      createNestedShadowDom(
        fixture,
        '<article id="shadowHost"></article>',
        '<div><section id="shadowHost"></section></div>',
        '<iframe id="target" srcdoc="<h1>My iframe page</h1>"></iframe>'
      );
      const result = new Context([
        [['#fixture > article', 'section', 'iframe'], ['h1']]
      ]);
      assert.equal(result.frames[0].node.id, 'target');
    });

    it('skips frames excluded with shadow DOM selectors', () => {
      createNestedShadowDom(
        fixture,
        '<article id="shadowHost"></article>',
        '<div><section id="shadowHost"></section></div>',
        '<iframe id="target" srcdoc="<h1>My iframe page</h1>"></iframe>'
      );
      const result = new Context({
        exclude: [[['#fixture > article', 'section', 'iframe']]]
      });
      assert.isEmpty(result.frames);
    });

    it('skips frames in excluded shadow trees', () => {
      createNestedShadowDom(
        fixture,
        '<article id="shadowHost"></article>',
        '<div><section id="shadowHost"></section></div>',
        '<iframe id="target" srcdoc="<h1>My iframe page</h1>"></iframe>'
      );
      const result = new Context({
        exclude: [[['#fixture > article', 'section']]]
      });
      assert.isEmpty(result.frames);
    });

    describe('.page', () => {
      it('is true if context includes the document element', function (done) {
        iframeReady(
          '../mock/frames/context.html',
          $id('fixture'),
          'target',
          () => {
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
          () => {
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

    describe('.focusable', () => {
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
          () => {
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

    describe('.size', () => {
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
        () => {
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
        () => {
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
        () => {
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
        () => {
          assert.throws(function () {
            new Context(['#notAFrame', '#foo']);
          });
        },
        done
      );
    });
  });

  describe('with labelled fame selectors', () => {
    it('accepts a single labelled selector', () => {
      fixture.innerHTML = '<div id="foo"></div>';
      const result = new Context({
        fromFrames: ['#foo']
      });
      assert.deepEqual(selectors(result.include), ['#foo']);
      assert.isEmpty(result.exclude);
    });

    it('accepts multiple labelled selectors', () => {
      fixture.innerHTML = '<div id="foo"></div><div id="bar"></div>';
      const result = new Context([
        { fromFrames: ['#foo'] },
        { fromFrames: ['#bar'] }
      ]);
      assert.deepEqual(selectors(result.include), ['#foo', '#bar']);
      assert.isEmpty(result.exclude);
    });

    it('accepts labelled selectors on include & exclude', () => {
      fixture.innerHTML = '<div id="foo"></div><div id="bar"></div>';
      const result = new Context({
        include: [{ fromFrames: ['#foo'] }],
        exclude: { fromFrames: ['#bar'] }
      });
      assert.deepEqual(selectors(result.include), ['#foo']);
      assert.deepEqual(selectors(result.exclude), ['#bar']);
    });

    it('throws when not passed an array', () => {
      assert.throws(() => {
        new Context({ fromFrames: '#fixture' });
      });
    });

    it('throws when fromShadowDom is on the same object', () => {
      assert.throws(() => {
        new Context({
          fromFrames: ['#fixture'],
          fromShadowDom: ['#fixture']
        });
      });
    });

    it('throws when labelled frames are nested', () => {
      assert.throws(() => {
        new Context({
          fromFrames: ['#fixture', { fromFrames: ['#fixture'] }]
        });
      });
    });

    describe('when the selector has length > 1', () => {
      it('sets the frame, rather than include / exclude', () => {
        fixture.innerHTML = `<iframe id="foo" srcdoc="
          <h1>Hello world</h1> <img>
        "></iframe>`;
        const result = new Context({
          include: { fromFrames: ['#foo', 'h1'] },
          exclude: { fromFrames: ['iframe', 'img'] }
        });
        assert.isEmpty(result.include);
        assert.isEmpty(result.exclude);
        assert.lengthOf(result.frames, 1);
      });

      it('creates a context for the frame', () => {
        fixture.innerHTML = `<iframe id="foo" srcdoc="
          <h1>Hello world</h1> <img>
        "></iframe>`;
        const result = new Context({
          include: { fromFrames: ['#foo', 'h1'] },
          exclude: { fromFrames: ['iframe', 'img'] }
        });
        const frameContext = result.frames[0];
        assert.lengthOf(result.frames, 1);
        assert.deepEqual(frameContext.include, [['h1']]);
        assert.deepEqual(frameContext.exclude, [['img']]);
      });
    });
  });

  describe('with labelled shadow DOM selectors', () => {
    it('accepts a single labelled selector', () => {
      createNestedShadowDom(
        fixture,
        '<article id="shadowHost"></article>',
        '<div><section id="shadowHost"></section></div>',
        '<h1 id="foo">Heading</h1>'
      );
      const result = new Context({
        fromShadowDom: ['#fixture > article', 'section', 'h1']
      });
      assert.deepEqual(selectors(result.include), ['#foo']);
      assert.isEmpty(result.exclude);
      assert.isEmpty(result.frames);
    });

    it('accepts multiple labelled selectors', () => {
      createNestedShadowDom(
        fixture,
        '<article id="shadowHost"></article>',
        '<div><section id="shadowHost"></section></div>',
        '<div id="foo"></div><div id="bar"></div>'
      );
      const result = new Context([
        { fromShadowDom: ['#fixture > article', 'section', '#foo'] },
        { fromShadowDom: ['#fixture > article', 'section', '#bar'] }
      ]);
      assert.deepEqual(selectors(result.include), ['#foo', '#bar']);
      assert.isEmpty(result.exclude);
      assert.isEmpty(result.frames);
    });

    it('accepts labelled selectors on include & exclude', () => {
      createNestedShadowDom(
        fixture,
        '<article id="shadowHost"></article>',
        '<h1 id="foo"></h1><h2 id="bar"></h2>'
      );
      const result = new Context({
        include: [{ fromShadowDom: ['#fixture > article', 'h1'] }],
        exclude: { fromShadowDom: ['#fixture > article', 'h2'] }
      });
      assert.deepEqual(selectors(result.include), ['#foo']);
      assert.deepEqual(selectors(result.exclude), ['#bar']);
    });

    it('throws when fromShadowDom does not contain an array', () => {
      fixture.innerHTML = '<h1>Hello World</h1>';
      assert.throws(() => {
        new Context({ fromShadowDom: 'h1' });
      });
    });

    it('throws when containing a labelled frame selector', () => {
      createNestedShadowDom(
        fixture,
        '<article id="shadowHost"></article>',
        `<iframe id="foo" srcdoc="
          <h1>Hello World</h1>
        "></iframe>`
      );
      assert.throws(() => {
        new Context({
          fromShadowDom: [
            '#fixture > article',
            { fromFrames: ['iframe', 'h1'] }
          ]
        });
      });
    });

    it('throws when containing another labelled shadow dom selector', () => {
      createNestedShadowDom(
        fixture,
        '<article id="shadowHost"></article>',
        '<div><section id="shadowHost"></section></div>',
        '<h1 id="foo">Heading</h1>'
      );
      assert.throws(() => {
        new Context({
          fromShadowDom: [
            '#fixture > article',
            { fromShadowDom: ['section', 'h1'] }
          ]
        });
      });
    });

    describe('nested in a frame selector', () => {
      it('works for unlabelled frame selectors', () => {
        createNestedShadowDom(
          fixture,
          '<article id="shadowHost"></article>',
          `<iframe id="foo" srcdoc="
            <h1>Hello World</h1>
          "></iframe>`
        );
        const result = new Context([
          [
            {
              fromShadowDom: ['#fixture > article', 'iframe']
            },
            ['h1']
          ]
        ]);

        const frameNodes = result.frames.map(({ node }) => node);
        assert.deepEqual(selectors(frameNodes), ['#foo']);
      });

      it('works for labelled frame selectors', () => {
        createNestedShadowDom(
          fixture,
          '<article id="shadowHost"></article>',
          `<iframe id="foo" srcdoc="
            <h1>Hello World</h1>
          "></iframe>`
        );
        const result = new Context({
          fromFrames: [
            {
              fromShadowDom: ['#fixture > article', 'iframe']
            },
            ['h1']
          ]
        });
        const frameNodes = result.frames.map(({ node }) => node);
        assert.deepEqual(selectors(frameNodes), ['#foo']);
      });
    });
  });

  describe('ignores bad values', () => {
    it('passed directly into include', () => {
      const result = new Context([null, fixture, false, {}]);
      assert.deepEqual(selectors(result.include), ['#fixture']);
      assert.isEmpty(result.exclude);
    });

    it('in unlabelled frame selectors', () => {
      fixture.innerHTML = '<article id="foo"></article>';
      const result = new Context([
        [null],
        ['#fixture > article'],
        [fixture],
        [false],
        [{}]
      ]);
      assert.deepEqual(selectors(result.include), ['#foo']);
      assert.isEmpty(result.exclude);
    });

    it('in labelled frame selectors', () => {
      fixture.innerHTML = '<article id="foo"></article>';
      const result = new Context([
        { fromFrames: [null] },
        { fromFrames: ['#fixture > article'] },
        { fromFrames: [fixture] },
        { fromFrames: [false] },
        { fromFrames: [{}] }
      ]);
      assert.deepEqual(selectors(result.include), ['#foo']);
      assert.isEmpty(result.exclude);
    });

    it('in unlabelled shadow DOM selectors', () => {
      createNestedShadowDom(
        fixture,
        '<article id="shadowHost"></article>',
        '<h1 id="foo"></h1><h2 id="bar"></h2>'
      );
      const result = new Context([
        [['#fixture > article', null]],
        [['#fixture > article', 'h1']], // Valid
        [['#fixture > article', ['h2']]],
        [['#fixture > article', fixture]],
        [['#fixture > article', false]],
        [['#fixture > article', {}]]
      ]);
      assert.deepEqual(selectors(result.include), ['#foo']);
      assert.isEmpty(result.exclude);
    });

    it('in labelled shadow DOM selectors', () => {
      createNestedShadowDom(
        fixture,
        '<article id="shadowHost"></article>',
        '<h1 id="foo"></h1><h2 id="bar"></h2>'
      );
      const result = new Context([
        { fromShadowDom: ['#fixture > article', null] },
        { fromShadowDom: ['#fixture > article', 'h1'] }, // valid
        { fromShadowDom: ['#fixture > article', ['h1']] },
        { fromShadowDom: ['#fixture > article', fixture] },
        { fromShadowDom: ['#fixture > article', false] },
        { fromShadowDom: ['#fixture > article', {}] }
      ]);
      assert.deepEqual(selectors(result.include), ['#foo']);
      assert.isEmpty(result.exclude);
    });
  });
});
