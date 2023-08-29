describe('color.stackingContext', () => {
  const { Color, getStackingContext, stackingContextToColor } =
    axe.commons.color;
  const { getElementStack } = axe.commons.dom;
  const { querySelectorAll } = axe.utils;
  const { queryFixture } = axe.testUtils;
  const fixture = document.querySelector('#fixture');

  beforeEach(() => {
    // remove html, body, and fixture from the
    // element stack to make testing easier
    document.documentElement.style.height = 0;
    document.body.style.height = 0;
    fixture.style.height = 0;
  });

  afterEach(() => {
    document.documentElement.removeAttribute('style');
    document.body.removeAttribute('style');
    fixture.removeAttribute('style');
  });

  describe('color.getStackingContexts', () => {
    it('creates a context for a single element', () => {
      const vNode = queryFixture('<div id="target">Hello World</div>');
      // html is always added as the last element
      // so we'll remove it to make testing easier
      const elmStack = getElementStack(vNode.actualNode).slice(0, -1);
      const stackingContext = getStackingContext(vNode.actualNode, elmStack);

      assert.deepEqual(stackingContext, [
        {
          vNode,
          ancestor: undefined,
          opacity: 1,
          bgColor: new Color(0, 0, 0, 0),
          blendMode: 'normal',
          descendants: []
        }
      ]);
    });

    it('creates a context for every node in the element stack', () => {
      const vNode = queryFixture(`
        <div id="elm1">
          <div id="elm2">
            <div id="target">Hello World</div>
          </div>
        </div>
      `);
      const elmStack = getElementStack(vNode.actualNode).slice(0, -1);
      const stackingContext = getStackingContext(vNode.actualNode, elmStack);

      assert.deepEqual(stackingContext, [
        {
          vNode: querySelectorAll(axe._tree[0], '#elm1')[0],
          ancestor: undefined,
          opacity: 1,
          bgColor: new Color(0, 0, 0, 0),
          blendMode: 'normal',
          descendants: []
        },
        {
          vNode: querySelectorAll(axe._tree[0], '#elm2')[0],
          ancestor: undefined,
          opacity: 1,
          bgColor: new Color(0, 0, 0, 0),
          blendMode: 'normal',
          descendants: []
        },
        {
          vNode,
          ancestor: undefined,
          opacity: 1,
          bgColor: new Color(0, 0, 0, 0),
          blendMode: 'normal',
          descendants: []
        }
      ]);
    });

    it('nests contexts', () => {
      const vNode = queryFixture(`
        <div id="elm1" style="position: absolute; z-index: 2">
          <div id="elm2">
            <div id="target">Hello World</div>
          </div>
        </div>
      `);
      const elmStack = getElementStack(vNode.actualNode).slice(0, -1);
      const stackingContext = getStackingContext(vNode.actualNode, elmStack);

      assert.deepEqual(stackingContext, [
        {
          vNode: querySelectorAll(axe._tree[0], '#elm1')[0],
          ancestor: undefined,
          opacity: 1,
          bgColor: new Color(0, 0, 0, 0),
          blendMode: 'normal',
          descendants: [
            {
              vNode: querySelectorAll(axe._tree[0], '#elm2')[0],
              ancestor: stackingContext[0],
              opacity: 1,
              bgColor: new Color(0, 0, 0, 0),
              blendMode: 'normal',
              descendants: []
            },
            {
              vNode,
              ancestor: stackingContext[0],
              opacity: 1,
              bgColor: new Color(0, 0, 0, 0),
              blendMode: 'normal',
              descendants: []
            }
          ]
        }
      ]);
    });

    it('sets context properties', () => {
      const vNode = queryFixture(
        '<div id="target" style="background-color: rgba(255,0,0,0.5); opacity: 0.8; mix-blend-mode: difference;">Hello World</div>'
      );
      const elmStack = getElementStack(vNode.actualNode).slice(0, -1);
      const stackingContext = getStackingContext(vNode.actualNode, elmStack);

      assert.deepEqual(stackingContext, [
        {
          vNode,
          ancestor: undefined,
          opacity: 0.8,
          bgColor: new Color(255, 0, 0, 0.5),
          blendMode: 'difference',
          descendants: []
        }
      ]);
    });

    it('creates a context for ancestors that create a stacking context but are not in the element stack', () => {
      const vNode = queryFixture(`
        <div id="elm1" style="opacity: 0.8">
          <div id="target" style="position: absolute; z-index: 2">Hello World</div>
        </div>
      `);
      const elmStack = getElementStack(vNode.actualNode).slice(0, -1);
      const stackingContext = getStackingContext(vNode.actualNode, elmStack);

      assert.lengthOf(elmStack, 1);
      assert.deepEqual(stackingContext, [
        {
          vNode: querySelectorAll(axe._tree[0], '#elm1')[0],
          ancestor: undefined,
          opacity: 0.8,
          bgColor: new Color(0, 0, 0, 0),
          blendMode: 'normal',
          descendants: [
            {
              vNode,
              ancestor: stackingContext[0],
              opacity: 1,
              bgColor: new Color(0, 0, 0, 0),
              blendMode: 'normal',
              descendants: []
            }
          ]
        }
      ]);
    });
  });

  describe('color.stackingContextToColor', () => {
    it('reduces a context to a color', () => {
      const context = {
        opacity: 1,
        bgColor: new Color(255, 128, 0, 1),
        blendMode: 'normal',
        descendants: []
      };

      assert.deepEqual(stackingContextToColor(context), {
        color: new Color(255, 128, 0, 1),
        blendMode: 'normal'
      });
    });

    it('reduces a nested context to a color', () => {
      const context = {
        opacity: 1,
        bgColor: new Color(255, 128, 0, 1),
        blendMode: 'normal',
        descendants: [
          {
            opacity: 1,
            bgColor: new Color(0, 255, 128, 0.5),
            blendMode: 'normal',
            descendants: []
          }
        ]
      };

      assert.deepEqual(stackingContextToColor(context), {
        color: new Color(128, 192, 64, 1),
        blendMode: 'normal'
      });
    });

    it('applies opacity after blending', () => {
      const context = {
        opacity: 0.8,
        bgColor: new Color(255, 128, 0, 1),
        blendMode: 'normal',
        descendants: [
          {
            opacity: 1,
            bgColor: new Color(0, 255, 128, 0.5),
            blendMode: 'normal',
            descendants: []
          }
        ]
      };

      assert.deepEqual(stackingContextToColor(context), {
        color: new Color(128, 192, 64, 0.8),
        blendMode: 'normal'
      });
    });

    it('applies mix-blend-mode from a sibling context', () => {
      const context = {
        opacity: 1,
        bgColor: new Color(0, 0, 0, 0),
        blendMode: 'normal',
        descendants: [
          {
            opacity: 1,
            bgColor: new Color(255, 128, 0, 1),
            blendMode: 'normal',
            descendants: []
          },
          {
            opacity: 1,
            bgColor: new Color(0, 255, 128, 0.5),
            blendMode: 'difference',
            descendants: []
          }
        ]
      };

      assert.deepEqual(stackingContextToColor(context), {
        color: new Color(255, 128, 64, 1),
        blendMode: 'normal'
      });
    });

    it('applies mix-blend-mode from a nested context', () => {
      const context = {
        opacity: 1,
        bgColor: new Color(255, 128, 0, 1),
        blendMode: 'normal',
        descendants: [
          {
            opacity: 1,
            bgColor: new Color(0, 255, 128, 0.5),
            blendMode: 'difference',
            descendants: []
          }
        ]
      };

      assert.deepEqual(stackingContextToColor(context), {
        color: new Color(255, 128, 64, 1),
        blendMode: 'normal'
      });
    });
  });
});
