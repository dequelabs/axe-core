/* global module */
describe('UMD module.export', () => {
  it('registers axe to module.exports', () => {
    assert.strictEqual(module.exports, axe);
  });

  it('does not use `require` functions', () => {
    let result;
    const requireRegex = /[^.]require\(([^\)])\)/g;

    // This is to avoid colliding with Cypress.js which overloads all
    // uses of variables named `require`.
    while ((result = requireRegex.exec(axe.source)) !== null) {
      // Allow 'crypto' as it is used in an unobtrusive way.
      assert.includes(
        result[1],
        'crypto',
        'Axe source should not contain `require` variables'
      );
    }
  });

  it('should include doT', () => {
    const doT = axe.imports.doT;
    assert(doT, 'doT is registered on axe.imports');
    assert.equal(doT.name, 'doT');
  });
});
