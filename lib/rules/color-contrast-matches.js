/* global axe, document */
import { getAriaValue } from '../commons/aria';
import {
  findUpVirtual,
  visuallyOverlaps,
  getRootNode,
  getResolvedRefs,
  isFocusable,
  isInert,
  getOverflowHiddenAncestors
} from '../commons/dom';
import {
  visibleVirtual,
  removeUnicode,
  sanitize,
  isIconLigature
} from '../commons/text';
import { rectsOverlap } from '../commons/math';
import { isDisabled } from '../commons/forms';
import cache from '../core/base/cache';
import {
  getNodeFromTree,
  querySelectorAll,
  querySelectorAllFilter
} from '../core/utils';

function colorContrastMatches(node, virtualNode) {
  const { nodeName, type: inputType } = virtualNode.props;

  // Don't test options, color contrast doesn't work well on these
  if (nodeName === 'option') {
    return false;
  }
  // Don't test empty select elements
  if (nodeName === 'select' && !node.options.length) {
    return false;
  }

  // some input types don't have text, so the rule shouldn't be applied
  const nonTextInput = [
    'hidden',
    'range',
    'color',
    'checkbox',
    'radio',
    'image'
  ];
  if (nodeName === 'input' && nonTextInput.includes(inputType)) {
    return false;
  }

  if (isDisabled(virtualNode) || isInert(virtualNode)) {
    return false;
  }

  // form elements that don't have direct child text nodes need to check that
  // the text indent has not been changed and moved the text away from the
  // control
  const formElements = ['input', 'select', 'textarea'];
  if (formElements.includes(nodeName)) {
    const style = window.getComputedStyle(node);
    const textIndent = parseInt(style.getPropertyValue('text-indent'), 10);

    if (textIndent) {
      // since we can't get the actual bounding rect of the text node, we'll
      // use the current nodes bounding rect and adjust by the text-indent to
      // see if it still overlaps the node
      let rect = node.getBoundingClientRect();
      rect = {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left + textIndent,
        right: rect.right + textIndent
      };

      if (!visuallyOverlaps(rect, node)) {
        return false;
      }
    }
    // Match all form fields, regardless of if they have text
    return true;
  }
  let labelsEnabledControl = false;
  const nodeParentLabel = findUpVirtual(virtualNode, 'label');
  if (nodeName === 'label' || nodeParentLabel) {
    const labelNode = nodeParentLabel || node;
    const labelVirtual = nodeParentLabel
      ? getNodeFromTree(nodeParentLabel)
      : virtualNode;

    // explicit label of disabled control
    if (labelNode.htmlFor) {
      const doc = getRootNode(labelNode);
      const explicitControl = doc.getElementById(labelNode.htmlFor);
      const explicitControlVirtual =
        explicitControl && getNodeFromTree(explicitControl);

      if (explicitControlVirtual && isDisabled(explicitControlVirtual)) {
        return false;
      }
    }

    // implicit label of disabled control
    const query =
      'input:not(' +
      '[type="hidden"],' +
      '[type="image"],' +
      '[type="button"],' +
      '[type="submit"],' +
      '[type="reset"]' +
      '), select, textarea';
    const implicitControl = querySelectorAll(labelVirtual, query)[0];

    if (implicitControl && isDisabled(implicitControl)) {
      return false;
    }
    if (labelNode.control) {
      const control = getNodeFromTree(labelNode.control);
      labelsEnabledControl = !control || !isInactiveControl(control);
    }
  }

  if (isOnlyReferencedByDisabledControls(virtualNode, labelsEnabledControl)) {
    return false;
  }

  if (!hasRealTextChildren(virtualNode)) {
    return false;
  }

  if (!parseFloat(virtualNode.getComputedStylePropertyValue('font-size'))) {
    return false;
  }

  const range = document.createRange();
  const childNodes = virtualNode.children;
  for (let index = 0; index < childNodes.length; index++) {
    const child = childNodes[index];
    if (
      child.actualNode.nodeType === 3 &&
      sanitize(child.actualNode.nodeValue) !== ''
    ) {
      range.selectNodeContents(child.actualNode);
    }
  }

  const rects = Array.from(range.getClientRects());
  const clippingAncestors = getOverflowHiddenAncestors(virtualNode);
  return rects.some(rect => {
    //check to see if the rectangle impinges
    const overlaps = visuallyOverlaps(rect, node);

    if (!clippingAncestors.length) {
      return overlaps;
    }

    const withinOverflow = clippingAncestors.some(overflowNode => {
      return rectsOverlap(rect, overflowNode.boundingClientRect);
    });

    return overlaps && withinOverflow;
  });
}

export default colorContrastMatches;

/**
 * Check whether a node or its ancestors supply text only to disabled controls.
 * @param {VirtualNode} virtualNode
 * @param {boolean} labelsEnabledControl Whether the text labels an enabled native control
 * @returns {boolean}
 */
function isOnlyReferencedByDisabledControls(virtualNode, labelsEnabledControl) {
  const references = cache.get(
    'colorContrastControlText',
    getControlTextReferences
  );
  let hasDisabledLabel = false;
  let hasDisabledDescription = false;
  for (let ancestor = virtualNode; ancestor; ancestor = ancestor.parent) {
    const usage = references.get(ancestor);
    if (!usage) {
      continue;
    }
    if (usage.hasEnabledControl) {
      return false;
    }
    hasDisabledLabel ||= usage.hasDisabledLabel;
    hasDisabledDescription ||= usage.hasDisabledDescription;
  }
  // A description can also contain independently usable text, such as a link.
  return (
    hasDisabledLabel ||
    (hasDisabledDescription &&
      !labelsEnabledControl &&
      !isTextInEnabledFocusableElement(virtualNode))
  );
}

function getControlTextReferences() {
  const references = new Map();
  const controls = querySelectorAllFilter(
    axe._tree,
    '*',
    control =>
      control.hasAttr('aria-labelledby') ||
      control.hasAttr('aria-describedby') ||
      (control.props.nodeName.includes('-') && control.elementInternals)
  );

  for (const control of controls) {
    const disabled = isInactiveControl(control);
    for (const attr of ['aria-labelledby', 'aria-describedby']) {
      for (const target of getResolvedRefs(control, attr)) {
        if (!target) {
          continue;
        }
        const usage = references.get(target) || {};
        if (!disabled) {
          usage.hasEnabledControl = true;
        } else if (attr === 'aria-labelledby') {
          usage.hasDisabledLabel = true;
        } else {
          usage.hasDisabledDescription = true;
        }
        references.set(target, usage);
      }
    }
  }
  return references;
}

/**
 * Use native disabled state so controls in a fieldset's first legend stay active.
 * ARIA disabled state can also be inherited from an ancestor.
 * @param {VirtualNode} control
 * @returns {boolean}
 */
function isInactiveControl(control) {
  const { matches, msMatchesSelector } = window.Element.prototype;
  if ((matches || msMatchesSelector).call(control.actualNode, ':disabled')) {
    return true;
  }
  for (let ancestor = control; ancestor; ancestor = ancestor.parent) {
    const { value } = getAriaValue(ancestor, 'aria-disabled');
    if (value) {
      return value === 'true';
    }
  }
  return false;
}

function isTextInEnabledFocusableElement(virtualNode) {
  for (let ancestor = virtualNode; ancestor; ancestor = ancestor.parent) {
    if (isFocusable(ancestor) && !isInactiveControl(ancestor)) {
      return true;
    }
  }
  return false;
}

const removeUnicodeOptions = {
  emoji: true,
  nonBmp: false,
  punctuations: true
};

function hasRealTextChildren(virtualNode) {
  const visibleText = visibleVirtual(virtualNode, false, true);
  if (
    visibleText === '' ||
    removeUnicode(visibleText, removeUnicodeOptions) === ''
  ) {
    return false;
  }
  return virtualNode.children.some(
    vChild => vChild.props.nodeName === '#text' && !isIconLigature(vChild)
  );
}
