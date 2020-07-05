import { tokenList } from '../../core/utils';

function fallbackroleEvaluate(node, options, virtualNode) {
	return tokenList(virtualNode.attr('role')).length > 1;
}

export default fallbackroleEvaluate;
