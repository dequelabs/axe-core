/* eslint-disable max-depth, guard-for-in */

// importing from the index file results in esbuild processing all utils files and not tree shaking them correctly
import getElementInternals from '../core/utils/get-element-internals';
import getAncestry from '../core/utils/get-ancestry';
import isShadowRoot from '../core/utils/is-shadow-root';

export const elementInternalsMap = {};

export function walkTree(tree = document.body) {
  const treeWalker = document.createTreeWalker(
    tree,
    globalThis.NodeFilter.SHOW_ELEMENT,
    null,
    false
  );

  let node = treeWalker.currentNode;
  while (node) {
    const elementInternals = getElementInternals(node);
    if (elementInternals) {
      const ancestry = getAncestry(node);
      const internals = {};

      // can't spread internals so have to loop over the props instead
      for (const prop in elementInternals) {
        // trying to read internals.form will throw if the custom element isn't a form associated element :(
        try {
          if (elementInternals[prop] !== null) {
            internals[prop] = elementInternals[prop];

            // convert idref(s) to node ancestry
            if (prop.endsWith('Element')) {
              internals[prop] = getAncestry(elementInternals[prop]);
            } else if (prop.endsWith('Elements')) {
              internals[prop] = elementInternals[prop].map(n => getAncestry(n));
            }
          }
        } catch {
          // do nothing
        }
      }
      elementInternalsMap[ancestry] = internals;
    }

    if (isShadowRoot(node)) {
      walkTree(node.shadowRoot);
    }

    node = treeWalker.nextNode();
  }
}

// exposed for testing
export function _reset() {
  Object.keys(elementInternalsMap).forEach(
    key => delete elementInternalsMap[key]
  );
}
export { getAncestry };
