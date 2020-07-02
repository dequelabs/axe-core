import { sanitize } from '../../commons/text';
import { arialabelledbyText } from '../../commons/aria';

function ariaLabelledbyEvaluate(node) {
	try {
		return !!sanitize(arialabelledbyText(node));
	} catch (e) {
		return undefined;
	}
}

export default ariaLabelledbyEvaluate;
