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

  it('accepts named colors', () => {
    const shadows = parseTextShadows('red 1px 2px 3px, blue 4px 5px 6px');
    assert.deepEqual(shadows[0], {
      pixels: [1, 2, 3],
      colorStr: 'red'
    });
    assert.deepEqual(shadows[1], {
      pixels: [4, 5, 6],
      colorStr: 'blue'
    });
  });

  it('accepts different color functions', () => {
    const shadows = parseTextShadows(`
      rgb(0, 202, 148) 0px 0px,
      hsl(165.58deg 100% 35.07% / .5) 0px 0px,
      lch(65 49.19 167.45) 0px 0px,
      oklch(60% 0.57 181) 0px 0px,
      lab(65 -48.01 10.69) 0px 0px,
      color(xyz-d65 0.26 0.44 0.35 / 1) 0px 0px,
    `);
    assert.equal(shadows[0].colorStr, 'rgb(0, 202, 148)');
    assert.equal(shadows[1].colorStr, 'hsl(165.58deg 100% 35.07% / .5)');
    assert.equal(shadows[2].colorStr, 'lch(65 49.19 167.45)');
    assert.equal(shadows[3].colorStr, 'oklch(60% 0.57 181)');
    assert.equal(shadows[4].colorStr, 'lab(65 -48.01 10.69)');
    assert.equal(shadows[5].colorStr, 'color(xyz-d65 0.26 0.44 0.35 / 1)');
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
