if (!options || !options.selector || typeof options.selector !== 'string') {
  throw new TypeError('visible-in-page requires options.selector to be a string');
}

const matchingElms = axe.utils.querySelectorAll(virtualNode,
    options.selector);
return matchingElms && matchingElms.length > 0;