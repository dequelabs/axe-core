/**
 * community protocols that axe-core supports to find element internals:
 * - globalThis.axeInternalsMap.get(node)
 * - node._internals
 * - node.internals
 * - node.internals_
 * - node[Symbol('internals')]
 * - node[Symbol('privateInternals')]
 **/
const propNames = ['_internals', 'internals', 'internals_'];
const symbolNames = ['internals', 'privateInternals'];

/**
 * Get the ElementInternals object for a custom element.
 * @param  {HTMLElement} node
 * @return {ElementInternals|undefined}
 */
export default function getElementInternals(node) {
  // support finding internals from an optional global map. we assume that if a node is set here the value will be an ElementInternals object
  if (globalThis.axeInternalsMap?.get(node)) {
    return globalThis.axeInternalsMap.get(node);
  }

  // ie11 guard
  if (!('ElementInternals' in window)) {
    return;
  }

  for (const propName of propNames) {
    if (Object.getOwnPropertyDescriptor(node, propName)?.get) {
      return;
    }
    if (node[propName] instanceof window.ElementInternals) {
      return node[propName];
    }
  }

  const ownSymbols = Object.getOwnPropertySymbols(node);
  if (!ownSymbols.length) {
    return;
  }

  for (const symbolName of symbolNames) {
    const symbol = ownSymbols.find(s => s.description === symbolName);

    if (symbol) {
      if (Object.getOwnPropertyDescriptor(node, symbol)?.get) {
        return;
      }
      if (node[symbol] instanceof window.ElementInternals) {
        return node[symbol];
      }
    }
  }
}
