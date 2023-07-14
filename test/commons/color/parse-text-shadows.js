describe('axe.commons.color.parseTextShadows', () => {
  const { parseTextShadows } = axe.commons.color;

  it('should return an empty array if no text-shadow is provided', () => {
    const shadows = parseTextShadows(' \t\n');
    assert.equal(shadows.length, 0);
  });

  it('should return an array of objects with `pixels` and `colorStr` properties', () => {
    const shadows = parseTextShadows('1px 2px 3px #000, 4px 5px 6px #fff');
    assert.equal(shadows.length, 2);

    assert.deepEqual(shadows[0], {
      pixels: [1, 2, 3],
      colorStr: '#000'
    });

    assert.deepEqual(shadows[1], {
      pixels: [4, 5, 6],
      colorStr: '#fff'
    });
  });

  it('accepts color at the start of the shadow', () => {
    const shadows = parseTextShadows('#000 1px 2px 3px, #fff 4px 5px 6px');
    assert.deepEqual(shadows[0], {
      pixels: [1, 2, 3],
      colorStr: '#000'
    });
    assert.deepEqual(shadows[1], {
      pixels: [4, 5, 6],
      colorStr: '#fff'
    });
  });

  it('sets default blur to 0 when omitted', () => {
    const shadows = parseTextShadows('1px 2px #000, 4px 5px #fff');
    assert.deepEqual(shadows[0], {
      pixels: [1, 2, 0],
      colorStr: '#000'
    });
    assert.deepEqual(shadows[1], {
      pixels: [4, 5, 0],
      colorStr: '#fff'
    });
  });
});
