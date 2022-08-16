import { sanitize, subtreeText } from '../../commons/text';

export default function hasTextContentEvaluate(node, options, virtualNode) {
  try {
    return sanitize(subtreeText(virtualNode)) !== '';
  } catch (e) {
    return undefined;
  }
}
