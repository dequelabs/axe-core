import escapeSelector from './escape-selector';
import getFriendlyUriEnd from './get-friendly-uri-end';
import getNodeAttributes from './get-node-attributes';
import matchesSelector from './element-matches';
import isXHTML from './is-xhtml';
import getShadowSelector from './get-shadow-selector';
import memoize from './memoize';
import constants from '../../core/constants';
import nodeLookup from './node-lookup';
import performanceTimer from './performance-timer';

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

function countSort(a, b) {
  return a.count < b.count ? -1 : a.count === b.count ? 0 : 1;
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

// new function to find unique selector
let getBaseSelectorStart;
let gettersStart;
let intersectionStart;
let smallesetSetStart

let getBaseSelectorTime = 0;
let gettersTime = 0;
let intersectionTime = 0;
let smallesetSetTime = 0;

function findUniqueSelector(node) {
  getBaseSelectorStart = window.performance.now();
  let selector = getBaseSelector(node);
  getBaseSelectorTime += window.performance.now() - getBaseSelectorStart;

  // unique by default
  if (selector === 'body' || selector === 'html') {
    return {
      selector,
      unique: true
    }
  }


  gettersStart = window.performance.now();
  const values = axe._selectorData.classAttrList.get(node);
  let freq = axe._selectorData.selectorSet[node.nodeName];
  gettersTime += window.performance.now() - gettersStart;
  let min = Infinity;
  let loops = 0;

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
    smallesetSetStart = window.performance.now();
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
    smallesetSetTime += window.performance.now() - smallesetSetStart;

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
          intersectionStart = window.performance.now();
          newFreq[ values[i] ] = freq[ values[i] ].intersection( freq[value] )
          intersectionTime += window.performance.now() - intersectionStart;
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

/**
 * Given a node and the statistics on class frequency on the page,
 * return all its uncommon class data sorted in order of decreasing uniqueness
 * @param {Element} node			The node
 * @param {Object} classData	The map of classes to counts
 * @return {Array}						The sorted array of uncommon class data
 */
function uncommonClasses(node, selectorData) {
  // eslint no-loop-func:false
  const retVal = [];
  const classData = selectorData.classes;
  const tagData = selectorData.tags;

  if (node.classList) {
    Array.from(node.classList).forEach(cl => {
      const ind = escapeSelector(cl);
      if (classData[ind] < tagData[node.nodeName]) {
        retVal.push({
          name: ind,
          count: classData[ind],
          species: 'class'
        });
      }
    });
  }
  return retVal.sort(countSort);
}

/**
 * Given an element and a selector that finds that element (but possibly other sibling elements)
 * return the :nth-child(n) pseudo selector that uniquely finds the node within its siblings
 * @param {Element} elm			 The Element
 * @param {String} selector	 The selector
 * @return {String}					 The nth-child selector
 */
function getNthChildString(elm, selector) {
  const siblings =
    (elm.parentNode && Array.from(elm.parentNode.children || '')) || [];
  const hasMatchingSiblings = siblings.find(
    sibling => sibling !== elm && matchesSelector(sibling, selector)
  );
  if (hasMatchingSiblings) {
    const nthChild = 1 + siblings.indexOf(elm);
    return ':nth-child(' + nthChild + ')';
  } else {
    return '';
  }
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

/**
 * Given a node and the statistics on attribute frequency on the page,
 * return all its uncommon attribute data sorted in order of decreasing uniqueness
 * @param {Element} node			The node
 * @param {Object} attData		The map of attributes to counts
 * @return {Array}						The sorted array of uncommon attribute data
 */
function uncommonAttributes(node, selectorData) {
  const retVal = [];
  const attData = selectorData.attributes;
  const tagData = selectorData.tags;

  if (node.hasAttributes()) {
    Array.from(getNodeAttributes(node))
      .filter(filterAttributes)
      .forEach(at => {
        const atnv = getAttributeNameValue(node, at);

        if (atnv && attData[atnv] < tagData[node.nodeName]) {
          retVal.push({
            name: atnv,
            count: attData[atnv],
            species: 'attribute'
          });
        }
      });
  }
  return retVal.sort(countSort);
}

/**
 * generates a selector fragment for an element based on the statistics of the page in
 * which the element exists. This function takes into account the fact that selectors that
 * use classes and tags are much faster than universal selectors. It also tries to use a
 * unique class selector before a unique attribute selector (with the tag), followed by
 * a selector made up of the three least common features statistically. A feature will
 * also only be used if it is less common than the tag of the element itself.
 *
 * @param {Element} elm			The element for which to generate a selector
 * @param {Object} options	 Options for how to generate the selector
 * @param {RootNode} doc		 The root node of the document or document fragment
 * @returns {String}				 The selector
 */

function getThreeLeastCommonFeatures(elm, selectorData) {
  let selector = '';
  let features;
  const clss = uncommonClasses(elm, selectorData);
  const atts = uncommonAttributes(elm, selectorData);

  if (clss.length && clss[0].count === 1) {
    // only use the unique class
    features = [clss[0]];
  } else if (atts.length && atts[0].count === 1) {
    // only use the unique attribute value
    features = [atts[0]];
    // if no class, add the tag
    selector = getBaseSelector(elm);
  } else {
    features = clss.concat(atts);
    // sort by least common
    features.sort(countSort);

    // select three least common features
    features = features.slice(0, 3);

    // if no class, add the tag
    if (
      !features.some(feat => {
        return feat.species === 'class';
      })
    ) {
      // has no class
      selector = getBaseSelector(elm);
    } else {
      // put the classes at the front of the selector
      features.sort((a, b) => {
        return a.species !== b.species && a.species === 'class'
          ? -1
          : a.species === b.species
            ? 0
            : 1;
      });
    }
  }

  // construct the return value
  return (selector += features.reduce((val, feat) => {
    /*eslint indent: 0*/
    switch (feat.species) {
      case 'class':
        return val + '.' + feat.name;
      case 'attribute':
        return val + '[' + feat.name + ']';
    }
    return val; // should never happen
  }, ''));
}

/**
 * generates a single selector for an element
 * @param {Element} elm			The element for which to generate a selector
 * @param {Object} options	 Options for how to generate the selector
 * @param {RootNode} doc		 The root node of the document or document fragment
 * @returns {String}				 The selector
 */
function generateSelector(elm, options, doc) {
  return generateSelectorSelf(nodeLookup(elm).vNode);
}

let findUniqueSelectorStart;

let findUniqueSelectorTime = 0;


const generateSelectorSelf = memoize(function generateSelectorSelfMemoized(vNode) {
    findUniqueSelectorStart = window.performance.now();
    const { selector, unique } = findUniqueSelector(vNode.actualNode);
    findUniqueSelectorTime += window.performance.now() - findUniqueSelectorStart;

    if (unique) {
      return selector;
    }
    else {
      // further speed improvement by caching the position of the child compared to its siblings
      return generateSelector(vNode.parent) + ' > ' + selector + ':nth-child(1)';
    }
  }, { primitive: true }
);

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
const getSelectorMemoized = memoize(getSelector);
getSelectorMemoized._logTime = function() {
  performanceTimer._log('Measure getSelector#findUniqueSelector took ' + findUniqueSelectorTime + 'ms');
  performanceTimer._log('Measure getSelector#getBaseSelector took ' + getBaseSelectorTime + 'ms');
  performanceTimer._log('Measure getSelector#getters took ' + gettersTime + 'ms');
  performanceTimer._log('Measure getSelector#intersection took ' + intersectionTime + 'ms');
  performanceTimer._log('Measure getSelector#smallesetSet took ' + smallesetSetTime + 'ms');
}
export default getSelectorMemoized

// Similar elements create similar selectors. If there are lots of similar elements on the page,
// axe ends up needing to run that same selector many times. We can memoize for a huge perf boost.
const findSimilar = memoize((doc, selector) =>
  Array.from(doc.querySelectorAll(selector))
);
