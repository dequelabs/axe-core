import { sanitize } from '../../commons/text';

function docHasTitleEvaluate() {
	var title = document.title;
	return !!(title ? sanitize(title).trim() : '');
}

export default docHasTitleEvaluate;
