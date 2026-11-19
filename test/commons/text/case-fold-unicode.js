// many of these tests are taken from examples on https://www.w3.org/TR/charmod-norm
describe('text.caseFoldUnicode', () => {
  const caseFoldUnicode = axe.commons.text.caseFoldUnicode;

  it('handles font variants (example 13)', () => {
    assert.equal(caseFoldUnicode('ℌ'), caseFoldUnicode('h'));
  });

  it('handles presentation forms of Arabic (example 13)', () => {
    assert.equal(caseFoldUnicode('ﻪ'), caseFoldUnicode('ه'));
  });

  it('handles circled characters (example 13)', () => {
    assert.equal(caseFoldUnicode('①'), caseFoldUnicode('1'));
  });

  it('handles superscripts/subscripts (example 13)', () => {
    assert.equal(caseFoldUnicode('⁹'), caseFoldUnicode('9'));
  });

  it('handles squared characters (example 13)', () => {
    assert.equal(caseFoldUnicode('㍐'), caseFoldUnicode('ユアン'));
  });

  it('handles fractions (example 13)', () => {
    assert.equal(caseFoldUnicode('½'), caseFoldUnicode('1⁄2'));
  });

  it('handles single presentational unit unicode (example 13)', () => {
    assert.equal(caseFoldUnicode('ǆ'), caseFoldUnicode('dž'));
  });

  it('normalizes for compatibility equivalence (example 19)', () => {
    assert.equal(caseFoldUnicode('㎒'), caseFoldUnicode('mhz'));

    assert.equal(caseFoldUnicode('℃́'), caseFoldUnicode('°ć'));

    assert.equal(caseFoldUnicode('Ϊ́'), caseFoldUnicode('ΐ'));
  });

  it('handles Greek subscripted iota (example 23)', () => {
    assert.equal(caseFoldUnicode('ᾌ'), caseFoldUnicode('ἄι'));

    assert.equal(caseFoldUnicode('ᾌ'), caseFoldUnicode('ἄι'));

    assert.equal(caseFoldUnicode('ᾌ'), caseFoldUnicode('ἄι'));
  });

  it('handles Turkish language folding (example 9)', () => {
    assert.equal(caseFoldUnicode('I'), caseFoldUnicode('ı'));

    assert.equal(caseFoldUnicode('İ'), caseFoldUnicode('i'));

    assert.equal(caseFoldUnicode('DİYARBAKIR'), caseFoldUnicode('diyarbakır'));
  });

  it('handles ASCII case folding (example 25)', () => {
    assert.equal(caseFoldUnicode('hello'), caseFoldUnicode('hello'));

    assert.equal(caseFoldUnicode('Hello'), caseFoldUnicode('hello'));

    assert.equal(caseFoldUnicode('HELLO'), caseFoldUnicode('hello'));

    assert.equal(caseFoldUnicode('hElLo'), caseFoldUnicode('hello'));
  });

  it('handles English language folding', () => {
    assert.equal(caseFoldUnicode('TITAN'), caseFoldUnicode('titan'));
  });
});
