import { getRootNode, isVisibleToScreenReaders } from '../../commons/dom';
import { accessibleTextVirtual } from '../../commons/text';
import { escapeSelector } from '../../core/utils';

function hiddenExplicitLabelEvaluate(node, options, virtualNode) {
  if (virtualNode.hasAttr('id')) {
    if (!virtualNode.actualNode) {
      return undefined;
    }

    const root = getRootNode(node);
    const id = escapeSelector(node.getAttribute('id'));
    const label = root.querySelector(`label[for="${id}"]`);

    if (label && !isVisibleToScreenReaders(label)) {
      let name;
      try {
        name = accessibleTextVirtual(virtualNode).trim();
      } catch {
        return undefined;
      }

      const isNameEmpty = name === '';
      return isNameEmpty;
    }
  }
  return false;
}

export default hiddenExplicitLabelEvaluate;
