/**
 * Check if given node contains focusable elements (excluding thyself)
 */
const tabbableElements = virtualNode.tabbableElements();

// remove the first item (which is the virtualNode)
tabbableElements.shift();

return tabbableElements.length > 0;
