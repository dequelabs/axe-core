import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';

/**
 * Filesystem + template helpers for the axe-core build (Grunt replacement).
 * @param {string} rootDir Absolute path to repository root
 */
export function createBuildContext(rootDir) {
  const root = path.resolve(rootDir);

  return {
    root,
    readFile(relPath) {
      return fs.readFileSync(path.join(root, relPath), 'utf8');
    },
    readJSON(relPath) {
      return JSON.parse(fs.readFileSync(path.join(root, relPath), 'utf8'));
    },
    writeFile(relPath, content) {
      const abs = path.join(root, relPath);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, content, 'utf8');
    },
    exists(relPath) {
      return fs.existsSync(path.join(root, relPath));
    },
    /**
     * Returns matches alphabetically sorted by path so downstream consumers
     * (rule/check ordering in generated artifacts, locale templates, etc.)
     * get stable, deterministic output across platforms — matching the
     * historical Grunt/`grunt.file.expand` behavior.
     *
     * @param {string} pattern Glob relative to repo root (forward slashes ok)
     * @returns {string[]} Paths relative to root, POSIX-style
     */
    expandGlob(pattern) {
      return globSync(pattern, { cwd: root, nodir: true, posix: true }).sort();
    }
  };
}

/**
 * Minimal `<%= dotted.path %>` substitution (Grunt-style delimiters).
 * @param {string} str
 * @param {Record<string, unknown>} data
 */
export function templateProcess(str, data) {
  return str.replace(/<%=\s*([\s\S]*?)\s*%>/g, (_, expr) => {
    const key = expr.trim();
    if (!key) {
      return '';
    }
    const parts = key.split('.');
    let v = data;
    for (const p of parts) {
      v = v?.[p];
    }
    return v === undefined || v === null ? '' : String(v);
  });
}
