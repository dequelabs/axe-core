describe('utils.escapeSelector', function () {
  'use strict';
  var escapeSelector = axe.utils.escapeSelector;

  it('leaves characters that do not need to escape alone', function () {
    assert.equal(escapeSelector('a0b'), 'a0b');
    assert.equal(escapeSelector('a1b'), 'a1b');
    assert.equal(escapeSelector('a2b'), 'a2b');
    assert.equal(escapeSelector('a3b'), 'a3b');
    assert.equal(escapeSelector('a4b'), 'a4b');
    assert.equal(escapeSelector('a5b'), 'a5b');
    assert.equal(escapeSelector('a6b'), 'a6b');
    assert.equal(escapeSelector('a7b'), 'a7b');
    assert.equal(escapeSelector('a8b'), 'a8b');
    assert.equal(escapeSelector('a9b'), 'a9b');
    assert.equal(escapeSelector('a0123456789b'), 'a0123456789b');
    assert.equal(
      escapeSelector('abcdefghijklmnopqrstuvwxyz'),
      'abcdefghijklmnopqrstuvwxyz'
    );
    assert.equal(
      escapeSelector('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    );
  });

  it('escapes null characters', function () {
    assert.equal(escapeSelector('\0'), '\uFFFD');
    assert.equal(escapeSelector('a\0'), 'a\uFFFD');
    assert.equal(escapeSelector('a\0b'), 'a\uFFFDb');
  });

  it('stringifies non-string characters', function () {
    assert.equal(escapeSelector(), 'undefined');
    assert.equal(escapeSelector(true), 'true');
    assert.equal(escapeSelector(false), 'false');
    assert.equal(escapeSelector(null), 'null');
    assert.equal(escapeSelector(''), '');
  });

  it('escapes strings starting with a number', function () {
    assert.equal(escapeSelector('0a'), '\\30 a');
    assert.equal(escapeSelector('1a'), '\\31 a');
    assert.equal(escapeSelector('2a'), '\\32 a');
    assert.equal(escapeSelector('3a'), '\\33 a');
    assert.equal(escapeSelector('4a'), '\\34 a');
    assert.equal(escapeSelector('5a'), '\\35 a');
    assert.equal(escapeSelector('6a'), '\\36 a');
    assert.equal(escapeSelector('7a'), '\\37 a');
    assert.equal(escapeSelector('8a'), '\\38 a');
    assert.equal(escapeSelector('9a'), '\\39 a');
  });

  it('only escapes "-" when before a number, or on its own', function () {
    assert.equal(escapeSelector('-123'), '-\\31 23');
    assert.equal(escapeSelector('-'), '\\-');
    assert.equal(escapeSelector('--a'), '--a');
  });

  it('escapes characters staring with a negative number', function () {
    assert.equal(escapeSelector('-0a'), '-\\30 a');
    assert.equal(escapeSelector('-1a'), '-\\31 a');
    assert.equal(escapeSelector('-2a'), '-\\32 a');
    assert.equal(escapeSelector('-3a'), '-\\33 a');
    assert.equal(escapeSelector('-4a'), '-\\34 a');
    assert.equal(escapeSelector('-5a'), '-\\35 a');
    assert.equal(escapeSelector('-6a'), '-\\36 a');
    assert.equal(escapeSelector('-7a'), '-\\37 a');
    assert.equal(escapeSelector('-8a'), '-\\38 a');
    assert.equal(escapeSelector('-9a'), '-\\39 a');
  });

  it('escapes hex character codes', function () {
    assert.equal(escapeSelector('\x80\x2D\x5F\xA9'), '\x80\x2D\x5F\xA9');
    assert.equal(escapeSelector('\xA0\xA1\xA2'), '\xA0\xA1\xA2');

    assert.equal(escapeSelector('\x01\x02\x1E\x1F'), '\\1 \\2 \\1e \\1f ');
    assert.equal(escapeSelector('\x20\x21\x78\x79'), '\\ \\!xy');

    // astral symbol (U+1D306 TETRAGRAM FOR CENTRE)
    assert.equal(escapeSelector('\uD834\uDF06'), '\uD834\uDF06');
    // lone surrogates
    assert.equal(escapeSelector('\uDF06'), '\uDF06');
    assert.equal(escapeSelector('\uD834'), '\uD834');
  });
});
