import getComposedParent from './get-composed-parent';
import sanitize from '../text/sanitize';
import { getNodeFromTree, nodeLookup } from '../../core/utils';
import getRoleType from '../aria/get-role-type';
import isFocusable from './is-focusable';

function walkDomNode(node, functor) {
  if (functor(node.actualNode) !== false) {
    node.children.forEach(child => walkDomNode(child, functor));
  }
}

const blockLike = ['block', 'list-item', 'table', 'flex', 'grid'];

const inlineBlockLike = ['inline-block', 'inline-flex', 'inline-grid'];

function isBlock(node) {
  const { vNode } = nodeLookup(node);
  const display = vNode.getComputedStylePropertyValue('display');
  return blockLike.includes(display) || display.substr(0, 6) === 'table-';
}

function isInlineBlockLike(vNode) {
  const display = vNode.getComputedStylePropertyValue('display');
  return inlineBlockLike.includes(display);
}

function getBlockParent(node) {
  // Find the closest parent
  let parentBlock = getComposedParent(node);
  while (parentBlock && !isBlock(parentBlock)) {
    parentBlock = getComposedParent(parentBlock);
  }

  return getNodeFromTree(parentBlock);
}

/**
 * Determines if an element is within a text block
 * With `noLengthCompare` true, will return if there is any non-space text outside
 * widgets. When false, compares the length of non-widget text to widget text
 *
 * @param  {Element} node [description]
 * @param  {Object} options Optional
 * @property {Bool} noLengthCompare
 * @property {Bool} permissive
 * @return {Boolean}      [description]
 */
function isInTextBlock(node, { noLengthCompare, permissive = false } = {}) {
  const { vNode, domNode } = nodeLookup(node);

  if (isBlock(domNode)) {
    // Ignore if the link is a block
    return false;
  }

  // Find all the text part of the parent block not in a link, and all the text in a link
  const virtualParent = getBlockParent(domNode);

  // if the element is a block-like element, look at the siblings of the node and if any
  // are inline or text nodes then return the desired permissive option value so the
  // caller determine what to do with them.
  // @see https://github.com/dequelabs/axe-core/issues/4392
  if (isInlineBlockLike(vNode)) {
    // widget parents should be ignored
    if (getRoleType(virtualParent) === 'widget' || isFocusable(virtualParent)) {
      return false;
    }

    for (const siblingVNode of virtualParent.children) {
      if (
        siblingVNode.actualNode === node ||
        // BR and HR elements break the line
        ['br', 'hr'].includes(siblingVNode.props.nodeName)
      ) {
        continue;
      }

      // if there is a widget as a sibling we break out of the loop as we won't count two
      // widgets as being inline
      if (getRoleType(siblingVNode) === 'widget') {
        break;
      }

      if (siblingVNode.props.nodeType === window.Node.TEXT_NODE) {
        if (sanitize(siblingVNode.props.nodeValue)) {
          return permissive;
        }

        continue;
      }

      const display = siblingVNode.getComputedStylePropertyValue('display');
      if (display === 'inline') {
        return permissive;
      }
    }

    return false;
  }

  let parentText = '';
  let widgetText = '';
  let inBrBlock = 0;

  // We want to ignore hidden text, and if br / hr is used, only use the section of the parent
  // that has the link we're looking at
  walkDomNode(virtualParent, currNode => {
    // We're already passed it, skip everything else
    if (inBrBlock === 2) {
      return false;
    }

    if (currNode.nodeType === 3) {
      // Add the text to the parent
      parentText += currNode.nodeValue;
    }
    // Ignore any node that's not an element (or text as above)
    if (currNode.nodeType !== 1) {
      return;
    }

    const nodeName = (currNode.nodeName || '').toUpperCase();
    if (currNode === domNode) {
      inBrBlock = 1;
    }
    // BR and HR elements break the line
    if (['BR', 'HR'].includes(nodeName)) {
      if (inBrBlock === 0) {
        parentText = '';
        widgetText = '';
      } else {
        inBrBlock = 2;
      }

      // Don't walk nodes with content not displayed on screen.
    } else if (
      currNode.style.display === 'none' ||
      currNode.style.overflow === 'hidden' ||
      !['', null, 'none'].includes(currNode.style.float) ||
      !['', null, 'relative'].includes(currNode.style.position)
    ) {
      return false;

      // Don't walk widgets, we're only interested in what's not in them.
    } else if (getRoleType(currNode) === 'widget') {
      // Grab all the text from this element, but don't walk down it's children
      widgetText += currNode.textContent;
      return false;
    }
  });

  parentText = sanitize(parentText);
  if (noLengthCompare) {
    return parentText.length !== 0;
  }

  widgetText = sanitize(widgetText);
  return parentText.length > widgetText.length;
}

export default isInTextBlock;
