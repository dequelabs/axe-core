
describe('utils.escapeSelector', function () {
	'use strict';

	it('should serialize strings based on CSSOM spec', function () {

		assert.throws(function () { kslib.utils.escapeSelector('\0'); }, Error);
		assert.throws(function () { kslib.utils.escapeSelector('a\0'); }, Error);
		assert.throws(function () { kslib.utils.escapeSelector('a\0b'); }, Error);

		assert.equal(kslib.utils.escapeSelector(), 'undefined');
		assert.equal(kslib.utils.escapeSelector(true), 'true');
		assert.equal(kslib.utils.escapeSelector(false), 'false');
		assert.equal(kslib.utils.escapeSelector(null), 'null');
		assert.equal(kslib.utils.escapeSelector(''), '');

		assert.equal(kslib.utils.escapeSelector('\x01\x02\x1E\x1F'), '\\1 \\2 \\1e \\1f ');

		assert.equal(kslib.utils.escapeSelector('0a'), '\\30 a');
		assert.equal(kslib.utils.escapeSelector('1a'), '\\31 a');
		assert.equal(kslib.utils.escapeSelector('2a'), '\\32 a');
		assert.equal(kslib.utils.escapeSelector('3a'), '\\33 a');
		assert.equal(kslib.utils.escapeSelector('4a'), '\\34 a');
		assert.equal(kslib.utils.escapeSelector('5a'), '\\35 a');
		assert.equal(kslib.utils.escapeSelector('6a'), '\\36 a');
		assert.equal(kslib.utils.escapeSelector('7a'), '\\37 a');
		assert.equal(kslib.utils.escapeSelector('8a'), '\\38 a');
		assert.equal(kslib.utils.escapeSelector('9a'), '\\39 a');

		assert.equal(kslib.utils.escapeSelector('a0b'), 'a0b');
		assert.equal(kslib.utils.escapeSelector('a1b'), 'a1b');
		assert.equal(kslib.utils.escapeSelector('a2b'), 'a2b');
		assert.equal(kslib.utils.escapeSelector('a3b'), 'a3b');
		assert.equal(kslib.utils.escapeSelector('a4b'), 'a4b');
		assert.equal(kslib.utils.escapeSelector('a5b'), 'a5b');
		assert.equal(kslib.utils.escapeSelector('a6b'), 'a6b');
		assert.equal(kslib.utils.escapeSelector('a7b'), 'a7b');
		assert.equal(kslib.utils.escapeSelector('a8b'), 'a8b');
		assert.equal(kslib.utils.escapeSelector('a9b'), 'a9b');

		assert.equal(kslib.utils.escapeSelector('-0a'), '-\\30 a');
		assert.equal(kslib.utils.escapeSelector('-1a'), '-\\31 a');
		assert.equal(kslib.utils.escapeSelector('-2a'), '-\\32 a');
		assert.equal(kslib.utils.escapeSelector('-3a'), '-\\33 a');
		assert.equal(kslib.utils.escapeSelector('-4a'), '-\\34 a');
		assert.equal(kslib.utils.escapeSelector('-5a'), '-\\35 a');
		assert.equal(kslib.utils.escapeSelector('-6a'), '-\\36 a');
		assert.equal(kslib.utils.escapeSelector('-7a'), '-\\37 a');
		assert.equal(kslib.utils.escapeSelector('-8a'), '-\\38 a');
		assert.equal(kslib.utils.escapeSelector('-9a'), '-\\39 a');

		assert.equal(kslib.utils.escapeSelector('--a'), '-\\-a');

		assert.equal(kslib.utils.escapeSelector('\x80\x2D\x5F\xA9'), '\\80 \x2D\x5F\xA9');
		assert.equal(kslib.utils.escapeSelector('\xA0\xA1\xA2'), '\xA0\xA1\xA2');
		assert.equal(kslib.utils.escapeSelector('a0123456789b'), 'a0123456789b');
		assert.equal(kslib.utils.escapeSelector('abcdefghijklmnopqrstuvwxyz'), 'abcdefghijklmnopqrstuvwxyz');
		assert.equal(kslib.utils.escapeSelector('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');

		assert.equal(kslib.utils.escapeSelector('\x20\x21\x78\x79'), '\\ \\!xy');

		// astral symbol (U+1D306 TETRAGRAM FOR CENTRE)
		assert.equal(kslib.utils.escapeSelector('\uD834\uDF06'), '\uD834\uDF06');
		// lone surrogates
		assert.equal(kslib.utils.escapeSelector('\uDF06'), '\uDF06');
		assert.equal(kslib.utils.escapeSelector('\uD834'), '\uD834');

	});

});