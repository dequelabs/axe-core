import fs from 'node:fs';
import path from 'node:path';
import { root } from './root.mjs';

/**
 * @param {string[]} argv
 */
export function parseBuildArgv(argv) {
  const args = argv.slice(2);
  const positionals = [];
  const opts = {
    lang: null,
    allLang: false,
    tags: null,
    watch: false,
    log: false
  };

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--watch' || a === '-w') {
      opts.watch = true;
    } else if (a === '--log') {
      opts.log = true;
    } else if (a === '--all-lang' || a === '--allLang') {
      opts.allLang = true;
    } else if (a.startsWith('--lang=')) {
      opts.lang = a.slice('--lang='.length);
    } else if (a === '--lang') {
      opts.lang = args[++i] ?? '';
    } else if (a.startsWith('--tags=')) {
      opts.tags = a.slice('--tags='.length);
    } else if (a === '--tags') {
      opts.tags = args[++i] ?? '';
    } else if (!a.startsWith('-')) {
      positionals.push(a);
    }
  }

  const sub = positionals[0] || 'build';
  return { sub, positionals, ...opts };
}

/**
 * @param {{ lang: string | null, allLang: boolean }} opts
 */
export function deriveLangSuffixes(opts) {
  if (opts.lang) {
    return opts.lang.split(/[,;]/g).map(s => {
      const lang = s.trim();
      return lang !== 'en' ? `.${lang}` : '';
    });
  }
  if (opts.allLang) {
    const localeFiles = fs.readdirSync(path.join(root, 'locales'));
    const langs = localeFiles
      .filter(file => !file.startsWith('_') && file.endsWith('.json'))
      .map(file => `.${file.replace('.json', '')}`);
    langs.unshift('');
    return langs;
  }
  return [''];
}
