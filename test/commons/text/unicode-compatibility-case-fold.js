// many of these tests are taken from examples on https://www.w3.org/TR/charmod-norm
describe('text.unicodeCompatibilityCaseFold', () => {
  const unicodeCompatibilityCaseFold =
    axe.commons.text.unicodeCompatibilityCaseFold;

  it('handles font variants (example 13)', () => {
    assert.equal(
      unicodeCompatibilityCaseFold('ℌ'),
      unicodeCompatibilityCaseFold('h')
    );
  });

  it('handles presentation forms of Arabic (example 13)', () => {
    assert.equal(
      unicodeCompatibilityCaseFold('ﻪ'),
      unicodeCompatibilityCaseFold('ه')
    );
  });

  it('handles circled characters (example 13)', () => {
    assert.equal(
      unicodeCompatibilityCaseFold('①'),
      unicodeCompatibilityCaseFold('1')
    );
  });

  it('handles superscripts/subscripts (example 13)', () => {
    assert.equal(
      unicodeCompatibilityCaseFold('⁹'),
      unicodeCompatibilityCaseFold('9')
    );
  });

  it('handles squared characters (example 13)', () => {
    assert.equal(
      unicodeCompatibilityCaseFold('㍐'),
      unicodeCompatibilityCaseFold('ユアン')
    );
  });

  it('handles fractions (example 13)', () => {
    assert.equal(
      unicodeCompatibilityCaseFold('½'),
      unicodeCompatibilityCaseFold('1⁄2')
    );
  });

  it('handles single presentational unit unicode (example 13)', () => {
    assert.equal(
      unicodeCompatibilityCaseFold('ǆ'),
      unicodeCompatibilityCaseFold('dž')
    );
  });

  it('normalizes for compatibility equivalence (example 19)', () => {
    assert.equal(
      unicodeCompatibilityCaseFold('㎒'),
      unicodeCompatibilityCaseFold('mhz')
    );

    assert.equal(
      unicodeCompatibilityCaseFold('℃́'),
      unicodeCompatibilityCaseFold('°ć')
    );

    assert.equal(
      unicodeCompatibilityCaseFold('Ϊ́'),
      unicodeCompatibilityCaseFold('ΐ')
    );
  });

  it('handles Greek subscripted iota (example 23)', () => {
    assert.equal(
      unicodeCompatibilityCaseFold('ᾌ'),
      unicodeCompatibilityCaseFold('ἄι')
    );

    assert.equal(
      unicodeCompatibilityCaseFold('ᾌ'),
      unicodeCompatibilityCaseFold('ἄι')
    );

    assert.equal(
      unicodeCompatibilityCaseFold('ᾌ'),
      unicodeCompatibilityCaseFold('ἄι')
    );
  });

  it('handles Turkish language folding (example 9)', () => {
    assert.equal(
      unicodeCompatibilityCaseFold('I'),
      unicodeCompatibilityCaseFold('ı')
    );

    assert.equal(
      unicodeCompatibilityCaseFold('İ'),
      unicodeCompatibilityCaseFold('i')
    );

    assert.equal(
      unicodeCompatibilityCaseFold('DİYARBAKIR'),
      unicodeCompatibilityCaseFold('diyarbakır')
    );
  });

  it('handles ASCII case folding (example 25)', () => {
    assert.equal(
      unicodeCompatibilityCaseFold('hello'),
      unicodeCompatibilityCaseFold('hello')
    );

    assert.equal(
      unicodeCompatibilityCaseFold('Hello'),
      unicodeCompatibilityCaseFold('hello')
    );

    assert.equal(
      unicodeCompatibilityCaseFold('HELLO'),
      unicodeCompatibilityCaseFold('hello')
    );

    assert.equal(
      unicodeCompatibilityCaseFold('hElLo'),
      unicodeCompatibilityCaseFold('hello')
    );
  });
});
