describe('color-contrast disabled form-associated custom element test', () => {
  function getColorContrastTargets(results) {
    const colorContrast = results.violations.find(
      ({ id }) => id === 'color-contrast'
    );
    if (!colorContrast) {
      return [];
    }
    return colorContrast.nodes.map(({ target }) => target);
  }

  function targetIncludes(targets, selector) {
    return targets.some(target => target.some(part => part.includes(selector)));
  }

  it('skips disabled hosts and shadow content but still checks enabled and non-form-associated controls', done => {
    axe.run(
      '#fixture',
      { runOnly: { type: 'rule', values: ['color-contrast'] } },
      (err, results) => {
        assert.isNull(err);
        const targets = getColorContrastTargets(results);

        assert.isFalse(
          targetIncludes(targets, '#disabled-host'),
          'disabled form-associated host should not be checked'
        );
        assert.isFalse(
          targets.some(target =>
            target.some(part => part.includes('disabled-shadow-host'))
          ),
          'disabled form-associated host with shadow content should not be checked'
        );

        assert.isTrue(
          targetIncludes(targets, '#enabled-host'),
          'enabled form-associated host with low contrast should be checked'
        );
        assert.isTrue(
          targets.some(target =>
            target.some(part => part.includes('enabled-shadow-host'))
          ),
          'enabled form-associated host with shadow content should be checked'
        );
        assert.isTrue(
          targetIncludes(targets, '#non-form-associated-disabled'),
          'a disabled attribute on a non-form-associated custom element should not skip contrast'
        );

        assert.lengthOf(
          targets,
          3,
          'only enabled controls with insufficient contrast should be reported'
        );

        done();
      }
    );
  });
});
