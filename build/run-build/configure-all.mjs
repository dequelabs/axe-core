import buildRules from '../configure.mjs';

/**
 * @param {ReturnType<import('../build-context.mjs').createBuildContext>} ctx
 * @param {string[]} langs
 * @param {string | null} tags
 */
export async function runConfigureAll(ctx, langs, tags) {
  const formatMod = await import('../shared/format.mjs');
  const format = formatMod.default;

  await Promise.all(
    langs.map(
      suffix =>
        new Promise((resolve, reject) => {
          const destAuto = `tmp/rules${suffix}.js`;
          const destDesc =
            suffix === ''
              ? 'doc/rule-descriptions.md'
              : `doc/rule-descriptions${suffix}.md`;

          const parts = destAuto.split('.');
          const options = {
            rules: ['lib/rules/**/*.json'],
            checks: ['lib/checks/**/*.json'],
            misc: ['lib/misc/**/*.json'],
            blacklist: ['metadata'],
            tags: tags || ''
          };
          if (parts.length > 2) {
            options.locale = parts[parts.length - 2];
          }

          buildRules(ctx, options, async result => {
            try {
              ctx.writeFile(destAuto, `axe._load(${result.auto});`);
              const formatted = await format(result.descriptions, destDesc);
              ctx.writeFile(destDesc, formatted);
              resolve();
            } catch (e) {
              reject(e);
            }
          });
        })
    )
  );
}
