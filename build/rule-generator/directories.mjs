import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const directories = {
  axePath: path.join(__dirname, '..', '..', 'axe.js'),
  rules: path.join(__dirname, '..', '..', 'lib', 'rules'),
  checks: path.join(__dirname, '..', '..', 'lib', 'checks'),
  testRuleMatches: path.join(__dirname, '..', '..', 'test', 'rule-matches'),
  testChecksUnit: path.join(__dirname, '..', '..', 'test', 'checks'),
  testChecksIntegration: path.join(
    __dirname,
    '..',
    '..',
    'test',
    'integration',
    'rules'
  )
};

export default directories;
