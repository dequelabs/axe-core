import { isShadowRoot } from '../../core/utils';
import isVisibleToScreenReaders from './is-visible-to-screenreader';

/**
 * Get the visible element children from a shadow host's shadow DOM.
 * Returns an array of visible vNode element children if the node is a
 * shadow host, or null otherwise.
 * @param {VirtualNode} vNode
 * @returns {VirtualNode[]|null}
 */
export default function getVisibleShadowChildren(vNode) {
  if (!vNode.actualNode || !isShadowRoot(vNode.actualNode) || !vNode.children) {
    return null;
  }

  const visibleElements = vNode.children.filter(
    child => child.actualNode?.nodeType === 1 && isVisibleToScreenReaders(child)
  );

  return visibleElements.length > 0 ? visibleElements : null;
}
