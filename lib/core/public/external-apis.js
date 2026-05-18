import { shadowSelect, getNodeFromTree } from '../utils';

export const external = {};

export default function externalAPIs({
  elementInternalsTimeout = 1000,
  elementInternals
} = {}) {
  if (elementInternals !== null && elementInternals !== undefined) {
    if (typeof elementInternals !== 'function') {
      throw new TypeError(
        'elementInternals must be a function that returns a Promise'
      );
    }

    setElementInternals(elementInternalsTimeout, elementInternals);
  }
}

function setElementInternals(elementInternalsTimeout, elementInternals) {
  external.elementInternals = (res, rej) => {
    let timeoutCalled = false;
    const timeout = setTimeout(() => {
      timeoutCalled = true;
      rej(new Error('Timeout called for elementInternals'));
    }, elementInternalsTimeout);

    return elementInternals()
      .then(results => {
        clearTimeout(timeout);

        // timeout already called so don't process the response
        if (timeoutCalled) {
          return;
        }

        if (!results || !Array.isArray(results)) {
          return;
        }

        // resolve ancestry strings to nodes
        for (const { internals, ancestry } of results) {
          // skip missing or malformed properties
          if (
            !internals ||
            typeof internals !== 'object' ||
            !ancestry ||
            !(Array.isArray(ancestry) || typeof ancestry === 'string')
          ) {
            continue;
          }

          const node = shadowSelect(ancestry);
          const vNode = getNodeFromTree(node);

          if (!vNode) {
            continue;
          }

          // convert idref(s) ancestries back to nodes
          for (const [key, val] of Object.entries(internals)) {
            if (typeof val === 'string') {
              continue;
            }

            const { type, value } = val;
            if (type === 'HTMLElement') {
              internals[key] = shadowSelect(value);
            } else if (type === 'NodeList') {
              internals[key] = value.map(a => shadowSelect(a));
            }
          }

          // set internals directly onto the vNode
          vNode.elementInternals = internals;
        }

        res();
      })
      .catch(rej);
  };
}

// expose for testing
export function _reset() {
  for (const key of Object.keys(external)) {
    delete external[key];
  }
}
