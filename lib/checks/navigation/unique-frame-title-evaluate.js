import { sanitize } from '../../commons/text';

function uniqueFrameTitleEvaluate(node) {
	var title = sanitize(node.title)
		.trim()
		.toLowerCase();
	this.data(title);
	return true;
}

export default uniqueFrameTitleEvaluate;
