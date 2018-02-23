const escapeSelector = axe.utils.escapeSelector;
let isXHTML;

function isUncommonClassName (className) {
  return ![
    'focus', 'hover',
    'hidden', 'visible',
    'dirty', 'touched', 'valid', 'disable',
    'enable', 'active', 'col-'
  ].find(str => className.includes(str));
}

function getDistinctClassList (elm) {
  if (!elm.classList || elm.classList.length === 0) {
    return [];
  }

  const siblings = elm.parentNode && Array.from(elm.parentNode.children || '') || [];
  return siblings.reduce((classList, childElm) => {
    if (elm === childElm) {
      return classList;
    } else {
      return classList.filter(classItem => {
        return !childElm.classList.contains(classItem);
      });
    }
  }, Array.from(elm.classList).filter(isUncommonClassName));
}

const commonNodes = [
  'div', 'span', 'p',
  'b', 'i', 'u', 'strong', 'em',
  'h2', 'h3'
];

function getNthChildString (elm, selector) {
  const siblings = elm.parentNode && Array.from(elm.parentNode.children || '') || [];
  const hasMatchingSiblings = siblings.find(sibling => (
    sibling !== elm &&
    axe.utils.matchesSelector(sibling, selector)
  ));
  if (hasMatchingSiblings) {
    const nthChild = 1 + siblings.indexOf(elm);
    return ':nth-child(' + nthChild + ')';
  } else {
    return '';
  }
}

const createSelector = {
  // Get ID properties
  getElmId (elm) {
    if (!elm.getAttribute('id')) {
      return;
    }
    let doc = (elm.getRootNode && elm.getRootNode()) || document;
    const id = '#' + escapeSelector(elm.getAttribute('id') || '');
    if (
      // Don't include youtube's uid values, they change  on reload
      !id.match(/player_uid_/) &&
      // Don't include IDs that occur more then once on the page
      doc.querySelectorAll(id).length === 1
    ) {
      return id;
    }
  },
  // Get custom element name
  getCustomElm (elm, { isCustomElm, nodeName }) {
    if (isCustomElm) {
      return nodeName;
    }
  },

  // Get ARIA role
  getElmRoleProp (elm) {
    if (elm.hasAttribute('role')) {
      return '[role="' + escapeSelector(elm.getAttribute('role')) +'"]';
    }
  },
  // Get uncommon node names
  getUncommonElm (elm, { isCommonElm, isCustomElm, nodeName })  {
    if (!isCommonElm && !isCustomElm) {
      // Add [type] if nodeName is an input element
      if (nodeName === 'input' && elm.hasAttribute('type')) {
        nodeName += '[type="' + elm.type + '"]';
      }
      return nodeName;
    }
  },
  // Has a name property, but no ID (Think input fields)
  getElmNameProp (elm) {
    if (!elm.hasAttribute('id') && elm.name) {
      return '[name="' + escapeSelector(elm.name) + '"]';
    }
  },
  // Get any distinct classes (as long as there aren't more then 3 of them)
  getDistinctClass (elm, { distinctClassList }) {
    if (distinctClassList.length > 0 && distinctClassList.length < 3) {
      return '.' + distinctClassList.map(escapeSelector).join('.');
    }
  },
  // Get a selector that uses src/href props
  getFileRefProp (elm) {
    let attr;
    if (elm.hasAttribute('href')) {
      attr = 'href';
    } else if (elm.hasAttribute('src')) {
      attr = 'src';
    } else {
      return;
    }
    const friendlyUriEnd = axe.utils.getFriendlyUriEnd(elm.getAttribute(attr));
    if (friendlyUriEnd) {
      return '[' + attr + '$="' + encodeURI(friendlyUriEnd) + '"]';
    }
  },
  // Get common node names
  getCommonName (elm, { nodeName, isCommonElm }) {
    if (isCommonElm) {
      return nodeName;
    }
  }
};

/**
 * Get an array of features (as CSS selectors) that describe an element
 *
 * By going down the list of most to least prominent element features,
 * we attempt to find those features that a dev is most likely to
 * recognize the element by (IDs, aria roles, custom element names, etc.)
 */
function getElmFeatures (elm, featureCount) {
  if (typeof isXHTML === 'undefined') {
    isXHTML = axe.utils.isXHTML(document);
  }
  const nodeName = escapeSelector(isXHTML?
     elm.localName
    :elm.nodeName.toLowerCase());
  const classList = Array.from(elm.classList) || [];
  // Collect some props we need to build the selector
  const props = {
    nodeName,
    classList,
    isCustomElm: nodeName.includes('-'),
    isCommonElm: commonNodes.includes(nodeName),
    distinctClassList: getDistinctClassList(elm)
  };

  return [
    // go through feature selectors in order of priority
    createSelector.getCustomElm,
    createSelector.getElmRoleProp,
    createSelector.getUncommonElm,
    createSelector.getElmNameProp,
    createSelector.getDistinctClass,
    createSelector.getFileRefProp,
    createSelector.getCommonName
  ].reduce((features, func) => {
    // As long as we haven't met our count, keep looking for features
    if (features.length === featureCount) {
      return features;
    }

    const feature = func(elm, props);
    if (feature) {
      if (!feature[0].match(/[a-z]/)) {
        features.push(feature);
      } else {
        features.unshift(feature);
      }
    }
    return features;
  }, []);
}

function generateSelector (elm, options, doc) {
  //jshint maxstatements: 19
  let selector, addParent;
  let { isUnique = false } = options;
  const idSelector = createSelector.getElmId(elm);
  const {
    featureCount = 2,
    minDepth = 1,
    toRoot = false,
    childSelectors = []
  } = options;

  if (idSelector) {
    selector = idSelector;
    isUnique = true;

  } else {
    selector = getElmFeatures(elm, featureCount).join('');
    selector += getNthChildString(elm, selector);
    isUnique = options.isUnique || doc.querySelectorAll(selector).length === 1;

    // For the odd case that document doesn't have a unique selector
    if (!isUnique && elm === document.documentElement) {
      // todo: figure out what to do for shadow DOM
      selector += ':root';
    }
    addParent = (minDepth !== 0 || !isUnique);
  }

  const selectorParts = [selector, ...childSelectors];

  if (elm.parentElement && elm.parentElement.nodeType !== 11 &&
    (toRoot || addParent)) {
    return generateSelector(elm.parentNode, {
      toRoot, isUnique,
      childSelectors: selectorParts,
      featureCount: 1,
      minDepth: minDepth -1
    }, doc);
  } else {
    return selectorParts.join(' > ');
  }
}

/**
 * Gets a unique CSS selector
 * @param  {HTMLElement} node The element to get the selector for
 * @param {Object} optional options
 * @return {String | Array[String]}      Unique CSS selector for the node
 */
axe.utils.getSelector = function createUniqueSelector (elm, options = {}) {
  if (!elm) {
    return '';
  }
  let doc = (elm.getRootNode && elm.getRootNode()) || document;
  if (doc.nodeType === 11) { // DOCUMENT_FRAGMENT
    let stack = [];
    while (doc.nodeType === 11) {
      stack.push({elm: elm, doc: doc});
      elm = doc.host;
      doc = elm.getRootNode();
    }
    stack.push({elm: elm, doc: doc});
    return stack.reverse().map((comp) => {
      return generateSelector(comp.elm, options, comp.doc);
    });
  } else {
    return generateSelector(elm, options, doc);
  }
};
