import { walkTree, elementInternalsMap } from './walk-tree';

// enable feature flag
globalThis.axe = globalThis.axe || {};
globalThis.axe._enableElementInternals = true;

walkTree();
module.exports = elementInternalsMap;
