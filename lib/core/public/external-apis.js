import { shadowSelect, getNodeFromTree, clone, assert } from '../utils';
import log from '../log';

const ELEMENT_INTERNALS_DEFAULT_TIMEOUT = 1000;

let getElementInternals;
let elementInternalsTimeout;

export default function externalAPIs({
  elementInternalsTimeout: internalsTimeout,
  getElementInternals: getInternals
} = {}) {
  if (isNotNullOrUndefined(internalsTimeout)) {
    assert(
      typeof internalsTimeout === 'number',
      'elementInternalsTimeout must be a number'
    );
    elementInternalsTimeout = internalsTimeout;
  }
  // reset if set to null
  else if (internalsTimeout === null) {
    elementInternalsTimeout = ELEMENT_INTERNALS_DEFAULT_TIMEOUT;
  }

  if (isNotNullOrUndefined(getInternals)) {
    assert(
      typeof getInternals === 'function',
      'getElementInternals must be a function that returns a Promise'
    );
    getElementInternals = getInternals;
  }
  // reset if set to null
  else if (getInternals === null) {
    getElementInternals = null;
  }
}

function isNotNullOrUndefined(val) {
  return val !== undefined && val !== null;
}

/**
 * Async setTimeout
 */
async function asyncTimeout(ms) {
  return new Promise(res => setTimeout(res, ms, 'timeout'));
}

/**
 * load element internals map data provided by the user to elementInternals property on vNodes
 */
async function loadElementInternals(logger = log) {
  if (!getElementInternals) {
    return;
  }

  const promiseValue = await Promise.race([
    asyncTimeout(elementInternalsTimeout),
    getElementInternals()
  ]);

  assert(promiseValue !== 'timeout', 'Timeout called for elementInternals');

  const internalsMap = clone(promiseValue);

  // validate the map structure
  if (!internalsMap || !Array.isArray(internalsMap)) {
    logger('externalAPIs.getElementInternals() did not return an array');
    return;
  }

  for (let i = 0; i < internalsMap.length; i++) {
    // validate we can destructure the item
    if (!internalsMap[i] || typeof internalsMap[i] !== 'object') {
      logger(`externalAPIs.getElementInternals()[${i}] is not an object`);
      continue;
    }

    const { internals, ancestry } = internalsMap[i];

    // skip missing or malformed properties
    if (!internals || typeof internals !== 'object') {
      logger(
        `externalAPIs.getElementInternals()[${i}].internals is not an object`
      );
      continue;
    }

    if (
      !ancestry ||
      !(Array.isArray(ancestry) || typeof ancestry === 'string')
    ) {
      logger(
        `externalAPIs.getElementInternals()[${i}].ancestry is not a string or an array of strings`
      );
      continue;
    }

    const node = shadowSelect(ancestry);
    const vNode = getNodeFromTree(node);

    if (!vNode) {
      logger(
        `Unable to locate node using selector ${ancestry} from externalAPIs.getElementInternals()[${i}]`
      );
      continue;
    }

    // convert idref(s) ancestries back to nodes
    for (const [key, val] of Object.entries(internals)) {
      if (typeof val === 'string') {
        continue;
      }

      const { type, value } = val;
      if (!type) {
        logger(
          `externalAPIs.getElementInternals()[${i}].internals.${key} is an object but has no "type" property`
        );
      }
      if (!value) {
        logger(
          `externalAPIs.getElementInternals()[${i}].internals.${key} is an object but has no "value" property`
        );
      }

      if (type === 'HTMLElement') {
        setHTMLElement(internals, key, value);
      } else if (type === 'NodeList') {
        setNodeList(internals, key, value);
      }
    }

    // set internals directly onto the vNode
    vNode.elementInternals = internals;
  }
}

export const external = {
  loadElementInternals
};

/**
 * Find an HTMLElement idref on the page and set it on the internal object or set a getter that will error on access so rules will incomplete.
 * @param {Object} internals
 * @param {String} key
 * @param {String|String[]} value
 */
function setHTMLElement(internals, key, value) {
  const node = shadowSelect(value);
  if (node) {
    internals[key] = node;
  } else {
    // only throw when we access it so rules can incomplete
    Object.defineProperty(internals, key, {
      get() {
        throw new Error(`Unable to locate node using selector: ${value}`);
      }
    });
  }
}

/**
 * Find a NodeList idrefs on the page and set it on the internal object or set a getter that will error on access so rules will incomplete.
 * @param {Object} internals
 * @param {String} key
 * @param {String|String[]} value
 */
function setNodeList(internals, key, value) {
  const nodes = [];
  const errorSelectors = [];

  for (const selector of value) {
    const node = shadowSelect(selector);
    if (node) {
      nodes.push(node);
    } else {
      errorSelectors.push(selector);
    }
  }

  if (errorSelectors.length === 0) {
    internals[key] = nodes;
  } else {
    // only throw when we access it so rules can incomplete
    Object.defineProperty(internals, key, {
      get() {
        throw new Error(
          `Unable to locate nodes using selectors: ${errorSelectors.join(',')}`
        );
      }
    });
  }
}
