import { sanitize, titleText } from '../../commons/text';

function nonEmptyTitleEvaluate(node) {
	return !!sanitize(titleText(node));
}

export default nonEmptyTitleEvaluate;
