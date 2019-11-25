import xmlLangMismatchEvaluate from './xml-lang-mismatch-evaluate';

const xmlLangMismatchMetadata = {
	id: 'xml-lang-mismatch',
	evaluate: xmlLangMismatchEvaluate,
	metadata: {
		impact: 'moderate',
		message: {
			pass: 'Lang and xml:lang attributes have the same base language',
			fail: 'Lang and xml:lang attributes do not have the same base language'
		}
	}
};

export default xmlLangMismatchMetadata;