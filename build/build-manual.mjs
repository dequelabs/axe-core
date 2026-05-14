import path from 'node:path';
import templates from './templates.mjs';
import { templateProcess } from './build-context.mjs';

/**
 * @param {ReturnType<import('./build-context.mjs').createBuildContext>} ctx
 * @param {object} options
 * @param {(result: object) => void} callback
 */
export default function buildManual(ctx, options, callback) {
  options.getFiles = options.hasOwnProperty('getFiles')
    ? options.getFiles
    : true;

  callback({
    rules: parseObject(ctx, options, options.rules),
    checks: parseObject(ctx, options, options.checks),
    misc: parseObject(ctx, options, options.misc)
  });
}

/**
 * @param {ReturnType<import('./build-context.mjs').createBuildContext>} ctx
 * @param {object} options
 * @param {string} src
 */
function parseObject(ctx, options, src) {
  const files = ctx.expandGlob(src);
  return files.map(file => {
    const json = ctx.readJSON(file);
    const dirname = path.dirname(path.join(ctx.root, file));
    Object.keys(templates).forEach(templateName => {
      if (json[templateName] && json[templateName].endsWith('.js')) {
        json[templateName] = path.resolve(dirname, json[templateName]);
        if (options.getFiles) {
          json[templateName] = getSource(ctx, json[templateName], templateName);
        }
      }
    });
    return json;
  });
}

/**
 * @param {ReturnType<import('./build-context.mjs').createBuildContext>} ctx
 * @param {string} relOrAbs
 */
function readSource(ctx, relOrAbs) {
  const p = path.isAbsolute(relOrAbs)
    ? relOrAbs
    : path.join(ctx.root, relOrAbs);
  return ctx.readFile(path.relative(ctx.root, p));
}

/**
 * @param {ReturnType<import('./build-context.mjs').createBuildContext>} ctx
 * @param {string} file
 * @param {string} type
 */
function getSource(ctx, file, type) {
  const rel = path.relative(ctx.root, file);
  return templateProcess(templates[type], {
    source: readSource(ctx, rel)
  });
}
