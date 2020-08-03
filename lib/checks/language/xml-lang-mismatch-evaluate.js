import { getBaseLang } from '../../core/utils';

function xmlLangMismatchEvaluate(node) {
	const primaryLangValue = getBaseLang(node.getAttribute('lang'));
	const primaryXmlLangValue = getBaseLang(node.getAttribute('xml:lang'));

	return primaryLangValue === primaryXmlLangValue;
}

export default xmlLangMismatchEvaluate;
