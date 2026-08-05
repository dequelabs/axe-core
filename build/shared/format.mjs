import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';

const pkgPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  'package.json'
);
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const prettierConfig = pkg.prettier || {};

/**
 * @param {string} content
 * @param {string} [filename]
 */
export default (content, filename) =>
  prettier.format(content, { ...prettierConfig, filepath: filename });
