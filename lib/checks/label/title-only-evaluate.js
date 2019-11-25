import { labelVirtual } from '../../commons/text';

function multipleLabelEvaluate(node, options, virtualNode, context) {
  var labelText = labelVirtual(virtualNode);
  return (
  	!labelText &&
  	!!(node.getAttribute('title') || node.getAttribute('aria-describedby'))
  );
}

export default multipleLabelEvaluate;