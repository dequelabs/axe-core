import { closest } from '../../core/utils';
import { accessibleTextVirtual, sanitize } from '../../commons/text';

function implicitEvaluate(node, options, virtualNode) {
  try {
    const label = closest(virtualNode, 'label');
    if (label) {
      const implicitLabel = sanitize(
        accessibleTextVirtual(label, {
          inControlContext: true,
          startNode: virtualNode
        })
      );
      if (label.actualNode) {
        this.relatedNodes([label.actualNode]);
      }
      this.data({ implicitLabel });
      return !!implicitLabel;
    }
    return false;
  } catch (e) {
    return undefined;
  }
}

export default implicitEvaluate;
