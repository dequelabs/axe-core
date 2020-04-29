import { sanitize } from '../../commons/text';
import { arialabelledbyText } from '../../commons/aria';

function ariaLabelledbyEvaluate(node) {
	return !!sanitize(arialabelledbyText(node));
}

export default ariaLabelledbyEvaluate;
