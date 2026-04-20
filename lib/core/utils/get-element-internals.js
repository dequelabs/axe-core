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

export default function getElementInternals(node) {
  // support finding internals from an optional global map
  // e.g. globalThis.axeInternalsMap.set(node, internals)
  if (globalThis.axeInternalsMap?.get(node)) {
    return globalThis.axeInternalsMap.get(node);
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
