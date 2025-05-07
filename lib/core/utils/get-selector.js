import escapeSelector from './escape-selector';
import getFriendlyUriEnd from './get-friendly-uri-end';
import getNodeAttributes from './get-node-attributes';
import matchesSelector from './element-matches';
import isXHTML from './is-xhtml';
import getShadowSelector from './get-shadow-selector';
import memoize from './memoize';
import constants from '../../core/constants';
import getNodeFromTree from './get-node-from-tree';

const ignoredAttributes = [
  'class',
  'style',
  'id',
  'selected',
  'checked',
  'disabled',
  'tabindex',
  'aria-checked',
  'aria-selected',
  'aria-invalid',
  'aria-activedescendant',
  'aria-busy',
  'aria-disabled',
  'aria-expanded',
  'aria-grabbed',
  'aria-pressed',
  'aria-valuenow',
  'xmlns'
];

const MAXATTRIBUTELENGTH = 31;
const attrCharsRegex = /([\\"])/g;
const newlineChars = /(\r\n|\r|\n)/g;

/**
 * Escape an attribute selector string.
 * @param {String} str
 * @return {String}
 */
function escapeAttribute(str) {
  return (
    str
      // @see https://www.py4u.net/discuss/286669
      .replace(attrCharsRegex, '\\$1')
      // @see https://stackoverflow.com/a/20354013/2124254
      .replace(newlineChars, '\\a ')
  );
}

/**
 * get the attribute name and value as a string
 * @param {Element} node		The element that has the attribute
 * @param {Attribute} at		The attribute
 * @return {String}
 */
function getAttributeNameValue(node, at) {
  const name = at.name;
  let atnv;

  if (name.indexOf('href') !== -1 || name.indexOf('src') !== -1) {
    const friendly = getFriendlyUriEnd(node.getAttribute(name));
    if (friendly) {
      atnv = escapeSelector(at.name) + '$="' + escapeAttribute(friendly) + '"';
    } else {
      atnv =
        escapeSelector(at.name) +
        '="' +
        escapeAttribute(node.getAttribute(name)) +
        '"';
    }
  } else {
    atnv = escapeSelector(name) + '="' + escapeAttribute(at.value) + '"';
  }
  return atnv;
}

/**
 * Filter the attributes
 * @param {Attribute}		The potential attribute
 * @return {Boolean}		 Whether to include or exclude
 */
function filterAttributes(at) {
  return (
    !ignoredAttributes.includes(at.name) &&
    at.name.indexOf(':') === -1 &&
    (!at.value || at.value.length < MAXATTRIBUTELENGTH)
  );
}

/**
 * Calculate the statistics for the classes, attributes and tags on the page, using
 * the virtual DOM tree
 * @param {Object} domTree		The root node of the virtual DOM tree
 * @returns {Object}					The statistics consisting of three maps, one for classes,
 *														one for tags and one for attributes. The map values are
 *														the counts for how many elements with that feature exist
 */
export function getSelectorData(domTree) {
  // Initialize the return structure with the three maps
  const data = {
    // map of DOM nodes to a list of its classes and attributes
    // e.g. { <button class="foo left" aria-label="my button">, ['.foo', '.left', '[aria-label="my button"]'] }
    classAttrList: new Map(),
    // object of class and attribute names to a Set of other nodes that contain that class or attribute
    // e.g. { .foo: Set(<button>, <div>), .left: Set(<button>), [aria-label="my button"]: Set(<button>) }
    selectorSet: {},
  };

  domTree = Array.isArray(domTree) ? domTree : [domTree];
  let currentLevel = domTree.slice();
  const stack = [];
  while (currentLevel.length) {
    const current = currentLevel.pop();
    const node = current.actualNode;
    const classAttrs = [];

    if (!!node.querySelectorAll) {
      // ignore #text nodes

      const tag = node.nodeName;
      data.selectorSet[tag] ??= {};

      if (node.id) {
        const id = getElmId(node);
        classAttrs.push(id);

        data.selectorSet[tag][id] ??= new Set();
        data.selectorSet[tag][id].add(node);
      }

      // count all the classes
      if (node.classList) {
        Array.from(node.classList).forEach(cl => {
          const ind = escapeSelector(cl);
          classAttrs.push(`.${ind}`)
          data.selectorSet[tag][`.${ind}`] ??= new Set();
          data.selectorSet[tag][`.${ind}`].add(node);
        });
      }

      // count all the filtered attributes
      if (node.hasAttributes()) {
        Array.from(getNodeAttributes(node))
          .filter(filterAttributes)
          .forEach(at => {
            const atnv = getAttributeNameValue(node, at);
            if (atnv) {
              classAttrs.push(`[${atnv}]`)
              data.selectorSet[tag][`[${atnv}]`] ??= new Set();
              data.selectorSet[tag][`[${atnv}]`].add(node);
            }
          });
      }

      data.classAttrList ??= new Map();
      data.classAttrList.set(node, classAttrs);
    }
    if (current.children.length) {
      // "recurse"
      stack.push(currentLevel);
      currentLevel = current.children.slice();
    }
    while (!currentLevel.length && stack.length) {
      currentLevel = stack.pop();
    }
  }
  return data;
}

/**
 * Get ID selector
 */
function getElmId(elm) {
  if (!elm.getAttribute('id')) {
    return;
  }
  const doc = (elm.getRootNode && elm.getRootNode()) || document;
  const id = '#' + escapeSelector(elm.getAttribute('id') || '');
  if (
    // Don't include youtube's uid values, they change	on reload
    !id.match(/player_uid_/) &&
    // Don't include IDs that occur more then once on the page
    doc.querySelectorAll(id).length === 1
  ) {
    return id;
  }
}

/**
 * Return the base CSS selector for a given element
 * @param	{HTMLElement} elm				 The element to get the selector for
 * @return {String|Array<String>}	Base CSS selector for the node
 */
function getBaseSelector(elm) {
  const xhtml = isXHTML(document);
  return escapeSelector(xhtml ? elm.localName : elm.nodeName.toLowerCase());
}

function findUniqueSelector(node) {
  let selector = getBaseSelector(node);

  // unique by default
  if (selector === 'body' || selector === 'html') {
    return {
      selector,
      unique: true
    }
  }


  const values = axe._selectorData.classAttrList.get(node);
  let freq = axe._selectorData.selectorSet[node.nodeName];
  let min = Infinity;
  let loops = 0;

  // an element we ignored (like a slot) so deal with this later
  if (!values) {
    return {
      selector,
      unique: false
    }
  }

  while (min > 1) {
    // find least 3 common classes and attributes replacement
    if (++loops > 3) {
      return {
        selector,
        unique: false
      }
    }

    let group;
    let value = '';

    // find the smallest size Set of the nodes classes and attributes
    for (let i = 0; i < values.length; i++) {
      if (!freq[ values[i] ]) {
        continue;
      }

      const count = freq[ values[i] ].size
      if (count < min) {
        min = count;
        value = values[i];
        group = freq[ values[i] ];
      }
    }

    selector += value;

    // couldn't find any value that would make the selector unique
    if (!group) {
      return {
        selector,
        unique: false
      }
    }

    // not unique so get an intersection of all nodes that also contain the chosen value
    // and then look for the next least frequent class or attribute of the remaining nodes
    if (min > 1) {
      min = Infinity
      const newFreq = {}
      for (let i = 0; i < values.length; i++) {
        if (values[i] === value) {
          continue;
        }
        else if (freq[ values[i] ]) {
          newFreq[ values[i] ] = freq[ values[i] ].intersection( freq[value] )
        }
      }
      freq = newFreq;
    }
  }

  return {
    selector,
    unique: true
  };
}

// updated generateSelector function
function generateSelector(elm, options, doc) {
  const vNode = getNodeFromTree(elm);

  if (!vNode) {
    return ':root'
  }

  if (vNode._selector) {
    return vNode._selector;
  }

  const { selector, unique } = findUniqueSelector(elm);

  if (unique) {
    vNode._selector = selector;
    return selector;
  }
  else {
    // speed improvement by caching the selector for each node and using that rather than generating a new
    // selector each time for the node + child. similar to what we do in our visibility functions so we only have
    // to calculate the visibility once per node
    return generateSelector(elm.parentElement, options, doc) + ' > ' + selector + ':nth-child(' + 1 + ')';
  }
}

/**
 * Gets a unique CSS selector
 * @param {HTMLElement} node The element to get the selector for
 * @param {Object} optional options
 * @returns {String|Array<String>} Unique CSS selector for the node
 */
function getSelector(elm, options) {
  return getShadowSelector(generateSelector, elm, options);
}

// Axe can call getSelector more than once for the same element because
// the same element can end up on multiple DqElements.
export default memoize(getSelector);

// Similar elements create similar selectors. If there are lots of similar elements on the page,
// axe ends up needing to run that same selector many times. We can memoize for a huge perf boost.
const findSimilar = memoize((doc, selector) =>
  Array.from(doc.querySelectorAll(selector))
);
