/* global document */
import { getAccessibleRefs } from '../commons/aria';
import {
  findUpVirtual,
  visuallyOverlaps,
  getRootNode,
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
import { getNodeFromTree, querySelectorAll, tokenList, performanceTimer } from '../core/utils';

let visibleVirtualStartTime;
let walkDOMStartTime;
let isDisabledStartTime;
let isInertStartTime;
let visibleVirtualTotalTime = 0;
let walkDOMTotalTime = 0;
let isDisabledTotalTime = 0;
let isInertTotalTime = 0;

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

  isDisabledStartTime = window.performance.now();
  const disabled = isDisabled(virtualNode);
  isDisabledTotalTime += window.performance.now() - isDisabledStartTime;

  isInertStartTime = window.performance.now();
  const inert = isInert(virtualNode);
  isInertTotalTime += window.performance.now() - isInertStartTime;

  if (disabled || inert) {
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
  }

  const ariaLabelledbyControls = [];
  let ancestorNode = virtualNode;
  walkDOMStartTime = window.performance.now();
  while (ancestorNode) {
    // Find any ancestor (including itself) that is used with aria-labelledby
    if (ancestorNode.props.id) {
      const virtualControls = getAccessibleRefs(ancestorNode)
        .filter(control => {
          return tokenList(
            control.getAttribute('aria-labelledby') || ''
          ).includes(ancestorNode.props.id);
        })
        .map(control => getNodeFromTree(control));

      ariaLabelledbyControls.push(...virtualControls);
    }
    ancestorNode = ancestorNode.parent;
  }
  walkDOMTotalTime += window.performance.now() - walkDOMStartTime;

  if (
    ariaLabelledbyControls.length > 0 &&
    ariaLabelledbyControls.every(isDisabled)
  ) {
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
colorContrastMatches._logTime = function() {
  performanceTimer._log('Measure rule_color-contrast#matches_isDisabled took ' + isDisabledTotalTime + 'ms');
  performanceTimer._log('Measure rule_color-contrast#matches_isInert took ' + isInertTotalTime + 'ms');
  performanceTimer._log('Measure rule_color-contrast#matches_walkDOM took ' + walkDOMTotalTime + 'ms');
  performanceTimer._log('Measure rule_color-contrast#matches_visibleVirtual took ' + visibleVirtualTotalTime + 'ms');

  visibleVirtual._logTime();
}
export default colorContrastMatches;

const removeUnicodeOptions = {
  emoji: true,
  nonBmp: false,
  punctuations: true
};

function hasRealTextChildren(virtualNode) {
  visibleVirtualStartTime = window.performance.now();
  const visibleText = visibleVirtual(virtualNode, false, true, { log: true });
  visibleVirtualTotalTime += window.performance.now() - visibleVirtualStartTime;

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
