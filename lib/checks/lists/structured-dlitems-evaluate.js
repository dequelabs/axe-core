import { isShadowRoot } from '../../core/utils';
import { isVisibleToScreenReaders } from '../../commons/dom';

function structuredDlitemsEvaluate(node, options, virtualNode) {
  const children = virtualNode.children;
  if (!children || !children.length) {
    return false;
  }

  const resolved = resolveShadowChildren(children);

  let hasDt = false,
    hasDd = false,
    nodeName;
  for (let i = 0; i < resolved.length; i++) {
    nodeName = resolved[i].props.nodeName.toUpperCase();
    if (nodeName === 'DT') {
      hasDt = true;
    }
    if (hasDt && nodeName === 'DD') {
      return false;
    }
    if (nodeName === 'DD') {
      hasDd = true;
    }
  }

  return hasDt || hasDd;
}

/**
 * For each child, if it is a custom element shadow host, replace it with
 * its visible shadow DOM element children (e.g. <my-term> → <dt>).
 */
function resolveShadowChildren(children) {
  const result = [];
  for (const child of children) {
    if (child.actualNode && isShadowRoot(child.actualNode) && child.children) {
      const shadowElements = child.children.filter(
        sc => sc.actualNode?.nodeType === 1 && isVisibleToScreenReaders(sc)
      );
      if (shadowElements.length > 0) {
        result.push(...shadowElements);
        continue;
      }
    }
    result.push(child);
  }
  return result;
}

export default structuredDlitemsEvaluate;
