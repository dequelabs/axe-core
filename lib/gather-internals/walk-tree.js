// importing from the index file results in esbuild processing all utils files and not tree shaking them correctly
import getElementInternals from '../core/utils/get-element-internals';
import getAncestry from '../core/utils/get-ancestry';
import isShadowRoot from '../core/utils/is-shadow-root';

export const elementInternalsMap = [];
const ariaPropRegex = /^aria[A-Z]/;
const propsToCapture = ['role', 'labels', 'form'];

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
        if (!ariaPropRegex.test(prop) && !propsToCapture.includes(prop)) {
          continue;
        }

        // trying to read internals.form will throw if the custom element isn't a form associated element :(
        try {
          const value = elementInternals[prop];
          if (value === null) {
            continue;
          }

          // convert idref to node ancestry
          // aria props can use unattached nodes but those won't be used by the browser to calculate the prop value
          if (value instanceof globalThis.HTMLElement) {
            internals[prop] = value.isConnected
              ? { type: 'HTMLElement', value: getAncestry(value) }
              : undefined;
          }
          // convert idrefs to node ancestry. `labels` is a NodeList while idrefs aria props are arrays
          else if (
            Array.isArray(value) ||
            value instanceof globalThis.NodeList
          ) {
            const array = Array.from(value).filter(n => n.isConnected);
            internals[prop] = array.length
              ? { type: 'NodeList', value: array.map(n => getAncestry(n)) }
              : undefined;
          } else if (typeof value === 'string') {
            internals[prop] = value;
          }
        } catch {
          // do nothing
        }
      }

      elementInternalsMap.push({
        ancestry,
        internals
      });
    }

    if (isShadowRoot(node)) {
      walkTree(node.shadowRoot);
    }

    node = treeWalker.nextNode();
  }
}

// exposed for testing
export function _reset() {
  elementInternalsMap.length = 0;
}
export { getAncestry };
