import { getRootNode, isVisibleOnScreen } from '../../commons/dom';
import { accessibleText, sanitize } from '../../commons/text';
import { escapeSelector } from '../../core/utils';

function explicitEvaluate(node, options, virtualNode) {
  if (!virtualNode.attr('id')) {
    return false;
  }
  if (!virtualNode.actualNode) {
    return undefined;
  }

  const root = getRootNode(virtualNode.actualNode);
  const id = escapeSelector(virtualNode.attr('id'));
  const labels = Array.from(root.querySelectorAll(`label[for="${id}"]`));
  this.relatedNodes(labels);

  if (!labels.length) {
    return false;
  }

  try {
    return labels.some(label => {
      // defer to hidden-explicit-label check for better messaging
      if (!isVisibleOnScreen(label)) {
        return true;
      } else {
        const explicitLabel = sanitize(
          accessibleText(label, {
            inControlContext: true,
            startNode: virtualNode
          })
        );
        this.data({ explicitLabel });
        return !!explicitLabel;
      }
    });
  } catch {
    return undefined;
  }
}

export default explicitEvaluate;
